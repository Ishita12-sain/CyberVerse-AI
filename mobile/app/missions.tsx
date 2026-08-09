import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import { colors, spacing, borderRadius } from '../constants/theme';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';
import { DailyProgressBar } from '../components/missions/DailyProgressBar';
import { StreakCard } from '../components/missions/StreakCard';
import { MissionCard } from '../components/dashboard/MissionCard';
import { getDailyMissions } from '../utils/missionSelection';
import { MOCK_PROFILE_DATA } from '../data/profile';

export default function DailyMissionsScreen() {
  const router = useRouter();
  const profile = MOCK_PROFILE_DATA;

  // Stable daily selection using date + role
  const todayStr = new Date().toISOString().split('T')[0];
  const dailyMissions = getDailyMissions(todayStr, profile.user.role);

  // Mock completed state for demo
  const completedCount = 1;

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />

        {/* Global Authenticated AppHeader */}
        <AppHeader title="DAILY MISSIONS" subtitle="✦ TODAY'S CHALLENGES" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section Hero Heading */}
          <View style={styles.heroHeader}>
            <Text variant="caption" color={colors.accent} style={styles.heroSub}>
              ✦ TODAY'S CHALLENGES
            </Text>
            <Text variant="h1" style={styles.heroTitle}>
              YOUR MISSIONS
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.heroDesc}>
              Complete today's challenges to keep building your workplace skills.
            </Text>
          </View>

          {/* Today Progress Tracker */}
          <DailyProgressBar completed={completedCount} total={dailyMissions.length} />

          {/* Streak Card */}
          <StreakCard streakDays={profile.streak} />

          {/* 3 Daily Mission Cards */}
          <View style={styles.missionsList}>
            {dailyMissions.map((m) => (
              <MissionCard
                key={m.id}
                title={m.title}
                description={m.scenario}
                difficulty={m.difficulty}
                rewardXP={m.rewardXP}
                objective={m.question}
                estTime={m.estimatedTime}
                onStartMission={() => router.push(`/mission?id=${m.id}` as any)}
              />
            ))}
          </View>

          {/* Secondary Action: Browse Full Library */}
          <View style={styles.libraryActionBox}>
            <Button
              title="BROWSE MISSION LIBRARY →"
              variant="outline"
              onPress={() => router.push('/history')}
              style={styles.libraryBtn}
            />
          </View>
        </ScrollView>
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
    flexGrow: 1,
    paddingBottom: spacing.lg,
  },
  heroHeader: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  heroSub: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  missionsList: {
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  libraryActionBox: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  libraryBtn: {
    height: 44,
  },
});
