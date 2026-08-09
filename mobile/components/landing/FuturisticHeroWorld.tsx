import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';

const { width } = Dimensions.get('window');
const HERO_VISUAL_ASSET = require('../../assets/cyberverse_hero_visual.png');

export const FuturisticHeroWorld: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(0.85)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for AI Core
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating HUD movement
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={HERO_VISUAL_ASSET}
        style={styles.heroImage}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        {/* Subtle Dark Vignette & Gradient Overlays */}
        <View style={styles.vignetteOverlay} />

        {/* Floating Futuristic HUD Badges */}
        <Animated.View
          style={[
            styles.hudBadgeLeft,
            { transform: [{ translateY: floatAnim }] },
          ]}
        >
          <View style={styles.statusDot} />
          <Text variant="caption" color="#22D3EE" style={styles.hudText}>
            SIMULATION ONLINE
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.hudBadgeRight,
            {
              transform: [
                {
                  translateY: floatAnim.interpolate({
                    inputRange: [-6, 0],
                    outputRange: [0, -6],
                  }),
                },
              ],
            },
          ]}
        >
          <Text variant="caption" color="#A855F7" style={styles.hudText}>
            ✦ AI COACH ACTIVE
          </Text>
        </Animated.View>

        {/* Center Glowing Core Portal Accent */}
        <Animated.View
          style={[
            styles.centerCoreGlow,
            { opacity: pulseAnim, transform: [{ scale: pulseAnim }] },
          ]}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
    marginVertical: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    backgroundColor: '#04060E',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    opacity: 0.85,
    borderRadius: borderRadius.large,
  },
  vignetteOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(6, 8, 17, 0.35)',
  },
  hudBadgeLeft: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'rgba(11, 16, 29, 0.85)',
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: 'rgba(34, 211, 238, 0.4)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22D3EE',
    marginRight: spacing.xs,
  },
  hudBadgeRight: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'rgba(11, 16, 29, 0.85)',
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.4)',
  },
  hudText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  centerCoreGlow: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.4)',
  },
});
