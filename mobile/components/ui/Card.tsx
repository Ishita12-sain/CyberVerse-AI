import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  PressableProps,
  StyleProp,
} from 'react-native';
import { colors, spacing, borderRadius, elevation } from '../../constants/theme';

export interface CardProps {
  children: React.ReactNode;
  elevated?: boolean;
  onPress?: PressableProps['onPress'];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  onPress,
  style,
  testID,
}) => {
  const cardStyle: StyleProp<ViewStyle> = [
    styles.card,
    elevated ? styles.elevated : styles.standard,
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        testID={testID}
        accessibilityRole="button"
        style={({ pressed }) => [
          ...cardStyle,
          pressed && styles.pressed,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.large,
    padding: spacing.lg,
    borderWidth: 1,
  },
  standard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  elevated: {
    backgroundColor: colors.surfaceElevated,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    ...elevation.subtle,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
});
