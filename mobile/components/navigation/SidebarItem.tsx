import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface SidebarItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
  isDanger?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive,
  onPress,
  isDanger,
}) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.container,
        isActive && styles.activeContainer,
        isDanger && styles.dangerContainer,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text
        variant="bodyMedium"
        color={
          isDanger
            ? colors.error
            : isActive
            ? colors.textPrimary
            : colors.textSecondary
        }
        style={[styles.label, isActive && styles.activeLabel]}
      >
        {label}
      </Text>
      {isActive && <View style={styles.activeGlowBar} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.medium,
    marginVertical: 2,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  activeContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.35)',
  },
  dangerContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.06)',
  },
  icon: {
    fontSize: 16,
    marginRight: spacing.md - 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  activeLabel: {
    fontWeight: '900',
    color: '#FFFFFF',
  },
  activeGlowBar: {
    position: 'absolute',
    left: 0,
    top: 6,
    bottom: 6,
    width: 3.5,
    borderRadius: 2,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.8,
  },
});
