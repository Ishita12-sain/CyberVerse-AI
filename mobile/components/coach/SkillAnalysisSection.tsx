import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { ProgressBar } from '../ui/ProgressBar';
import { SkillRating } from '../../data/coach';

export interface SkillAnalysisSectionProps {
  skills: SkillRating[];
}

export const SkillAnalysisSection: React.FC<SkillAnalysisSectionProps> = ({ skills }) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
        SKILL ANALYSIS
      </Text>

      <View style={styles.card}>
        {skills.map((item, idx) => (
          <View key={idx} style={styles.skillRow}>
            <View style={styles.labelRow}>
              <Text variant="label" color={colors.textPrimary} style={styles.skillName}>
                {item.name}
              </Text>
              <Text variant="caption" color={colors.accent} style={styles.skillVal}>
                {item.percentage}%
              </Text>
            </View>
            <ProgressBar progress={item.percentage} variant="default" height={6} />
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
  card: {
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: spacing.md,
    gap: spacing.sm,
  },
  skillRow: {},
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  skillName: {
    fontSize: 11,
    fontWeight: '700',
  },
  skillVal: {
    fontSize: 10,
    fontWeight: '800',
  },
});
