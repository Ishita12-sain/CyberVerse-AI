import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface RoleCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  id,
  title,
  description,
  icon,
  selected,
  onSelect,
}) => {
  return (
    <Pressable
      onPress={() => onSelect(id)}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.topRow}>
        <Text style={[styles.icon, selected && styles.iconSelected]}>{icon}</Text>
        <View style={[styles.indicator, selected && styles.indicatorSelected]}>
          {selected && <Text style={styles.checkMark}>✓</Text>}
        </View>
      </View>

      <Text
        variant="label"
        color={selected ? colors.textPrimary : colors.textSecondary}
        style={[styles.title, selected && styles.titleSelected]}
        numberOfLines={1}
      >
        {title}
      </Text>

      <Text
        variant="caption"
        color={colors.textMuted}
        style={styles.description}
        numberOfLines={2}
      >
        {description}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: spacing.sm + 2,
    justifyContent: 'space-between',
    minHeight: 110,
  },
  cardSelected: {
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    borderColor: colors.primary,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs / 2,
  },
  icon: {
    fontSize: 22,
    opacity: 0.8,
  },
  iconSelected: {
    opacity: 1,
  },
  indicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkMark: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  titleSelected: {
    color: colors.accent,
  },
  description: {
    fontSize: 10,
    lineHeight: 14,
  },
});
