import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  PressableProps,
  StyleProp,
} from 'react-native';
import { spacing, borderRadius, elevation } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

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
  const { colors: activeColors } = useTheme();

  const dynamicStyle: ViewStyle = {
    backgroundColor: elevated ? activeColors.surfaceElevated : activeColors.surface,
    borderColor: activeColors.border,
  };

  const cardStyle = [
    styles.card,
    dynamicStyle,
    elevated ? elevation.subtle : null,
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
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
});
