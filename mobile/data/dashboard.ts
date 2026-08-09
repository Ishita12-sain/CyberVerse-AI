export interface DashboardData {
  user: {
    name: string;
    avatarUrl?: string;
  };
  level: number;
  xp: number;
  xpProgress: number; // percentage 0-100
  xpToNextLevel: number;
  overallScore: number;
  missionsCompleted: number;
  streak: number;
  nextMission: {
    id: string;
    title: string;
    description: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    rewardXP: number;
    objective?: string;
    estTime?: string;
  };
  aiInsight: string;
  recentActivity?: {
    id: string;
    icon: string;
    title: string;
    status: string;
    xp: number;
  }[];
}

export const MOCK_DASHBOARD_DATA: DashboardData = {
  user: {
    name: 'Alex',
  },
  level: 7,
  xp: 1240,
  xpProgress: 82,
  xpToNextLevel: 260,
  overallScore: 86,
  missionsCompleted: 12,
  streak: 7,
  nextMission: {
    id: 'm-402',
    title: 'SECURITY INCIDENT',
    description: 'Suspicious login activity has been detected across your organization.',
    difficulty: 'MEDIUM',
    rewardXP: 150,
    objective: 'Investigate & respond',
    estTime: '15–20 min',
  },
  aiInsight: 'Your risk awareness has improved. Focus next on communication under pressure.',
  recentActivity: [
    { id: 'act-1', icon: '✓', title: 'Security Fundamentals', status: 'Completed', xp: 100 },
    { id: 'act-2', icon: '✦', title: 'Decision Making', status: 'Completed', xp: 150 },
    { id: 'act-3', icon: '⚡', title: 'Risk Assessment', status: 'Completed', xp: 120 },
  ],
};
