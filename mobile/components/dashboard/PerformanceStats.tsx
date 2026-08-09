import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface PerformanceStatsProps {
  overallScore: number;
  missionsCompleted: number;
  streak: number;
}

export const PerformanceStats: React.FC<PerformanceStatsProps> = ({
  overallScore,
  missionsCompleted,
  streak,
}) => {
  const stats = [
    { value: `${overallScore}%`, label: 'Overall Score', color: colors.accent, barWidth: '86%' },
    { value: `${missionsCompleted}`, label: 'Missions', color: colors.textPrimary, barWidth: '60%' },
    { value: `${streak} 🔥`, label: 'Day Streak', color: colors.warning, barWidth: '100%' },
  ];

  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
        YOUR PERFORMANCE
      </Text>

      <View style={styles.row}>
        {stats.map((item, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text variant="h2" color={item.color} style={styles.statValue}>
              {item.value}
            </Text>
            <Text variant="caption" color={colors.textMuted} style={styles.statLabel}>
              {item.label}
            </Text>
            <View style={styles.miniBarTrack}>
              <View style={[styles.miniBarFill, { width: item.barWidth as any, backgroundColor: item.color }]} />
            </View>
          </View>
        ))}
      </View>
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
  row: {
    flexDirection: 'row',
    gap: spacing.xs + 2,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  miniBarTrack: {
    height: 3,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  miniBarFill: {
    height: '100%',
    borderRadius: 1.5,
  },
});
