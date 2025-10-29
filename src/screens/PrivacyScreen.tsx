import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

export default function PrivacyScreen() {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>Datenschutz</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Datenschutz Card */}
          <View style={styles.privacyCard}>
            <View style={styles.privacyHeader}>
              <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
              <Text style={styles.privacyTitle}>Datenschutzerklärung</Text>
            </View>
            
            <View style={styles.privacyContent}>
              <Text style={styles.sectionTitle}>1. Verantwortlicher</Text>
              <Text style={styles.privacyText}>
                MOGGI Asian Kitchen & Bar GmbH{'\n'}
                Katharinengasse 14{'\n'}
                90403 Nürnberg{'\n'}
                Deutschland{'\n\n'}
                Geschäftsführerin: Mara Kasper{'\n\n'}
                E-Mail: office@moggi.de{'\n'}
                Telefon: +49 911 63290791
              </Text>

              <Text style={styles.sectionTitle}>2. Datenerfassung und -verwendung</Text>
              <Text style={styles.privacyText}>
                Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies für die Bereitstellung unserer Dienstleistungen erforderlich ist. Dies umfasst:{'\n\n'}
                • Bestellungen und Reservierungen{'\n'}
                • Kontaktinformationen für die Kommunikation{'\n'}
                • Zahlungsinformationen (über sichere Drittanbieter){'\n'}
                • App-Nutzungsdaten zur Verbesserung des Services
              </Text>

              <Text style={styles.sectionTitle}>3. Rechtsgrundlage</Text>
              <Text style={styles.privacyText}>
                Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von:{'\n\n'}
                • Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung){'\n'}
                • Art. 6 Abs. 1 lit. a DSGVO (Einwilligung){'\n'}
                • Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen)
              </Text>

              <Text style={styles.sectionTitle}>4. Datenweitergabe</Text>
              <Text style={styles.privacyText}>
                Wir geben Ihre Daten nur an Drittanbieter weiter, die für die Erbringung unserer Dienstleistungen erforderlich sind:{'\n\n'}
                • Supabase (Datenbank und Authentifizierung){'\n'}
                • Stripe (Zahlungsabwicklung){'\n'}
                • Expo (App-Entwicklung und -verteilung){'\n\n'}
                Alle Partner sind DSGVO-konform und haben entsprechende Datenschutzvereinbarungen.
              </Text>

              <Text style={styles.sectionTitle}>5. Datensicherheit</Text>
              <Text style={styles.privacyText}>
                Wir verwenden moderne Sicherheitsmaßnahmen zum Schutz Ihrer Daten:{'\n\n'}
                • SSL/TLS-Verschlüsselung für alle Datenübertragungen{'\n'}
                • Sichere Authentifizierung und Autorisierung{'\n'}
                • Regelmäßige Sicherheitsupdates{'\n'}
                • Zugriffskontrollen und -protokollierung
              </Text>

              <Text style={styles.sectionTitle}>6. Ihre Rechte</Text>
              <Text style={styles.privacyText}>
                Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:{'\n\n'}
                • Recht auf Auskunft (Art. 15 DSGVO){'\n'}
                • Recht auf Berichtigung (Art. 16 DSGVO){'\n'}
                • Recht auf Löschung (Art. 17 DSGVO){'\n'}
                • Recht auf Einschränkung (Art. 18 DSGVO){'\n'}
                • Recht auf Datenübertragbarkeit (Art. 20 DSGVO){'\n'}
                • Widerspruchsrecht (Art. 21 DSGVO){'\n\n'}
                Kontaktieren Sie uns unter office@moggi.de für die Ausübung Ihrer Rechte.
              </Text>

              <Text style={styles.sectionTitle}>7. Speicherdauer</Text>
              <Text style={styles.privacyText}>
                Wir speichern Ihre Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist:{'\n\n'}
                • Bestelldaten: 7 Jahre (Aufbewahrungspflicht){'\n'}
                • Kontaktdaten: Bis zur Löschung des Accounts{'\n'}
                • App-Nutzungsdaten: Maximal 2 Jahre{'\n'}
                • Marketing-Daten: Bis zum Widerruf der Einwilligung
              </Text>

              <Text style={styles.sectionTitle}>8. Cookies und Tracking</Text>
              <Text style={styles.privacyText}>
                Unsere App verwendet keine Cookies im herkömmlichen Sinne. Wir sammeln jedoch anonymisierte Nutzungsstatistiken zur Verbesserung der App-Funktionalität. Diese Daten können nicht zu Ihrer Person zurückverfolgt werden.
              </Text>

              <Text style={styles.sectionTitle}>9. Änderungen der Datenschutzerklärung</Text>
              <Text style={styles.privacyText}>
                Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren. Wesentliche Änderungen werden wir Ihnen über die App oder per E-Mail mitteilen.
              </Text>

              <Text style={styles.sectionTitle}>10. Kontakt</Text>
              <Text style={styles.privacyText}>
                Bei Fragen zum Datenschutz wenden Sie sich bitte an:{'\n\n'}
                MOGGI Asian Kitchen & Bar GmbH{'\n'}
                Katharinengasse 14{'\n'}
                90403 Nürnberg{'\n'}
                E-Mail: office@moggi.de{'\n'}
                Telefon: +49 911 63290791
              </Text>

              <Text style={styles.lastUpdated}>
                Stand: Oktober 2025
              </Text>
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
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    textAlign: 'center',
    flex: 1,
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
  privacyCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  privacyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 12,
    fontFamily: 'Georgia',
  },
  privacyContent: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  privacyText: {
    fontSize: 14,
    color: colors.lightGray,
    lineHeight: 22,
  },
  lastUpdated: {
    fontSize: 12,
    color: colors.mediumGray,
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
});
