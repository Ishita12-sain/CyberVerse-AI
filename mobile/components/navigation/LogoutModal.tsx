import React from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { Button } from '../ui/Button';

export interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirmLogout: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirmLogout,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View style={styles.iconBox}>
            <Text style={styles.icon}>🚪</Text>
          </View>

          <Text variant="h2" style={styles.title}>
            LOG OUT?
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sub}>
            Are you sure you want to leave CyberVerse AI simulation?
          </Text>

          <View style={styles.buttonRow}>
            <Button
              title="CANCEL"
              variant="outline"
              onPress={onClose}
              style={styles.cancelBtn}
            />
            <Button
              title="LOG OUT"
              variant="primary"
              onPress={onConfirmLogout}
              style={styles.logoutBtn}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 16, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs + 2,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  sub: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    height: 44,
  },
  logoutBtn: {
    flex: 1,
    height: 44,
    backgroundColor: colors.error,
  },
});
