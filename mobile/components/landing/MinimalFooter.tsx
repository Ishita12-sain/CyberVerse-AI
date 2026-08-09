import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Text } from '../ui/Text';

export const MinimalFooter: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="label" color={colors.textSecondary} style={styles.brand}>
        CYBERVERSE <Text variant="label" color={colors.accent}>AI</Text>
      </Text>
      <Text variant="caption" color={colors.textMuted} style={styles.tagline}>
        Practice. Decide. Grow.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs + 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.04)',
    marginTop: spacing.xs,
  },
  brand: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 10,
    marginTop: 2,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
