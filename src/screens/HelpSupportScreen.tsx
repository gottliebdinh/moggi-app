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
import { useLanguage } from '../context/LanguageContext';
import colors from '../theme/colors';

export default function HelpSupportScreen() {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const faqItems = [
    {
      id: '1',
      question: t('helpSupport.faq1Question'),
      answer: t('helpSupport.faq1Answer')
    },
    {
      id: '2',
      question: t('helpSupport.faq2Question'),
      answer: t('helpSupport.faq2Answer')
    },
    {
      id: '3',
      question: t('helpSupport.faq3Question'),
      answer: t('helpSupport.faq3Answer')
    },
    {
      id: '4',
      question: t('helpSupport.faq4Question'),
      answer: t('helpSupport.faq4Answer')
    },
    {
      id: '5',
      question: t('helpSupport.faq5Question'),
      answer: t('helpSupport.faq5Answer')
    },
    {
      id: '6',
      question: t('helpSupport.faq6Question'),
      answer: t('helpSupport.faq6Answer')
    }
  ];

  const contactOptions = [
    {
      id: 'phone',
      title: t('helpSupport.phone'),
      subtitle: t('helpSupport.phoneNumber'),
      icon: 'call',
      action: () => Linking.openURL('tel:091163290791')
    },
    {
      id: 'email',
      title: t('helpSupport.email'),
      subtitle: t('helpSupport.emailAddress'),
      icon: 'mail',
      action: () => Linking.openURL('mailto:info@moggi-restaurant.de')
    },
    {
      id: 'address',
      title: t('helpSupport.address'),
      subtitle: t('helpSupport.addressLine'),
      icon: 'location',
      action: () => Linking.openURL('https://maps.google.com/?q=Musterstraße+123,+12345+Berlin')
    },
    {
      id: 'hours',
      title: t('helpSupport.hours'),
      subtitle: t('helpSupport.hoursValue'),
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
        <Text style={styles.headerTitle}>{t('helpSupport.title')}</Text>
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
            <Text style={styles.welcomeTitle}>{t('helpSupport.welcomeTitle')}</Text>
            <Text style={styles.welcomeSubtitle}>
              {t('helpSupport.welcomeSubtitle')}
            </Text>
          </View>

          {/* FAQ Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('helpSupport.faqTitle')}</Text>
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
            <Text style={styles.sectionTitle}>{t('helpSupport.contactTitle')}</Text>
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
              <Text style={styles.supportTitle}>{t('helpSupport.supportAvailable')}</Text>
              <Text style={styles.supportSubtitle}>
                {t('helpSupport.supportHours')}
              </Text>
            </View>
          </View>

          {/* Emergency Contact */}
          <View style={styles.emergencyCard}>
            <Ionicons name="warning" size={24} color="#FF6B00" />
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>{t('helpSupport.urgentTitle')}</Text>
              <Text style={styles.emergencySubtitle}>
                {t('helpSupport.urgentSubtitle')}
              </Text>
              <TouchableOpacity 
                style={styles.emergencyButton}
                onPress={() => Linking.openURL('tel:091163290791')}
                activeOpacity={0.8}
              >
                <Ionicons name="call" size={16} color={colors.white} />
                <Text style={styles.emergencyButtonText}>{t('helpSupport.callNow')}</Text>
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
