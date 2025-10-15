import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

export default function ContactScreen() {
  const navigation = useNavigation();

  const handlePhonePress = () => {
    Linking.openURL('tel:+491234567890'); // Ersetze mit deiner Telefonnummer
  };

  const handleLocationPress = () => {
    const address = 'Katharinengasse 14, 90403 Nürnberg';
    const url = Platform.select({
      ios: `maps://app?daddr=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
      default: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    });
    
    Linking.openURL(url);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kontakt</Text>
        <Text style={styles.headerSubtitle}>Wir sind für dich da</Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity style={styles.contactCard} onPress={handlePhonePress}>
          <View style={styles.iconCircle}>
            <Ionicons name="call" size={28} color={colors.white} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Telefon</Text>
            <Text style={styles.cardText}>+49 123 456 7890</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.mediumGray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={handleLocationPress}>
          <View style={styles.iconCircle}>
            <Ionicons name="location" size={28} color={colors.white} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Standort</Text>
            <Text style={styles.cardText}>Katharinengasse 14{'\n'}90403 Nürnberg</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.mediumGray} />
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Ionicons name="mail-outline" size={24} color={colors.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>E-Mail</Text>
            <Text style={styles.infoText}>info@moggi-app.com</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="time-outline" size={24} color={colors.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Öffnungszeiten</Text>
            <Text style={styles.infoText}>Mo-Fr: 9:00 - 18:00 Uhr</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
  },
  scrollContent: {
    paddingBottom: 100,
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
    fontWeight: 'bold',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 18,
    color: colors.primary,
    marginTop: 5,
  },
  content: {
    padding: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

