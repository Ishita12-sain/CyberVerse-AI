import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../constants/theme';
import { Text } from '../ui/Text';
import { AiCard } from '../ui/AiCard';

export interface CoachRecommendationProps {
  recommendation: string;
}

export const CoachRecommendation: React.FC<CoachRecommendationProps> = ({
  recommendation,
}) => {
  return (
    <View style={styles.container}>
      <AiCard title="✦ AI RECOMMENDATION" badgeLabel="AI COACH">
        <Text variant="body" color={colors.textSecondary} style={styles.text}>
          "{recommendation}"
        </Text>
      </AiCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  text: {
    fontSize: 13,
    lineHeight: 19,
    fontStyle: 'italic',
  },
});
