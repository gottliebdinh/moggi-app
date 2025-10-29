import React, { useState, useEffect } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Toast from '../components/Toast';
import colors from '../theme/colors';

export default function ProfileEditScreen() {
  const navigation = useNavigation();
  const { user, updateProfile } = useAuth();
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.user_metadata?.first_name || '');
      setLastName(user.user_metadata?.last_name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      Alert.alert(t('profile.error'), t('profile.fillAllFields'));
      return;
    }

    if (!email.includes('@')) {
      Alert.alert(t('profile.error'), t('profile.invalidEmail'));
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim()
      });

      if (error) {
        Alert.alert(t('profile.error'), error.message || t('profile.unexpectedError'));
        return;
      }

      setShowSuccessToast(true);
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      Alert.alert(t('profile.error'), t('profile.unexpectedError'));
    } finally {
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Success Toast */}
      {showSuccessToast && (
        <Toast 
          message={t('profile.saveSuccess')}
          type="success"
          onHide={() => setShowSuccessToast(false)}
        />
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
        <Text style={styles.headerTitle}>{t('profile.edit')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Profile Info Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={colors.white} />
            </View>
            <Text style={styles.profileTitle}>{t('profile.personalData')}</Text>
            <Text style={styles.profileSubtitle}>{t('profile.updateInfo')}</Text>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('profile.firstName')}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={colors.mediumGray} />
                <TextInput
                  style={styles.textInput}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder={t('profile.firstNamePlaceholder')}
                  placeholderTextColor={colors.mediumGray}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('profile.lastName')}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={colors.mediumGray} />
                <TextInput
                  style={styles.textInput}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder={t('profile.lastNamePlaceholder')}
                  placeholderTextColor={colors.mediumGray}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('profile.email')}</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={colors.mediumGray} />
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t('profile.emailPlaceholder')}
                  placeholderTextColor={colors.mediumGray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <>
                  <Ionicons name="checkmark" size={20} color={colors.white} />
                  <Text style={styles.saveButtonText}>{t('profile.save')}</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Info Text */}
          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={20} color={colors.primary} />
              <Text style={styles.infoText}>
                {t('profile.emailInfo')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
  header: {
    backgroundColor: colors.black,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'Georgia',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  content: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 8,
  },
  profileSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
    textAlign: 'center',
  },
  formSection: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
    fontFamily: 'Georgia',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.mediumGray + '30',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.white,
    marginLeft: 12,
  },
  buttonSection: {
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.lightGray,
    marginLeft: 12,
    lineHeight: 20,
  },
});
