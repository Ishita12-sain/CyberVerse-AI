import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface KeyTakeawayProps {
  takeaway: string;
}

export const KeyTakeaway: React.FC<KeyTakeawayProps> = ({ takeaway }) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
        KEY TAKEAWAY
      </Text>

      <View style={styles.card}>
        <Text style={styles.icon}>💡</Text>
        <Text variant="body" color={colors.textPrimary} style={styles.takeawayText}>
          {takeaway}
        </Text>
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: spacing.md - 2,
  },
  icon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },
  takeawayText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
  },
});
