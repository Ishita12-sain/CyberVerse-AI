import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface StrengthsSectionProps {
  strengths: string[];
}

export const StrengthsSection: React.FC<StrengthsSectionProps> = ({ strengths }) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.accent} style={styles.sectionTitle}>
        ✦ WHAT YOU DID WELL
      </Text>

      <View style={styles.rowContainer}>
        {strengths.map((item, idx) => (
          <View key={idx} style={styles.strengthChip}>
            <Text style={styles.checkIcon}>✓</Text>
            <Text variant="caption" color={colors.textPrimary} style={styles.chipText}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  strengthChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    borderWidth: 1,
    borderRadius: borderRadius.small,
    paddingVertical: 5,
    paddingHorizontal: spacing.sm,
  },
  checkIcon: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '900',
    marginRight: 4,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
