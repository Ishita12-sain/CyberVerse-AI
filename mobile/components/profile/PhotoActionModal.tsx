import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';

export interface PhotoActionModalProps {
  visible: boolean;
  hasPhoto: boolean;
  onClose: () => void;
  onSelectGallery: () => void;
  onSelectCamera: () => void;
  onRemovePhoto: () => void;
}

export const PhotoActionModal: React.FC<PhotoActionModalProps> = ({
  visible,
  hasPhoto,
  onClose,
  onSelectGallery,
  onSelectCamera,
  onRemovePhoto,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalCard}>
              <View style={styles.header}>
                <Text variant="h3" style={styles.title}>
                  PROFILE PHOTO
                </Text>
                <Text variant="caption" color={colors.accent} style={styles.sub}>
                  ✦ CUSTOMIZE AVATAR
                </Text>
              </View>

              <View style={styles.optionsList}>
                <Pressable
                  onPress={onSelectGallery}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.optionButton, pressed && styles.pressed]}
                >
                  <Text style={styles.optionIcon}>🖼️</Text>
                  <Text variant="bodyMedium" style={styles.optionText}>
                    Choose from Gallery
                  </Text>
                </Pressable>

                <Pressable
                  onPress={onSelectCamera}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.optionButton, pressed && styles.pressed]}
                >
                  <Text style={styles.optionIcon}>📷</Text>
                  <Text variant="bodyMedium" style={styles.optionText}>
                    Take a Photo
                  </Text>
                </Pressable>

                {hasPhoto && (
                  <Pressable
                    onPress={onRemovePhoto}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.optionButton, pressed && styles.pressed]}
                  >
                    <Text style={styles.optionIcon}>🗑️</Text>
                    <Text variant="bodyMedium" color={colors.error} style={styles.optionText}>
                      Remove Photo
                    </Text>
                  </Pressable>
                )}
              </View>

              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
              >
                <Text variant="label" color={colors.textMuted} style={styles.cancelText}>
                  CANCEL
                </Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 16, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.35)',
    padding: spacing.md,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  optionsList: {
    gap: spacing.xs + 2,
    marginBottom: spacing.md,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  optionIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '700',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm - 2,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cancelText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  pressed: {
    opacity: 0.8,
  },
});
