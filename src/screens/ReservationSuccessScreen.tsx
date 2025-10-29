import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../theme/colors';
import { useLanguage } from '../context/LanguageContext';

export default function ReservationSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { t, language } = useLanguage();
  const { 
    guestName, 
    email, 
    date, 
    time, 
    guests, 
    phone, 
    note, 
    reservationNumber 
  } = route.params as any;

  const scaleAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Checkmark Animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Fade in content
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 200,
      useNativeDriver: true,
    }).start();

    // Listener für Tab-Wechsel: Navigiere zurück zu Home
    const unsubscribe = navigation.addListener('blur', () => {
      // Wenn der Screen verlassen wird (z.B. durch Tab-Wechsel)
      // Navigiere zurück zum Home Screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' as never }],
      });
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const day = days[date.getDay()];
    const dateStr = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}, ${dateStr}.${month}.${year}`;
  };


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={40} color={colors.white} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
          {/* Success Message */}
          <Text style={styles.title}>Reservierung bestätigt!</Text>
          <Text style={styles.subtitle}>
            Vielen Dank, {guestName}!
          </Text>

          {/* Reservation Number */}
          {reservationNumber && (
            <View style={styles.reservationNumberCard}>
              <Text style={styles.reservationNumberLabel}>Reservierungsnummer</Text>
              <Text style={styles.reservationNumberText}>#{reservationNumber}</Text>
              <Text style={styles.reservationNumberSubtext}>Eine Bestätigung wurde an {email} gesendet</Text>
            </View>
          )}

          {/* Reservation Details - Simplified */}
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Reservierungsdetails</Text>
            
            <View style={styles.detailRow}>
              <View style={styles.iconWrapper}>
                <Ionicons name="calendar-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Datum</Text>
                <Text style={styles.detailValue}>{formatDate(date)}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconWrapper}>
                <Ionicons name="time-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>{t('reservation.time')}</Text>
                <Text style={styles.detailValue}>{time} {language === 'de' ? 'Uhr' : ''}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconWrapper}>
                <Ionicons name="people-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Anzahl Personen</Text>
                <Text style={styles.detailValue}>{guests} {guests === 1 ? 'Person' : 'Personen'}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconWrapper}>
                <Ionicons name="location-outline" size={24} color={colors.primary} />
              </View>
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailLabel}>Restaurant</Text>
                <Text style={styles.detailValue}>Katharinengasse 14, Nürnberg</Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            // Reset navigation stack und gehe zu Home
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' as never }],
            });
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="restaurant" size={20} color={colors.white} />
          <Text style={styles.primaryButtonText}>Zurück zur Startseite</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.lightGray,
    marginBottom: 20,
    textAlign: 'center',
  },
  reservationNumberCard: {
    width: '100%',
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
  },
  reservationNumberLabel: {
    fontSize: 12,
    color: colors.lightGray,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  reservationNumberText: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'monospace',
    marginBottom: 6,
  },
  reservationNumberSubtext: {
    fontSize: 12,
    color: colors.mediumGray,
    textAlign: 'center',
  },
  detailsCard: {
    width: '100%',
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 12,
    fontFamily: 'Georgia',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: colors.lightGray,
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 15,
    color: colors.white,
    fontWeight: '500',
  },
  noteCard: {
    width: '100%',
    backgroundColor: colors.black,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
    fontFamily: 'Georgia',
  },
  noteText: {
    fontSize: 15,
    color: colors.white,
    lineHeight: 22,
  },
  infoCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '15',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: colors.white,
    marginLeft: 12,
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    paddingBottom: 110,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
