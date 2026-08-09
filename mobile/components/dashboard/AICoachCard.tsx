import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface AICoachCardProps {
  insight: string;
  onViewInsights?: () => void;
}

export const AICoachCard: React.FC<AICoachCardProps> = ({
  insight,
  onViewInsights,
}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.headerTitleBox}>
            <Badge label="✦ AI COACH" variant="AI" />
            <Text style={styles.aiIcon}>🤖</Text>
          </View>
          <Pressable onPress={onViewInsights} accessibilityRole="button">
            <Text variant="caption" color={colors.accent} style={styles.linkText}>
              VIEW INSIGHTS →
            </Text>
          </Pressable>
        </View>

        <Text variant="body" color={colors.textSecondary} style={styles.insightText}>
          "{insight}"
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: 'rgba(17, 24, 39, 0.7)',
    borderColor: 'rgba(99, 102, 241, 0.25)',
    borderWidth: 1,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs + 2,
  },
  headerTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  aiIcon: {
    fontSize: 14,
  },
  linkText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  insightText: {
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
