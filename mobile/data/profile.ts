export interface ProfileData {
  user: {
    name: string;
    role: string;
    avatarInitials: string;
    profilePhotoUri?: string | null;
  };
  level: number;
  xp: number;
  xpProgress: number; // 0-100
  xpToNextLevel: number;
  overallScore: number;
  missionsCompleted: number;
  streak: number;
  skills: {
    name: string;
    percentage: number;
  }[];
  recentMissions: {
    id: string;
    title: string;
    category: string;
    score: number;
    completedAt: string;
    isCorrect: boolean;
  }[];
}

export const MOCK_PROFILE_DATA: ProfileData = {
  user: {
    name: 'Alex',
    role: 'IT & TECHNOLOGY',
    avatarInitials: 'A',
  },
  level: 7,
  xp: 1240,
  xpProgress: 82,
  xpToNextLevel: 260,
  overallScore: 86,
  missionsCompleted: 12,
  streak: 7,
  skills: [
    { name: 'Risk Awareness', percentage: 82 },
    { name: 'Decision Making', percentage: 76 },
    { name: 'Communication', percentage: 68 },
    { name: 'Leadership', percentage: 71 },
    { name: 'Problem Solving', percentage: 79 },
  ],
  recentMissions: [
    {
      id: 'it-001',
      title: 'Critical Cloud Region Outage',
      category: 'IT & Technology',
      score: 95,
      completedAt: 'Today',
      isCorrect: true,
    },
    {
      id: 'cyber-001',
      title: 'Suspicious Account Compromise',
      category: 'Cybersecurity',
      score: 86,
      completedAt: 'Yesterday',
      isCorrect: true,
    },
    {
      id: 'hr-001',
      title: 'Interdepartmental Lead Hostility',
      category: 'Human Resources',
      score: 52,
      completedAt: '2 days ago',
      isCorrect: false,
    },
  ],
};
