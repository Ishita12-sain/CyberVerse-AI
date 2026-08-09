export type MissionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface MissionOption {
  id: string;
  text: string;
}

export interface MissionSkillWeight {
  name: string;
  weight: 'primary' | 'secondary';
}

export interface MissionData {
  id: string;
  title: string;
  category: string;
  difficulty: MissionDifficulty;
  rewardXP: number;
  estimatedTime: string;
  scenario: string;
  question: string;
  options: MissionOption[];
  correctOptionId: string;
  explanation: string;
  skills?: MissionSkillWeight[];
}
