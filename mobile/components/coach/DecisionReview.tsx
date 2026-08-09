import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';

export interface DecisionReviewProps {
  decisionText: string;
  assessmentText: string;
}

export const DecisionReview: React.FC<DecisionReviewProps> = ({
  decisionText,
  assessmentText,
}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="caption" color={colors.textMuted} style={styles.sectionLabel}>
          YOUR DECISION
        </Text>
        <Text variant="bodyMedium" color={colors.textPrimary} style={styles.decisionText}>
          "{decisionText}"
        </Text>
        <View style={styles.divider} />
        <Text variant="body" color={colors.textSecondary} style={styles.assessmentText}>
          {assessmentText}
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: '#0D1322',
    borderColor: 'rgba(99, 102, 241, 0.25)',
    borderWidth: 1,
    padding: spacing.md,
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  decisionText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginVertical: spacing.xs + 2,
  },
  assessmentText: {
    fontSize: 12,
    lineHeight: 17,
  },
});
