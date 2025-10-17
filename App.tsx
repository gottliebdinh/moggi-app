import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { STRIPE_PUBLISHABLE_KEY, APPLE_PAY_MERCHANT_ID } from './src/config/stripe';
import * as Linking from 'expo-linking';

const linking = {
  prefixes: ['moggiapp://', 'exp://192.168.178.25:8081/--/'],
  config: {
    screens: {
      Account: {
        screens: {
          ResetPassword: 'reset-password',
        },
      },
    },
  },
};

export default function App() {
  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier={APPLE_PAY_MERCHANT_ID}
    >
      <AuthProvider>
        <CartProvider>
          <NavigationContainer linking={linking}>
            <StatusBar style="auto" />
            <BottomTabNavigator />
          </NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </StripeProvider>
  );
}
