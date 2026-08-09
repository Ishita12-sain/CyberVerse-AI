import React from 'react';
import { StyleSheet, View, Modal, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { Text } from '../ui/Text';
import { NotificationItem } from '../../data/notifications';

export interface NotificationModalProps {
  visible: boolean;
  notifications: NotificationItem[];
  onClose: () => void;
  onSelectNotification: (item: NotificationItem) => void;
  onMarkAllRead: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  notifications,
  onClose,
  onSelectNotification,
  onMarkAllRead,
}) => {
  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'DAILY_MISSIONS':
        return '🎯';
      case 'STREAK_REMINDER':
        return '🔥';
      case 'AI_INSIGHT':
        return '✦';
      case 'MISSION_COMPLETE':
        return '✓';
      case 'LEVEL_UP':
        return '🏆';
      default:
        return '🔔';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
          <View style={styles.header}>
            <View>
              <Text variant="h3" style={styles.title}>
                NOTIFICATIONS
              </Text>
              <Text variant="caption" color={colors.accent} style={styles.sub}>
                ✦ SIMULATION UPDATES
              </Text>
            </View>

            <View style={styles.headerActions}>
              <Pressable
                onPress={onMarkAllRead}
                accessibilityRole="button"
                style={({ pressed }) => [styles.markBtn, pressed && styles.pressed]}
              >
                <Text variant="caption" color={colors.accent} style={styles.markText}>
                  MARK READ
                </Text>
              </Pressable>

              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
              >
                <Text style={styles.closeIcon}>✕</Text>
              </Pressable>
            </View>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {notifications.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>🔔</Text>
                <Text variant="h3" style={styles.emptyTitle}>
                  ALL CAUGHT UP
                </Text>
                <Text variant="caption" color={colors.textMuted}>
                  No new notifications right now.
                </Text>
              </View>
            ) : (
              notifications.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => onSelectNotification(item)}
                  style={({ pressed }) => [
                    styles.row,
                    !item.isRead && styles.unreadRow,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.iconBox}>
                    <Text style={styles.typeIcon}>{getIcon(item.type)}</Text>
                  </View>

                  <View style={styles.infoBox}>
                    <View style={styles.titleRow}>
                      <Text
                        variant="label"
                        color={item.isRead ? colors.textSecondary : colors.textPrimary}
                        style={styles.notifTitle}
                      >
                        {item.title}
                      </Text>
                      {!item.isRead && <View style={styles.unreadDot} />}
                    </View>

                    <Text
                      variant="caption"
                      color={item.isRead ? colors.textMuted : colors.textSecondary}
                      style={styles.notifMsg}
                    >
                      {item.message}
                    </Text>

                    <Text variant="caption" color={colors.textMuted} style={styles.timeText}>
                      {item.timestamp}
                    </Text>
                  </View>
                </Pressable>
              ))
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 16, 0.82)',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#070B16',
    borderTopLeftRadius: borderRadius.large,
    borderTopRightRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.25)',
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1.2,
    color: colors.textPrimary,
  },
  sub: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  markBtn: {
    paddingVertical: 4,
    paddingHorizontal: spacing.xs + 2,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  markText: {
    fontSize: 9,
    fontWeight: '800',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '800',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: spacing.md,
    gap: spacing.xs + 2,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  unreadRow: {
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
    borderColor: 'rgba(139, 92, 246, 0.35)',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  typeIcon: {
    fontSize: 16,
  },
  infoBox: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  notifTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  notifMsg: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 9,
  },
  pressed: {
    opacity: 0.8,
  },
});
