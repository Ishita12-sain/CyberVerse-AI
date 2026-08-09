import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors, spacing, borderRadius } from '../constants/theme';
import { Text } from '../components/ui/Text';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';
import { ProfileHero } from '../components/profile/ProfileHero';
import { PhotoActionModal } from '../components/profile/PhotoActionModal';
import { LevelCard } from '../components/dashboard/LevelCard';
import { PerformanceStats } from '../components/dashboard/PerformanceStats';
import { ProfileSkills } from '../components/profile/ProfileSkills';
import { ProfileAchievementsSection } from '../components/profile/ProfileAchievementsSection';
import { RecentMissionsHistory } from '../components/profile/RecentMissionsHistory';
import { DashboardBottomNav, BottomTab } from '../components/dashboard/DashboardBottomNav';
import { MOCK_PROFILE_DATA } from '../data/profile';

const PROFILE_PHOTO_STORAGE_KEY = '@cyberverse_profile_photo_uri';

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<BottomTab>('profile');
  const [profilePhotoUri, setProfilePhotoUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const data = MOCK_PROFILE_DATA;

  // Load persisted photo URI on mount
  useEffect(() => {
    const loadPhoto = async () => {
      try {
        const savedUri = await AsyncStorage.getItem(PROFILE_PHOTO_STORAGE_KEY);
        if (savedUri) {
          setProfilePhotoUri(savedUri);
        }
      } catch (e) {
        console.error('Failed to load profile photo', e);
      }
    };
    loadPhoto();
  }, []);

  const savePhotoUri = async (uri: string | null) => {
    try {
      if (uri) {
        await AsyncStorage.setItem(PROFILE_PHOTO_STORAGE_KEY, uri);
      } else {
        await AsyncStorage.removeItem(PROFILE_PHOTO_STORAGE_KEY);
      }
      setProfilePhotoUri(uri);
    } catch (e) {
      console.error('Failed to save profile photo', e);
    }
  };

  const handleSelectGallery = async () => {
    setModalVisible(false);
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Photo access is required to choose a profile picture.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        await savePhotoUri(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Error', 'Could not select image from gallery.');
    }
  };

  const handleSelectCamera = async () => {
    setModalVisible(false);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera access is required to take a profile photo.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        await savePhotoUri(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Error', 'Camera is unavailable or error capturing photo.');
    }
  };

  const handleRemovePhoto = async () => {
    setModalVisible(false);
    await savePhotoUri(null);
  };

  const handleTabSelect = (tab: BottomTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      router.replace('/dashboard');
    } else if (tab === 'missions') {
      router.replace('/missions');
    }
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />

        {/* Global Authenticated AppHeader */}
        <AppHeader title="MY PROFILE" subtitle="✦ CYBERVERSE PLAYER PROFILE" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Identity Hero */}
          <ProfileHero
            name={data.user.name}
            role={data.user.role}
            level={data.level}
            initials={data.user.avatarInitials}
            photoUri={profilePhotoUri}
            onEditPhotoPress={() => setModalVisible(true)}
          />

          {/* Level / XP Progress Card */}
          <LevelCard
            level={data.level}
            xp={data.xp}
            xpProgress={data.xpProgress}
            xpToNextLevel={data.xpToNextLevel}
          />

          {/* Performance Stats */}
          <PerformanceStats
            overallScore={data.overallScore}
            missionsCompleted={data.missionsCompleted}
            streak={data.streak}
          />

          {/* Profile Skill Development */}
          <ProfileSkills skills={data.skills} />

          {/* Profile Achievements Section */}
          <ProfileAchievementsSection onViewAllPress={() => router.push('/achievements')} />

          {/* Recent Mission History */}
          <RecentMissionsHistory
            missions={data.recentMissions}
            onViewAllPress={() => router.push('/history')}
          />
        </ScrollView>

        {/* Photo Action Modal */}
        <PhotoActionModal
          visible={modalVisible}
          hasPhoto={!!profilePhotoUri}
          onClose={() => setModalVisible(false)}
          onSelectGallery={handleSelectGallery}
          onSelectCamera={handleSelectCamera}
          onRemovePhoto={handleRemovePhoto}
        />
      </SafeAreaView>
    </AuthBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHeader: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  backButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    borderRadius: borderRadius.small,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  backText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  headerTitleBox: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
    color: colors.textPrimary,
  },
  headerSub: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginTop: 1,
  },
  headerSpacer: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.sm,
  },
  pressed: {
    opacity: 0.75,
  },
});
