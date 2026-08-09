import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing, borderRadius } from '../constants/theme';
import { Text } from '../components/ui/Text';
import { Button } from '../components/ui/Button';
import { AuthBackground } from '../components/auth/AuthBackground';
import { ResultHero } from '../components/result/ResultHero';
import { CorrectnessBanner } from '../components/result/CorrectnessBanner';
import { AnswerComparison } from '../components/result/AnswerComparison';
import { XPReward } from '../components/result/XPReward';
import { DecisionAnalysis } from '../components/result/DecisionAnalysis';
import { DecisionImpact } from '../components/result/DecisionImpact';
import { AICoachResult } from '../components/result/AICoachResult';
import { KeyTakeaway } from '../components/result/KeyTakeaway';
import { SkillProgressSection } from '../components/result/SkillProgressSection';
import { MOCK_RESULT_DATA, getPerformanceLevel, RiskLevel } from '../data/result';
import { UserSkillProgress } from '../utils/skillProgress';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    missionId?: string;
    selectedOptionId?: string;
    correctOptionId?: string;
    isCorrect?: string;
    selectedAnswerText?: string;
    correctAnswerText?: string;
    score?: string;
    xpEarned?: string;
    explanation?: string;
    riskLevel?: string;
    performanceLevel?: string;
    decisionAnalysisTitle?: string;
    decisionAnalysisText?: string;
    aiInsight?: string;
    keyTakeaway?: string;
    skillChangesJson?: string;
    whatWentWellJson?: string;
    whatCouldImproveJson?: string;
    recommendation?: string;
  }>();

  const isCorrect = params.isCorrect ? params.isCorrect === 'true' : true;
  const score = params.score ? parseInt(params.score, 10) : MOCK_RESULT_DATA.score;
  const xpEarned = params.xpEarned ? parseInt(params.xpEarned, 10) : MOCK_RESULT_DATA.xpEarned;
  const riskLevel: RiskLevel = (params.riskLevel as RiskLevel) || MOCK_RESULT_DATA.riskLevel;
  const performanceLevel = getPerformanceLevel(score);

  const selectedAnswerText = params.selectedAnswerText || 'Investigate the activity first.';
  const correctAnswerText = params.correctAnswerText || 'Escalate the incident to the security team.';
  const explanation = params.explanation || MOCK_RESULT_DATA.keyTakeaway;
  const decisionAnalysisTitle = params.decisionAnalysisTitle || MOCK_RESULT_DATA.decisionAnalysisTitle;
  const decisionAnalysisText = params.decisionAnalysisText || MOCK_RESULT_DATA.decisionAnalysis;
  const aiInsight = params.aiInsight || MOCK_RESULT_DATA.aiInsight;
  const keyTakeaway = params.keyTakeaway || MOCK_RESULT_DATA.keyTakeaway;

  let skillChanges: UserSkillProgress[] = [
    { name: 'Risk Awareness', before: 68, after: isCorrect ? 74 : 65, delta: isCorrect ? 6 : -3 },
    { name: 'Decision Making', before: 72, after: isCorrect ? 76 : 71, delta: isCorrect ? 4 : -1 },
  ];
  if (params.skillChangesJson) {
    try {
      skillChanges = JSON.parse(params.skillChangesJson);
    } catch (e) {
      // fallback
    }
  }

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="light" />

        {/* Top Header Bar */}
        <View style={styles.topHeader}>
          <Pressable
            onPress={() => router.replace('/dashboard')}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Text variant="label" color={colors.accent} style={styles.backText}>
              ← DASHBOARD
            </Text>
          </Pressable>

          <View style={styles.headerTitleBox}>
            <Text variant="h3" style={styles.headerTitle}>
              MISSION COMPLETE
            </Text>
            <Text variant="caption" color={colors.accent} style={styles.headerSub}>
              ✦ DECISION ANALYSIS
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Correctness Banner */}
          <CorrectnessBanner isCorrect={isCorrect} />

          {/* Result Hero Circular Ring */}
          <ResultHero score={score} performanceLevel={performanceLevel} />

          {/* XP & Risk Level Row */}
          <XPReward xpEarned={xpEarned} riskLevel={riskLevel} />

          {/* User Answer vs Correct Answer & Why Explanation */}
          <AnswerComparison
            isCorrect={isCorrect}
            selectedAnswerText={selectedAnswerText}
            correctAnswerText={correctAnswerText}
            explanation={explanation}
          />

          {/* Skill Progress Section with before -> after deltas */}
          <SkillProgressSection skillChanges={skillChanges} />

          {/* Decision Analysis */}
          <DecisionAnalysis
            title={decisionAnalysisTitle}
            analysis={decisionAnalysisText}
          />

          {/* Decision Impact 3 Indicators */}
          <DecisionImpact impact={MOCK_RESULT_DATA.decisionImpact} />

          {/* AI Coach Result */}
          <AICoachResult
            insight={aiInsight}
            onViewInsight={() =>
              router.push({
                pathname: '/ai-coach',
                params: {
                  assessment: isCorrect ? 'Optimal Strategy' : 'Decision Needs Improvement',
                  isPositive: isCorrect ? 'true' : 'false',
                  decisionText: selectedAnswerText,
                  assessmentText: aiInsight,
                  whatWentWellJson: params.whatWentWellJson,
                  whatCouldImproveJson: params.whatCouldImproveJson,
                  recommendation: params.recommendation,
                  skillChangesJson: params.skillChangesJson,
                },
              })
            }
          />

          {/* Key Takeaway */}
          <KeyTakeaway takeaway={keyTakeaway} />
        </ScrollView>

        {/* Bottom CTA Action Buttons */}
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
    width: 90,
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
