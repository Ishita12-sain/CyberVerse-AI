import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { DecisionImpactData } from '../../data/result';

export interface DecisionImpactProps {
  impact: DecisionImpactData;
}

export const DecisionImpact: React.FC<DecisionImpactProps> = ({ impact }) => {
  const items = [
    { label: 'RISK', val: impact.risk, color: colors.warning },
    { label: 'COMMUNICATION', val: impact.communication, color: colors.success },
    { label: 'RESPONSE', val: impact.response, color: colors.accent },
  ];

  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
        DECISION IMPACT
      </Text>

      <View style={styles.row}>
        {items.map((item, idx) => (
          <View key={idx} style={styles.impactCard}>
            <Text variant="caption" color={colors.textMuted} style={styles.itemLabel}>
              {item.label}
            </Text>
            <Text variant="label" color={item.color} style={styles.itemVal}>
              {item.val}
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
  row: {
    flexDirection: 'row',
    gap: spacing.xs + 2,
  },
  impactCard: {
    flex: 1,
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  itemVal: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
