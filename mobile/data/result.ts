export type PerformanceLevel = 'EXCELLENT' | 'GOOD' | 'NEEDS_IMPROVEMENT';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface DecisionImpactData {
  risk: string;
  communication: string;
  response: string;
}

export interface ResultData {
  missionId: string;
  score: number; // 0 - 100
  performanceLevel: PerformanceLevel;
  xpEarned: number;
  riskLevel: RiskLevel;
  decisionAnalysisTitle: string;
  decisionAnalysis: string;
  decisionImpact: DecisionImpactData;
  aiInsight: string;
  keyTakeaway: string;
}

export const MOCK_RESULT_DATA: ResultData = {
  missionId: 'cyber-001',
  score: 86,
  performanceLevel: 'EXCELLENT',
  xpEarned: 150,
  riskLevel: 'MEDIUM',
  decisionAnalysisTitle: 'Strong Response',
  decisionAnalysis:
    'Your decision showed good awareness of the immediate security risk while considering the need for further investigation.',
  decisionImpact: {
    risk: 'MEDIUM',
    communication: 'GOOD',
    response: 'STRONG',
  },
  aiInsight:
    'Your response showed strong risk awareness. Next time, consider escalating earlier when multiple indicators suggest a coordinated incident.',
  keyTakeaway:
    'Early escalation can reduce the impact of a developing security incident.',
};

export const getPerformanceLevel = (score: number): PerformanceLevel => {
  if (score >= 80) return 'EXCELLENT';
  if (score >= 60) return 'GOOD';
  return 'NEEDS_IMPROVEMENT';
};
