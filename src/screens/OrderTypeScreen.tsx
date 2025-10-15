import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import colors from '../theme/colors';

export default function OrderTypeScreen() {
  const navigation = useNavigation();
  const { getTotalPrice } = useCart();

  const handleGuestPress = () => {
    (navigation.navigate as any)('GuestCheckout');
  };

  const handleLoginPress = () => {
    (navigation.navigate as any)('LoginCheckout');
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
        <Text style={styles.headerTitle}>Bestellart</Text>
        <Text style={styles.headerSubtitle}>Wie möchtest du bestellen?</Text>
      </View>

      <View style={styles.content}>
        {/* Login Card - Groß */}
        <TouchableOpacity
          style={styles.loginCard}
          activeOpacity={0.8}
          onPress={handleLoginPress}
        >
          <View style={styles.iconCircleLarge}>
            <Ionicons name="person" size={48} color={colors.white} />
          </View>
          <Text style={styles.loginTitle}>Login</Text>
          <Text style={styles.loginSubtitle}>Schneller bestellen mit deinem Account</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              <Text style={styles.benefitText}>Bestellhistorie einsehen</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              <Text style={styles.benefitText}>Gespeicherte Daten</Text>
            </View>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              <Text style={styles.benefitText}>Treuepunkte sammeln</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Gast Card - Klein */}
        <TouchableOpacity
          style={styles.guestCard}
          activeOpacity={0.8}
          onPress={handleGuestPress}
        >
          <View style={styles.guestContent}>
            <Ionicons name="walk" size={32} color={colors.lightGray} />
            <View style={styles.guestTextContainer}>
              <Text style={styles.guestTitle}>Als Gast fortfahren</Text>
              <Text style={styles.guestSubtitle}>Schnell und unkompliziert</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.mediumGray} />
        </TouchableOpacity>

        {/* Preis Info */}
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Gesamtbetrag</Text>
          <Text style={styles.priceValue}>{totalPrice}</Text>
        </View>
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
  content: {
    padding: 16,
    flex: 1,
  },
  loginCard: {
    backgroundColor: colors.black,
    padding: 32,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  iconCircleLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 15,
    color: colors.lightGray,
    textAlign: 'center',
    marginBottom: 24,
  },
  benefitsList: {
    width: '100%',
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 15,
    color: colors.lightGray,
  },
  guestCard: {
    backgroundColor: colors.black,
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  guestContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  guestTextContainer: {
    flex: 1,
  },
  guestTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 4,
  },
  guestSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
  },
  priceCard: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 100,
  },
  priceLabel: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
  },
});

