import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext';
import colors from '../theme/colors';

type MenuItem = {
  id: string;
  name: string;
  isHeader?: boolean;
  image?: string;
};

// Menu items with translated headers
const getMenuItems = (t: (key: string) => string): MenuItem[] => [
  // Highlights
  { id: 'h1', name: t('products.highlights'), isHeader: true },
  { 
    id: '1', 
    name: t('category.newIn'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e6468c60b7433914f4ed13_DSC02799.png'
  },
  { 
    id: '2', 
    name: t('category.businessLunch'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e391eea750278df0d297e4_Lunch%20Bento%20Box%20Fisch.png'
  },
  
  // Kleine Gerichte
  { id: 'h2', name: t('products.smallDishes'), isHeader: true },
  { 
    id: '3', 
    name: t('category.tapasMeat'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37626a9f1c4aefba3d119_Akari.png'
  },
  { 
    id: '4', 
    name: t('category.tapasFish'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e3782fdbb3b714e3872e00_Crabbombs.png'
  },
  { 
    id: '5', 
    name: t('category.tapasVegetarian'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37d60b68f6d067e35a0fd_Spicy%20Cucumber%20Salat.png'
  },
  { 
    id: '6', 
    name: t('category.sticks'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37704b8e3dea86bdbd1e8_Asupara%20Sticks.png'
  },
  { 
    id: '7', 
    name: t('category.crisps'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e3783fa9f1c4aefba47c91_Crisps%20Guacamole.png'
  },
  
  // Fusion Specials
  { id: 'h3', name: t('products.fusionSpecials'), isHeader: true },
  { 
    id: '8', 
    name: t('category.baos'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e377b6b61b875b047e95db_Bao%20Beef.png'
  },
  { 
    id: '9', 
    name: t('category.noriTacos'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c8c03a0f0ca50c7f4e7_Sake%20Taco.png'
  },
  
  // Sushi
  { id: 'h4', name: t('products.sushi'), isHeader: true },
  { 
    id: '10', 
    name: t('category.sashimi'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b0f3e9ddd9337e99e61_Maguro%20to%20Sake.png'
  },
  { 
    id: '11', 
    name: t('category.nigiri'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c4890174fa0f9a7add7_Sake.png'
  },
  { 
    id: '12', 
    name: t('category.hosomaki'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37c6e878de12a8d9580f2_Sake%20Hoso.png'
  },
  { 
    id: '13', 
    name: t('category.uramaki'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37644902977171d5faf52_Alasuka%20Roll.png'
  },
  { 
    id: '14', 
    name: t('category.specialRoll'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37805b68f6d067e319a13_Chihiro%20Roll.png'
  },
  { 
    id: '15', 
    name: t('category.crispyRolls'),
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e391c8bb933e1d4e0e1d8b_Crispy%20Bini.png'
  },
  
  // Beilagen & More
  { id: 'h5', name: t('products.sides'), isHeader: true },
  { 
    id: '16', 
    name: 'Salat',
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e391b7ea20c58b003f8ef2_Avocado%20Salad%20Kopie.png'
  },
  { 
    id: '18', 
    name: 'Dessert',
    image: 'https://cdn.prod.website-files.com/68e0a5df489d43d06d4efb63/68e37b58752a400737537906_Mochi%20Trio.png'
  },
  { 
    id: '17', 
    name: 'Sides'
  },
];

export default function ProductsScreen() {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const menuItems = getMenuItems(t);

  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate('CategoryDetail' as never, { categoryName } as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('products.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('products.subtitle')}</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {menuItems.map((item) => {
            if (item.isHeader) {
              return (
                <View key={item.id} style={styles.headerSection}>
                  <View style={styles.headerDivider} />
                  <Text style={styles.headerSectionTitle}>{item.name}</Text>
                </View>
              );
            }
            
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={() => handleCategoryPress(item.name)}
              >
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                )}
                <Text style={styles.menuItemText}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.mediumGray} />
              </TouchableOpacity>
            );
          })}
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
  headerSection: {
    marginTop: 24,
    marginBottom: 12,
  },
  headerDivider: {
    height: 3,
    width: 50,
    backgroundColor: colors.primary,
    marginBottom: 12,
    borderRadius: 2,
  },
  headerSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
  },
  menuItem: {
    backgroundColor: colors.black,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.darkGray,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 16,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.black,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Georgia',
    fontWeight: '300',
    flex: 1,
  },
});
