import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface MissionVisualProps {
  category: string;
}

export const MissionVisual: React.FC<MissionVisualProps> = ({ category }) => {
  return (
    <View style={styles.container}>
      <View style={styles.hudCircle}>
        <Text style={styles.icon}>🛡️</Text>
        <View style={styles.statusDot} />
      </View>

      <Text variant="caption" color={colors.accent} style={styles.categoryText}>
        {category} NETWORK ACTIVE
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  hudCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0D1322',
    borderWidth: 1.5,
    borderColor: 'rgba(56, 189, 248, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  icon: {
    fontSize: 28,
  },
  statusDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginTop: spacing.xs,
  },
});
