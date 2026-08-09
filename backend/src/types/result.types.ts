export interface MissionResult {
  sessionId: string;
  missionId: string;
  status: 'completed';
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalXp: number;
  finalRiskScore: number;
  startedAt: string;
  completedAt: string;
}
