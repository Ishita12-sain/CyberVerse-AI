import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import { colors, spacing, borderRadius } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';
import { MOCK_ACHIEVEMENTS, AchievementItem } from '../data/achievements';

export default function AchievementsScreen() {
  const router = useRouter();
  const { colors: activeColors, isDark } = useTheme();

  const unlockedCount = MOCK_ACHIEVEMENTS.filter((a) => a.isUnlocked).length;

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <AppHeader title="ACHIEVEMENTS" subtitle="✦ GAMIFICATION BADGES" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section Hero Heading */}
          <View style={styles.heroBox}>
            <Text variant="caption" color={activeColors.accent} style={styles.heroTag}>
              ✦ REWARD BADGES
            </Text>
            <Text variant="h1" style={styles.heroTitle}>
              ACHIEVEMENTS
            </Text>
            <Text variant="body" color={activeColors.textSecondary} style={styles.heroSub}>
              Earn badges by completing workplace scenario simulation milestones.
            </Text>
            <Text variant="caption" color={activeColors.success} style={styles.counterText}>
              UNLOCKED: {unlockedCount} / {MOCK_ACHIEVEMENTS.length}
            </Text>
          </View>

          {/* 2-Column Achievement Grid */}
          <View style={styles.grid}>
            {MOCK_ACHIEVEMENTS.map((item) => (
              <Card
                key={item.id}
                style={[
                  styles.card,
                  item.isUnlocked ? styles.unlockedCard : styles.lockedCard,
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.icon}>{item.icon}</Text>
                  <Text
                    variant="caption"
                    color={item.isUnlocked ? activeColors.success : activeColors.textMuted}
                    style={styles.statusBadge}
                  >
                    {item.isUnlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                  </Text>
                </View>

                <Text
                  variant="label"
                  color={item.isUnlocked ? activeColors.textPrimary : activeColors.textMuted}
                  style={styles.achTitle}
                >
                  {item.title}
                </Text>
                <Text
                  variant="caption"
                  color={item.isUnlocked ? activeColors.textSecondary : activeColors.textMuted}
                  style={styles.achDesc}
                >
                  {item.description}
                </Text>
              </Card>
            ))}
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
  heroBox: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
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
  counterText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginTop: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },
  card: {
    flex: 1,
    minWidth: '46%',
    padding: spacing.sm + 2,
    borderRadius: borderRadius.medium,
    borderWidth: 1,
  },
  unlockedCard: {
    backgroundColor: '#0D1322',
    borderColor: 'rgba(139, 92, 246, 0.35)',
  },
  lockedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    opacity: 0.7,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  icon: {
    fontSize: 20,
  },
  statusBadge: {
    fontSize: 9,
    fontWeight: '900',
  },
  achTitle: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 2,
  },
  achDesc: {
    fontSize: 10,
    lineHeight: 14,
  },
});
