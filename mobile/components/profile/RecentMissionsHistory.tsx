import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface RecentMissionsProps {
  missions: {
    id: string;
    title: string;
    category: string;
    score: number;
    completedAt: string;
    isCorrect: boolean;
  }[];
  onViewAllPress?: () => void;
}

export const RecentMissionsHistory: React.FC<RecentMissionsProps> = ({
  missions,
  onViewAllPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
          MISSION HISTORY
        </Text>
        {onViewAllPress && (
          <Pressable
            onPress={onViewAllPress}
            accessibilityRole="button"
            style={({ pressed }) => [pressed && styles.pressed]}
          >
            <Text variant="caption" color={colors.accent} style={styles.viewAllText}>
              VIEW ALL →
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.listCard}>
        {missions.map((m) => (
          <View key={m.id} style={styles.row}>
            <View style={styles.leftInfo}>
              <Text variant="label" color={colors.textPrimary} style={styles.title}>
                {m.title}
              </Text>
              <Text variant="caption" color={colors.textMuted} style={styles.meta}>
                {m.category} • {m.completedAt}
              </Text>
            </View>

            <View style={styles.rightBadge}>
              <Text
                variant="label"
                color={m.isCorrect ? colors.success : colors.error}
                style={styles.scoreText}
              >
                {m.score}%
              </Text>
              <Text
                variant="caption"
                color={m.isCorrect ? colors.success : colors.error}
                style={styles.statusText}
              >
                {m.isCorrect ? 'PASS' : 'FAIL'}
              </Text>
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
    marginBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  viewAllText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  pressed: {
    opacity: 0.75,
  },
  listCard: {
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs + 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  leftInfo: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
  },
  meta: {
    fontSize: 10,
    marginTop: 1,
  },
  rightBadge: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 13,
    fontWeight: '900',
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
  },
});
