export interface Question {
  id: string;
  missionId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  xpReward: number;
  riskImpact: number;
}

export interface AnswerSubmission {
  questionId: string;
  answer: string;
}

export interface AnswerResult {
  questionId: string;
  correct: boolean;
  xpEarned: number;
  riskChange: number;
  currentXp: number;
  riskScore: number;
  nextQuestion: number;
}
