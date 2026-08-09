import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { ProgressBar } from '../ui/ProgressBar';

export interface DailyProgressBarProps {
  completed: number;
  total: number;
}

export const DailyProgressBar: React.FC<DailyProgressBarProps> = ({
  completed,
  total,
}) => {
  const percentage = Math.min(100, Math.round((completed / total) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text variant="caption" color={colors.textMuted} style={styles.label}>
            TODAY'S PROGRESS
          </Text>
          <Text
            variant="label"
            color={completed === total ? colors.success : colors.accent}
            style={styles.valText}
          >
            {completed} / {total} COMPLETED
          </Text>
        </View>

        <ProgressBar progress={percentage} variant="default" height={8} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  valText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
