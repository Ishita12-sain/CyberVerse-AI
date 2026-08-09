import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface MissionHeaderProps {
  missionNumber: number;
  totalMissions: number;
  onBackPress: () => void;
}

export const MissionHeader: React.FC<MissionHeaderProps> = ({
  missionNumber,
  totalMissions,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onBackPress}
        accessibilityRole="button"
        accessibilityLabel="Back"
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
      >
        <Text variant="label" color={colors.accent} style={styles.backText}>
          ← BACK
        </Text>
      </Pressable>

      <View style={styles.centerBadge}>
        <Text variant="caption" color={colors.textSecondary} style={styles.missionNumberText}>
          MISSION 0{missionNumber} / 0{totalMissions}
        </Text>
      </View>

      <View style={styles.rightSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  backButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  backText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  centerBadge: {
    paddingVertical: 3,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  missionNumberText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  rightSpacer: {
    width: 60,
  },
  pressed: {
    opacity: 0.75,
  },
});
