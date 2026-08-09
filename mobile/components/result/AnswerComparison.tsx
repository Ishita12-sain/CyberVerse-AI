import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';

export interface AnswerComparisonProps {
  isCorrect: boolean;
  selectedAnswerText: string;
  correctAnswerText: string;
  explanation: string;
}

export const AnswerComparison: React.FC<AnswerComparisonProps> = ({
  isCorrect,
  selectedAnswerText,
  correctAnswerText,
  explanation,
}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        {/* User's Selected Answer */}
        <View style={styles.sectionBox}>
          <Text variant="caption" color={colors.textMuted} style={styles.label}>
            YOUR ANSWER
          </Text>
          <Text
            variant="bodyMedium"
            color={isCorrect ? colors.success : colors.error}
            style={styles.answerText}
          >
            "{selectedAnswerText}"
          </Text>
        </View>

        {/* Correct/Best Response */}
        <View style={styles.divider} />

        <View style={styles.sectionBox}>
          <Text variant="caption" color={colors.accent} style={styles.label}>
            {isCorrect ? 'BEST RESPONSE' : 'CORRECT APPROACH'}
          </Text>
          <Text variant="bodyMedium" color={colors.textPrimary} style={styles.answerText}>
            "{correctAnswerText}"
          </Text>
        </View>

        {/* Why Explanation */}
        <View style={styles.divider} />

        <View style={styles.sectionBox}>
          <Text variant="caption" color={colors.badgeAiText} style={styles.label}>
            WHY?
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.explanationText}>
            {explanation}
          </Text>
        </View>
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
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    padding: spacing.md,
  },
  sectionBox: {
    paddingVertical: 2,
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  answerText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginVertical: spacing.sm,
  },
  explanationText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
