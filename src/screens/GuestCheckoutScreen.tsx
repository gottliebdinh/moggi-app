import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import colors from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';

export default function GuestCheckoutScreen() {
  const navigation = useNavigation();
  const { getTotalPrice } = useCart();
  const { user } = useAuth();
  const { t, language, getShortWeekdayNames } = useLanguage();
  
  // Debug: User Status prüfen
  console.log('GuestCheckoutScreen - User:', user ? 'Eingeloggt' : 'Gast');
  console.log('GuestCheckoutScreen - User Email:', user?.email);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [initialUserState] = useState(user); // Speichere initialen User-State

  useEffect(() => {
    generateAvailableDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots(selectedDate);
    }
  }, [selectedDate]);

  // Bei Auth-Änderungen: zurück zum Warenkorb
  useEffect(() => {
    // Wenn User sich ausloggt während er auf diesem Screen ist
    if (initialUserState && !user) {
      console.log('GuestCheckoutScreen - User logged out, navigating back');
      navigation.reset({
        index: 0,
        routes: [{ name: 'CartMain' as never }],
      });
    }
  }, [user]);

  const generateAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      if (date.getDay() !== 1) {
        dates.push(date);
      }
    }
    
    setAvailableDates(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  };

  const generateTimeSlots = (date: Date) => {
    const dayOfWeek = date.getDay();
    const slots: string[] = [];
    
    if (dayOfWeek >= 2 && dayOfWeek <= 3) {
      addTimeSlots(slots, 11, 30, 14, 30);
      addTimeSlots(slots, 17, 30, 23, 0);
    }
    else if (dayOfWeek === 4) {
      addTimeSlots(slots, 11, 30, 14, 30);
      addTimeSlots(slots, 17, 30, 26, 0);
    }
    else if (dayOfWeek === 5 || dayOfWeek === 6) {
      addTimeSlots(slots, 11, 30, 14, 30);
      addTimeSlots(slots, 17, 30, 27, 0);
    }
    else if (dayOfWeek === 0) {
      addTimeSlots(slots, 17, 0, 23, 0);
    }
    
    setAvailableTimeSlots(slots);
    setSelectedTime(null);
  };

  const addTimeSlots = (slots: string[], startHour: number, startMin: number, endHour: number, endMin: number) => {
    let hour = startHour;
    let min = startMin;
    
    while (hour < endHour || (hour === endHour && min <= endMin)) {
      const displayHour = hour >= 24 ? hour - 24 : hour;
      const timeString = `${displayHour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      slots.push(timeString);
      
      min += 30;
      if (min >= 60) {
        min = 0;
        hour += 1;
      }
    }
  };

  const formatDate = (date: Date) => {
    const days = getShortWeekdayNames();
    const day = days[date.getDay()];
    const dateStr = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}, ${dateStr}.${month}`;
  };

  const handleContinue = () => {
    // Validierung nur für Gäste (persönliche Daten)
    if (!user) {
      if (!firstName || !lastName || !email) {
        Alert.alert(t('common.error'), t('login.fillAllFields'));
        return;
      }
      
      if (!email.includes('@')) {
        Alert.alert(t('common.error'), t('checkout.invalidEmail'));
        return;
      }
    }
    
    // Abholzeit-Validierung für alle
    if (!selectedDate || !selectedTime) {
      Alert.alert(t('common.error'), t('checkout.selectTimeFirst'));
      return;
    }
    
    // Zu Stripe Payment
    // Für eingeloggte User: customerInfo aus user-Daten
    // Für Gäste: customerInfo aus Formular
    (navigation.navigate as any)('Payment', {
      customerInfo: user ? {
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        email: user.email || ''
      } : {
        firstName,
        lastName,
        email
      },
      pickupDate: selectedDate,
      pickupTime: selectedTime,
      notes: notes
    });
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
        <Text style={styles.headerTitle}>{user ? t('checkout.pickupTime') : t('checkout.guestData')}</Text>
        <Text style={styles.headerSubtitle}>{user ? t('reservation.selectTime') : t('register.subtitle')}</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Kontaktdaten - nur für Gäste */}
          {!user && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('checkout.guestData')}</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('profile.firstName')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Max"
                  placeholderTextColor={colors.mediumGray}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('profile.lastName')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Mustermann"
                  placeholderTextColor={colors.mediumGray}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{t('register.email')}</Text>
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
            </View>
          )}

          {/* Notizen - für alle */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('checkout.notes')}</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('reservation.notes')}</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder={t('reservation.notes')}
                placeholderTextColor={colors.mediumGray}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Abholdatum */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('orderSuccess.pickup')}</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('reservation.selectDate')}</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                activeOpacity={0.7}
              >
                <Text style={selectedDate ? styles.dropdownTriggerTextSelected : styles.dropdownTriggerText}>
                  {selectedDate ? formatDate(selectedDate) : t('reservation.selectDate')}
                </Text>
                <Ionicons
                  name={isDateDropdownOpen ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color={colors.mediumGray}
                />
              </TouchableOpacity>
              
              {isDateDropdownOpen && (
                <ScrollView style={styles.dropdownContainer} nestedScrollEnabled>
                  {availableDates.map((date, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dropdownOption,
                        selectedDate?.toDateString() === date.toDateString() && styles.dropdownOptionActive
                      ]}
                      onPress={() => {
                        setSelectedDate(date);
                        setIsDateDropdownOpen(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[
                        styles.dropdownText,
                        selectedDate?.toDateString() === date.toDateString() && styles.dropdownTextActive
                      ]}>
                        {formatDate(date)}
                      </Text>
                      {selectedDate?.toDateString() === date.toDateString() && (
                        <Ionicons name="checkmark" size={20} color={colors.primary} />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Abholzeit */}
            {selectedDate && (
              <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('reservation.selectTime')}</Text>
                <TouchableOpacity
                  style={styles.dropdownTrigger}
                  onPress={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                  activeOpacity={0.7}
                >
                  <Text style={selectedTime ? styles.dropdownTriggerTextSelected : styles.dropdownTriggerText}>
                    {selectedTime ? (() => {
                      const timeUnit = t('checkout.timeUnit');
                      return `${selectedTime}${timeUnit && timeUnit !== 'checkout.timeUnit' ? ` ${timeUnit}` : ''}`;
                    })() : t('checkout.selectTimePlaceholder')}
                  </Text>
                  <Ionicons
                    name={isTimeDropdownOpen ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={colors.mediumGray}
                  />
                </TouchableOpacity>
                
                {isTimeDropdownOpen && (
                  <ScrollView style={styles.dropdownContainer} nestedScrollEnabled>
                    {availableTimeSlots.map((time, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dropdownOption,
                          selectedTime === time && styles.dropdownOptionActive
                        ]}
                        onPress={() => {
                          setSelectedTime(time);
                          setIsTimeDropdownOpen(false);
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={[
                          styles.dropdownText,
                          selectedTime === time && styles.dropdownTextActive
                        ]}>
                          {(() => {
                            const timeUnit = t('checkout.timeUnit');
                            return `${time}${timeUnit && timeUnit !== 'checkout.timeUnit' ? ` ${timeUnit}` : ''}`;
                          })()}
                        </Text>
                        {selectedTime === time && (
                          <Ionicons name="checkmark" size={20} color={colors.primary} />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>
            )}
          </View>

          {/* Hinweis */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
            <Text style={styles.infoCardText}>
              {t('checkout.pickupInfo')}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>{t('cart.total')}</Text>
          <Text style={styles.totalPrice}>{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>{t('checkout.continuePayment')}</Text>
          <Ionicons name="arrow-forward" size={24} color={colors.white} />
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
  dropdownTrigger: {
    backgroundColor: colors.darkGray,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTriggerText: {
    fontSize: 16,
    color: colors.mediumGray,
  },
  dropdownTriggerTextSelected: {
    fontSize: 16,
    color: colors.white,
  },
  dropdownContainer: {
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    marginTop: 8,
    maxHeight: 180,
  },
  dropdownOption: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownOptionActive: {
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
  },
  dropdownText: {
    fontSize: 15,
    color: colors.lightGray,
  },
  dropdownTextActive: {
    color: colors.white,
    fontWeight: '500',
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
  continueButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
});

