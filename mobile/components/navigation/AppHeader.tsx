import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { spacing, borderRadius } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { Text } from '../ui/Text';
import { Sidebar } from './Sidebar';
import { NotificationModal } from '../notifications/NotificationModal';
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../../utils/notifications';
import { NotificationItem } from '../../data/notifications';

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'CYBERVERSE AI',
  subtitle = '✦ MISSION COMMAND',
  showBack = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { colors: activeColors } = useTheme();

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshNotifs = () => {
    setNotifications(getNotifications());
    setUnreadCount(getUnreadNotificationCount());
  };

  useEffect(() => {
    refreshNotifs();
  }, [pathname, notifVisible]);

  const handleNavigate = (route: string) => {
    if (pathname !== route) {
      router.push(route as any);
    }
  };

  const handleLogoutConfirm = () => {
    router.replace('/login');
  };

  const handleSelectNotif = (item: NotificationItem) => {
    markNotificationAsRead(item.id);
    refreshNotifs();
    setNotifVisible(false);
    if (item.targetRoute) {
      router.push(item.targetRoute as any);
    }
  };

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead();
    refreshNotifs();
  };

  return (
    <>
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: activeColors.surface,
            borderBottomColor: activeColors.border,
          },
        ]}
      >
        {showBack ? (
          <Pressable
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/dashboard');
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          >
            <Text variant="label" color={activeColors.accent} style={styles.backIconText}>
              ←
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => setSidebarVisible(true)}
            accessibilityRole="button"
            accessibilityLabel="Open Menu"
            style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
          >
            <Text style={[styles.hamburgerIcon, { color: activeColors.textPrimary }]}>☰</Text>
          </Pressable>
        )}

        <View style={styles.titleBox}>
          <Text variant="h3" color={activeColors.textPrimary} style={styles.titleText}>
            {title}
          </Text>
          {subtitle ? (
            <Text variant="caption" color={activeColors.accent} style={styles.subText}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <View style={styles.rightActions}>
          {/* Notification Bell */}
          <Pressable
            onPress={() => setNotifVisible(true)}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={({ pressed }) => [styles.bellBtn, pressed && styles.pressed]}
          >
            <Text style={styles.bellIcon}>🔔</Text>
            {unreadCount > 0 && (
              <View style={[styles.badgeCount, { backgroundColor: activeColors.accent, borderColor: activeColors.surface }]}>
                <Text style={styles.badgeCountText}>{unreadCount}</Text>
              </View>
            )}
          </Pressable>

          {/* Profile Quick Button */}
          <Pressable
            onPress={() => router.push('/profile')}
            accessibilityRole="button"
            accessibilityLabel="Profile"
            style={({ pressed }) => [styles.profileBtn, pressed && styles.pressed]}
          >
            <Text style={styles.profileIconText}>👤</Text>
          </Pressable>
        </View>
      </View>

      {/* Global Sidebar Drawer */}
      <Sidebar
        visible={sidebarVisible}
        currentPath={pathname}
        onClose={() => setSidebarVisible(false)}
        onNavigate={handleNavigate}
        onLogoutConfirm={handleLogoutConfirm}
      />

      {/* Notification Center Modal */}
      <NotificationModal
        visible={notifVisible}
        notifications={notifications}
        onClose={() => setNotifVisible(false)}
        onSelectNotification={handleSelectNotif}
        onMarkAllRead={handleMarkAllRead}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.small,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hamburgerIcon: {
    fontSize: 16,
    fontWeight: '900',
  },
  backIconText: {
    fontSize: 14,
    fontWeight: '900',
  },
  titleBox: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  subText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 1,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellIcon: {
    fontSize: 14,
  },
  badgeCount: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
  },
  badgeCountText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#000000',
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconText: {
    fontSize: 16,
  },
  pressed: {
    opacity: 0.75,
  },
});
