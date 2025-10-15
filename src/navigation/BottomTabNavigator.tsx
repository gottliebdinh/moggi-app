import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useCart } from '../context/CartContext';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import MoreScreen from '../screens/MoreScreen';
import ContactScreen from '../screens/ContactScreen';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import DishDetailScreen from '../screens/DishDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderTypeScreen from '../screens/OrderTypeScreen';
import GuestCheckoutScreen from '../screens/GuestCheckoutScreen';
import LoginCheckoutScreen from '../screens/LoginCheckoutScreen';
import PaymentScreen from '../screens/PaymentScreen';

// Theme
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();

// Home Stack Navigator (mit Contact Screen)
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Contact" component={ContactScreen} />
    </HomeStack.Navigator>
  );
}

// Products Stack Navigator (mit CategoryDetail und DishDetail Screen)
function ProductsStackNavigator() {
  return (
    <ProductsStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductsStack.Screen name="ProductsMain" component={ProductsScreen} />
      <ProductsStack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
      <ProductsStack.Screen name="DishDetail" component={DishDetailScreen} />
    </ProductsStack.Navigator>
  );
}

// Cart Stack Navigator (mit Checkout Flow)
function CartStackNavigator() {
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="CartMain" component={CartScreen} />
      <CartStack.Screen name="OrderType" component={OrderTypeScreen} />
      <CartStack.Screen name="GuestCheckout" component={GuestCheckoutScreen} />
      <CartStack.Screen name="LoginCheckout" component={LoginCheckoutScreen} />
      <CartStack.Screen name="Payment" component={PaymentScreen} />
    </CartStack.Navigator>
  );
}

// More Stack Navigator (mit Contact Screen)
function MoreStackNavigator() {
  return (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="MoreMain" component={MoreScreen} />
      <MoreStack.Screen name="Contact" component={ContactScreen} />
    </MoreStack.Navigator>
  );
}

export default function BottomTabNavigator() {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightGray,
        tabBarStyle: {
          backgroundColor: colors.black,
          borderTopWidth: 0.5,
          borderTopColor: colors.darkGray,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '400',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: -4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
          <Tab.Screen
            name="Products"
            component={ProductsStackNavigator}
            options={{
              tabBarLabel: 'Speisekarte',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "restaurant" : "restaurant-outline"}
                  size={22}
                  color={color}
                />
              ),
            }}
          />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarLabel: 'Warenkorb',
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "cart" : "cart-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Konto',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "person-circle" : "person-circle-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigator}
        options={{
          tabBarLabel: 'Mehr',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "menu" : "menu-outline"} 
              size={22} 
              color={color} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

