import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, borderRadius } from '../constants/theme';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { AuthBackground } from '../components/auth/AuthBackground';
import { CoachHero } from '../components/coach/CoachHero';
import { DecisionReview } from '../components/coach/DecisionReview';
import { StrengthsSection } from '../components/coach/StrengthsSection';
import { ImprovementsSection } from '../components/coach/ImprovementsSection';
import { SkillAnalysisSection } from '../components/coach/SkillAnalysisSection';
import { CoachRecommendation } from '../components/coach/CoachRecommendation';
import { MOCK_AI_COACH_DATA } from '../data/coach';

export default function AICoachScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    assessment?: string;
    isPositive?: string;
    decisionText?: string;
    assessmentText?: string;
    whatWentWellJson?: string;
    whatCouldImproveJson?: string;
    recommendation?: string;
    skillChangesJson?: string;
  }>();

  const data = MOCK_AI_COACH_DATA;
  const isPositive = params.isPositive ? params.isPositive === 'true' : data.isPositive;
  const assessment = params.assessment || (isPositive ? 'Optimal Strategy' : 'Decision Needs Improvement');
  const decisionText = params.decisionText || data.selectedDecisionText;
  const assessmentText = params.assessmentText || data.decisionAssessment;
  const recommendation = params.recommendation || data.recommendation;

  let strengths = data.strengths;
  if (params.whatWentWellJson) {
    try {
      strengths = JSON.parse(params.whatWentWellJson);
    } catch (e) {}
  }

  let improvements = data.improvements;
  if (params.whatCouldImproveJson) {
    try {
      const parsed = JSON.parse(params.whatCouldImproveJson);
      if (Array.isArray(parsed)) {
        improvements = parsed.map((item: string) => ({
          skill: 'CONTAINMENT & TIMING',
          insight: item,
        }));
      }
    } catch (e) {}
  }

  let skills = data.skills;
  if (params.skillChangesJson) {
    try {
      const parsedSkillChanges = JSON.parse(params.skillChangesJson);
      if (Array.isArray(parsedSkillChanges)) {
        skills = parsedSkillChanges.map((sc: any) => ({
          name: sc.name,
          percentage: sc.after,
        }));
      }
    } catch (e) {}
  }

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="light" />

        {/* Header Bar */}
        <View style={styles.topHeader}>
          <Pressable
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/dashboard');
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Text variant="label" color={colors.accent} style={styles.backText}>
              ← BACK
            </Text>
          </Pressable>

          <View style={styles.headerTitleBox}>
            <Text variant="h3" style={styles.headerTitle}>
              YOUR AI COACH
            </Text>
            <Text variant="caption" color={colors.accent} style={styles.headerSub}>
              ✦ PERSONAL PERFORMANCE ANALYSIS
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* AI Hero Assessment Banner */}
          <CoachHero assessment={assessment} isPositive={isPositive} />

          {/* User Decision Review */}
          <DecisionReview
            decisionText={decisionText}
            assessmentText={assessmentText}
          />

          {/* Strengths Section */}
          <StrengthsSection strengths={strengths} />

          {/* Areas to Improve */}
          <ImprovementsSection improvements={improvements} />

          {/* Skill Analysis Progress Bars */}
          <SkillAnalysisSection skills={skills} />

          {/* AI Recommendation Card */}
          <CoachRecommendation recommendation={recommendation} />
        </ScrollView>

        {/* Action Buttons Footer */}
        <View style={styles.footerContainer}>
          <Button
            title="NEXT MISSION →"
            variant="primary"
            onPress={() => router.replace('/mission')}
            style={styles.nextButton}
          />
          <Button
            title="BACK TO DASHBOARD"
            variant="outline"
            onPress={() => router.replace('/dashboard')}
            style={styles.dashButton}
          />
        </View>
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
    width: 70,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.sm,
  },
  footerContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs + 2,
    backgroundColor: '#070B16',
    borderTopWidth: 1,
    borderTopColor: 'rgba(99, 102, 241, 0.2)',
  },
  nextButton: {
    height: 48,
    backgroundColor: '#8B5CF6',
    borderRadius: borderRadius.medium,
  },
  dashButton: {
    height: 44,
  },
  pressed: {
    opacity: 0.75,
  },
});
