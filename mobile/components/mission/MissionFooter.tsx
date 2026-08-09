import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing, borderRadius } from '../../constants/theme';
import { Button } from '../ui/Button';

export interface MissionFooterProps {
  confirmDisabled: boolean;
  onConfirm: () => void;
}

export const MissionFooter: React.FC<MissionFooterProps> = ({
  confirmDisabled,
  onConfirm,
}) => {
  return (
    <View style={styles.container}>
      <Button
        title="CONFIRM DECISION →"
        variant="primary"
        disabled={confirmDisabled}
        onPress={onConfirm}
        style={[styles.button, confirmDisabled && styles.buttonDisabled]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  button: {
    height: 52,
    backgroundColor: '#8B5CF6',
    borderRadius: borderRadius.medium,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    shadowOpacity: 0,
    elevation: 0,
  },
});
