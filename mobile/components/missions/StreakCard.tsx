import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface StreakCardProps {
  streakDays: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({ streakDays }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>🔥</Text>
        </View>

        <View style={styles.infoBox}>
          <Text variant="h3" color={colors.textPrimary} style={styles.title}>
            {streakDays} DAY STREAK
          </Text>
          <Text variant="caption" color={colors.textMuted} style={styles.sub}>
            Complete at least one daily mission to maintain your streak.
          </Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    padding: spacing.md,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 20,
  },
  infoBox: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.8,
    color: colors.warning,
    marginBottom: 2,
  },
  sub: {
    fontSize: 11,
    lineHeight: 16,
  },
});
