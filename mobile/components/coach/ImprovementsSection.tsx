import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Card } from '../ui/Card';
import { ImprovementItem } from '../../data/coach';

export interface ImprovementsSectionProps {
  improvements: ImprovementItem[];
}

export const ImprovementsSection: React.FC<ImprovementsSectionProps> = ({
  improvements,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.warning} style={styles.sectionTitle}>
        ⚡ AREAS TO IMPROVE
      </Text>

      {improvements.map((item, idx) => (
        <Card key={idx} style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.flashIcon}>⚡</Text>
            <Text variant="caption" color={colors.warning} style={styles.skillLabel}>
              {item.skill}
            </Text>
          </View>
          <Text variant="body" color={colors.textSecondary} style={styles.insightText}>
            {item.insight}
          </Text>
        </Card>
      ))}
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
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.25)',
    borderWidth: 1,
    padding: spacing.sm + 2,
    marginBottom: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  flashIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  skillLabel: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  insightText: {
    fontSize: 12,
    lineHeight: 17,
  },
});
