import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { colors, spacing, borderRadius } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { AuthBackground } from '../components/auth/AuthBackground';
import { AppHeader } from '../components/navigation/AppHeader';

export default function TermsOfServiceScreen() {
  const { colors: activeColors, isDark } = useTheme();

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <AppHeader title="TERMS OF SERVICE" subtitle="✦ PLATFORM TERMS" showBack />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.noticeBanner}>
            <Text variant="caption" color={activeColors.warning} style={styles.noticeText}>
              ⚠️ Demo Terms — replace with reviewed legal content before production.
            </Text>
          </View>

          <Card style={styles.docCard}>
            <Text variant="h2" style={styles.docTitle}>
              TERMS OF SERVICE
            </Text>
            <Text variant="caption" color={activeColors.textMuted} style={styles.docMeta}>
              Last updated: August 9, 2026
            </Text>

            <View style={styles.section}>
              <Text variant="label" style={styles.sectionHeader}>
                1. USE OF THE PLATFORM
              </Text>
              <Text variant="body" color={activeColors.textSecondary} style={styles.bodyText}>
                CyberVerse AI provides workplace simulation scenarios for educational and skill development purposes. Scenario outcomes reflect learning models and should not replace formal legal or operational counsel.
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="label" style={styles.sectionHeader}>
                2. USER ACCOUNTS
              </Text>
              <Text variant="body" color={activeColors.textSecondary} style={styles.bodyText}>
                Users are responsible for maintaining the confidentiality of their account credentials and for all activities conducted under their profile.
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="label" style={styles.sectionHeader}>
                3. MISSION CONTENT & INTELLECTUAL PROPERTY
              </Text>
              <Text variant="body" color={activeColors.textSecondary} style={styles.bodyText}>
                All simulation scenarios, AI coaching models, badges, and visual interfaces are proprietary assets protected by copyright and intellectual property laws.
              </Text>
            </View>

            <View style={styles.section}>
              <Text variant="label" style={styles.sectionHeader}>
                4. ACCEPTABLE USE
              </Text>
              <Text variant="body" color={activeColors.textSecondary} style={styles.bodyText}>
                Users agree not to exploit, reverse engineer, or misuse simulation datasets, AI feedback systems, or leaderboard metrics.
              </Text>
            </View>
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
  noticeBanner: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderWidth: 1,
    borderRadius: borderRadius.medium,
    padding: spacing.sm,
  },
  noticeText: {
    fontSize: 11,
    lineHeight: 16,
  },
  docCard: {
    backgroundColor: '#0D1322',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    padding: spacing.md,
    gap: spacing.md,
  },
  docTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  docMeta: {
    fontSize: 10,
    marginTop: -8,
  },
  section: {
    gap: 4,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  bodyText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
