import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';

export interface PerformanceOverviewGridProps {
  completed: number;
  avgScore: number;
  accuracy: number;
  totalXP: number;
}

export const PerformanceOverviewGrid: React.FC<PerformanceOverviewGridProps> = ({
  completed,
  avgScore,
  accuracy,
  totalXP,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Card style={styles.card}>
          <Text variant="caption" color={colors.textMuted} style={styles.label}>
            COMPLETED
          </Text>
          <Text variant="h2" color={colors.textPrimary} style={styles.val}>
            {completed}
          </Text>
          <Text variant="caption" color={colors.accent} style={styles.sub}>
            ✦ MISSIONS
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="caption" color={colors.textMuted} style={styles.label}>
            AVG SCORE
          </Text>
          <Text variant="h2" color={colors.primary} style={styles.val}>
            {avgScore}%
          </Text>
          <Text variant="caption" color={colors.textMuted} style={styles.sub}>
            ACCROSS ALL ROLES
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="caption" color={colors.textMuted} style={styles.label}>
            ACCURACY
          </Text>
          <Text variant="h2" color={colors.success} style={styles.val}>
            {accuracy}%
          </Text>
          <Text variant="caption" color={colors.success} style={styles.sub}>
            CORRECT DECISIONS
          </Text>
        </Card>

        <Card style={styles.card}>
          <Text variant="caption" color={colors.textMuted} style={styles.label}>
            TOTAL XP
          </Text>
          <Text variant="h2" color={colors.accent} style={styles.val}>
            {totalXP.toLocaleString()}
          </Text>
          <Text variant="caption" color={colors.accent} style={styles.sub}>
            EARNED XP
          </Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  card: {
    flex: 1,
    minWidth: '46%',
    backgroundColor: '#0D1322',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    padding: spacing.sm + 2,
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  val: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  sub: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
});
