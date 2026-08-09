export interface SkillRating {
  name: string;
  percentage: number;
}

export interface ImprovementItem {
  skill: string;
  insight: string;
}

export interface AICoachAnalysisData {
  assessment: string;
  isPositive: boolean;
  selectedDecisionText: string;
  decisionAssessment: string;
  strengths: string[];
  improvements: ImprovementItem[];
  skills: SkillRating[];
  recommendation: string;
}

export const MOCK_AI_COACH_DATA: AICoachAnalysisData = {
  assessment: 'Strong Decision',
  isPositive: true,
  selectedDecisionText: 'Escalate the incident to the security team.',
  decisionAssessment:
    'Your response demonstrated strong awareness of the potential security risk while initiating early escalation procedures.',
  strengths: ['Risk awareness', 'Decisive response', 'Appropriate escalation'],
  improvements: [
    {
      skill: 'COMMUNICATION',
      insight:
        'Consider communicating the incident earlier to relevant cross-functional stakeholders.',
    },
  ],
  skills: [
    { name: 'Risk Awareness', percentage: 90 },
    { name: 'Decision Making', percentage: 80 },
    { name: 'Communication', percentage: 60 },
    { name: 'Leadership', percentage: 70 },
  ],
  recommendation:
    'Next time, consider balancing immediate technical escalation with clear, concurrent communication to affected team leads.',
};
