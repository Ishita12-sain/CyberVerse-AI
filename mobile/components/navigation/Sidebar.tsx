import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { spacing, borderRadius } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Text } from '../ui/Text';
import { SidebarItem } from './SidebarItem';
import { LogoutModal } from './LogoutModal';
import { MOCK_PROFILE_DATA } from '../../data/profile';

const PROFILE_PHOTO_STORAGE_KEY = '@cyberverse_profile_photo_uri';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface SidebarProps {
  visible: boolean;
  currentPath: string;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onLogoutConfirm: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  visible,
  currentPath,
  onClose,
  onNavigate,
  onLogoutConfirm,
}) => {
  const { colors: activeColors } = useTheme();
  const { t } = useLanguage();
  const [profilePhotoUri, setProfilePhotoUri] = useState<string | null>(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const data = MOCK_PROFILE_DATA;

  useEffect(() => {
    if (visible) {
      AsyncStorage.getItem(PROFILE_PHOTO_STORAGE_KEY)
        .then((uri) => setProfilePhotoUri(uri))
        .catch((e) => console.error('Failed to load profile photo', e));
    }
  }, [visible]);

  const handleItemPress = (route: string) => {
    onClose();
    onNavigate(route);
  };

  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  const handleConfirmLogout = () => {
    setLogoutModalVisible(false);
    onClose();
    onLogoutConfirm();
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlayContainer}>
          {/* Backdrop Tap Area */}
          <Pressable style={styles.backdrop} onPress={onClose} />

          {/* Sliding Drawer Body */}
          <SafeAreaView
            style={[
              styles.drawerCard,
              {
                backgroundColor: activeColors.surface,
                borderRightColor: activeColors.border,
              },
            ]}
            edges={['top', 'left', 'bottom']}
          >
            {/* Header / App Brand */}
            <View style={styles.brandHeader}>
              <View>
                <Text variant="h3" color={activeColors.textPrimary} style={styles.brandTitle}>
                  CYBERVERSE AI
                </Text>
                <Text variant="caption" color={activeColors.accent} style={styles.brandSub}>
                  ✦ MISSION COMMAND CENTER
                </Text>
              </View>

              <Pressable
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close Drawer"
                style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
              >
                <Text style={[styles.closeIcon, { color: activeColors.textMuted }]}>✕</Text>
              </Pressable>
            </View>

            {/* Profile Identity Card */}
            <View
              style={[
                styles.userCard,
                {
                  backgroundColor: activeColors.surfaceElevated,
                  borderColor: activeColors.border,
                },
              ]}
            >
              <View style={[styles.avatarRing, { borderColor: activeColors.primary }]}>
                {profilePhotoUri ? (
                  <Image source={{ uri: profilePhotoUri }} style={styles.avatarPhoto} />
                ) : (
                  <Text style={[styles.avatarText, { color: activeColors.textPrimary }]}>
                    {data.user.avatarInitials}
                  </Text>
                )}
              </View>

              <View style={styles.userInfo}>
                <Text variant="label" color={activeColors.textPrimary} style={styles.userName}>
                  {data.user.name.toUpperCase()}
                </Text>
                <Text variant="caption" color={activeColors.textMuted} style={styles.userRole}>
                  {data.user.role}
                </Text>
                <Text variant="caption" color={activeColors.accent} style={styles.userRank}>
                  LEVEL 07 • 1,240 XP
                </Text>
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: activeColors.border }]} />

            {/* Menu Scroll Links */}
            <ScrollView
              style={styles.menuScroll}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.menuContent}
            >
              {/* Main Navigation */}
              <SidebarItem
                icon="🏠"
                label={t('nav.dashboard')}
                isActive={currentPath === '/dashboard' || currentPath === '/'}
                onPress={() => handleItemPress('/dashboard')}
              />
              <SidebarItem
                icon="🎯"
                label={t('nav.dailyMissions')}
                isActive={currentPath === '/mission'}
                onPress={() => handleItemPress('/mission')}
              />
              <SidebarItem
                icon="📋"
                label={t('nav.missionHistory')}
                isActive={currentPath === '/history'}
                onPress={() => handleItemPress('/history')}
              />
              <SidebarItem
                icon="📊"
                label={t('nav.myProgress')}
                isActive={currentPath === '/profile'}
                onPress={() => handleItemPress('/profile')}
              />
              <SidebarItem
                icon="✦"
                label={t('nav.aiCoach')}
                isActive={currentPath === '/ai-coach'}
                onPress={() => handleItemPress('/ai-coach')}
              />
              <SidebarItem
                icon="🏆"
                label={t('nav.leaderboard')}
                isActive={currentPath === '/leaderboard'}
                onPress={() => handleItemPress('/leaderboard')}
              />

              <View style={[styles.divider, { backgroundColor: activeColors.border }]} />

              {/* Account / Support Navigation */}
              <SidebarItem
                icon="👤"
                label={t('nav.profile')}
                isActive={currentPath === '/profile'}
                onPress={() => handleItemPress('/profile')}
              />
              <SidebarItem
                icon="⚙️"
                label={t('nav.settings')}
                isActive={currentPath === '/settings'}
                onPress={() => handleItemPress('/settings')}
              />
              <SidebarItem
                icon="❓"
                label={t('nav.helpSupport')}
                isActive={currentPath === '/help'}
                onPress={() => handleItemPress('/help')}
              />

              <View style={[styles.divider, { backgroundColor: activeColors.border }]} />

              {/* Logout Action */}
              <SidebarItem
                icon="🚪"
                label={t('nav.logout')}
                isActive={false}
                isDanger
                onPress={handleLogoutPress}
              />
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        onConfirmLogout={handleConfirmLogout}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(5, 8, 16, 0.82)',
  },
  drawerCard: {
    width: Math.min(320, SCREEN_WIDTH * 0.82),
    height: '100%',
    borderRightWidth: 1,
    paddingHorizontal: spacing.md,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
  },
  brandTitle: {
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  brandSub: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 1,
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
    fontWeight: '800',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.medium,
    borderWidth: 1,
    padding: spacing.xs + 4,
    marginVertical: spacing.xs,
  },
  avatarRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    overflow: 'hidden',
  },
  avatarPhoto: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '900',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  userRole: {
    fontSize: 10,
    marginTop: 1,
  },
  userRank: {
    fontSize: 9,
    fontWeight: '800',
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: spacing.xs,
  },
  menuScroll: {
    flex: 1,
  },
  menuContent: {
    paddingBottom: spacing.md,
  },
  pressed: {
    opacity: 0.75,
  },
});
