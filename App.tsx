import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CartProvider } from './src/context/CartContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { STRIPE_PUBLISHABLE_KEY, APPLE_PAY_MERCHANT_ID } from './src/config/stripe';

export default function App() {
  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier={APPLE_PAY_MERCHANT_ID}
    >
      <CartProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <BottomTabNavigator />
        </NavigationContainer>
      </CartProvider>
    </StripeProvider>
  );
}
