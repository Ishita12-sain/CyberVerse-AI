import React from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import { spacing, borderRadius } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import {
  useLanguage,
  LANGUAGE_OPTIONS,
  SupportedLanguage,
} from '../../context/LanguageContext';
import { Text } from '../ui/Text';

export interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  visible,
  onClose,
}) => {
  const { colors: activeColors } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View
          style={[
            styles.modalCard,
            {
              backgroundColor: activeColors.surface,
              borderColor: activeColors.border,
            },
          ]}
        >
          <View style={styles.headerRow}>
            <Text variant="h3" color={activeColors.textPrimary} style={styles.modalTitle}>
              {t('settings.selectLanguage')}
            </Text>
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close language selector"
              style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
            >
              <Text style={[styles.closeIcon, { color: activeColors.textMuted }]}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.optionsList}>
            {LANGUAGE_OPTIONS.map((opt) => {
              const isSelected = language === opt.code;
              return (
                <Pressable
                  key={opt.code}
                  onPress={() => handleSelect(opt.code)}
                  style={({ pressed }) => [
                    styles.optionRow,
                    isSelected && [
                      styles.selectedRow,
                      { backgroundColor: activeColors.badgeAiBg, borderColor: activeColors.badgeAiBorder },
                    ],
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.leftBox}>
                    <Text style={styles.globeIcon}>🌐</Text>
                    <View style={styles.nameBox}>
                      <Text
                        variant="label"
                        color={isSelected ? activeColors.textPrimary : activeColors.textPrimary}
                        style={styles.nativeName}
                      >
                        {opt.nativeName}
                      </Text>
                      <Text
                        variant="caption"
                        color={activeColors.textMuted}
                        style={styles.englishName}
                      >
                        {opt.englishName}
                      </Text>
                    </View>
                  </View>

                  {isSelected && (
                    <Text variant="label" color={activeColors.success} style={styles.checkIcon}>
                      ✓
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 16, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    borderRadius: borderRadius.large,
    borderWidth: 1,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 12,
    fontWeight: '800',
  },
  optionsList: {
    gap: spacing.xs + 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedRow: {
    borderWidth: 1,
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  globeIcon: {
    fontSize: 18,
  },
  nameBox: {
    gap: 1,
  },
  nativeName: {
    fontSize: 13,
    fontWeight: '800',
  },
  englishName: {
    fontSize: 10,
  },
  checkIcon: {
    fontSize: 14,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.75,
  },
});
