import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors, spacing, borderRadius } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';
import { SettingsSection } from '../components/settings/SettingsSection';
import { SettingsRow } from '../components/settings/SettingsRow';
import { SettingsSwitch } from '../components/settings/SettingsSwitch';
import { LogoutModal } from '../components/navigation/LogoutModal';
import { LanguageModal } from '../components/settings/LanguageModal';

const SETTINGS_STORAGE_KEY = '@cyberverse_settings_prefs';

export interface UserPreferences {
  notificationsEnabled: boolean;
  dailyMissionReminders: boolean;
  soundEnabled: boolean;
}

const DEFAULT_PREFS: UserPreferences = {
  notificationsEnabled: true,
  dailyMissionReminders: true,
  soundEnabled: true,
};

export default function SettingsScreen() {
  const router = useRouter();
  const { themeMode, setThemeMode, isDark } = useTheme();
  const { currentLanguageOption, t } = useLanguage();

  const [prefs, setPrefs] = useState<UserPreferences>(DEFAULT_PREFS);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [langModalVisible, setLangModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(SETTINGS_STORAGE_KEY)
      .then((data) => {
        if (data) {
          setPrefs(JSON.parse(data));
        }
      })
      .catch((e) => console.error('Failed to load settings', e));
  }, []);

  const updatePref = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    const updated = { ...prefs, [key]: value };
    setPrefs(updated);
    AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated)).catch((e) =>
      console.error('Failed to save setting', e)
    );
  };

  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    router.replace('/login');
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        {/* Global App Header */}
        <AppHeader title={t('settings.title')} subtitle={t('settings.subtitle')} showBack />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section 1: Account */}
          <SettingsSection title={t('settings.account')}>
            <SettingsRow
              icon="👤"
              title={t('settings.profile')}
              subtitle={t('settings.profileSub')}
              onPress={() => router.push('/profile')}
            />
            <SettingsRow
              icon="🔐"
              title={t('settings.changePassword')}
              subtitle={t('settings.changePasswordSub')}
              onPress={() => router.push('/change-password')}
            />
            <SettingsRow
              icon="📷"
              title={t('settings.profilePhoto')}
              subtitle={t('settings.profilePhotoSub')}
              onPress={() => router.push('/profile')}
              isLast
            />
          </SettingsSection>

          {/* Section 2: Preferences */}
          <SettingsSection title={t('settings.preferences')}>
            <SettingsSwitch
              icon="🔔"
              title={t('settings.notifications')}
              subtitle={t('settings.notificationsSub')}
              value={prefs.notificationsEnabled}
              onValueChange={(val) => updatePref('notificationsEnabled', val)}
            />
            <SettingsSwitch
              icon="🎯"
              title={t('settings.dailyMissionReminders')}
              subtitle={t('settings.dailyMissionRemindersSub')}
              value={prefs.dailyMissionReminders}
              onValueChange={(val) => updatePref('dailyMissionReminders', val)}
            />
            <SettingsSwitch
              icon="🔊"
              title={t('settings.soundHaptics')}
              subtitle={t('settings.soundHapticsSub')}
              value={prefs.soundEnabled}
              onValueChange={(val) => updatePref('soundEnabled', val)}
              isLast
            />
          </SettingsSection>

          {/* Section 3: Appearance Theme Selector */}
          <SettingsSection title={t('settings.appearance')}>
            <SettingsRow
              icon="🌙"
              title={t('settings.cyberDark')}
              subtitle={t('settings.cyberDarkSub')}
              valueText={themeMode === 'dark' ? t('common.active') : ''}
              onPress={() => setThemeMode('dark')}
            />
            <SettingsRow
              icon="☀️"
              title={t('settings.cyberLight')}
              subtitle={t('settings.cyberLightSub')}
              valueText={themeMode === 'light' ? t('common.active') : ''}
              onPress={() => setThemeMode('light')}
            />
            <SettingsRow
              icon="📱"
              title={t('settings.system')}
              subtitle={t('settings.systemSub')}
              valueText={themeMode === 'system' ? t('common.active') : ''}
              onPress={() => setThemeMode('system')}
              isLast
            />
          </SettingsSection>

          {/* Section 4: Language */}
          <SettingsSection title={t('settings.language')}>
            <SettingsRow
              icon="🌐"
              title={t('settings.language')}
              subtitle={t('settings.appDisplayLanguage')}
              valueText={currentLanguageOption.nativeName}
              onPress={() => setLangModalVisible(true)}
              isLast
            />
          </SettingsSection>

          {/* Section 5: Support */}
          <SettingsSection title={t('settings.support')}>
            <SettingsRow
              icon="❓"
              title={t('settings.helpSupport')}
              subtitle={t('settings.helpSupportSub')}
              onPress={() => router.push('/help')}
            />
            <SettingsRow
              icon="💬"
              title={t('settings.contactSupport')}
              subtitle={t('settings.contactSupportSub')}
              onPress={() => router.push('/support')}
              isLast
            />
          </SettingsSection>

          {/* Section 6: About */}
          <SettingsSection title={t('settings.about')}>
            <SettingsRow
              icon="ℹ️"
              title={t('settings.about')}
              subtitle={t('settings.aboutSub')}
              onPress={() => router.push('/about')}
            />
            <SettingsRow
              icon="🏷️"
              title={t('settings.version')}
              valueText="1.0.0"
            />
            <SettingsRow
              icon="📜"
              title={t('settings.termsOfService')}
              onPress={() => router.push('/terms')}
            />
            <SettingsRow
              icon="🛡️"
              title={t('settings.privacyPolicy')}
              onPress={() => router.push('/privacy')}
              isLast
            />
          </SettingsSection>

          {/* Logout Action Button */}
          <View style={styles.logoutContainer}>
            <Button
              title={t('settings.logout')}
              variant="outline"
              onPress={() => setLogoutModalVisible(true)}
              style={styles.logoutBtn}
            />
          </View>
        </ScrollView>

        {/* Logout Modal */}
        <LogoutModal
          visible={logoutModalVisible}
          onClose={() => setLogoutModalVisible(false)}
          onConfirmLogout={handleLogoutConfirm}
        />

        {/* Language Selection Modal */}
        <LanguageModal
          visible={langModalVisible}
          onClose={() => setLangModalVisible(false)}
        />
      </SafeAreaView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  logoutContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  logoutBtn: {
    borderColor: 'rgba(239, 68, 68, 0.4)',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 16, 0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#0D1322',
    borderRadius: borderRadius.large,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.35)',
    padding: spacing.md,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '900',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  langItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
});
