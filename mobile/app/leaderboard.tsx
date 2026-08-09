import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import { colors, spacing, borderRadius } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';
import { LeaderboardPodium } from '../components/leaderboard/LeaderboardPodium';
import { LeaderboardRow } from '../components/leaderboard/LeaderboardRow';
import { MOCK_LEADERBOARD_USERS, LeaderboardUser } from '../data/leaderboard';

export type TimeFilter = 'THIS_WEEK' | 'THIS_MONTH' | 'ALL_TIME';

export default function LeaderboardScreen() {
  const router = useRouter();
  const { colors: activeColors, isDark } = useTheme();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('THIS_WEEK');

  const sortedRankings = useMemo(() => {
    const list = [...MOCK_LEADERBOARD_USERS];
    list.sort((a, b) => {
      if (timeFilter === 'THIS_MONTH') return b.monthlyXP - a.monthlyXP;
      if (timeFilter === 'ALL_TIME') return b.totalXP - a.totalXP;
      return b.weeklyXP - a.weeklyXP;
    });

    return list.map((user, idx) => ({
      user,
      rank: idx + 1,
      xp:
        timeFilter === 'THIS_MONTH'
          ? user.monthlyXP
          : timeFilter === 'ALL_TIME'
          ? user.totalXP
          : user.weeklyXP,
    }));
  }, [timeFilter]);

  const top3 = sortedRankings.slice(0, 3);
  const remainingRankings = sortedRankings.slice(3);
  const currentUserRank = sortedRankings.find((r) => r.user.isCurrentUser);

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        {/* App Header */}
        <AppHeader title="LEADERBOARD" subtitle="✦ CYBERVERSE RANKINGS" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Description */}
          <View style={styles.heroBox}>
            <Text variant="caption" color={activeColors.accent} style={styles.heroTag}>
              ✦ CYBERVERSE RANKINGS
            </Text>
            <Text variant="h1" style={styles.heroTitle}>
              GLOBAL LEADERBOARD
            </Text>
            <Text variant="body" color={activeColors.textSecondary} style={styles.heroSub}>
              See how your workplace decision skills compare with top players worldwide.
            </Text>
          </View>

          {/* Time Filter Chips */}
          <View style={styles.filterContainer}>
            <Pressable
              onPress={() => setTimeFilter('THIS_WEEK')}
              style={({ pressed }) => [
                styles.filterChip,
                timeFilter === 'THIS_WEEK' && styles.activeFilterChip,
                pressed && styles.pressed,
              ]}
            >
              <Text
                variant="caption"
                color={timeFilter === 'THIS_WEEK' ? activeColors.textPrimary : activeColors.textMuted}
                style={styles.filterText}
              >
                THIS WEEK
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setTimeFilter('THIS_MONTH')}
              style={({ pressed }) => [
                styles.filterChip,
                timeFilter === 'THIS_MONTH' && styles.activeFilterChip,
                pressed && styles.pressed,
              ]}
            >
              <Text
                variant="caption"
                color={timeFilter === 'THIS_MONTH' ? activeColors.textPrimary : activeColors.textMuted}
                style={styles.filterText}
              >
                THIS MONTH
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setTimeFilter('ALL_TIME')}
              style={({ pressed }) => [
                styles.filterChip,
                timeFilter === 'ALL_TIME' && styles.activeFilterChip,
                pressed && styles.pressed,
              ]}
            >
              <Text
                variant="caption"
                color={timeFilter === 'ALL_TIME' ? activeColors.textPrimary : activeColors.textMuted}
                style={styles.filterText}
              >
                ALL TIME
              </Text>
            </Pressable>
          </View>

          {/* Top 3 Podium */}
          <LeaderboardPodium topUsers={top3} />

          {/* Remaining Rankings List */}
          <View style={styles.listSection}>
            <Text variant="caption" color={activeColors.textMuted} style={styles.listTitle}>
              RANKINGS (#4 - #{sortedRankings.length})
            </Text>

            {remainingRankings.map((item) => (
              <LeaderboardRow
                key={item.user.id}
                rank={item.rank}
                user={item.user}
                xp={item.xp}
              />
            ))}
          </View>
        </ScrollView>

        {/* Sticky User Rank Bar */}
        {currentUserRank && (
          <View style={styles.stickyUserBar}>
            <View style={styles.userRankLeft}>
              <Text variant="caption" color={activeColors.accent} style={styles.yourRankTag}>
                YOUR RANK
              </Text>
              <Text variant="h3" color={activeColors.textPrimary} style={styles.yourRankNum}>
                #{currentUserRank.rank}
              </Text>
            </View>

            <View style={styles.userRankRight}>
              <Text variant="label" color={activeColors.accent} style={styles.yourXp}>
                {currentUserRank.xp.toLocaleString()} XP
              </Text>
              <Text variant="caption" color={activeColors.success} style={styles.posDelta}>
                +2 positions this week
              </Text>
            </View>
          </View>
        )}
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
    paddingBottom: spacing.xl,
  },
  heroBox: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  heroTag: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 2,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 2,
  },
  heroSub: {
    fontSize: 12,
    lineHeight: 17,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    marginVertical: spacing.xs,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  activeFilterChip: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  listSection: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
  },
  listTitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  stickyUserBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    backgroundColor: '#0D1322',
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 92, 246, 0.35)',
  },
  userRankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  yourRankTag: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  yourRankNum: {
    fontSize: 16,
    fontWeight: '900',
  },
  userRankRight: {
    alignItems: 'flex-end',
  },
  yourXp: {
    fontSize: 13,
    fontWeight: '900',
  },
  posDelta: {
    fontSize: 9,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
});
