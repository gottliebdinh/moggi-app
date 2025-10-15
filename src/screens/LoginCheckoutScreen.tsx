import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import colors from '../theme/colors';

export default function LoginCheckoutScreen() {
  const navigation = useNavigation();
  const { getTotalPrice } = useCart();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Fehler', 'Bitte fülle alle Felder aus');
      return;
    }
    
    if (!email.includes('@')) {
      Alert.alert('Fehler', 'Bitte gib eine gültige E-Mail-Adresse ein');
      return;
    }
    
    // Hier würde die echte Login-Logik kommen
    Alert.alert(
      'Login',
      'Login-Funktion wird noch implementiert.\n\nFür jetzt: Nutze bitte die Gast-Bestellung.',
      [
        {
          text: 'Zurück',
          onPress: () => navigation.goBack()
        }
      ]
    );
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
        <Text style={styles.headerTitle}>Login</Text>
        <Text style={styles.headerSubtitle}>Melde dich an</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Anmeldung</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>E-Mail / Benutzername</Text>
              <TextInput
                style={styles.input}
                placeholder="max@example.com"
                placeholderTextColor={colors.mediumGray}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Passwort</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor={colors.mediumGray}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color={colors.mediumGray}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
              <Text style={styles.forgotPasswordText}>Passwort vergessen?</Text>
            </TouchableOpacity>
          </View>

          {/* Registrieren */}
          <View style={styles.registerCard}>
            <Ionicons name="person-add" size={24} color={colors.primary} />
            <View style={styles.registerContent}>
              <Text style={styles.registerTitle}>Noch kein Account?</Text>
              <Text style={styles.registerSubtitle}>Erstelle jetzt kostenlos einen Account</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.mediumGray} />
          </View>

          {/* Info */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
            <Text style={styles.infoCardText}>
              Mit einem Account kannst du deine Bestellhistorie einsehen, Favoriten speichern und Treuepunkte sammeln.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Gesamt</Text>
          <Text style={styles.totalPrice}>{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Ionicons name="log-in" size={24} color={colors.white} />
          <Text style={styles.loginButtonText}>Einloggen & Fortfahren</Text>
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
  loginButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
});

