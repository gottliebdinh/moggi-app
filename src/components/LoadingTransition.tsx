import React, { useEffect, useState, useRef } from 'react';
import { View, Image, Dimensions, Animated } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');

interface LoadingTransitionProps {
  onFinish: () => void;
}

export default function LoadingTransition({ onFinish }: LoadingTransitionProps) {
  const [showLogo, setShowLogo] = useState(true);
  const videoOpacity = useRef(new Animated.Value(1)).current;
  
  const startTime = Date.now();
  console.log('[LoadingTransition] Component mounted at:', new Date().toISOString());
  
  // Video früher initialisieren und mit shouldPlay=true starten
  const player = useVideoPlayer(require('../../assets/videocompressed.mp4'), (player) => {
    console.log('[LoadingTransition] useVideoPlayer callback - player created');
    player.loop = false;
    player.muted = false;
    // Video sofort preloaden, auch wenn es noch nicht sichtbar ist
    console.log('[LoadingTransition] Preloading video...');
  });

  useEffect(() => {
    const effectStartTime = Date.now();
    console.log('[LoadingTransition] useEffect started, time since mount:', effectStartTime - startTime, 'ms');
    
    // Splash Screen verstecken
    SplashScreen.hideAsync();
    console.log('[LoadingTransition] SplashScreen hidden');

    let hideLogoTimeout: NodeJS.Timeout | null = null;
    let logoHidden = false;
    let videoReady = false;
    const MIN_LOGO_DISPLAY_TIME = 1000; // Mindestens 1 Sekunde Logo anzeigen
    const logoStartTime = Date.now();

    // Funktion zum Ausblenden des Logos und Video starten
    const hideLogoAndPlay = (reason: string) => {
      if (logoHidden) {
        console.log('[LoadingTransition] hideLogoAndPlay called again with reason:', reason, '- already hidden');
        return;
      }
      
      const elapsedTime = Date.now() - logoStartTime;
      const remainingTime = Math.max(0, MIN_LOGO_DISPLAY_TIME - elapsedTime);
      
      if (remainingTime > 0) {
        console.log('[LoadingTransition] ⏳ Logo muss noch', remainingTime, 'ms angezeigt werden (Mindestzeit: 1s)');
        // Warte noch die verbleibende Zeit, bevor Logo ausgeblendet wird
        setTimeout(() => {
          if (!logoHidden) {
            logoHidden = true;
            const hideTime = Date.now();
            console.log('[LoadingTransition] 🎬 HIDING LOGO & STARTING VIDEO - Reason:', reason, 'Time since mount:', hideTime - startTime, 'ms');
            setShowLogo(false);
            // Video SOFORT starten
            console.log('[LoadingTransition] 🎥 Starting video playback immediately');
            player.play();
          }
        }, remainingTime);
      } else {
        // Mindestzeit bereits erreicht, Logo sofort ausblenden
        logoHidden = true;
        const hideTime = Date.now();
        console.log('[LoadingTransition] 🎬 HIDING LOGO & STARTING VIDEO - Reason:', reason, 'Time since mount:', hideTime - startTime, 'ms');
        setShowLogo(false);
        // Video SOFORT starten
        console.log('[LoadingTransition] 🎥 Starting video playback immediately');
        player.play();
      }
    };

    // Video-Status überwachen: Sobald Video bereit ist, Logo ausblenden (mit Mindestzeit)
    const statusSubscription = player.addListener('statusChange', (status) => {
      const statusTime = Date.now();
      console.log('[LoadingTransition] 📹 Video status changed:', status.status, 'Time since mount:', statusTime - startTime, 'ms');
      
      if (status.status === 'readyToPlay') {
        console.log('[LoadingTransition] ✅ Video is READY TO PLAY');
        videoReady = true;
        // Video ist bereit, Logo ausblenden (mit Mindestzeit-Prüfung)
        hideLogoAndPlay('video-ready');
      } else if (status.status === 'loading') {
        console.log('[LoadingTransition] ⏳ Video is LOADING');
      } else if (status.status === 'error') {
        console.log('[LoadingTransition] ❌ Video ERROR:', status);
        hideLogoAndPlay('video-error');
      }
    });

    // Video NICHT sofort starten - erst wenn es bereit ist
    // Das Video wird automatisch geladen, wenn die Komponente gemountet wird
    console.log('[LoadingTransition] Waiting for video to be ready...');

    // Fallback: Logo nach maximal 10 Sekunden ausblenden (falls Video nie bereit wird)
    hideLogoTimeout = setTimeout(() => {
      console.log('[LoadingTransition] ⏰ Fallback timeout reached (10s)');
      if (!videoReady) {
        console.log('[LoadingTransition] ⚠️ Video not ready after 10s, forcing play');
        player.play();
      }
      hideLogoAndPlay('timeout-fallback');
    }, 10000);

    // Video-Ende überwachen - Smooth Fade-out zur Home-Seite
    const playToEndSubscription = player.addListener('playToEnd', () => {
      const endTime = Date.now();
      console.log('[LoadingTransition] 🏁 Video finished playing, total time:', endTime - startTime, 'ms');
      
      // Start App transition immediately (overlaps with video fade-out for smooth transition)
      onFinish();
      
      // Smooth Fade-out des Videos - synchronized with App fade-in
      // Duration matches App fade-in for perfect overlap
      Animated.timing(videoOpacity, {
        toValue: 0,
        duration: 800, // Match App fade-in duration
        useNativeDriver: true,
      }).start(() => {
        console.log('[LoadingTransition] Video faded out completely');
      });
    });

    return () => {
      console.log('[LoadingTransition] Cleanup');
      if (hideLogoTimeout) {
        clearTimeout(hideLogoTimeout);
      }
      statusSubscription.remove();
      playToEndSubscription.remove();
    };
  }, [player, onFinish]);

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Logo zentriert */}
      {showLogo && (
        <View style={{ position: 'absolute', zIndex: 5 }}>
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 180, height: 180, resizeMode: 'contain' }}
          />
        </View>
      )}

      {/* Intro Video - immer vorhanden, aber hinter Logo versteckt */}
      {/* VideoView sofort rendern, damit es früher lädt */}
      <Animated.View
        style={{
          position: 'absolute',
          width: width,
          height: height,
          zIndex: showLogo ? 1 : 5, // Hinter Logo wenn Logo sichtbar, sonst vorne
          opacity: videoOpacity,
        }}
      >
        <VideoView
          player={player}
          style={{
            width: width,
            height: height,
          }}
          contentFit="cover"
          nativeControls={false}
          allowsPictureInPicture={false}
        />
      </Animated.View>
    </View>
  );
}
