import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';

export interface PerformanceBreakdownProps {
  correctPercentage: number;
  incorrectPercentage: number;
}

export const PerformanceBreakdown: React.FC<PerformanceBreakdownProps> = ({
  correctPercentage,
  incorrectPercentage,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
        PERFORMANCE BREAKDOWN
      </Text>

      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.item}>
            <Text variant="caption" color={colors.success} style={styles.label}>
              ✓ CORRECT
            </Text>
            <Text variant="h2" color={colors.success} style={styles.val}>
              {correctPercentage}%
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.item}>
            <Text variant="caption" color={colors.error} style={styles.label}>
              ✕ INCORRECT
            </Text>
            <Text variant="h2" color={colors.error} style={styles.val}>
              {incorrectPercentage}%
            </Text>
          </View>
        </View>

        {/* Dual Progress Track Bar */}
        <View style={styles.trackBackground}>
          <View style={[styles.correctTrack, { width: `${correctPercentage}%` }]} />
          <View style={[styles.incorrectTrack, { width: `${incorrectPercentage}%` }]} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  card: {
    backgroundColor: '#0D1322',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  item: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  val: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '900',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  trackBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  correctTrack: {
    height: '100%',
    backgroundColor: colors.success,
  },
  incorrectTrack: {
    height: '100%',
    backgroundColor: colors.error,
  },
});
