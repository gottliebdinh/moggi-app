import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStripe, isPlatformPaySupported } from '@stripe/stripe-react-native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { BACKEND_URL } from '../config/stripe';
import colors from '../theme/colors';

export default function PaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { clearCart, getTotalPrice, items } = useCart();
  const { user } = useAuth();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplePaySupported, setIsApplePaySupported] = useState(false);
  const [initialUserState] = useState(user); // Speichere initialen User-State

  const params = route.params as any;
  const { customerInfo, pickupDate, pickupTime } = params || {};

  useEffect(() => {
    checkPlatformPaySupport();
  }, []);

  // Bei Auth-Änderungen: zurück zum Warenkorb
  useEffect(() => {
    // Wenn User sich ausloggt während er auf diesem Screen ist
    if (initialUserState && !user) {
      console.log('PaymentScreen - User logged out, navigating back');
      navigation.reset({
        index: 0,
        routes: [{ name: 'CartMain' as never }],
      });
    }
  }, [user]);

  const checkPlatformPaySupport = async () => {
    const isSupported = await isPlatformPaySupported();
    setIsApplePaySupported(isSupported);
  };

  const formatDate = (date: Date) => {
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const day = days[date.getDay()];
    const dateStr = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}, ${dateStr}.${month}.${year}`;
  };

  const createPaymentIntent = async () => {
    const totalAmount = getTotalPrice();
    
    try {
      const response = await fetch(`${BACKEND_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'eur',
          customerEmail: customerInfo?.email,
          customerName: `${customerInfo?.firstName} ${customerInfo?.lastName}`,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // 1. Payment Intent vom Backend holen
      const { paymentIntent, ephemeralKey, customer } = await createPaymentIntent();
      
      // 2. Payment Sheet initialisieren (nur Kreditkarte, kein Apple/Google Pay nötig)
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'MOGGI Asian Kitchen & Bar',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // applePay und googlePay NICHT aktivieren = nur Kreditkarte
      });

      if (initError) {
        Alert.alert('Fehler', initError.message);
        setIsProcessing(false);
        return;
      }

      // 3. Payment Sheet anzeigen
      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        Alert.alert('Zahlung abgebrochen', presentError.message);
        setIsProcessing(false);
        return;
      }

      // 4. Erfolg!
      setIsProcessing(false);
      
      // 5. Generiere Bestellnummer
      const orderNumber = `${Date.now().toString().slice(-6)}`;
      
      // 6. Sende Bestellbestätigung per E-Mail
      try {
        await fetch(`${BACKEND_URL}/send-order-confirmation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerEmail: customerInfo?.email,
            customerName: `${customerInfo?.firstName} ${customerInfo?.lastName}`,
            orderNumber,
            items: items.map(item => {
              const itemPrice = parseFloat(item.price.replace(',', '.'));
              return {
                name: item.name,
                quantity: item.quantity,
                price: itemPrice * item.quantity,
              };
            }),
            total: getTotalPrice(),
            pickupDate: formatDate(pickupDate),
            pickupTime,
          }),
        });
      } catch (emailError) {
        console.error('E-Mail konnte nicht gesendet werden:', emailError);
        // Fehler nicht blockierend - Bestellung war erfolgreich
      }
      
      clearCart();
      
      // Navigiere zum Success Screen
      (navigation.navigate as any)('OrderSuccess', {
        customerInfo,
        pickupDate,
        pickupTime,
        orderNumber,
      });
      
    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Fehler', 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    }
  };

  const totalPrice = getTotalPrice().toFixed(2).replace('.', ',');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Zahlung</Text>
        <Text style={styles.headerSubtitle}>Wähle deine Zahlungsmethode</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Bestellübersicht */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bestellübersicht</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Artikel</Text>
              <Text style={styles.summaryValue}>{items.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Abholung</Text>
              <Text style={styles.summaryValue}>
                {pickupDate && `${formatDate(pickupDate)}`}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Uhrzeit</Text>
              <Text style={styles.summaryValue}>{pickupTime} Uhr</Text>
            </View>
            {customerInfo && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Name</Text>
                <Text style={styles.summaryValue}>
                  {customerInfo.firstName} {customerInfo.lastName}
                </Text>
              </View>
            )}
          </View>

              {/* Stripe Kreditkartenzahlung Info */}
              <View style={styles.stripeCard}>
                <View style={styles.stripeHeader}>
                  <View style={styles.stripeIconCircle}>
                    <Ionicons name="card" size={36} color={colors.white} />
                  </View>
                  <View style={styles.stripeHeaderText}>
                    <Text style={styles.stripeTitle}>Sichere Zahlung</Text>
                    <Text style={styles.stripeSubtitle}>Kreditkarte via Stripe</Text>
                  </View>
                </View>

                <View style={styles.stripeDivider} />

                <View style={styles.stripeFeatures}>
                  <View style={styles.featureItem}>
                    <Ionicons name="shield-checkmark" size={20} color={colors.primary} />
                    <Text style={styles.featureText}>SSL-verschlüsselt</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons name="lock-closed" size={20} color={colors.primary} />
                    <Text style={styles.featureText}>PCI-konform</Text>
                  </View>
                  <View style={styles.featureItem}>
                    <Ionicons name="card" size={20} color={colors.primary} />
                    <Text style={styles.featureText}>Alle Kreditkarten</Text>
                  </View>
                </View>
              </View>

          {/* Hinweis */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
            <Text style={styles.infoCardText}>
              Du wirst zum sicheren Stripe-Zahlungsformular weitergeleitet. Deine Kartendaten werden verschlüsselt übertragen.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Zu zahlen</Text>
          <Text style={styles.totalPrice}>{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={[styles.orderButton, isProcessing && styles.orderButtonDisabled]}
          onPress={handlePayment}
          activeOpacity={0.8}
          disabled={isProcessing}
        >
              {isProcessing ? (
                <>
                  <Ionicons name="hourglass" size={24} color={colors.white} />
                  <Text style={styles.orderButtonText}>Verarbeite Zahlung...</Text>
                </>
              ) : (
                <>
                  <Ionicons name="card" size={24} color={colors.white} />
                  <Text style={styles.orderButtonText}>Jetzt bezahlen</Text>
                </>
              )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
  header: {
    backgroundColor: colors.black,
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 65,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 18,
    color: colors.primary,
    marginTop: 5,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 200,
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: colors.black,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: colors.lightGray,
  },
  summaryValue: {
    fontSize: 15,
    color: colors.white,
    fontFamily: 'Georgia',
    fontWeight: '300',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.lightGray,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.darkGray,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.mediumGray,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.mediumGray,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: colors.white,
  },
  eyeButton: {
    padding: 16,
  },
  forgotPassword: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
  },
  stripeCard: {
    backgroundColor: colors.black,
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  stripeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  stripeIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stripeHeaderText: {
    flex: 1,
  },
  stripeTitle: {
    fontSize: 22,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 4,
  },
  stripeSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
  },
  stripeDivider: {
    height: 1,
    backgroundColor: colors.darkGray,
    marginBottom: 20,
  },
  stripeFeatures: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 15,
    color: colors.lightGray,
  },
  registerCard: {
    backgroundColor: colors.black,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  registerContent: {
    flex: 1,
  },
  registerTitle: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 4,
  },
  registerSubtitle: {
    fontSize: 13,
    color: colors.lightGray,
  },
  infoCard: {
    backgroundColor: colors.black,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  infoCardText: {
    flex: 1,
    fontSize: 14,
    color: colors.lightGray,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 85,
    left: 0,
    right: 0,
    backgroundColor: colors.black,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.darkGray,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    color: colors.lightGray,
    fontFamily: 'Georgia',
  },
  totalPrice: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.primary,
    fontFamily: 'Georgia',
  },
  orderButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  orderButtonDisabled: {
    backgroundColor: colors.mediumGray,
  },
  orderButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
});

