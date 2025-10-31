import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import colors from '../theme/colors';

export default function ImprintScreen() {
  const navigation = useNavigation();
  const { t } = useLanguage();

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
        <Text style={styles.headerTitle}>{t('imprint.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Impressum Card */}
          <View style={styles.imprintCard}>
            <View style={styles.imprintHeader}>
              <Ionicons name="business" size={24} color={colors.primary} />
              <Text style={styles.imprintTitle}>Impressum</Text>
            </View>
            
            <View style={styles.imprintContent}>
              <Text style={styles.sectionTitle}>Angaben gemäß § 5 TMG</Text>
              <Text style={styles.imprintText}>
                MOGGI Asian Kitchen & Bar GmbH{'\n'}
                Katharinengasse 14{'\n'}
                90403 Nürnberg{'\n'}
                Deutschland
              </Text>

              <Text style={styles.sectionTitle}>Vertreten durch</Text>
              <Text style={styles.imprintText}>
                Geschäftsführerin: Mara Kasper
              </Text>

              <Text style={styles.sectionTitle}>Kontakt</Text>
              <Text style={styles.imprintText}>
                Telefon: +49 911 63290791{'\n'}
                E-Mail: office@moggi.de{'\n'}
                Reservierungen: reservierung@moggi.de{'\n'}
                Anfragen: restaurant@moggi.de
              </Text>

              <Text style={styles.sectionTitle}>Registereintrag</Text>
              <Text style={styles.imprintText}>
                Registergericht: Amtsgericht Nürnberg{'\n'}
                Registernummer: HRB 43040{'\n'}
                Stammkapital: 25.000,00 EUR
              </Text>

              <Text style={styles.sectionTitle}>Umsatzsteuer-ID</Text>
              <Text style={styles.imprintText}>
                USt-IdNr.: DE368237633{'\n'}
                gemäß § 27a Umsatzsteuergesetz
              </Text>

              <Text style={styles.sectionTitle}>Verantwortlich für den Inhalt</Text>
              <Text style={styles.imprintText}>
                gemäß § 55 Abs. 2 RStV:{'\n\n'}
                MOGGI Asian Kitchen & Bar GmbH{'\n'}
                Katharinengasse 14{'\n'}
                90403 Nürnberg{'\n'}
                vertreten durch die Geschäftsführerin Mara Kasper
              </Text>

              <Text style={styles.sectionTitle}>Rechtlicher Sitz</Text>
              <Text style={styles.imprintText}>
                Gustav-Weißkopf-Straße 5{'\n'}
                90768 Fürth{'\n'}
                Deutschland
              </Text>

              <Text style={styles.sectionTitle}>EU-Streitschlichtung</Text>
              <Text style={styles.imprintText}>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{'\n'}
                https://ec.europa.eu/consumers/odr{'\n\n'}
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </Text>

              <Text style={styles.sectionTitle}>Verbraucherstreitbeilegung / Universalschlichtungsstelle</Text>
              <Text style={styles.imprintText}>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </Text>

              <Text style={styles.sectionTitle}>Haftung für Inhalte</Text>
              <Text style={styles.imprintText}>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.{'\n\n'}
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </Text>

              <Text style={styles.sectionTitle}>Haftung für Links</Text>
              <Text style={styles.imprintText}>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.{'\n\n'}
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </Text>

              <Text style={styles.sectionTitle}>Urheberrecht</Text>
              <Text style={styles.imprintText}>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.{'\n\n'}
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </Text>

              <Text style={styles.sectionTitle}>Bildnachweise</Text>
              <Text style={styles.imprintText}>
                Alle auf dieser Website verwendeten Bilder und Fotografien sind Eigentum der MOGGI Asian Kitchen & Bar GmbH oder wurden mit entsprechender Lizenz verwendet.
              </Text>

              <Text style={styles.sectionTitle}>Hinweise zum Datenschutz</Text>
              <Text style={styles.imprintText}>
                Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten finden Sie in unserer Datenschutzerklärung.
              </Text>

              <Text style={styles.lastUpdated}>
                Stand: Oktober 2025{'\n\n'}
                MOGGI Asian Kitchen & Bar GmbH{'\n'}
                Katharinengasse 14 | 90403 Nürnberg{'\n'}
                Tel: +49 911 63290791 | E-Mail: office@moggi.de
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
  imprintCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  imprintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imprintTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 12,
    fontFamily: 'Georgia',
  },
  imprintContent: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  imprintText: {
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
