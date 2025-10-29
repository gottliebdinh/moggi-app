import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import colors from '../theme/colors';

export default function CartScreen() {
  const navigation = useNavigation();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLanguage();

  const totalPrice = getTotalPrice().toFixed(2).replace('.', ',');

  if (items.length === 0) {
    return (
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('cart.title')}</Text>
          <Text style={styles.headerSubtitle}>{t('cart.subtitle')}</Text>
        </View>
        
        <View style={styles.content}>
          <View style={styles.emptyCart}>
            <View style={styles.iconCircle}>
              <Ionicons name="cart-outline" size={48} color={colors.primary} />
            </View>
            <Text style={styles.emptyText}>{t('cart.empty')}</Text>
            <Text style={styles.emptySubtext}>{t('cart.emptySubtext')}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('cart.title')}</Text>
        <Text style={styles.headerSubtitle}>{items.length} {t('cart.items')}</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentWithItems}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {items.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <View style={styles.itemControls}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButtonSmall}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="remove" size={18} color={colors.white} />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityTextSmall}>{item.quantity}</Text>
                  
                  <TouchableOpacity
                    style={styles.quantityButtonSmall}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="add" size={18} color={colors.white} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeFromCart(item.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearCart}
            activeOpacity={0.7}
          >
            <Ionicons name="trash-outline" size={20} color={colors.white} />
            <Text style={styles.clearButtonText}>{t('cart.clear')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>{t('cart.total')}</Text>
          <Text style={styles.totalPrice}>{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          activeOpacity={0.8}
          onPress={() => {
            // Wenn eingeloggt: direkt zur Abholzeit
            // Wenn nicht eingeloggt: OrderType Screen (Login oder Gast wählen)
            if (user) {
              (navigation.navigate as any)('GuestCheckout');
            } else {
              (navigation.navigate as any)('OrderType');
            }
          }}
        >
          <Ionicons name="checkmark-circle" size={24} color={colors.white} />
          <Text style={styles.checkoutButtonText}>{t('cart.checkout')}</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  scrollContentWithItems: {
    paddingBottom: 240,
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
  content: {
    padding: 16,
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    backgroundColor: colors.black,
    borderRadius: 16,
    padding: 40,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '300',
    color: colors.white,
    marginBottom: 8,
    fontFamily: 'Georgia',
  },
  emptySubtext: {
    fontSize: 16,
    color: colors.lightGray,
    textAlign: 'center',
  },
  cartItem: {
    backgroundColor: colors.black,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.darkGray,
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.black,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
    color: colors.mediumGray,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.primary,
    fontFamily: 'Georgia',
  },
  itemControls: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButtonSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityTextSmall: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    minWidth: 24,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 8,
  },
  clearButton: {
    backgroundColor: colors.darkGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.mediumGray,
  },
  clearButtonText: {
    fontSize: 16,
    color: colors.white,
  },
  footer: {
    position: 'absolute',
    bottom: 85,
    left: 0,
    right: 0,
    backgroundColor: colors.black,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.darkGray,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    color: colors.lightGray,
    fontFamily: 'Georgia',
  },
  totalPrice: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.primary,
    fontFamily: 'Georgia',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
});
