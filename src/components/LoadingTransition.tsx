import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

interface LoadingTransitionProps {
  onFinish: () => void;
}

export default function LoadingTransition({ onFinish }: LoadingTransitionProps) {
  // Opacities
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const locationOpacity = useRef(new Animated.Value(1)).current; // sichtbar, wird durch Reveal-Wipe verdeckt

  // Wipe positions
  // Reveal overlay: starts covering the screen (x=0), moves to x=width to reveal content
  const revealX = useRef(new Animated.Value(0)).current;
  // Cover overlay: starts off-screen left (x=-width), moves to x=0 to cover screen
  const coverX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    // Splash Screen verstecken
    SplashScreen.hideAsync();

    const sequence = Animated.sequence([
      // Schwarzer Screen mit Logo länger anzeigen (1.8s)
      Animated.delay(1800),

      // Logo sanft ausblenden, danach erster Wisch startet (cleaner Übergang)
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(revealX, {
        toValue: width,
        duration: 650,
        useNativeDriver: true,
      }),

      // Location kurz stehen lassen (~1 Sekunde)
      Animated.delay(1000),

      // Zweiter Wisch: von links rein, bleibt schwarz
      Animated.timing(coverX, {
        toValue: 0,
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
      {/* Logo zentriert, blendet aus */}
      <Animated.View style={{ position: 'absolute', opacity: logoOpacity, zIndex: 5 }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 180, height: 180, resizeMode: 'contain' }}
        />
      </Animated.View>

      {/* Restaurant Location - wird durch Wisch freigegeben */}
      <Animated.View style={{
        position: 'absolute',
        width: width,
        height: height,
        opacity: locationOpacity,
        zIndex: 0,
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

      {/* Erster Wisch: von links nach rechts, Location erscheint */}
      <Animated.View style={{
        position: 'absolute',
        backgroundColor: '#000000',
        width: width,
        height: height,
        transform: [{ translateX: revealX }],
        zIndex: 2,
      }} />

      {/* Zweiter Wisch: von links nach rechts, wischt alles weg (endet schwarz) */}
      <Animated.View style={{
        position: 'absolute',
        backgroundColor: '#000000',
        width: width,
        height: height,
        transform: [{ translateX: coverX }],
        zIndex: 4,
      }} />
    </View>
  );
}
