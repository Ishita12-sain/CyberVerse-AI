import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from './Text';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'AI';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  style,
}) => {
  return (
    <View style={[styles.base, styles[variant], style]}>
      <Text
        variant="caption"
        style={[styles.text, styles[`${variant}Text` as keyof typeof styles]]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.pill,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  text: {
    fontWeight: '600',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  // Default
  default: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: colors.border,
  },
  defaultText: {
    color: colors.textSecondary,
  },
  // Success
  success: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  successText: {
    color: colors.success,
  },
  // Warning
  warning: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  warningText: {
    color: colors.warning,
  },
  // Error
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  errorText: {
    color: colors.error,
  },
  // Info
  info: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  infoText: {
    color: colors.accent,
  },
  // AI
  AI: {
    backgroundColor: colors.badgeAiBackground,
    borderColor: colors.badgeAiBorder,
  },
  AIText: {
    color: colors.badgeAiText,
  },
});
