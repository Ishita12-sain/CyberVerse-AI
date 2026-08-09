import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { MOCK_ACHIEVEMENTS } from '../../data/achievements';

export interface ProfileAchievementsProps {
  onViewAllPress: () => void;
}

export const ProfileAchievementsSection: React.FC<ProfileAchievementsProps> = ({
  onViewAllPress,
}) => {
  const recentUnlocked = MOCK_ACHIEVEMENTS.filter((a) => a.isUnlocked).slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
          ACHIEVEMENTS
        </Text>
        <Pressable
          onPress={onViewAllPress}
          accessibilityRole="button"
          style={({ pressed }) => [pressed && styles.pressed]}
        >
          <Text variant="caption" color={colors.accent} style={styles.viewAllText}>
            VIEW ALL →
          </Text>
        </Pressable>
      </View>

      <View style={styles.grid}>
        {recentUnlocked.map((item) => (
          <View key={item.id} style={styles.chipCard}>
            <Text style={styles.icon}>{item.icon}</Text>
            <View style={styles.infoBox}>
              <Text variant="label" color={colors.textPrimary} style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text variant="caption" color={colors.success} style={styles.sub}>
                ✓ UNLOCKED
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
  grid: {
    gap: spacing.xs + 2,
  },
  chipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.25)',
    padding: spacing.xs + 4,
  },
  icon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  infoBox: {
    flex: 1,
  },
  title: {
    fontSize: 11,
    fontWeight: '800',
  },
  sub: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: 1,
  },
  pressed: {
    opacity: 0.75,
  },
});
