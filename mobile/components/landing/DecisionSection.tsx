import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Text } from '../ui/Text';

const CONCEPTS = [
  {
    icon: '🎯',
    title: 'SIMULATE',
    desc: 'Realistic workplace challenges.',
  },
  {
    icon: '⚡',
    title: 'DECIDE',
    desc: 'Build critical decision confidence.',
  },
  {
    icon: '🤖',
    title: 'LEARN',
    desc: 'Personalized AI-powered feedback.',
  },
];

export const DecisionSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text variant="h2" align="center" style={styles.headerTitle}>
        YOUR DECISION. YOUR OUTCOME.
      </Text>

      <View style={styles.row}>
        {CONCEPTS.map((item, idx) => (
          <View key={idx} style={styles.conceptBox}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text variant="label" color={colors.accent} style={styles.conceptTitle}>
              {item.title}
            </Text>
            <Text variant="caption" color={colors.textMuted} align="center" style={styles.conceptDesc}>
              {item.desc}
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
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 102, 241, 0.12)',
    marginTop: spacing.sm,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: spacing.xs,
  },
  conceptBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    backgroundColor: 'rgba(17, 24, 39, 0.6)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.2)',
  },
  icon: {
    fontSize: 20,
    marginBottom: spacing.xs / 2,
  },
  conceptTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  conceptDesc: {
    fontSize: 10,
    lineHeight: 14,
  },
});
