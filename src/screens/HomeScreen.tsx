import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import colors from '../theme/colors';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useLanguage();

  const handleLocationPress = async () => {
    const address = 'Katharinengasse 14, 90403 Nürnberg';
    
    // Versuche zuerst Google Maps im Browser (funktioniert immer)
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    
    // Für iOS: Versuche Apple Maps, falls nicht verfügbar -> Google Maps Web
    const iosMapsUrl = `maps://app?daddr=${encodeURIComponent(address)}`;
    
    // Für Android: Versuche Google Maps App, falls nicht verfügbar -> Google Maps Web
    const androidMapsUrl = `geo:0,0?q=${encodeURIComponent(address)}`;
    
    try {
      if (Platform.OS === 'ios') {
        const canOpen = await Linking.canOpenURL(iosMapsUrl);
        if (canOpen) {
          await Linking.openURL(iosMapsUrl);
        } else {
          await Linking.openURL(googleMapsUrl);
        }
      } else if (Platform.OS === 'android') {
        const canOpen = await Linking.canOpenURL(androidMapsUrl);
        if (canOpen) {
          await Linking.openURL(androidMapsUrl);
        } else {
          await Linking.openURL(googleMapsUrl);
        }
      } else {
        await Linking.openURL(googleMapsUrl);
      }
    } catch (error) {
      // Fallback: Öffne Google Maps im Browser
      Linking.openURL(googleMapsUrl);
    }
  };

  const handleReservationPress = () => {
    navigation.navigate('Reservation' as never);
  };

  const handleContactPress = () => {
    navigation.navigate('Contact' as never);
  };

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        
        {/* Kontakt Buttons - Floating zwischen Header und Content */}
        <View style={styles.floatingButtons}>
          <TouchableOpacity 
            style={styles.floatingButton}
            onPress={handleLocationPress}
            activeOpacity={0.7}
          >
            <Ionicons name="location" size={24} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.floatingButton}
            onPress={handleContactPress}
            activeOpacity={0.7}
          >
            <Ionicons name="call" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
        {/* Hero Banner mit Zitat */}
        <View style={styles.heroBanner}>
          <Text style={styles.heroTitle}>
            {t('home.heroTitle')}
          </Text>
          <View style={styles.divider} />
          <Text style={styles.heroSubtitle}>
            {t('home.heroSubtitle')}
          </Text>
        </View>

        {/* Chef Quan */}
        <View style={styles.chefCard}>
          <Image 
            source={require('../../assets/quan.webp')} 
            style={styles.chefImage}
            resizeMode="cover"
          />
          <View style={styles.chefInfo}>
            <Text style={styles.chefName}>{t('home.chefQuan')}</Text>
            <View style={styles.chefDivider} />
            <Text style={styles.chefDescription}>
              {t('home.chefQuanDescription')}
            </Text>
          </View>
        </View>

            {/* Chef Ryohey */}
            <View style={styles.chefCard}>
              <Image
                source={require('../../assets/ryohey.webp')}
                style={styles.chefImage}
                resizeMode="cover"
              />
              <View style={styles.chefInfo}>
                <Text style={styles.chefName}>{t('home.chefRyohey')}</Text>
                <View style={styles.chefDivider} />
                <Text style={styles.chefDescription}>
                  {t('home.chefRyoheyDescription')}
                </Text>
              </View>
            </View>
        </View>
      </ScrollView>

      {/* Schwebender Reservierungs-Button über der Navigationsleiste */}
      <TouchableOpacity 
        style={styles.floatingReservationButton}
        onPress={handleReservationPress}
        activeOpacity={0.8}
      >
        <Text style={styles.floatingReservationButtonText}>{t('home.reserveTable')}</Text>
      </TouchableOpacity>
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
    paddingTop: 70,
    paddingBottom: 35,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 160,
  },
  scrollView: {
    flex: 1,
    marginTop: 160, // Abstand für den Header
  },
  scrollContent: {
    paddingBottom: 100,
  },
  logo: {
    width: 200,
    height: 65,
  },
  floatingButtons: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    padding: 16,
    paddingTop: 20,
  },
  heroBanner: {
    backgroundColor: colors.black,
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '300',
    color: colors.white,
    lineHeight: 30,
    marginBottom: 16,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    fontFamily: 'Georgia',
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: colors.primary,
    marginBottom: 16,
    alignSelf: 'center',
    borderRadius: 2,
  },
  heroSubtitle: {
    fontSize: 15,
    color: colors.lightGray,
    lineHeight: 22,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  chefCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  chefImage: {
    width: '100%',
    height: 280,
  },
  chefInfo: {
    padding: 20,
  },
  chefName: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 12,
  },
  chefDivider: {
    width: 50,
    height: 2,
    backgroundColor: colors.primary,
    marginBottom: 16,
    borderRadius: 2,
  },
  chefDescription: {
    fontSize: 14,
    color: colors.lightGray,
    lineHeight: 22,
  },
  floatingReservationButton: {
    position: 'absolute',
    bottom: 100, // Über der Navigationsleiste (ca. 85px hoch)
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  floatingReservationButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Georgia',
  },
});

