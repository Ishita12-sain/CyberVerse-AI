import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { colors } from '../constants/theme';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';
import { LevelCard } from '../components/dashboard/LevelCard';
import { PerformanceStats } from '../components/dashboard/PerformanceStats';
import { MissionCard } from '../components/dashboard/MissionCard';
import { AICoachCard } from '../components/dashboard/AICoachCard';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { DashboardBottomNav, BottomTab } from '../components/dashboard/DashboardBottomNav';
import { MOCK_DASHBOARD_DATA } from '../data/dashboard';
import { getDailyMissions } from '../utils/missionSelection';

export default function DashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<BottomTab>('home');
  const data = MOCK_DASHBOARD_DATA;
  const dailyMissions = getDailyMissions();
  const activeNextMission = dailyMissions[0] || data.nextMission;

  const handleStartMission = () => {
    router.push({
      pathname: '/mission',
      params: { id: activeNextMission.id },
    });
  };

  const handleTabSelect = (tab: BottomTab) => {
    setActiveTab(tab);
    if (tab === 'missions') {
      router.push('/missions');
    } else if (tab === 'profile') {
      router.push('/profile');
    }
  };
  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />

        {/* Global Authenticated AppHeader with Hamburger Drawer */}
        <AppHeader title="CYBERVERSE AI" subtitle="✦ MISSION COMMAND" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Level / XP Progress Card */}
          <LevelCard
            level={data.level}
            xp={data.xp}
            xpProgress={data.xpProgress}
            xpToNextLevel={data.xpToNextLevel}
          />

          {/* Performance Quick Stats */}
          <PerformanceStats
            overallScore={data.overallScore}
            missionsCompleted={data.missionsCompleted}
            streak={data.streak}
          />

          {/* Next Mission Main Card */}
          <MissionCard
            title={activeNextMission.title}
            description={activeNextMission.scenario}
            difficulty={activeNextMission.difficulty}
            rewardXP={activeNextMission.rewardXP}
            objective="Investigate & respond"
            estTime={activeNextMission.estimatedTime}
            onStartMission={handleStartMission}
          />

          {/* AI Coach Card */}
          <AICoachCard
            insight={data.aiInsight}
            onViewInsights={() => router.push('/profile')}
          />

          {/* Recent Activity List */}
          {data.recentActivity && (
            <RecentActivity activities={data.recentActivity} />
          )}
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
    paddingBottom: 10,
  },
});
