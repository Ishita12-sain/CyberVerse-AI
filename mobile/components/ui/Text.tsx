import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { typography, colors } from '../../constants/theme';

export type TextVariant = keyof typeof typography;

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  align,
  style,
  children,
  ...props
}) => {
  const variantStyle = typography[variant] || typography.body;

  return (
    <RNText
      style={[
        variantStyle,
        color ? { color } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
      accessibilityRole="text"
      {...props}
    >
      {children}
    </RNText>
  );
};
