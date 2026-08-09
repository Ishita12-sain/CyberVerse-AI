import React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { spacing } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { Text } from '../ui/Text';

export interface SettingsSwitchProps {
  icon: string;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  isLast?: boolean;
}

export const SettingsSwitch: React.FC<SettingsSwitchProps> = ({
  icon,
  title,
  subtitle,
  value,
  onValueChange,
  isLast = false,
}) => {
  const { colors: activeColors } = useTheme();

  return (
    <View style={[styles.row, !isLast && [styles.borderBottom, { borderBottomColor: activeColors.border }]]}>
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

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: activeColors.primary }}
        thumbColor={value ? activeColors.accent : '#94A3B8'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
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
});
