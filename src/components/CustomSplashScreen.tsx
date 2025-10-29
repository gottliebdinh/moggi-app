import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';

const { width, height } = Dimensions.get('window');

export default function CustomSplashScreen({ onFinish }: { onFinish: () => void }) {
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const locationOpacity = useRef(new Animated.Value(0)).current;
  const locationScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      // Logo anzeigen (2 Sekunden)
      Animated.delay(2000),
      
      // Logo ausblenden, Location einblenden
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(locationOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(locationScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      
      // Location kurz anzeigen (1.5 Sekunden)
      Animated.delay(1500),
      
      // Location ausblenden
      Animated.timing(locationOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);

    sequence.start(() => {
      onFinish();
    });
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Logo */}
      <Animated.View style={{
        position: 'absolute',
        opacity: logoOpacity,
      }}>
        <Image
          source={require('../assets/logo.png')}
          style={{
            width: 200,
            height: 200,
            resizeMode: 'contain',
          }}
        />
      </Animated.View>

      {/* Restaurant Location */}
      <Animated.View style={{
        position: 'absolute',
        opacity: locationOpacity,
        transform: [{ scale: locationScale }],
      }}>
        <Image
          source={require('../assets/moggiLocation.webp')}
          style={{
            width: width * 0.8,
            height: height * 0.6,
            resizeMode: 'contain',
          }}
        />
      </Animated.View>
    </View>
  );
}
