import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Alert,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';
import { supabase } from '../config/supabase';
import { BACKEND_URL } from '../config/stripe';
// Native Date Picker
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function ReservationScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [dayPart, setDayPart] = useState('');
  const [monthPart, setMonthPart] = useState('');
  const [yearPart, setYearPart] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Hilfsfunktionen für Zeit-Berechnungen
  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  const minutesToTime = (minutes: number) => {
    const h = Math.floor(minutes / 60).toString().padStart(2, '0');
    const m = Math.floor(minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const loadTimeSlotsForDate = async (date: string) => {
    try {
      if (!date) return;
      // Exceptions: wenn geschlossen, leere Liste
      const { data: exceptionsData } = await supabase
        .from('exceptions')
        .select('date')
        .eq('date', date);
      if (exceptionsData && exceptionsData.length > 0) {
        setTimeSlots([]);
        return;
      }

      // Kapazitätsregeln laden
      const { data: rulesData } = await supabase
        .from('capacity_rules')
        .select('*');

      // Reservierungen für den Tag laden
      const { data: reservationsData } = await supabase
        .from('reservations')
        .select('time,status')
        .eq('date', date);

      const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
      const dayName = dayNames[new Date(date).getDay()];

      const applicableRules = (rulesData || []).filter((rule: any) => {
        try {
          const ruleDays = typeof rule.days === 'string' ? JSON.parse(rule.days) : rule.days;
          return Array.isArray(ruleDays) && ruleDays.includes(dayName);
        } catch {
          return false;
        }
      });

      if (applicableRules.length === 0) {
        setTimeSlots([]);
        return;
      }

      // Slots aus allen Regeln generieren und Availability anhand Reservierungen bestimmen
      const slotsSet = new Set<string>();
      const timeToCapacity: Record<string, number> = {};
      for (const rule of applicableRules) {
        const start = timeToMinutes(rule.start_time);
        const end = timeToMinutes(rule.end_time);
        const step = rule.interval_minutes || 30;
        for (let t = start; t <= end; t += step) {
          const ts = minutesToTime(t);
          slotsSet.add(ts);
          // Wenn mehrere Regeln greifen, nimm die maximale Kapazität
          timeToCapacity[ts] = Math.max(timeToCapacity[ts] || 0, Number(rule.capacity) || 0);
        }
      }

      const reservationsByTime: Record<string, number> = {};
      (reservationsData || []).forEach(r => {
        const key = r.time?.slice(0,5);
        if (!key) return;
        // Optional: nur aktive/platzierte Reservierungen zählen
        if (r.status && ['cancelled', 'storniert'].includes(String(r.status).toLowerCase())) return;
        reservationsByTime[key] = (reservationsByTime[key] || 0) + 1;
      });

      const computedSlots = Array.from(slotsSet)
        .sort()
        .map(time => {
          const capacity = timeToCapacity[time] ?? 0;
          const used = reservationsByTime[time] || 0;
          const available = capacity === 0 ? false : used < capacity;
          return { time, available } as TimeSlot;
        });

      setTimeSlots(computedSlots);
    } catch (e) {
      // Fallback: keine Slots
      setTimeSlots([]);
    }
  };

  useEffect(() => {
    // Setze heutiges Datum als Standard und lade Slots
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    setSelectedDate(dateString);
    const yyyy = today.getFullYear().toString();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setYearPart(yyyy);
    setMonthPart(mm);
    setDayPart(dd);
    loadTimeSlotsForDate(dateString);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadTimeSlotsForDate(selectedDate);
    }
  }, [selectedDate]);

  // Konvertiere YYYY-MM-DD zu DD.MM.YYYY für Anzeige
  const formatDateForDisplay = (isoDate: string) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
  };

  const handleDateChange = (date: string) => {
    // Konvertiere DD.MM.YYYY zu YYYY-MM-DD für interne Verarbeitung
    if (date.length === 10 && date.includes('.')) {
      const [day, month, year] = date.split('.');
      const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      setSelectedDate(isoDate);
    } else {
      setSelectedDate(date);
    }
    setSelectedTime(''); // Reset Zeit bei Datumsänderung
  };

  const recomputeSelectedDateFromParts = (d: string, m: string, y: string) => {
    if (d.length === 2 && m.length === 2 && y.length === 4) {
      setSelectedDate(`${y}-${m}-${d}`);
      setSelectedTime('');
    }
  };

  const onChangeDay = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '').slice(0, 2);
    setDayPart(cleaned);
    recomputeSelectedDateFromParts(cleaned.padStart(2, '0'), monthPart.padStart(2, '0'), yearPart);
  };

  const onChangeMonth = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '').slice(0, 2);
    setMonthPart(cleaned);
    recomputeSelectedDateFromParts(dayPart.padStart(2, '0'), cleaned.padStart(2, '0'), yearPart);
  };

  const onChangeYear = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '').slice(0, 4);
    setYearPart(cleaned);
    recomputeSelectedDateFromParts(dayPart.padStart(2, '0'), monthPart.padStart(2, '0'), cleaned);
  };

  const isTodaySelected = () => {
    if (!selectedDate) return false;
    const today = new Date();
    const [y, m, d] = selectedDate.split('-').map(Number);
    const selected = new Date(y, (m || 1) - 1, d || 1);
    return (
      today.getFullYear() === selected.getFullYear() &&
      today.getMonth() === selected.getMonth() &&
      today.getDate() === selected.getDate()
    );
  };

  const currentTimeHHMM = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  };


  const handleReservation = async () => {
    if (!fullName.trim()) {
      Alert.alert('Fehler', 'Bitte geben Sie Ihren vollständigen Namen ein.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Fehler', 'Bitte geben Sie Ihre E-Mail-Adresse ein.');
      return;
    }

    if (!phone.trim()) {
      Alert.alert('Fehler', 'Bitte geben Sie Ihre Telefonnummer ein.');
      return;
    }

    if (!selectedTime) {
      Alert.alert('Fehler', 'Bitte wählen Sie eine Uhrzeit aus.');
      return;
    }

    setLoading(true);

    try {
      // Formatiere das Datum für die Datenbank (YYYY-MM-DD)
      const formattedDate = selectedDate; // selectedDate ist bereits im Format YYYY-MM-DD
      
      // Bereite Reservierungsdaten vor (Supabase-Schema)
      const reservationData = {
        date: formattedDate,
        time: selectedTime,
        guest_name: fullName.trim(),
        guests: guestCount,
        phone: phone.trim(),
        email: email.trim(),
        note: note.trim() || null,
        source: 'app',
        status: 'confirmed',
        duration: 120,
        type: 'Abendessen'
      };

      // Speichere Reservierung direkt in Supabase
      const { data, error } = await supabase
        .from('reservations')
        .insert([reservationData])
        .select();

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      // Generiere Reservierungsnummer
      const reservationNumber = `RES-${Date.now().toString().slice(-6)}`;

      // Sende Bestätigungs-E-Mail
      try {
        console.log('📧 Versuche E-Mail zu senden an:', email.trim());
        console.log('📧 Backend URL:', BACKEND_URL);
        
        const emailResponse = await fetch(`${BACKEND_URL}/send-reservation-confirmation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            guestName: fullName.trim(),
            date: formatDate(selectedDate),
            time: selectedTime,
            guests: guestCount,
            phone: phone.trim(),
            note: note.trim() || null,
            reservationNumber: reservationNumber
          }),
        });

        console.log('📧 E-Mail Response Status:', emailResponse.status);

        if (emailResponse.ok) {
          const emailResult = await emailResponse.json();
          console.log('✅ Reservierungsbestätigung per E-Mail gesendet:', emailResult);
        } else {
          const errorText = await emailResponse.text();
          console.error('❌ E-Mail-Versand fehlgeschlagen:', emailResponse.status, errorText);
        }
      } catch (emailError) {
        console.error('❌ E-Mail-Versand fehlgeschlagen:', emailError);
        console.error('❌ Ist der Backend-Server gestartet?');
        // Nicht blockierend - Reservierung war erfolgreich
      }
      
      // Navigiere zur Bestätigungsseite
      navigation.navigate('ReservationSuccess' as never, {
        guestName: fullName.trim(),
        email: email.trim(),
        date: selectedDate,
        time: selectedTime,
        guests: guestCount,
        phone: phone.trim(),
        note: note.trim() || null,
        reservationNumber: reservationNumber
      });
    } catch (error) {
      console.error('Reservierungsfehler:', error);
      Alert.alert('Fehler', 'Die Reservierung konnte nicht durchgeführt werden. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => step === 1 ? navigation.goBack() : setStep(1)}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            {step === 1 ? 'Reservierung' : 'Gastinformationen'}
          </Text>
          {step === 2 && (
            <Text style={styles.headerSubtitle}>Bitte füllen Sie alle Pflichtfelder aus</Text>
          )}
        </View>
        <View style={styles.placeholder} />
      </View>


      {/* Schritt 1: Datum, Zeit und Gäste */}
      {step === 1 && (
        <ScrollView 
          style={styles.content} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Anzahl Personen</Text>
            <View style={styles.guestSelector}>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => setGuestCount(Math.max(1, guestCount - 1))}
              >
                <Ionicons name="remove" size={20} color={colors.white} />
              </TouchableOpacity>
              <Text style={styles.guestCount}>{guestCount}</Text>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => setGuestCount(Math.min(20, guestCount + 1))}
              >
                <Ionicons name="add" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.sectionTitle}>Datum</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowDatePicker(true)}
            >
              <View style={styles.datePickerWrapper}>
                <Text style={styles.dateDisplayText}>
                  {selectedDate ? formatDateForDisplay(selectedDate) : 'Datum wählen'}
                </Text>
                <Ionicons name="calendar-outline" size={20} color={colors.mediumGray} />
              </View>
            </TouchableOpacity>
            
            {showDatePicker && (
              <View style={styles.dayPickerContainer}>
                <ScrollView 
                  style={styles.dayPickerScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {(() => {
                    const today = new Date();
                    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const end = new Date(start);
                    end.setFullYear(start.getFullYear() + 1);
                    const items: any[] = [];
                    let idx = 0;
                    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
                      const yyyy = d.getFullYear().toString();
                      const mm = String(d.getMonth() + 1).padStart(2, '0');
                      const dd = String(d.getDate()).padStart(2, '0');
                      const iso = `${yyyy}-${mm}-${dd}`;
                      const isSelected = selectedDate === iso;
                      let labelLeft = '';
                      if (idx === 0) labelLeft = 'Heute';
                      else if (idx === 1) labelLeft = 'Morgen';
                      else {
                        const weekday = d.toLocaleDateString('de-DE', { weekday: 'short' });
                        const dateStr = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
                        labelLeft = `${weekday}, ${dateStr}`;
                      }

                      items.push(
                        <TouchableOpacity
                          key={iso}
                          style={[styles.dayPickerItem, isSelected && styles.dayPickerItemSelected]}
                          onPress={() => {
                            setSelectedDate(iso);
                            setYearPart(yyyy);
                            setMonthPart(mm);
                            setDayPart(dd);
                            setSelectedTime('');
                            setShowDatePicker(false);
                          }}
                        >
                          <Text style={[styles.dayPickerItemText, isSelected && styles.dayPickerItemTextSelected]}>
                            {labelLeft}
                          </Text>
                        </TouchableOpacity>
                      );
                      idx += 1;
                    }
                    return items;
                  })()}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Uhrzeit</Text>
            <View style={styles.timeGrid}>
              {timeSlots.map((slot) => {
                const isPastForToday = isTodaySelected() && slot.time <= currentTimeHHMM();
                const disabled = !slot.available || isPastForToday;
                return (
                  <TouchableOpacity
                    key={slot.time}
                    style={[
                      styles.timeSlot,
                      selectedTime === slot.time && !disabled && styles.timeSlotSelected,
                      disabled && styles.timeSlotUnavailable
                    ]}
                    onPress={() => {
                      if (disabled) return;
                      if (selectedTime === slot.time) {
                        setSelectedTime('');
                      } else {
                        setSelectedTime(slot.time);
                      }
                    }}
                    disabled={disabled}
                  >
                    <Text style={[
                      styles.timeSlotText,
                      selectedTime === slot.time && !disabled && styles.timeSlotTextSelected,
                      disabled && styles.timeSlotTextUnavailable
                    ]}>
                      {slot.time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          

          <TouchableOpacity
            style={[styles.nextButton, (!selectedDate || !selectedTime || guestCount < 1) && styles.nextButtonDisabled]}
            onPress={() => setStep(2)}
            disabled={!selectedDate || !selectedTime || guestCount < 1}
          >
            <Text style={styles.nextButtonText}>Weiter</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} style={styles.nextButtonIcon} />
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Schritt 2: Gastinformationen */}
      {step === 2 && (
        <ScrollView 
          style={styles.content} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.inputGroup}>
            <Text style={styles.sectionTitle}>Name *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Vor- und Nachname"
                placeholderTextColor={colors.mediumGray}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.sectionTitle}>E-Mail *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="ihre.email@beispiel.de"
                placeholderTextColor={colors.mediumGray}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.sectionTitle}>Telefonnummer *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color={colors.mediumGray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="0911 63290791"
                placeholderTextColor={colors.mediumGray}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.sectionTitle}>Besondere Wünsche</Text>
            <View style={styles.textAreaWrapper}>
              <Ionicons name="chatbubble-outline" size={20} color={colors.mediumGray} style={styles.textAreaIcon} />
              <TextInput
                style={[styles.input, styles.textArea]}
                value={note}
                onChangeText={setNote}
                placeholder="Allergien, besondere Wünsche, etc."
                placeholderTextColor={colors.mediumGray}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>
        </ScrollView>
      )}

      {/* Reservierung Button - Fixed über der Navigationsleiste */}
      {step === 2 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.reserveButton, loading && styles.reserveButtonDisabled]}
            onPress={handleReservation}
            disabled={loading}
          >
            <Ionicons name="restaurant-outline" size={20} color={colors.white} style={styles.reserveButtonIcon} />
            <Text style={styles.reserveButtonText}>
              {loading ? 'Wird verarbeitet...' : 'Tisch reservieren'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'Georgia',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.lightGray,
    textAlign: 'center',
    marginTop: 4,
  },
  placeholder: {
    width: 40,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepActive: {
    backgroundColor: colors.primary,
  },
  stepText: {
    color: colors.lightGray,
    fontSize: 14,
    fontWeight: '600',
  },
  stepTextActive: {
    color: colors.white,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: colors.darkGray,
    marginHorizontal: 10,
  },
  stepLineActive: {
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 150, // Mehr Platz für Button und Navigationsleiste
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 15,
    fontFamily: 'Georgia',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.white,
    marginBottom: 6,
    marginLeft: 4,
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
  dateDisplay: {
    color: colors.lightGray,
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
  datePickerDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkGray,
    paddingHorizontal: 16,
    height: 48,
  },
  datePickerText: {
    color: colors.white,
    fontSize: 15,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlot: {
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotUnavailable: {
    backgroundColor: colors.darkGray,
    borderColor: colors.darkGray,
    opacity: 0.5,
  },
  timeSlotText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  timeSlotTextSelected: {
    color: colors.white,
  },
  timeSlotTextUnavailable: {
    color: colors.lightGray,
  },
  guestSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  guestButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestCount: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
    marginHorizontal: 30,
    fontFamily: 'Georgia',
  },
  noteInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  navigationButtons: {
    marginTop: 30,
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: colors.darkGray,
    opacity: 0.6,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Georgia',
  },
  nextButtonIcon: {
    marginLeft: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 90,
    left: 0,
    right: 0,
    backgroundColor: colors.darkGray,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  reserveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  reserveButtonDisabled: {
    opacity: 0.6,
  },
  reserveButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Georgia',
  },
  reserveButtonIcon: {
    marginRight: 8,
  },
  guestInfoHeader: {
    marginBottom: 30,
    alignItems: 'center',
  },
  guestInfoTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 8,
  },
  guestInfoSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkGray,
    paddingHorizontal: 16,
    height: 48,
  },
  datePickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkGray,
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'space-between',
  },
  dateDisplayText: {
    color: colors.white,
    fontSize: 15,
    flex: 1,
  },
  dayPickerContainer: {
    backgroundColor: colors.black,
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 280,
  },
  dayPickerHeader: {
    display: 'none',
  },
  dayPickerTitle: {
    display: 'none',
  },
  dayPickerCloseButton: {
    display: 'none',
  },
  dayPickerScroll: {
    maxHeight: 240,
  },
  dayPickerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
  dayPickerItemSelected: {
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  dayPickerItemPast: {
    opacity: 0.3,
  },
  dayPickerItemText: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
  },
  dayPickerItemTextSelected: {
    color: colors.white,
  },
  dayPickerItemTextPast: {
    color: colors.mediumGray,
  },
  dayPickerItemDay: {
    fontSize: 13,
    color: colors.lightGray,
    fontWeight: '300',
  },
  dayPickerItemDaySelected: {
    color: colors.white,
  },
  dayPickerItemDayPast: {
    color: colors.mediumGray,
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
  textAreaWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.black,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkGray,
    paddingHorizontal: 16,
    paddingTop: 12,
    minHeight: 100,
  },
  textAreaIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  textArea: {
    flex: 1,
    minHeight: 80,
    fontSize: 15,
    color: colors.white,
    textAlignVertical: 'top',
  },
});
