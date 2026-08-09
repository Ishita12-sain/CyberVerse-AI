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
import { spacing, borderRadius } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
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
  const { colors: activeColors } = useTheme();
  const isInteractive = !disabled && !loading;

  const variantViewStyles: Record<ButtonVariant, ViewStyle> = {
    primary: { backgroundColor: activeColors.primary },
    secondary: { backgroundColor: activeColors.secondary },
    outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: activeColors.border },
    ghost: { backgroundColor: 'transparent' },
    danger: { backgroundColor: activeColors.error },
  };

  const variantPressedViewStyles: Record<ButtonVariant, ViewStyle> = {
    primary: { backgroundColor: activeColors.primaryDark },
    secondary: { backgroundColor: activeColors.secondaryDark },
    outline: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: activeColors.textMuted },
    ghost: { backgroundColor: 'rgba(255, 255, 255, 0.05)' },
    danger: { backgroundColor: activeColors.error },
  };

  const variantTextStyles: Record<ButtonVariant, TextStyle> = {
    primary: { color: activeColors.textInverse },
    secondary: { color: activeColors.textPrimary },
    outline: { color: activeColors.textPrimary },
    ghost: { color: activeColors.textSecondary },
    danger: { color: activeColors.textPrimary },
  };

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
          color={variant === 'outline' || variant === 'ghost' ? activeColors.primary : activeColors.textPrimary}
        />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text
            variant="label"
            style={[
              variantTextStyles[variant],
              disabled ? { color: activeColors.textMuted } : null,
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
});
