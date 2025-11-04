import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import LoadingTransition from './src/components/LoadingTransition';
import { STRIPE_PUBLISHABLE_KEY, APPLE_PAY_MERCHANT_ID } from './src/config/stripe';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { Animated, View } from 'react-native';

// Splash Screen verhindern, dass es automatisch verschwindet
SplashScreen.preventAutoHideAsync();

// Preload HomeScreen Assets - lokale Assets werden automatisch gecacht
const preloadHomeAssets = () => {
  console.log('[App] Preloading HomeScreen assets...');
  // Lokale Assets werden automatisch gecacht, wenn sie das erste Mal geladen werden
  // Wir können sie einfach einmal laden, damit sie im Cache sind
  try {
    // Diese require() Statements laden die Assets in den Cache
    require('./assets/logo.png');
    require('./assets/quan.webp');
    require('./assets/ryohey.webp');
    console.log('[App] HomeScreen assets preloaded');
  } catch (error) {
    console.log('[App] Error preloading assets:', error);
  }
};

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
  const [isLoading, setIsLoading] = useState(true);
  const [showApp, setShowApp] = useState(false); // App erst rendern wenn ready
  const appOpacity = useRef(new Animated.Value(0)).current;
  const appScale = useRef(new Animated.Value(0.98)).current; // Subtle scale for smoothness

  // Start loading the app immediately (while video is playing)
  // This ensures all images and components are loaded in the background
  React.useEffect(() => {
    // Preload HomeScreen assets while video is playing
    preloadHomeAssets();
  }, []);

  const handleLoadingFinish = () => {
    console.log('[App] Video finished, starting smooth transition...');
    
    // App jetzt rendern (aber noch unsichtbar)
    setShowApp(true);
    
    // Start fade-in and scale-in of the app immediately - no delay
    // This creates a smooth, polished transition
    Animated.parallel([
      Animated.timing(appOpacity, {
        toValue: 1,
        duration: 800, // Slightly longer for smoother feel
        useNativeDriver: true,
      }),
      Animated.timing(appScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log('[App] Transition complete');
      setIsLoading(false);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Video/Loading Screen - wird ausgeblendet */}
      {isLoading && (
        <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 10 }}>
          <LoadingTransition onFinish={handleLoadingFinish} />
        </View>
      )}

      {/* App - wird erst gerendert wenn ready, dann smooth eingeblendet */}
      {showApp && (
        <Animated.View 
          style={{ 
            flex: 1, 
            opacity: appOpacity, 
            backgroundColor: '#000000',
            transform: [{ scale: appScale }],
          }}
        >
          <LanguageProvider>
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
          </LanguageProvider>
        </Animated.View>
      )}
    </View>
  );
}
