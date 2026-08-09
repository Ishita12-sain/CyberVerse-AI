export interface AnswerHistoryEntry {
  questionId: string;
  correct: boolean;
}

export interface Session {
  id: string;
  missionId: string;
  status: 'active' | 'completed' | 'abandoned';
  startedAt: string;
  completedAt?: string;
  currentQuestion: number;
  xp: number;
  riskScore: number;
  answerHistory?: AnswerHistoryEntry[];
}
