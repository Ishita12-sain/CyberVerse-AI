import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';

export interface DecisionAnalysisProps {
  title: string;
  analysis: string;
}

export const DecisionAnalysis: React.FC<DecisionAnalysisProps> = ({
  title,
  analysis,
}) => {
  return (
    <View style={styles.container}>
      <Card elevated style={styles.card}>
        <View style={styles.headerRow}>
          <Text variant="caption" color={colors.accent} style={styles.sectionLabel}>
            DECISION ANALYSIS
          </Text>
          <View style={styles.statusPill}>
            <Text variant="caption" color={colors.textPrimary} style={styles.statusText}>
              {title}
            </Text>
          </View>
        </View>

        <Text variant="body" color={colors.textSecondary} style={styles.bodyText}>
          {analysis}
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
    borderColor: 'rgba(168, 85, 247, 0.3)',
    borderWidth: 1,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs + 2,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statusPill: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 19,
  },
});
