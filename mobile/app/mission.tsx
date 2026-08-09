import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, spacing } from '../constants/theme';
import { Text } from '../components/ui/Text';
import { AuthBackground } from '../components/auth/AuthBackground';
import { MissionHeader } from '../components/mission/MissionHeader';
import { MissionVisual } from '../components/mission/MissionVisual';
import { ScenarioCard } from '../components/mission/ScenarioCard';
import { DecisionOption } from '../components/mission/DecisionOption';
import { MissionFooter } from '../components/mission/MissionFooter';
import { MISSION_LIBRARY } from '../data/missions';
import { getMissionById } from '../utils/missionSelection';
import { evaluateAnswer } from '../utils/evaluateMission';
import { MissionData } from '../types/mission';

export default function MissionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  
  const missionId = params.id || 'cyber-001';
  const mission: MissionData = getMissionById(missionId) || MISSION_LIBRARY[0];
  
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleConfirmDecision = () => {
    if (!selectedOptionId) return;
    
    // Evaluate answer via utility helper
    const evaluated = evaluateAnswer(mission, selectedOptionId);

    router.push({
      pathname: '/result',
      params: {
        missionId: evaluated.missionId,
        selectedOptionId: evaluated.selectedOptionId,
        correctOptionId: evaluated.correctOptionId,
        isCorrect: evaluated.isCorrect ? 'true' : 'false',
        selectedAnswerText: evaluated.selectedAnswerText,
        correctAnswerText: evaluated.correctAnswerText,
        score: String(evaluated.score),
        xpEarned: String(evaluated.xpEarned),
        explanation: evaluated.explanation,
        riskLevel: evaluated.riskLevel,
        performanceLevel: evaluated.performanceLevel,
        decisionAnalysisTitle: evaluated.decisionAnalysisTitle,
        decisionAnalysisText: evaluated.decisionAnalysisText,
        aiInsight: evaluated.aiInsight,
        keyTakeaway: evaluated.keyTakeaway,
        skillChangesJson: JSON.stringify(evaluated.skillChanges),
        whatWentWellJson: JSON.stringify(evaluated.whatWentWell),
        whatCouldImproveJson: JSON.stringify(evaluated.whatCouldImprove),
        recommendation: evaluated.recommendation,
      },
    });
  };

  return (
    <AuthBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="light" />

        {/* Mission Header Bar */}
        <MissionHeader
          missionNumber={(MISSION_LIBRARY.findIndex(m => m.id === mission.id) + 1) || 1}
          totalMissions={MISSION_LIBRARY.length}
          onBackPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/dashboard');
            }
          }}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Mission Category Visual */}
          <MissionVisual category={mission.category} />

          {/* Scenario Situation Card */}
          <ScenarioCard
            title={mission.title}
            difficulty={mission.difficulty}
            rewardXP={mission.rewardXP}
            estimatedTime={mission.estimatedTime}
            scenario={mission.scenario}
          />

          {/* Decision Section */}
          <View style={styles.decisionSection}>
            <Text variant="label" color={colors.accent} style={styles.questionHeading}>
              {mission.question}
            </Text>

            {mission.options.map((option) => (
              <DecisionOption
                key={option.id}
                id={option.id}
                text={option.text}
                selected={selectedOptionId === option.id}
                onSelect={(id) => setSelectedOptionId(id)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Footer Confirm CTA */}
        <MissionFooter
          confirmDisabled={!selectedOptionId}
          onConfirm={handleConfirmDecision}
        />
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
    paddingBottom: spacing.sm,
  },
  decisionSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  questionHeading: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
});
