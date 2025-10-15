import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../config/supabase';
import colors from '../theme/colors';

export default function VerifyEmailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, userId, firstName } = route.params as any;
  
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleVerify = async () => {
    setErrorMessage('');
    
    if (!code || code.length !== 6) {
      setErrorMessage('Bitte gib den 6-stelligen Code ein');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.178.74:3000/verify-email', {
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

      setLoading(false);

      // Erfolg
      setSuccessMessage('E-Mail erfolgreich bestätigt!');
      
      // Nach 2 Sekunden zurück zum Login
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' as never }],
        });
      }, 2000);

    } catch (error) {
      setLoading(false);
      setErrorMessage('Ein Fehler ist aufgetreten');
    }
  };

  const handleResendCode = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      await fetch('http://192.168.178.74:3000/send-verification-email', {
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
            style={styles.codeInput}
            placeholder="000000"
            placeholderTextColor={colors.mediumGray}
            value={code}
            onChangeText={(text) => setCode(text.replace(/[^0-9]/g, ''))}
            keyboardType="number-pad"
            maxLength={6}
            textAlign="center"
            editable={!successMessage}
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
    marginBottom: 32,
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
});

