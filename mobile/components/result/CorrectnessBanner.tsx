import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';

export interface CorrectnessBannerProps {
  isCorrect: boolean;
}

export const CorrectnessBanner: React.FC<CorrectnessBannerProps> = ({ isCorrect }) => {
  return (
    <View style={styles.container}>
      <Card
        style={[
          styles.card,
          isCorrect ? styles.correctCard : styles.incorrectCard,
        ]}
      >
        <Text
          variant="h1"
          color={isCorrect ? colors.success : colors.error}
          style={styles.statusTitle}
        >
          {isCorrect ? '✓ CORRECT' : '✕ INCORRECT'}
        </Text>
        <Text
          variant="caption"
          color={colors.textMuted}
          style={styles.statusSub}
        >
          {isCorrect
            ? 'Optimal decision path executed successfully.'
            : 'Sub-optimal decision path. Review the analysis below.'}
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
    borderWidth: 1.5,
  },
  correctCard: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: colors.success,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  incorrectCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: colors.error,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  statusTitle: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 2,
  },
  statusSub: {
    fontSize: 11,
    textAlign: 'center',
  },
});
