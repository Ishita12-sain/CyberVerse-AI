import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { spacing } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { Text } from '../ui/Text';

export interface SettingsRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  valueText?: string;
  onPress?: () => void;
  isLast?: boolean;
}

export const SettingsRow: React.FC<SettingsRowProps> = ({
  icon,
  title,
  subtitle,
  valueText,
  onPress,
  isLast = false,
}) => {
  const { colors: activeColors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      style={({ pressed }) => [
        styles.row,
        !isLast && [styles.borderBottom, { borderBottomColor: activeColors.border }],
        pressed && onPress && styles.pressed,
      ]}
    >
      <View style={styles.leftBox}>
        <Text style={styles.icon}>{icon}</Text>
        <View style={styles.infoBox}>
          <Text variant="label" color={activeColors.textPrimary} style={styles.title}>
            {title}
          </Text>
          {subtitle ? (
            <Text variant="caption" color={activeColors.textMuted} style={styles.subtitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.rightBox}>
        {valueText ? (
          <Text variant="caption" color={activeColors.accent} style={styles.valText}>
            {valueText}
          </Text>
        ) : null}
        {onPress ? <Text style={[styles.chevron, { color: activeColors.textMuted }]}>›</Text> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: spacing.xs,
  },
  icon: {
    fontSize: 16,
    marginRight: spacing.md,
  },
  infoBox: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 10,
    marginTop: 1,
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  valText: {
    fontSize: 10,
    fontWeight: '800',
  },
  chevron: {
    fontSize: 16,
    marginLeft: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
