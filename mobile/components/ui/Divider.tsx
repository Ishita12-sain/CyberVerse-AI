import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../constants/theme';

export interface DividerProps {
  marginVertical?: number;
  color?: string;
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({
  marginVertical = spacing.lg,
  color = colors.border,
  style,
}) => {
  return (
    <View
      style={[
        styles.divider,
        { marginVertical, backgroundColor: color },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
  },
});
