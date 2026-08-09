import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { HistoryMissionItem } from '../../data/history';

export interface HistoryListProps {
  missions: HistoryMissionItem[];
  onSelectMission: (mission: HistoryMissionItem) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  missions,
  onSelectMission,
}) => {
  if (missions.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text variant="caption" color={colors.textMuted}>
          No missions match the selected filters.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
        ALL MISSIONS ({missions.length})
      </Text>

      <View style={styles.listCard}>
        {missions.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onSelectMission(item)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.row, pressed && styles.pressed]}
          >
            <View style={styles.leftBox}>
              <Text style={[styles.statusIcon, { color: item.isCorrect ? colors.success : colors.error }]}>
                {item.isCorrect ? '✓' : '✕'}
              </Text>
              <View style={styles.infoBox}>
                <Text variant="label" color={colors.textPrimary} style={styles.title}>
                  {item.title}
                </Text>
                <Text variant="caption" color={colors.textMuted} style={styles.meta}>
                  {item.category} • {item.completedAt}
                </Text>
              </View>
            </View>

            <View style={styles.rightBox}>
              <Text
                variant="label"
                color={item.isCorrect ? colors.success : colors.error}
                style={styles.scoreText}
              >
                {item.score} SCORE
              </Text>
              <Text variant="caption" color={colors.accent} style={styles.xpText}>
                +{item.xpEarned} XP
              </Text>
            </View>
          </Pressable>
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
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  emptyState: {
    padding: spacing.lg,
    alignItems: 'center',
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
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: spacing.xs,
  },
  statusIcon: {
    fontSize: 16,
    fontWeight: '900',
    marginRight: spacing.sm,
  },
  infoBox: {
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
  rightBox: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '900',
  },
  xpText: {
    fontSize: 10,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
});
