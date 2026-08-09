import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius } from '../../constants/theme';

export type ProgressBarVariant = 'default' | 'success' | 'warning';

export interface ProgressBarProps {
  progress: number; // 0 to 1 or 0 to 100
  variant?: ProgressBarVariant;
  height?: number;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = 'default',
  height = 8,
  style,
}) => {
  // Normalize progress to 0-100%
  const normalizedProgress = Math.min(Math.max(progress > 1 ? progress : progress * 100, 0), 100);

  return (
    <View
      style={[
        styles.track,
        { height, borderRadius: height / 2 },
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: normalizedProgress }}
    >
      <View
        style={[
          styles.fill,
          styles[variant],
          { width: `${normalizedProgress}%`, borderRadius: height / 2 },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
  default: {
    backgroundColor: colors.primary,
  },
  success: {
    backgroundColor: colors.success,
  },
  warning: {
    backgroundColor: colors.warning,
  },
});
