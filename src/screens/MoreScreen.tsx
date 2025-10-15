import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

export default function MoreScreen() {
  const navigation = useNavigation();

  const handleContactPress = () => {
    navigation.navigate('Contact' as never);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mehr</Text>
        <Text style={styles.headerSubtitle}>Weitere Optionen</Text>
      </View>
      
      <View style={styles.content}>
        <TouchableOpacity style={styles.menuItem} onPress={handleContactPress}>
          <Ionicons name="call-outline" size={24} color={colors.primary} />
          <Text style={styles.menuText}>Kontakt</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
          <Text style={styles.menuText}>Über die App</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
        </View>
        
        <View style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
          <Text style={styles.menuText}>Hilfe & Support</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
        </View>
        
        <View style={styles.menuItem}>
          <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
          <Text style={styles.menuText}>Datenschutz</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
        </View>
        
        <View style={styles.versionCard}>
          <Ionicons name="phone-portrait-outline" size={24} color={colors.white} />
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
    marginLeft: 15,
  },
  versionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    justifyContent: 'center',
  },
  versionText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
    marginLeft: 10,
  },
});

