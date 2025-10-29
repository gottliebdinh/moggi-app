import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ReservationSuccessScreen from '../screens/ReservationSuccessScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import ImprintScreen from '../screens/ImprintScreen';

// Theme
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const AccountStack = createNativeStackNavigator();
const MoreStack = createNativeStackNavigator();

// Home Stack Navigator (mit Contact und Reservation Screen)
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Contact" component={ContactScreen} />
      <HomeStack.Screen name="Reservation" component={ReservationScreen} />
      <HomeStack.Screen name="ReservationSuccess" component={ReservationSuccessScreen} />
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
  const navigation = useNavigation();
  const route = useRoute();
  
  React.useEffect(() => {
    // Wenn resetStack Parameter gesetzt ist, reset zu CartMain
    const params = route.params as any;
    if (params?.resetStack) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'CartMain' as never }],
      });
      // Clear parameter
      navigation.setParams({ resetStack: undefined } as any);
    }
  }, [route.params]);
  
  return (
    <CartStack.Navigator screenOptions={{ headerShown: false }}>
      <CartStack.Screen name="CartMain" component={CartScreen} />
      <CartStack.Screen name="OrderType" component={OrderTypeScreen} />
      <CartStack.Screen name="GuestCheckout" component={GuestCheckoutScreen} />
      <CartStack.Screen name="LoginCheckout" component={LoginCheckoutScreen} />
      <CartStack.Screen name="Register" component={RegisterScreen} />
      <CartStack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <CartStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <CartStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <CartStack.Screen name="Payment" component={PaymentScreen} />
      <CartStack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </CartStack.Navigator>
  );
}

// Account Stack Navigator (mit Login und Register Screen)
function AccountStackNavigator() {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name="AccountMain" component={AccountScreen} />
      <AccountStack.Screen name="Login" component={LoginScreen} />
      <AccountStack.Screen name="Register" component={RegisterScreen} />
      <AccountStack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
      <AccountStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AccountStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <AccountStack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <AccountStack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </AccountStack.Navigator>
  );
}

// More Stack Navigator (mit Contact, Privacy und Imprint Screen)
function MoreStackNavigator() {
  return (
    <MoreStack.Navigator screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="MoreMain" component={MoreScreen} />
      <MoreStack.Screen name="Contact" component={ContactScreen} />
      <MoreStack.Screen name="Privacy" component={PrivacyScreen} />
      <MoreStack.Screen name="Imprint" component={ImprintScreen} />
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
        component={AccountStackNavigator}
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

