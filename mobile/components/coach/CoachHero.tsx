import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';

export interface CoachHeroProps {
  assessment: string;
  isPositive: boolean;
}

export const CoachHero: React.FC<CoachHeroProps> = ({ assessment, isPositive }) => {
  return (
    <View style={styles.container}>
      <View style={styles.orbContainer}>
        <Text style={styles.orbIcon}>🤖</Text>
        <View style={styles.glowOverlay} />
      </View>

      <Badge label="✦ AI ANALYSIS COMPLETE" variant="AI" style={styles.badge} />

      <Text variant="h2" color={colors.textPrimary} style={styles.assessmentTitle}>
        {assessment}
      </Text>
      <Text variant="caption" color={colors.textMuted} style={styles.assessmentSub}>
        Personalized performance mentor assessment based on scenario choice.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  orbContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  orbIcon: {
    fontSize: 28,
  },
  glowOverlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: 32,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
  },
  badge: {
    marginBottom: spacing.xs,
  },
  assessmentTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  assessmentSub: {
    fontSize: 11,
    textAlign: 'center',
    maxWidth: 300,
  },
});
