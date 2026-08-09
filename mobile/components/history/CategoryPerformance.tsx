import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { ProgressBar } from '../ui/ProgressBar';

export interface CategoryPerformanceProps {
  categories: { name: string; percentage: number }[];
}

export const CategoryPerformance: React.FC<CategoryPerformanceProps> = ({
  categories,
}) => {
  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.textMuted} style={styles.sectionTitle}>
        CATEGORY PERFORMANCE
      </Text>

      <View style={styles.card}>
        {categories.map((cat, idx) => (
          <View key={idx} style={styles.row}>
            <View style={styles.headerRow}>
              <Text variant="label" color={colors.textPrimary} style={styles.catName}>
                {cat.name}
              </Text>
              <Text variant="caption" color={colors.accent} style={styles.catVal}>
                {cat.percentage}%
              </Text>
            </View>
            <ProgressBar progress={cat.percentage} variant="default" height={5} />
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
  row: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  catName: {
    fontSize: 11,
    fontWeight: '700',
  },
  catVal: {
    fontSize: 10,
    fontWeight: '800',
  },
});
