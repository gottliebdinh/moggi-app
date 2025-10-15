import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import colors from '../theme/colors';

type DishParams = {
  dish: {
    name: string;
    description: string;
    price: string;
    image: string;
    tags?: string[];
  };
  categoryName: string;
};

export default function DishDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { dish, categoryName } = route.params as DishParams;
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${dish.name}-${Date.now()}-${i}`,
        name: dish.name,
        description: dish.description,
        price: dish.price,
        image: dish.image,
        category: categoryName,
      });
    }
    
    // Zurück zur Kategorie-Seite
    navigation.goBack();
  };

  const totalPrice = (parseFloat(dish.price.replace(',', '.')) * quantity).toFixed(2).replace('.', ',');

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={28} color={colors.white} />
        </TouchableOpacity>

        {dish.image && !dish.image.includes('Akari.png') && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: dish.image }}
              style={styles.dishImage}
              resizeMode="cover"
            />
            {dish.tags && dish.tags.length > 0 && (
              <View style={styles.tagsOverlay}>
                {dish.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={[styles.content, (!dish.image || dish.image.includes('Akari.png')) && styles.contentNoImage]}>
          <View style={styles.dishHeader}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <Text style={styles.dishPrice}>{dish.price}</Text>
          </View>

          {dish.description && (
            <Text style={styles.dishDescription}>{dish.description}</Text>
          )}

          {(!dish.image || dish.image.includes('Akari.png')) && dish.tags && dish.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {dish.tags.map((tag, index) => (
                <View key={index} style={styles.tagInline}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Menge</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decreaseQuantity}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={24} color={colors.white} />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={increaseQuantity}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerLabel}>Gesamt</Text>
          <Text style={styles.footerPrice}>{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Ionicons name="cart" size={24} color={colors.white} />
          <Text style={styles.addButtonText}>In den Warenkorb</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  dishImage: {
    width: '100%',
    height: 300,
    backgroundColor: colors.black,
  },
  tagsOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  content: {
    padding: 24,
  },
  contentNoImage: {
    paddingTop: 80,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  dishName: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    flex: 1,
    marginRight: 16,
  },
  dishPrice: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
  },
  dishDescription: {
    fontSize: 15,
    color: colors.lightGray,
    lineHeight: 22,
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  tagInline: {
    backgroundColor: 'rgba(255, 107, 0, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  divider: {
    height: 2,
    backgroundColor: colors.primary,
    marginVertical: 20,
    width: 60,
    borderRadius: 2,
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.lightGray,
    marginBottom: 16,
    fontFamily: 'Georgia',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.white,
    fontFamily: 'Georgia',
    minWidth: 50,
    textAlign: 'center',
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
  footerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  footerLabel: {
    fontSize: 18,
    color: colors.lightGray,
    fontWeight: '600',
  },
  footerPrice: {
    fontSize: 32,
    fontWeight: '300',
    color: colors.primary,
    fontFamily: 'Georgia',
  },
  addButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
});

