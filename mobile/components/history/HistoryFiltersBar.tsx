import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export type CategoryFilter =
  | 'ALL'
  | 'Cybersecurity'
  | 'Human Resources'
  | 'Finance'
  | 'Management'
  | 'IT & Technology'
  | 'Sales & Marketing';

export type StatusFilter = 'ALL' | 'CORRECT' | 'INCORRECT';

export type SortOption = 'NEWEST' | 'HIGHEST_SCORE' | 'LOWEST_SCORE' | 'MOST_XP';

export interface HistoryFiltersProps {
  selectedCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  selectedStatus: StatusFilter;
  onSelectStatus: (status: StatusFilter) => void;
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
}

const CATEGORY_CHIPS: { label: string; value: CategoryFilter }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'CYBERSECURITY', value: 'Cybersecurity' },
  { label: 'HR', value: 'Human Resources' },
  { label: 'FINANCE', value: 'Finance' },
  { label: 'MANAGEMENT', value: 'Management' },
  { label: 'IT', value: 'IT & Technology' },
  { label: 'SALES', value: 'Sales & Marketing' },
];

const STATUS_CHIPS: { label: string; value: StatusFilter }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: '✓ CORRECT', value: 'CORRECT' },
  { label: '✕ INCORRECT', value: 'INCORRECT' },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'NEWEST', value: 'NEWEST' },
  { label: 'HIGH SCORE', value: 'HIGHEST_SCORE' },
  { label: 'LOW SCORE', value: 'LOWEST_SCORE' },
  { label: 'MOST XP', value: 'MOST_XP' },
];

export const HistoryFiltersBar: React.FC<HistoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedStatus,
  onSelectStatus,
  selectedSort,
  onSelectSort,
}) => {
  return (
    <View style={styles.container}>
      {/* Category Scroll Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORY_CHIPS.map((chip) => {
          const isActive = selectedCategory === chip.value;
          return (
            <Pressable
              key={chip.value}
              onPress={() => onSelectCategory(chip.value)}
              style={({ pressed }) => [
                styles.chip,
                isActive && styles.activeChip,
                pressed && styles.pressed,
              ]}
            >
              <Text
                variant="caption"
                color={isActive ? colors.textPrimary : colors.textMuted}
                style={styles.chipText}
              >
                {chip.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Status & Sort Controls Row */}
      <View style={styles.rowControls}>
        {/* Status Pills */}
        <View style={styles.pillsRow}>
          {STATUS_CHIPS.map((s) => {
            const isActive = selectedStatus === s.value;
            return (
              <Pressable
                key={s.value}
                onPress={() => onSelectStatus(s.value)}
                style={({ pressed }) => [
                  styles.statusPill,
                  isActive && styles.activeStatusPill,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  variant="caption"
                  color={isActive ? colors.accent : colors.textMuted}
                  style={styles.statusText}
                >
                  {s.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Sort Select Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortContent}
        >
          {SORT_OPTIONS.map((sort) => {
            const isActive = selectedSort === sort.value;
            return (
              <Pressable
                key={sort.value}
                onPress={() => onSelectSort(sort.value)}
                style={({ pressed }) => [
                  styles.sortChip,
                  isActive && styles.activeSortChip,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  variant="caption"
                  color={isActive ? colors.primary : colors.textMuted}
                  style={styles.sortText}
                >
                  {sort.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  scrollContent: {
    gap: spacing.xs,
    paddingBottom: spacing.xs,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  activeChip: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  rowControls: {
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  statusPill: {
    paddingVertical: 4,
    paddingHorizontal: spacing.xs + 2,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  activeStatusPill: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    borderColor: colors.accent,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '800',
  },
  sortContent: {
    gap: spacing.xs,
  },
  sortChip: {
    paddingVertical: 4,
    paddingHorizontal: spacing.xs + 2,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeSortChip: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderColor: colors.primary,
  },
  sortText: {
    fontSize: 9,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.8,
  },
});
