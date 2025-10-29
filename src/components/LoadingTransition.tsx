import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

interface LoadingTransitionProps {
  onFinish: () => void;
}

export default function LoadingTransition({ onFinish }: LoadingTransitionProps) {
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const locationOpacity = useRef(new Animated.Value(0)).current;
  const locationScale = useRef(new Animated.Value(0.9)).current;
  const wipeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Splash Screen verstecken
    SplashScreen.hideAsync();

    const sequence = Animated.sequence([
      // Logo kurz anzeigen (1 Sekunde)
      Animated.delay(1000),
      
      // Übergang: Logo ausblenden
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      
      // Erster Wisch: Von links nach rechts, Location erscheint
      Animated.parallel([
        Animated.timing(wipeAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(locationOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(locationScale, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      
      // Location anzeigen (1 Sekunde)
      Animated.delay(1000),
      
      // Zweiter Wisch: Von links nach rechts, wischt alles weg und bleibt schwarz
      Animated.timing(wipeAnimation, {
        toValue: 2,
        duration: 600,
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
      {/* MOGGI Logo */}
      <Animated.View style={{
        position: 'absolute',
        opacity: logoOpacity,
      }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{
            width: 180,
            height: 180,
            resizeMode: 'contain',
          }}
        />
      </Animated.View>

      {/* Restaurant Location Teaser */}
      <Animated.View style={{
        position: 'absolute',
        opacity: locationOpacity,
        transform: [{ scale: locationScale }],
      }}>
        <Image
          source={require('../../assets/moggiLocation.png')}
          style={{
            width: width,
            height: height,
            resizeMode: 'cover',
          }}
        />
      </Animated.View>

      {/* Wisch-Animation: Eine Animation für beide Effekte */}
      <Animated.View style={{
        position: 'absolute',
        backgroundColor: '#000000',
        width: width,
        height: height,
        left: -width,
        opacity: wipeAnimation.interpolate({
          inputRange: [0, 0.0001, 0.9999, 1, 1.0001, 1.9999, 2],
          outputRange: [1, 1, 1, 0, 1, 1, 1], // Wischer ist während beider Phasen sichtbar
        }),
        transform: [{
          translateX: wipeAnimation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, width * 2, 0], // Beide Male von links nach rechts
          })
        }],
      }} />
    </View>
  );
}
