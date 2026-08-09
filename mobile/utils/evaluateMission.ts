import { MissionData } from '../types/mission';
import { PerformanceLevel, RiskLevel } from '../data/result';
import { UserSkillProgress, updateSkillProgress, INITIAL_USER_SKILLS } from './skillProgress';

export interface EvaluatedResult {
  missionId: string;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  selectedAnswerText: string;
  correctAnswerText: string;
  score: number;
  xpEarned: number;
  explanation: string;
  riskLevel: RiskLevel;
  performanceLevel: PerformanceLevel;
  decisionAnalysisTitle: string;
  decisionAnalysisText: string;
  aiInsight: string;
  keyTakeaway: string;
  skillChanges: UserSkillProgress[];
  whatWentWell: string[];
  whatCouldImprove: string[];
  recommendation: string;
}

export const evaluateAnswer = (
  mission: MissionData,
  selectedOptionId: string
): EvaluatedResult => {
  const isCorrect = selectedOptionId === mission.correctOptionId;
  const selectedOpt = mission.options.find((o) => o.id === selectedOptionId);
  const correctOpt = mission.options.find((o) => o.id === mission.correctOptionId);

  const selectedAnswerText = selectedOpt ? selectedOpt.text : 'No answer selected';
  const correctAnswerText = correctOpt ? correctOpt.text : 'Recommended response';

  const score = isCorrect
    ? Math.floor(Math.random() * 11) + 90 // 90-100
    : Math.floor(Math.random() * 21) + 40; // 40-60
  const xpEarned = isCorrect ? mission.rewardXP : Math.floor(mission.rewardXP * 0.4);

  const performanceLevel: PerformanceLevel = isCorrect
    ? 'EXCELLENT'
    : score >= 60
    ? 'GOOD'
    : 'NEEDS_IMPROVEMENT';

  const riskLevel: RiskLevel = isCorrect
    ? 'LOW'
    : mission.difficulty === 'HARD'
    ? 'HIGH'
    : 'MEDIUM';

  const skillChanges = updateSkillProgress(INITIAL_USER_SKILLS, mission, isCorrect);

  const decisionAnalysisTitle = isCorrect ? 'Optimal Strategy' : 'Sub-Optimal Decision';
  
  const decisionAnalysisText = isCorrect
    ? `Your selection directly addresses the root cause of the ${mission.category.toLowerCase()} scenario in accordance with industry best practices.`
    : `Selecting "${selectedAnswerText}" introduced unnecessary operational or security exposure. Review the recommended approach.`;

  const aiInsight = isCorrect
    ? `Good decision. You recognized the risk early and chose an appropriate escalation path for ${mission.category}.`
    : `You identified that the situation needed context, but the existing warning signs were already significant enough to require action. Prioritize containment when immediate risk is present.`;

  const whatWentWell = isCorrect
    ? ['Recognized core scenario risk', 'Decisive execution path', 'Appropriate operational escalation']
    : ['Identified relevant contextual factors in the scenario'];

  const whatCouldImprove = isCorrect
    ? ['Consider communicating earlier to adjacent team leads']
    : ['Prioritize immediate containment when multiple warning signs are present'];

  const recommendation = isCorrect
    ? `Maintain this structured approach. Next time, balance immediate technical resolution with concurrent stakeholder updates.`
    : `When several indicators point to an active operational incident, escalate early rather than waiting for absolute certainty.`;

  return {
    missionId: mission.id,
    selectedOptionId,
    correctOptionId: mission.correctOptionId,
    isCorrect,
    selectedAnswerText,
    correctAnswerText,
    score,
    xpEarned,
    explanation: mission.explanation,
    riskLevel,
    performanceLevel,
    decisionAnalysisTitle,
    decisionAnalysisText,
    aiInsight,
    keyTakeaway: mission.explanation,
    skillChanges,
    whatWentWell,
    whatCouldImprove,
    recommendation,
  };
};
