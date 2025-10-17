import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import colors from '../theme/colors';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { signUp } = useAuth();
  const { fromCheckout } = (route.params as any) || {};
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Refs für Auto-Focus
  const monthInputRef = useRef<TextInput>(null);
  const yearInputRef = useRef<TextInput>(null);

  // Animation für Success Screen
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showSuccess) {
      // Scale und Fade Animation
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Nach 2 Sekunden automatisch zurück zur Anmeldung
      const timeout = setTimeout(() => {
        navigation.goBack();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [showSuccess]);

  const handleDayChange = (text: string) => {
    const numbers = text.replace(/[^\d]/g, '');
    setBirthDay(numbers);
    
    // Auto-focus zum Monat nach 2 Ziffern
    if (numbers.length === 2) {
      monthInputRef.current?.focus();
    }
  };

  const handleMonthChange = (text: string) => {
    const numbers = text.replace(/[^\d]/g, '');
    setBirthMonth(numbers);
    
    // Auto-focus zum Jahr nach 2 Ziffern
    if (numbers.length === 2) {
      yearInputRef.current?.focus();
    }
  };

  const handleYearChange = (text: string) => {
    const numbers = text.replace(/[^\d]/g, '');
    setBirthYear(numbers);
  };

  const handleRegister = async () => {
    setErrorMessage(''); // Reset error
    
    // Validation
    if (!firstName || !lastName || !email || !birthDay || !birthMonth || !birthYear || !password) {
      setErrorMessage('Bitte fülle alle Felder aus');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }

    // Validate birth date
    if (birthDay.length !== 2 || birthMonth.length !== 2 || birthYear.length !== 4) {
      setErrorMessage('Bitte gib ein vollständiges Geburtsdatum ein');
      return;
    }

    // Kombiniere das Datum im Format TT.MM.JJJJ für Anzeige
    const birthDateDisplay = `${birthDay}.${birthMonth}.${birthYear}`;
    
    // Konvertiere zu YYYY-MM-DD für Datenbank
    const birthDateISO = `${birthYear}-${birthMonth}-${birthDay}`;

    setLoading(true);
    const { error, userId } = await signUp(email, password, firstName, lastName, birthDateISO);
    setLoading(false);

    if (error) {
      console.log('Register error:', error);
      
      // Verschiedene Supabase Error Messages
      if (error.message.includes('already registered') || 
          error.message.includes('User already registered') ||
          error.message.includes('duplicate') ||
          error.message.includes('already exists')) {
        setErrorMessage('Diese E-Mail ist bereits registriert. Bitte melde dich an.');
      } else if (error.message.includes('invalid email')) {
        setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein');
      } else if (error.message.includes('Password')) {
        setErrorMessage('Passwort ist zu schwach. Verwende mindestens 6 Zeichen.');
      } else {
        setErrorMessage(error.message || 'Ein Fehler ist aufgetreten');
      }
      return;
    }

    // Sende Verification E-Mail (nicht blockierend)
    try {
      await fetch('https://moggi-app-production.up.railway.app/send-verification-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          userId,
        }),
      });
    } catch (emailError) {
      console.log('Verification E-Mail konnte nicht gesendet werden:', emailError);
      // Fehler nicht blockierend
    }

    // Erfolg! Navigiere zu Verify Screen mit Passwort für Auto-Login
    (navigation.navigate as any)('VerifyEmail', {
      email,
      userId,
      firstName,
      password, // Für Auto-Login nach Verifizierung
      fromCheckout, // Flag ob vom Checkout aufgerufen
    });
  };

  return (
    <View style={styles.container}>
      {/* Success Overlay */}
      {showSuccess && (
        <Animated.View 
          style={[
            styles.successOverlay,
            {
              opacity: fadeAnim,
            }
          ]}
        >
          <Animated.View
            style={[
              styles.successCard,
              {
                transform: [{ scale: scaleAnim }],
              }
            ]}
          >
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={80} color={colors.primary} />
            </View>
            <Text style={styles.successTitle}>Registrierung erfolgreich!</Text>
            <Text style={styles.successMessage}>
              Dein Konto wurde erstellt.{'\n'}Du wirst zur Anmeldung weitergeleitet...
            </Text>
          </Animated.View>
        </Animated.View>
      )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrieren</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Welcome Text */}
            <Text style={styles.title}>Konto erstellen</Text>
            <Text style={styles.subtitle}>Registriere dich für exklusive Vorteile</Text>

            {/* Error Message */}
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={20} color="#FF3B30" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Register Form */}
            <View style={styles.form}>
              {/* First Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Vorname</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Max"
                    placeholderTextColor={colors.mediumGray}
                    value={firstName}
                    onChangeText={setFirstName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              {/* Last Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nachname</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Mustermann"
                    placeholderTextColor={colors.mediumGray}
                    value={lastName}
                    onChangeText={setLastName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>E-Mail</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="deine@email.com"
                    placeholderTextColor={colors.mediumGray}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
              </View>

              {/* Birth Date */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Geburtsdatum</Text>
                <View style={styles.dateInputRow}>
                  <View style={styles.dateInputWrapper}>
                    <TextInput
                      style={styles.dateInput}
                      placeholder="TT"
                      placeholderTextColor={colors.mediumGray}
                      value={birthDay}
                      onChangeText={handleDayChange}
                      keyboardType="numeric"
                      maxLength={2}
                      textAlign="center"
                    />
                  </View>
                  <Text style={styles.dateSeparator}>.</Text>
                  <View style={styles.dateInputWrapper}>
                    <TextInput
                      ref={monthInputRef}
                      style={styles.dateInput}
                      placeholder="MM"
                      placeholderTextColor={colors.mediumGray}
                      value={birthMonth}
                      onChangeText={handleMonthChange}
                      keyboardType="numeric"
                      maxLength={2}
                      textAlign="center"
                    />
                  </View>
                  <Text style={styles.dateSeparator}>.</Text>
                  <View style={styles.dateInputWrapperYear}>
                    <TextInput
                      ref={yearInputRef}
                      style={styles.dateInput}
                      placeholder="JJJJ"
                      placeholderTextColor={colors.mediumGray}
                      value={birthYear}
                      onChangeText={handleYearChange}
                      keyboardType="numeric"
                      maxLength={4}
                      textAlign="center"
                    />
                  </View>
                </View>
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Passwort</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={colors.mediumGray}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={colors.mediumGray}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Register Button */}
              <TouchableOpacity
                style={[styles.registerButton, loading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                activeOpacity={0.8}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <>
                    <Text style={styles.registerButtonText}>Konto erstellen</Text>
                    <Ionicons name="arrow-forward" size={20} color={colors.white} />
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Terms */}
            <Text style={styles.termsText}>
              Mit der Registrierung akzeptierst du unsere{' '}
              <Text style={styles.termsLink}>Nutzungsbedingungen</Text>
              {' '}und{' '}
              <Text style={styles.termsLink}>Datenschutzrichtlinien</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: colors.lightGray,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30' + '15',
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '500',
  },
  form: {
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.white,
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkGray,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: colors.white,
  },
  dateInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateInputWrapper: {
    flex: 1,
    backgroundColor: colors.black,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkGray,
    height: 48,
    justifyContent: 'center',
  },
  dateInputWrapperYear: {
    flex: 1.5,
    backgroundColor: colors.black,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkGray,
    height: 48,
    justifyContent: 'center',
  },
  dateInput: {
    fontSize: 15,
    color: colors.white,
    paddingHorizontal: 8,
  },
  dateSeparator: {
    fontSize: 18,
    color: colors.mediumGray,
    fontWeight: '600',
  },
  eyeIcon: {
    padding: 8,
  },
  registerButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  termsText: {
    fontSize: 12,
    color: colors.mediumGray,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '500',
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  successCard: {
    backgroundColor: colors.black,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    maxWidth: 320,
    marginHorizontal: 20,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    textAlign: 'center',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 15,
    color: colors.lightGray,
    textAlign: 'center',
    lineHeight: 22,
  },
});

