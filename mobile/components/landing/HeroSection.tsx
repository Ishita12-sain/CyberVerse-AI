import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';

export const HeroSection: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
    >
      <Badge
        label="✦ ENTER THE CYBERVERSE"
        variant="AI"
        style={styles.eyebrow}
      />

      <View style={styles.titleContainer}>
        <Text variant="display" align="center" style={styles.titleLine}>
          MASTER THE
        </Text>
        <Text variant="display" align="center" style={styles.titleLine}>
          ART OF
        </Text>
        <Text variant="display" align="center" style={styles.titleGradient}>
          WORKPLACE
        </Text>
        <Text variant="display" align="center" style={styles.titleGradient}>
          DECISIONS
        </Text>
      </View>

      <Text variant="body" align="center" style={styles.subheadline}>
        Simulate. Decide. Learn.
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  eyebrow: {
    marginBottom: spacing.xs,
    borderColor: 'rgba(168, 85, 247, 0.45)',
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
  },
  titleContainer: {
    marginBottom: spacing.xs,
    alignItems: 'center',
  },
  titleLine: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    letterSpacing: 0.5,
    color: colors.textPrimary,
  },
  titleGradient: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    letterSpacing: 0.5,
    color: '#A855F7', // Electric purple highlight
    textShadowColor: 'rgba(168, 85, 247, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subheadline: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
