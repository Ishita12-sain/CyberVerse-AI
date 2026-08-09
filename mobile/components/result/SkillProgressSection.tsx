import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { ProgressBar } from '../ui/ProgressBar';
import { UserSkillProgress } from '../../utils/skillProgress';

export interface SkillProgressSectionProps {
  skillChanges: UserSkillProgress[];
}

export const SkillProgressSection: React.FC<SkillProgressSectionProps> = ({
  skillChanges,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
        SKILL PROGRESS
      </Text>

      <View style={styles.card}>
        {skillChanges.map((item, idx) => {
          const isPositive = item.delta >= 0;
          return (
            <View key={idx} style={styles.row}>
              <View style={styles.headerRow}>
                <Text variant="label" color={colors.textPrimary} style={styles.skillName}>
                  {item.name}
                </Text>
                <View style={styles.valRow}>
                  <Text variant="caption" color={colors.textMuted} style={styles.beforeAfterText}>
                    {item.before}% → {item.after}%
                  </Text>
                  <Text
                    variant="caption"
                    color={isPositive ? colors.success : colors.error}
                    style={styles.deltaText}
                  >
                    {isPositive ? `+${item.delta}%` : `${item.delta}%`}
                  </Text>
                </View>
              </View>

              <ProgressBar progress={item.after} variant="default" height={6} />
            </View>
          );
        })}
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
  card: {
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: spacing.md,
    gap: spacing.sm,
  },
  row: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  skillName: {
    fontSize: 11,
    fontWeight: '700',
  },
  valRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  beforeAfterText: {
    fontSize: 10,
    fontWeight: '700',
  },
  deltaText: {
    fontSize: 10,
    fontWeight: '900',
  },
});
