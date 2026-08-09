import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { RiskLevel } from '../../data/result';

export interface XPRewardProps {
  xpEarned: number;
  riskLevel: RiskLevel;
}

export const XPReward: React.FC<XPRewardProps> = ({ xpEarned, riskLevel }) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'LOW':
        return colors.success;
      case 'MEDIUM':
        return colors.warning;
      case 'HIGH':
        return colors.error;
      default:
        return colors.warning;
    }
  };

  return (
    <View style={styles.container}>
      {/* XP Earned Card */}
      <View style={styles.xpCard}>
        <Text variant="caption" color={colors.textMuted} style={styles.label}>
          XP EARNED
        </Text>
        <Text variant="h2" color={colors.accent} style={styles.xpText}>
          +{xpEarned} XP
        </Text>
      </View>

      {/* Risk Level Card */}
      <View style={styles.riskCard}>
        <Text variant="caption" color={colors.textMuted} style={styles.label}>
          RISK LEVEL
        </Text>
        <View style={[styles.riskBadge, { backgroundColor: `${getRiskColor()}15` }]}>
          <Text variant="caption" color={getRiskColor()} style={styles.riskText}>
            {riskLevel} RISK
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  xpCard: {
    flex: 1,
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  riskCard: {
    flex: 1,
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  xpText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900',
  },
  riskBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 2,
  },
  riskText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
