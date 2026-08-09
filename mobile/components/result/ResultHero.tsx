import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { PerformanceLevel } from '../../data/result';

export interface ResultHeroProps {
  score: number;
  performanceLevel: PerformanceLevel;
}

export const ResultHero: React.FC<ResultHeroProps> = ({ score, performanceLevel }) => {
  const getBadgeColor = () => {
    switch (performanceLevel) {
      case 'EXCELLENT':
        return colors.accent;
      case 'GOOD':
        return colors.success;
      case 'NEEDS_IMPROVEMENT':
        return colors.warning;
      default:
        return colors.accent;
    }
  };

  return (
    <View style={styles.container}>
      {/* Outer Glow Ring */}
      <View style={styles.outerRing}>
        <View style={styles.innerRing}>
          <Text variant="h1" style={styles.scoreText}>
            {score}
          </Text>
          <Text variant="caption" color={colors.textMuted} style={styles.scoreLabel}>
            SCORE
          </Text>
        </View>
      </View>

      <View style={[styles.levelBadge, { borderColor: getBadgeColor() }]}>
        <Text variant="caption" color={getBadgeColor()} style={styles.levelBadgeText}>
          ✦ {performanceLevel.replace('_', ' ')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  outerRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderWidth: 3,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: spacing.xs + 2,
  },
  innerRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0D1322',
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  scoreLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: -2,
  },
  levelBadge: {
    paddingVertical: 3,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.pill,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 1,
  },
  levelBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
