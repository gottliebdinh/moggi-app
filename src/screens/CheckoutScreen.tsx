import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import colors from '../theme/colors';

type TimeSlot = {
  date: Date;
  time: string;
  available: boolean;
};

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const { getTotalPrice, clearCart } = useCart();
  const [isGuest, setIsGuest] = useState(true);
  
  // Gast-Daten
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  
  // Abholzeit
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    generateAvailableDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots(selectedDate);
    }
  }, [selectedDate]);

  const generateAvailableDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Montag überspringen (Ruhetag)
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
    
    // Dienstag - Mittwoch (2, 3)
    if (dayOfWeek >= 2 && dayOfWeek <= 3) {
      // Mittagsservice: 11:30 - 14:30
      addTimeSlots(slots, 11, 30, 14, 30);
      // Abendservice: 17:30 - 23:00
      addTimeSlots(slots, 17, 30, 23, 0);
    }
    // Donnerstag (4)
    else if (dayOfWeek === 4) {
      // Mittagsservice: 11:30 - 14:30
      addTimeSlots(slots, 11, 30, 14, 30);
      // Abendservice: 17:30 - 02:00
      addTimeSlots(slots, 17, 30, 26, 0); // 26:00 = 02:00 nächster Tag
    }
    // Freitag (5)
    else if (dayOfWeek === 5) {
      // Mittagsservice: 11:30 - 14:30
      addTimeSlots(slots, 11, 30, 14, 30);
      // Abendservice: 17:30 - 03:00
      addTimeSlots(slots, 17, 30, 27, 0); // 27:00 = 03:00 nächster Tag
    }
    // Samstag (6)
    else if (dayOfWeek === 6) {
      // Mittagsservice: 11:30 - 14:30
      addTimeSlots(slots, 11, 30, 14, 30);
      // Abendservice: 17:30 - 03:00
      addTimeSlots(slots, 17, 30, 27, 0);
    }
    // Sonntag (0)
    else if (dayOfWeek === 0) {
      // Nur Abendservice: 17:00 - 23:00
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
    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const day = days[date.getDay()];
    const dateStr = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}, ${dateStr}.${month}`;
  };

  const handlePlaceOrder = () => {
    if (isGuest) {
      if (!firstName || !lastName || !email) {
        Alert.alert('Fehler', 'Bitte fülle alle Felder aus');
        return;
      }
      
      if (!email.includes('@')) {
        Alert.alert('Fehler', 'Bitte gib eine gültige E-Mail-Adresse ein');
        return;
      }
    }
    
    if (!selectedDate || !selectedTime) {
      Alert.alert('Fehler', 'Bitte wähle eine Abholzeit');
      return;
    }
    
    const notesText = notes ? `\n\nNotizen: ${notes}` : '';
    Alert.alert(
      'Bestellung erfolgreich!',
      `Deine Bestellung wurde aufgegeben.\n\nAbholung: ${formatDate(selectedDate)} um ${selectedTime} Uhr${notesText}\n\nWir freuen uns auf deinen Besuch!`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Home' as never);
          }
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
        <Text style={styles.headerTitle}>Bestellung</Text>
        <Text style={styles.headerSubtitle}>Fast geschafft!</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Gast oder Login Toggle */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bestellart</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, isGuest && styles.toggleButtonActive]}
                onPress={() => setIsGuest(true)}
                activeOpacity={0.7}
              >
                <Text style={[styles.toggleText, isGuest && styles.toggleTextActive]}>
                  Gast
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, !isGuest && styles.toggleButtonActive]}
                onPress={() => setIsGuest(false)}
                activeOpacity={0.7}
              >
                <Text style={[styles.toggleText, !isGuest && styles.toggleTextActive]}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Gast-Formular */}
          {isGuest ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Deine Daten</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Vorname</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Max"
                  placeholderTextColor={colors.mediumGray}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nachname</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Mustermann"
                  placeholderTextColor={colors.mediumGray}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>E-Mail</Text>
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
          ) : (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Login</Text>
              <Text style={styles.infoText}>Login-Funktion kommt bald...</Text>
            </View>
          )}

          {/* Datum auswählen */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Abholdatum</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateScrollContainer}
            >
              {availableDates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateButton,
                    selectedDate?.toDateString() === date.toDateString() && styles.dateButtonActive
                  ]}
                  onPress={() => setSelectedDate(date)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.dateText,
                    selectedDate?.toDateString() === date.toDateString() && styles.dateTextActive
                  ]}>
                    {formatDate(date)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Zeit auswählen */}
          {selectedDate && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Abholzeit</Text>
              <View style={styles.timeGrid}>
                {availableTimeSlots.map((time, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeButton,
                      selectedTime === time && styles.timeButtonActive
                    ]}
                    onPress={() => setSelectedTime(time)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.timeText,
                      selectedTime === time && styles.timeTextActive
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Notizen - für alle */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notizen</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Besondere Wünsche</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="z.B. ohne Zwiebeln, extra scharf, Allergien..."
                placeholderTextColor={colors.mediumGray}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Hinweis */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color={colors.primary} />
            <Text style={styles.infoCardText}>
              Die Bestellung wird frisch für dich zubereitet. Bitte sei pünktlich zur Abholzeit.
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
          style={styles.orderButton}
          onPress={handlePlaceOrder}
          activeOpacity={0.8}
        >
          <Ionicons name="checkmark-circle" size={24} color={colors.white} />
          <Text style={styles.orderButtonText}>Bestellung aufgeben</Text>
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
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    fontSize: 16,
    color: colors.lightGray,
  },
  toggleTextActive: {
    color: colors.white,
    fontWeight: '600',
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
  infoText: {
    fontSize: 15,
    color: colors.lightGray,
    textAlign: 'center',
    paddingVertical: 20,
  },
  dateScrollContainer: {
    gap: 12,
  },
  dateButton: {
    backgroundColor: colors.darkGray,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.mediumGray,
  },
  dateButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateText: {
    fontSize: 15,
    color: colors.lightGray,
  },
  dateTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    backgroundColor: colors.darkGray,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    minWidth: '30%',
    alignItems: 'center',
  },
  timeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeText: {
    fontSize: 15,
    color: colors.lightGray,
  },
  timeTextActive: {
    color: colors.white,
    fontWeight: '600',
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
  orderButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
});



