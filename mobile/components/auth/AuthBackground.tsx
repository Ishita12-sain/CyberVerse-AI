import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const AuthBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colors: activeColors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View
        style={[
          styles.gridOverlay,
          { borderColor: isDark ? 'rgba(168, 85, 247, 0.03)' : 'rgba(124, 58, 237, 0.05)' },
        ]}
        pointerEvents="none"
      />
      <View
        style={[
          styles.glowSpot,
          { backgroundColor: isDark ? 'rgba(168, 85, 247, 0.08)' : 'rgba(124, 58, 237, 0.05)' },
        ]}
        pointerEvents="none"
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1,
  },
  glowSpot: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    width: 280,
    height: 280,
    borderRadius: 140,
  },
});
