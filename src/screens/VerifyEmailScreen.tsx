import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';
import colors from '../theme/colors';

export default function VerifyEmailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { signIn } = useAuth();
  const { email, userId, firstName, password, fromCheckout } = route.params as any;
  
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [verified, setVerified] = useState(false);
  const codeInputRef = useRef<TextInput>(null);

  // Auto-submit wenn 6 Ziffern eingegeben
  useEffect(() => {
    if (code.length === 6 && !loading && !verified) {
      // Tastatur schließen
      Keyboard.dismiss();
      // Automatisch verifizieren
      setTimeout(() => {
        handleVerify();
      }, 300); // Kurze Verzögerung damit Tastatur sich schließen kann
    }
  }, [code]);

  // Warne User wenn er Screen verlassen will
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Wenn bereits verifiziert, erlaube Navigation
      if (verified) {
        return;
      }

      // Verhindere Navigation
      e.preventDefault();

      // Zeige Warnung
      Alert.alert(
        'Registrierung abbrechen?',
        'Wenn du jetzt abbrichst, musst du dich neu registrieren. Der unbestätigte Account wird gelöscht.',
        [
          { text: 'Hier bleiben', style: 'cancel' },
          {
            text: 'Abbrechen',
            style: 'destructive',
            onPress: async () => {
              // Lösche den unbestätigten User aus Supabase
              // TODO: API Endpoint zum Löschen unbestätigter User
              console.log('User bricht Verifizierung ab');
              navigation.dispatch(e.data.action);
            },
          },
        ]
      );
    });

    return unsubscribe;
  }, [navigation, verified]);

  const handleVerify = async () => {
    setErrorMessage('');
    
    if (!code || code.length !== 6) {
      setErrorMessage('Bitte gib den 6-stelligen Code ein');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://moggi-app-production.up.railway.app/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code,
          userId,
          firstName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setErrorMessage(data.error || 'Ungültiger Code');
        return;
      }

      // Code ist gültig - markiere User in Supabase als verifiziert
      try {
        await supabase
          .from('profiles')
          .update({ email_verified: true })
          .eq('id', userId);
        
        console.log('✅ User in Supabase als verifiziert markiert');
      } catch (dbError) {
        console.log('⚠️ Konnte Supabase nicht updaten:', dbError);
      }

      setVerified(true); // Markiere als verifiziert für beforeRemove listener

      // Erfolg - automatisch anmelden
      setSuccessMessage('E-Mail bestätigt! Melde dich an...');
      
      // Kurze Pause, dann automatisch anmelden
      setTimeout(async () => {
        if (password) {
          // Automatisch anmelden mit gespeichertem Passwort
          // Dies erstellt die Session erst NACH erfolgreicher Verifizierung
          const signInResult = await signIn(email, password);
          
          if (signInResult.error) {
            // Falls Login fehlschlägt, zeige Fehler
            setLoading(false);
            setErrorMessage('Anmeldung fehlgeschlagen. Bitte melde dich manuell an.');
            setSuccessMessage('');
            return;
          }
          
          // Navigation abhängig vom Kontext
          if (fromCheckout) {
            // Vom Checkout: Weiter zur Abholzeit
            (navigation.navigate as any)('GuestCheckout');
          } else {
            // Vom Account: Zurück zum Account mit Toast
            navigation.reset({
              index: 0,
              routes: [{ name: 'AccountMain' as never, params: { showLoginSuccess: true } }],
            });
          }
        } else {
          // Kein Passwort gespeichert - zurück zum Login
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' as never }],
          });
        }
      }, 1500);

    } catch (error) {
      setLoading(false);
      setErrorMessage('Ein Fehler ist aufgetreten');
    }
  };

  const handleResendCode = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    
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
      
      setSuccessMessage('Neuer Code wurde gesendet!');
      
      // Clear success message nach 3 Sekunden
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
    } catch (error) {
      setErrorMessage('Code konnte nicht erneut gesendet werden');
    }
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
        <Text style={styles.headerTitle}>E-Mail bestätigen</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="mail" size={40} color={colors.white} />
          </View>
        </View>

        <Text style={styles.title}>Code eingeben</Text>
        <Text style={styles.subtitle}>
          Wir haben einen 6-stelligen Code an{'\n'}
          <Text style={styles.emailText}>{email}</Text>{'\n'}
          gesendet.
        </Text>

        {/* Warning */}
        <View style={styles.warningCard}>
          <Ionicons name="warning" size={20} color="#FF6B00" />
          <Text style={styles.warningText}>
            Wichtig: Schließe diesen Screen nicht! Bei Verlassen musst du dich neu registrieren.
          </Text>
        </View>

        {/* Error Message */}
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="#FF3B30" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* Success Message */}
        {successMessage ? (
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        ) : null}

        {/* Code Input */}
        <View style={styles.codeInputContainer}>
          <TextInput
            ref={codeInputRef}
            style={styles.codeInput}
            placeholder="000000"
            placeholderTextColor={colors.mediumGray}
            value={code}
            onChangeText={(text) => setCode(text.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad"
            maxLength={6}
            textAlign="center"
            editable={!successMessage}
            autoFocus={true}
          />
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.verifyButton, (loading || successMessage) && styles.verifyButtonDisabled]}
          onPress={handleVerify}
          activeOpacity={0.8}
          disabled={loading || !!successMessage}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color={colors.white} />
              <Text style={styles.verifyButtonText}>Bestätigen</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Resend Code */}
        {!successMessage && (
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendCode}
            activeOpacity={0.7}
          >
            <Text style={styles.resendText}>Code erneut senden</Text>
          </TouchableOpacity>
        )}
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
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: colors.lightGray,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  emailText: {
    color: colors.primary,
    fontWeight: '500',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30' + '15',
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    gap: 8,
    width: '100%',
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '500',
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '15',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    gap: 8,
    width: '100%',
  },
  successText: {
    flex: 1,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  codeInputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  codeInput: {
    backgroundColor: colors.black,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 20,
    fontSize: 32,
    color: colors.white,
    fontFamily: 'monospace',
    fontWeight: '600',
    letterSpacing: 8,
  },
  verifyButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    width: '100%',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  verifyButtonDisabled: {
    opacity: 0.6,
  },
  resendButton: {
    marginTop: 16,
    padding: 12,
  },
  resendText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '15',
    borderWidth: 1,
    borderColor: colors.primary + '40',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    gap: 10,
    width: '100%',
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    color: colors.white,
    lineHeight: 18,
  },
});

