import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import colors from '../theme/colors';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage(''); // Reset error
    
    if (!email || !password) {
      setErrorMessage(t('login.fillAllFields'));
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      // Spezifische Fehlermeldungen
      if (error.message.includes('Invalid login credentials')) {
        setErrorMessage(t('login.invalidCredentials'));
      } else if (error.message.includes('Email not confirmed')) {
        setErrorMessage(t('login.emailNotConfirmed'));
      } else {
        setErrorMessage(error.message || t('login.error'));
      }
      return;
    }

    // Erfolg! Zurück zum Account mit Toast
    // AccountScreen wird den Cart-Stack im Hintergrund resetten
    (navigation.navigate as any)('AccountMain', { showLoginSuccess: true });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('login.title')}</Text>
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
            {/* Error Message */}
            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={20} color="#FF3B30" />
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Login Form */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('login.sectionTitle')}</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('login.emailLabel')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t('login.emailPlaceholder')}
                  placeholderTextColor={colors.mediumGray}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('login.passwordLabel')}</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder={t('login.passwordPlaceholder')}
                    placeholderTextColor={colors.mediumGray}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
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

              {/* Passwort vergessen - vorerst deaktiviert (Deep Linking in Expo Go problematisch) */}
              {/* 
              <TouchableOpacity 
                style={styles.forgotPassword} 
                activeOpacity={0.7}
                onPress={() => (navigation.navigate as any)('ForgotPassword')}
              >
                <Text style={styles.forgotPasswordText}>Passwort vergessen?</Text>
              </TouchableOpacity>
              */}

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                activeOpacity={0.8}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <>
                    <Ionicons name="log-in" size={24} color={colors.white} />
                    <Text style={styles.loginButtonText}>{t('login.button')}</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Registrieren Card */}
            <TouchableOpacity
              style={styles.registerCard}
              onPress={() => (navigation.navigate as any)('Register')}
              activeOpacity={0.7}
            >
              <Ionicons name="person-add" size={24} color={colors.primary} />
              <View style={styles.registerContent}>
                <Text style={styles.registerTitle}>{t('login.noAccount')}</Text>
                <Text style={styles.registerSubtitle}>{t('login.registerNow')}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.mediumGray} />
            </TouchableOpacity>

            {/* Info */}
            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={24} color={colors.primary} />
              <Text style={styles.infoCardText}>
                {t('login.accountInfo')}
              </Text>
            </View>
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
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  content: {
    padding: 16,
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
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: colors.primary,
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
  loginButtonDisabled: {
    opacity: 0.6,
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
});


