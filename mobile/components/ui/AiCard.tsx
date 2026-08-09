import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export interface AiCardProps {
  title: string;
  badgeLabel?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * AiCard provides an AI-focused container using the CyberVerse AI visual language:
 * subtle purple/indigo border highlight, AI badge tag, and elevated surface background.
 */
export const AiCard: React.FC<AiCardProps> = ({
  title,
  badgeLabel = 'AI INSIGHT',
  children,
  style,
}) => {
  return (
    <Card elevated style={[styles.aiCard, style]}>
      <View style={styles.header}>
        <Text variant="h3" color={colors.textPrimary}>
          {title}
        </Text>
        <Badge label={badgeLabel} variant="AI" />
      </View>
      <View style={styles.body}>{children}</View>
    </Card>
  );
};

const styles = StyleSheet.create({
  aiCard: {
    borderColor: 'rgba(99, 102, 241, 0.4)', // Primary purple subtle border highlight
    borderWidth: 1,
    backgroundColor: '#131B2E', // Subtle AI surface tint
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  body: {
    marginTop: spacing.xs,
  },
});
