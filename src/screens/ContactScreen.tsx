import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Platform, Clipboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

export default function ContactScreen() {
  const navigation = useNavigation();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await Clipboard.setString(text);
      Alert.alert('Kopiert', `${label} wurde in die Zwischenablage kopiert`);
    } catch (error) {
      Alert.alert('Fehler', 'Konnte nicht kopiert werden');
    }
  };

  const handlePhonePress = () => {
    copyToClipboard('091163290791', 'Telefonnummer');
  };

  const handleLocationPress = () => {
    copyToClipboard('Katharinengasse 14, 90403 Nürnberg', 'Adresse');
  };

  const handleEmailPress = () => {
    copyToClipboard('info@moggi-restaurant.de', 'E-Mail-Adresse');
  };

  const contactItems = [
    {
      id: '1',
      title: 'Telefon',
      subtitle: '0911 63290791',
      icon: 'call-outline',
      action: handlePhonePress
    },
    {
      id: '2',
      title: 'Standort',
      subtitle: 'Katharinengasse 14, 90403 Nürnberg',
      icon: 'location-outline',
      action: handleLocationPress
    },
    {
      id: '3',
      title: 'E-Mail',
      subtitle: 'info@moggi-restaurant.de',
      icon: 'mail-outline',
      action: handleEmailPress
    }
  ];

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
        <Text style={styles.headerTitle}>Kontakt</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Contact Items */}
          <View style={styles.menuSection}>
            {contactItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === contactItems.length - 1 && styles.lastMenuItem
                ]}
                activeOpacity={0.7}
                onPress={item.action}
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
              </TouchableOpacity>
            ))}
          </View>

          {/* Opening Hours */}
          <View style={styles.hoursCard}>
            <View style={styles.hoursHeader}>
              <Ionicons name="time-outline" size={24} color={colors.primary} />
              <Text style={styles.hoursTitle}>Öffnungszeiten</Text>
            </View>
            <View style={styles.hoursContent}>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Montag:</Text>
                <Text style={styles.hoursTime}>Ruhetag (geschlossen)</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Dienstag - Mittwoch:</Text>
                <Text style={styles.hoursTime}>11:30 - 14:30 Uhr (Mittagsservice)</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}></Text>
                <Text style={styles.hoursTime}>17:30 - 23:00 Uhr (Abendservice)</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Donnerstag:</Text>
                <Text style={styles.hoursTime}>11:30 - 14:30 Uhr (Mittagsservice)</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}></Text>
                <Text style={styles.hoursTime}>17:30 - 02:00 Uhr (Abendservice)</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={styles.hoursDay}>Sonntag:</Text>
                <Text style={styles.hoursTime}>17:00 - 23:00 Uhr (nur Abendservice)</Text>
              </View>
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
  restaurantCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  restaurantIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
    fontFamily: 'Georgia',
  },
  restaurantSubtitle: {
    fontSize: 14,
    color: colors.lightGray,
    marginBottom: 4,
  },
  restaurantDescription: {
    fontSize: 12,
    color: colors.mediumGray,
  },
  menuSection: {
    backgroundColor: colors.black,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.darkGray,
    marginBottom: 24,
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
  hoursCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  hoursHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  hoursTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 12,
    fontFamily: 'Georgia',
  },
  hoursContent: {
    gap: 8,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hoursDay: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    width: 120,
    marginRight: 8,
  },
  hoursTime: {
    fontSize: 14,
    color: colors.lightGray,
    flex: 1,
    lineHeight: 20,
  },
});

