import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  retryText = 'Try Again',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text variant="h3" color={colors.error} align="center">
        {title}
      </Text>
      <Text variant="body" align="center" style={styles.message}>
        {message}
      </Text>
      {onRetry && (
        <Button
          title={retryText}
          variant="outline"
          onPress={onRetry}
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
  message: {
    marginTop: spacing.sm,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  button: {
    minWidth: 140,
  },
});
