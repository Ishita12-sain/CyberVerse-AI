import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  PressableProps,
  View,
  StyleProp,
} from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const variantViewStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: colors.error },
};

const variantPressedViewStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: '#4F46E5' },
  secondary: { backgroundColor: '#7C3AED' },
  outline: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: colors.textMuted },
  ghost: { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
  danger: { backgroundColor: '#DC2626' },
};

const variantTextStyles: Record<ButtonVariant, TextStyle> = {
  primary: { color: colors.textPrimary },
  secondary: { color: colors.textPrimary },
  outline: { color: colors.textPrimary },
  ghost: { color: colors.textSecondary },
  danger: { color: colors.textPrimary },
};

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  onPress,
  ...props
}) => {
  const isInteractive = !disabled && !loading;

  return (
    <Pressable
      onPress={isInteractive ? onPress : undefined}
      disabled={!isInteractive}
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        variantViewStyles[variant],
        pressed && isInteractive ? variantPressedViewStyles[variant] : null,
        disabled ? styles.disabled : null,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.textPrimary}
        />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text
            variant="label"
            style={[
              variantTextStyles[variant],
              disabled ? styles.disabledText : null,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.textMuted,
  },
});
