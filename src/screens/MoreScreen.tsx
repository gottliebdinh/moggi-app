import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

export default function MoreScreen() {
  const navigation = useNavigation();

  const menuItems = [
    { id: '1', title: 'Kontakt', icon: 'call-outline', subtitle: 'Telefon, E-Mail & Adresse' },
    { id: '2', title: 'Datenschutz', icon: 'shield-checkmark-outline', subtitle: 'Datenschutzerklärung' },
    { id: '3', title: 'Impressum', icon: 'business-outline', subtitle: 'Rechtliche Informationen' },
  ];

  const handleMenuPress = (item: any) => {
    switch (item.id) {
      case '1': // Kontakt
        navigation.navigate('Contact' as never);
        break;
      case '2': // Datenschutz
        navigation.navigate('Privacy' as never);
        break;
      case '3': // Impressum
        navigation.navigate('Imprint' as never);
        break;
      default:
        Alert.alert('Info', 'Diese Funktion wird bald verfügbar sein');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mehr</Text>
        <Text style={styles.headerSubtitle}>Weitere Optionen</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* App Info Card */}
          <View style={styles.appInfoCard}>
            <View style={styles.appIcon}>
              <Ionicons name="restaurant" size={40} color={colors.white} />
            </View>
            <View style={styles.appInfo}>
              <Text style={styles.appName}>MOGGI App</Text>
              <Text style={styles.appSubtitle}>Restaurant-App</Text>
              <Text style={styles.appVersion}>Version 1.0.0</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.lastMenuItem
                ]}
                activeOpacity={0.7}
                onPress={() => handleMenuPress(item)}
              >
                <View style={styles.iconContainer}>
                  <Ionicons 
                    name={item.icon as any} 
                    size={24} 
                    color={colors.primary} 
                  />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color={colors.mediumGray} 
                />
              </TouchableOpacity>
            ))}
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
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
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
    paddingBottom: 100,
  },
  content: {
    padding: 16,
  },
  appInfoCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  appIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
    fontFamily: 'Georgia',
  },
  appSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 12,
    color: colors.mediumGray,
  },
  menuSection: {
    backgroundColor: colors.black,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
  },
});

