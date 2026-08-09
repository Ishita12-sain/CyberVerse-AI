export interface Session {
  id: string;
  missionId: string;
  status: 'active' | 'completed' | 'abandoned';
  startedAt: string;
  currentQuestion: number;
  xp: number;
  riskScore: number;
}
