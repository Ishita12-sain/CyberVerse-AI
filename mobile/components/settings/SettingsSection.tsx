import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { Text } from '../ui/Text';

export interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  const { colors: activeColors } = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="caption" color={activeColors.textMuted} style={styles.sectionTitle}>
        {title}
      </Text>
      <View
        style={[
          styles.cardBox,
          {
            backgroundColor: activeColors.surface,
            borderColor: activeColors.border,
          },
        ]}
      >
        {children}
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
  cardBox: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
