import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import { colors, spacing, borderRadius } from '../constants/theme';
import { Text } from '../components/ui/Text';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';
import { PerformanceOverviewGrid } from '../components/history/PerformanceOverviewGrid';
import { PerformanceBreakdown } from '../components/history/PerformanceBreakdown';
import { ProfileSkills } from '../components/profile/ProfileSkills';
import { CategoryPerformance } from '../components/history/CategoryPerformance';
import {
  HistoryFiltersBar,
  CategoryFilter,
  StatusFilter,
  SortOption,
} from '../components/history/HistoryFiltersBar';
import { HistoryList } from '../components/history/HistoryList';
import {
  MOCK_PERFORMANCE_ANALYTICS,
  MOCK_HISTORY_MISSIONS,
  HistoryMissionItem,
} from '../data/history';

export default function MissionHistoryScreen() {
  const router = useRouter();
  const analytics = MOCK_PERFORMANCE_ANALYTICS;

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('ALL');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [sortOption, setSortOption] = useState<SortOption>('NEWEST');

  const filteredMissions = useMemo(() => {
    let result = [...MOCK_HISTORY_MISSIONS];

    // Filter by Category
    if (categoryFilter !== 'ALL') {
      result = result.filter((m) => m.category === categoryFilter);
    }

    // Filter by Status
    if (statusFilter === 'CORRECT') {
      result = result.filter((m) => m.isCorrect);
    } else if (statusFilter === 'INCORRECT') {
      result = result.filter((m) => !m.isCorrect);
    }

    // Sort Options
    result.sort((a, b) => {
      if (sortOption === 'HIGHEST_SCORE') return b.score - a.score;
      if (sortOption === 'LOWEST_SCORE') return a.score - b.score;
      if (sortOption === 'MOST_XP') return b.xpEarned - a.xpEarned;
      // Default: NEWEST
      return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
    });

    return result;
  }, [categoryFilter, statusFilter, sortOption]);

  const handleSelectMission = (item: HistoryMissionItem) => {
    router.push({
      pathname: '/result',
      params: {
        missionId: item.missionId,
        selectedAnswerText: item.userAnswer,
        correctAnswerText: item.correctAnswer,
        isCorrect: item.isCorrect ? 'true' : 'false',
        score: String(item.score),
        xpEarned: String(item.xpEarned),
        explanation: item.explanation,
        aiInsight: item.aiInsight,
      },
    });
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />

        {/* Global Authenticated AppHeader */}
        <AppHeader title="MISSION HISTORY" subtitle="✦ PERFORMANCE ANALYTICS" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Performance Overview Metric Grid */}
          <PerformanceOverviewGrid
            completed={analytics.missionsCompleted}
            avgScore={analytics.averageScore}
            accuracy={analytics.accuracy}
            totalXP={analytics.totalXP}
          />

          {/* Performance Breakdown */}
          <PerformanceBreakdown
            correctPercentage={analytics.breakdown.correctPercentage}
            incorrectPercentage={analytics.breakdown.incorrectPercentage}
          />

          {/* Skill Performance */}
          <ProfileSkills skills={analytics.skills} />

          {/* Category Performance */}
          <CategoryPerformance categories={analytics.categories} />

          {/* Filters & Sorting Control */}
          <HistoryFiltersBar
            selectedCategory={categoryFilter}
            onSelectCategory={setCategoryFilter}
            selectedStatus={statusFilter}
            onSelectStatus={setStatusFilter}
            selectedSort={sortOption}
            onSelectSort={setSortOption}
          />

          {/* Mission List */}
          <HistoryList
            missions={filteredMissions}
            onSelectMission={handleSelectMission}
          />
        </ScrollView>
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
    paddingBottom: spacing.md,
  },
  pressed: {
    opacity: 0.75,
  },
});
