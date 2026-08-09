import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import { colors, spacing, borderRadius } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';

export default function AboutScreen() {
  const router = useRouter();
  const { colors: activeColors, isDark } = useTheme();

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <AppHeader title="ABOUT CYBERVERSE" subtitle="✦ PLATFORM OVERVIEW" showBack />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Brand Hero */}
          <View style={styles.heroBox}>
            <View style={styles.logoOrb}>
              <Text style={styles.logoIcon}>✦</Text>
            </View>
            <Text variant="h1" style={styles.brandTitle}>
              CYBERVERSE AI
            </Text>
            <Badge label="VERSION 1.0.0" variant="AI" style={styles.verBadge} />
            <Text variant="body" color={activeColors.accent} style={styles.tagline}>
              "Build better decisions. One mission at a time."
            </Text>
          </View>

          {/* Section 1: What is CyberVerse */}
          <Card style={styles.sectionCard}>
            <Text variant="caption" color={activeColors.textMuted} style={styles.cardTag}>
              WHAT IS CYBERVERSE?
            </Text>
            <Text variant="body" color={activeColors.textSecondary} style={styles.cardDesc}>
              CyberVerse is an AI-powered workplace simulation platform that helps professionals practice operational decision-making through realistic workplace scenarios.
            </Text>
          </Card>

          {/* Section 2: What You Can Do */}
          <Card style={styles.sectionCard}>
            <Text variant="caption" color={activeColors.textMuted} style={styles.cardTag}>
              WHAT YOU CAN DO
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureRow}>
                <Text style={styles.featIcon}>🎯</Text>
                <Text variant="bodyMedium" color={activeColors.textPrimary} style={styles.featText}>
                  Scenario-based workplace missions
                </Text>
              </View>

              <View style={styles.featureRow}>
                <Text style={styles.featIcon}>✦</Text>
                <Text variant="bodyMedium" color={activeColors.textPrimary} style={styles.featText}>
                  Honest AI coaching & feedback
                </Text>
              </View>

              <View style={styles.featureRow}>
                <Text style={styles.featIcon}>📊</Text>
                <Text variant="bodyMedium" color={activeColors.textPrimary} style={styles.featText}>
                  Personal performance & skill analytics
                </Text>
              </View>

              <View style={styles.featureRow}>
                <Text style={styles.featIcon}>🏆</Text>
                <Text variant="bodyMedium" color={activeColors.textPrimary} style={styles.featText}>
                  Gamified progression & leaderboards
                </Text>
              </View>

              <View style={styles.featureRow}>
                <Text style={styles.featIcon}>🔥</Text>
                <Text variant="bodyMedium" color={activeColors.textPrimary} style={styles.featText}>
                  Daily customized role challenges
                </Text>
              </View>
            </View>
          </Card>

          {/* Section 3: Our Approach */}
          <Card style={styles.sectionCard}>
            <Text variant="caption" color={activeColors.textMuted} style={styles.cardTag}>
              OUR APPROACH
            </Text>
            <Text variant="body" color={activeColors.textSecondary} style={styles.cardDesc}>
              Learn by making decisions, understanding their consequences in a safe environment, and continuously improving through structured AI feedback loops.
            </Text>
          </Card>
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
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  heroBox: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  logoOrb: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  logoIcon: {
    fontSize: 24,
    color: '#8B5CF6',
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  verBadge: {
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#0D1322',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    padding: spacing.md,
  },
  cardTag: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  cardDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  featureList: {
    gap: spacing.xs + 2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    width: 24,
  },
  featText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
