import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No data available',
  message = 'There is nothing to display here right now.',
  actionText,
  onAction,
  icon,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text variant="h3" align="center">
        {title}
      </Text>
      <Text variant="body" align="center" style={styles.message}>
        {message}
      </Text>
      {actionText && onAction && (
        <Button
          title={actionText}
          variant="secondary"
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  message: {
    marginTop: spacing.xs,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  button: {
    minWidth: 160,
  },
});
