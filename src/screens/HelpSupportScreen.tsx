import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Linking,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

export default function HelpSupportScreen() {
  const navigation = useNavigation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqItems = [
    {
      id: '1',
      question: 'Wie kann ich eine Bestellung aufgeben?',
      answer: 'Wähle deine gewünschten Gerichte aus der Speisekarte aus, füge sie zum Warenkorb hinzu und gehe zur Kasse. Du kannst zwischen Abholung und Lieferung wählen.'
    },
    {
      id: '2',
      question: 'Welche Zahlungsmethoden werden akzeptiert?',
      answer: 'Wir akzeptieren Kreditkarten, Debitkarten und Apple Pay. Alle Zahlungen werden sicher über Stripe verarbeitet.'
    },
    {
      id: '3',
      question: 'Wie kann ich eine Reservierung machen?',
      answer: 'Gehe zum Home-Tab und wähle "Reservierung". Fülle das Formular aus und wir bestätigen deine Reservierung per E-Mail.'
    },
    {
      id: '4',
      question: 'Kann ich meine Bestellung stornieren?',
      answer: 'Bestellungen können bis zu 15 Minuten nach der Aufgabe storniert werden. Kontaktiere uns direkt über die App oder telefonisch unter 0911 63290791.'
    },
    {
      id: '5',
      question: 'Wie lange dauert die Lieferung?',
      answer: 'Die Lieferzeit beträgt normalerweise 30-45 Minuten, abhängig von der Entfernung und der aktuellen Auslastung.'
    },
    {
      id: '6',
      question: 'Was ist die Mindestbestellmenge?',
      answer: 'Die Mindestbestellmenge beträgt 15€ für Lieferungen und 10€ für Abholungen.'
    }
  ];

  const contactOptions = [
    {
      id: 'phone',
      title: 'Telefon',
      subtitle: '0911 63290791',
      icon: 'call',
      action: () => Linking.openURL('tel:091163290791')
    },
    {
      id: 'email',
      title: 'E-Mail',
      subtitle: 'info@moggi-restaurant.de',
      icon: 'mail',
      action: () => Linking.openURL('mailto:info@moggi-restaurant.de')
    },
    {
      id: 'address',
      title: 'Adresse',
      subtitle: 'Musterstraße 123, 12345 Berlin',
      icon: 'location',
      action: () => Linking.openURL('https://maps.google.com/?q=Musterstraße+123,+12345+Berlin')
    },
    {
      id: 'hours',
      title: 'Öffnungszeiten',
      subtitle: 'Mo-So: 11:00 - 23:00 Uhr',
      icon: 'time',
      action: () => {}
    }
  ];

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleContactPress = (option: any) => {
    if (option.action) {
      option.action();
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
        <Text style={styles.headerTitle}>Hilfe & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Welcome Card */}
          <View style={styles.welcomeCard}>
            <Ionicons name="help-circle" size={48} color={colors.primary} />
            <Text style={styles.welcomeTitle}>Wie können wir helfen?</Text>
            <Text style={styles.welcomeSubtitle}>
              Hier findest du Antworten auf häufige Fragen und unsere Kontaktdaten
            </Text>
          </View>

          {/* FAQ Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Häufige Fragen</Text>
            <View style={styles.faqContainer}>
              {faqItems.map((item, index) => (
                <View key={item.id} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => toggleExpanded(item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.faqQuestionText}>{item.question}</Text>
                    <Ionicons 
                      name={expandedItems.includes(item.id) ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color={colors.primary} 
                    />
                  </TouchableOpacity>
                  {expandedItems.includes(item.id) && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.faqAnswerText}>{item.answer}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Contact Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kontakt</Text>
            <View style={styles.contactContainer}>
              {contactOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.contactItem,
                    index === contactOptions.length - 1 && styles.lastContactItem
                  ]}
                  onPress={() => handleContactPress(option)}
                  activeOpacity={0.7}
                >
                  <View style={styles.contactIconContainer}>
                    <Ionicons 
                      name={option.icon as any} 
                      size={24} 
                      color={colors.primary} 
                    />
                  </View>
                  <View style={styles.contactContent}>
                    <Text style={styles.contactTitle}>{option.title}</Text>
                    <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
                  </View>
                  {option.action && (
                    <Ionicons 
                      name="chevron-forward" 
                      size={20} 
                      color={colors.mediumGray} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Support Hours */}
          <View style={styles.supportCard}>
            <Ionicons name="headset" size={24} color={colors.primary} />
            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Support verfügbar</Text>
              <Text style={styles.supportSubtitle}>
                Mo-Fr: 9:00 - 18:00 Uhr{'\n'}
                Sa-So: 10:00 - 16:00 Uhr
              </Text>
            </View>
          </View>

          {/* Emergency Contact */}
          <View style={styles.emergencyCard}>
            <Ionicons name="warning" size={24} color="#FF6B00" />
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>Dringende Probleme?</Text>
              <Text style={styles.emergencySubtitle}>
                Bei dringenden Problemen mit deiner Bestellung rufe uns direkt an
              </Text>
              <TouchableOpacity 
                style={styles.emergencyButton}
                onPress={() => Linking.openURL('tel:091163290791')}
                activeOpacity={0.8}
              >
                <Ionicons name="call" size={16} color={colors.white} />
                <Text style={styles.emergencyButtonText}>Jetzt anrufen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
  welcomeCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'Georgia',
    marginTop: 16,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 16,
  },
  faqContainer: {
    backgroundColor: colors.black,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  faqAnswerText: {
    fontSize: 14,
    color: colors.lightGray,
    lineHeight: 20,
  },
  contactContainer: {
    backgroundColor: colors.black,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  lastContactItem: {
    borderBottomWidth: 0,
  },
  contactIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
  },
  supportCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  supportContent: {
    flex: 1,
    marginLeft: 16,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  supportSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
    lineHeight: 20,
  },
  emergencyCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#FF6B00' + '30',
  },
  emergencyContent: {
    flex: 1,
    marginLeft: 16,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B00',
    marginBottom: 8,
  },
  emergencySubtitle: {
    fontSize: 14,
    color: colors.lightGray,
    lineHeight: 20,
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
});
