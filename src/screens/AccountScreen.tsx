import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import colors from '../theme/colors';

export default function AccountScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, signOut } = useAuth();
  const isLoggedIn = !!user;
  const [showLoginSuccessToast, setShowLoginSuccessToast] = useState(false);

  // Check für Login-Success Parameter
  useEffect(() => {
    const params = route.params as any;
    if (params?.showLoginSuccess) {
      setShowLoginSuccessToast(true);
      // Reset den Parameter
      navigation.setParams({ showLoginSuccess: undefined } as any);
      
      // Reset den Cart-Stack im Hintergrund durch kurzen unsichtbaren Tab-Wechsel
      // @ts-ignore
      const rootNavigator = navigation.getParent();
      if (rootNavigator) {
        // Nutze setParams um das zu signalisieren
        setTimeout(() => {
          // @ts-ignore - Navigiere zum Cart mit reset flag
          rootNavigator.navigate('Cart', { 
            screen: 'CartMain',
            params: { resetStack: true }
          });
          
          // Sofort zurück zum Account
          setTimeout(() => {
            rootNavigator.navigate('Account', {
              screen: 'AccountMain',
            });
          }, 10);
        }, 100);
      }
    }
  }, [route.params]);

  const baseMenuItems = [
    { id: '1', title: 'Meine Bestellungen', icon: 'receipt-outline', subtitle: 'Bestellhistorie ansehen', requiresLogin: true },
    { id: '2', title: 'Profil bearbeiten', icon: 'person-outline', subtitle: 'Name, E-Mail, etc.', requiresLogin: true },
    { id: '3', title: 'Hilfe & Support', icon: 'help-circle-outline', subtitle: 'FAQ & Kontakt' },
  ];

  // Füge "Abmelden" nur hinzu wenn User eingeloggt ist
  const menuItems = isLoggedIn 
    ? [...baseMenuItems, { id: '4', title: 'Abmelden', icon: 'log-out-outline', subtitle: '', isLogout: true }]
    : baseMenuItems;

  const handleMenuPress = (item: any) => {
    if (item.requiresLogin && !isLoggedIn) {
      (navigation.navigate as any)('Login');
      return;
    }

    if (item.isLogout) {
      Alert.alert(
        'Abmelden',
        'Möchtest du dich wirklich abmelden?',
        [
          { text: 'Abbrechen', style: 'cancel' },
          { 
            text: 'Abmelden', 
            style: 'destructive',
            onPress: async () => {
              await signOut();
              // Bleibe auf dem Account Screen
              // Die Checkout-Screens werden durch ihre eigenen useEffect hooks geschlossen
            }
          }
        ]
      );
      return;
    }

    // TODO: Handle other menu items
    Alert.alert(item.title, 'Diese Funktion wird bald verfügbar sein');
  };

  return (
    <View style={styles.container}>
      {/* Success Toast */}
      {showLoginSuccessToast && (
        <Toast 
          message="Erfolgreich angemeldet!"
          type="success"
          onHide={() => setShowLoginSuccessToast(false)}
        />
      )}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Konto</Text>
        <Text style={styles.headerSubtitle}>Verwalte dein Profil</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={colors.white} />
            </View>
            <View style={styles.profileInfo}>
              {isLoggedIn ? (
                <>
                  <Text style={styles.userName}>
                    {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                  </Text>
                  <Text style={styles.userEmail}>{user?.email}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.userName}>Gast</Text>
                  <Text style={styles.userEmail}>Noch nicht angemeldet</Text>
                  <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={() => (navigation.navigate as any)('Login')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.loginButtonText}>Jetzt anmelden</Text>
                    <Ionicons name="arrow-forward" size={16} color={colors.white} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  item.isLogout && styles.logoutItem,
                  index === menuItems.length - 1 && styles.lastMenuItem
                ]}
                activeOpacity={0.7}
                onPress={() => handleMenuPress(item)}
              >
                <View style={[
                  styles.iconContainer,
                  item.isLogout && styles.logoutIconContainer
                ]}>
                  <Ionicons 
                    name={item.icon as any} 
                    size={24} 
                    color={item.isLogout ? '#FF3B30' : colors.primary} 
                  />
                </View>
                <View style={styles.menuItemContent}>
                  <Text style={[
                    styles.menuItemTitle,
                    item.isLogout && styles.logoutText
                  ]}>
                    {item.title}
                  </Text>
                  {item.subtitle && (
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color={colors.mediumGray} 
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* App Version */}
          <Text style={styles.versionText}>MOGGI App v1.0.0</Text>
          
          {/* Signature */}
          <Text style={styles.signature}>
            Made with <Text style={styles.heart}>♥</Text> by Gottlieb Dinh
          </Text>
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
  profileCard: {
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 4,
    fontFamily: 'Georgia',
  },
  userEmail: {
    fontSize: 14,
    color: colors.lightGray,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
    alignSelf: 'flex-start',
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
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
    marginRight: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: colors.lightGray,
  },
  logoutItem: {
    marginTop: 1,
  },
  logoutIconContainer: {
    backgroundColor: '#FF3B30' + '20',
  },
  logoutText: {
    color: '#FF3B30',
  },
  versionText: {
    fontSize: 13,
    color: colors.mediumGray,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 4,
  },
  signature: {
    fontSize: 12,
    color: colors.mediumGray,
    textAlign: 'center',
    marginBottom: 8,
  },
  heart: {
    color: '#FF3B30',
  },
});

