export interface AchievementItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  category: 'BEGINNER' | 'PROGRESSION' | 'SKILL' | 'MASTERY';
}

export const MOCK_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-001',
    icon: '🏅',
    title: 'FIRST MISSION',
    description: 'Complete your first workplace simulation mission.',
    isUnlocked: true,
    unlockedAt: '2 days ago',
    category: 'BEGINNER',
  },
  {
    id: 'ach-002',
    icon: '⭐',
    title: 'RISING STAR',
    description: 'Reach Level 5 in your chosen role.',
    isUnlocked: true,
    unlockedAt: 'Yesterday',
    category: 'PROGRESSION',
  },
  {
    id: 'ach-003',
    icon: '⚡',
    title: 'XP HUNTER',
    description: 'Earn 1,000 total XP in simulations.',
    isUnlocked: true,
    unlockedAt: 'Today',
    category: 'PROGRESSION',
  },
  {
    id: 'ach-004',
    icon: '🔥',
    title: 'WEEK WARRIOR',
    description: 'Maintain a 7-day daily mission streak.',
    isUnlocked: true,
    unlockedAt: 'Today',
    category: 'PROGRESSION',
  },
  {
    id: 'ach-005',
    icon: '📋',
    title: 'DECISION MAKER',
    description: 'Complete 10 workplace simulation scenarios.',
    isUnlocked: true,
    unlockedAt: 'Today',
    category: 'PROGRESSION',
  },
  {
    id: 'ach-006',
    icon: '🎯',
    title: 'PERFECT RESPONSE',
    description: 'Score 100 on a simulation mission.',
    isUnlocked: false,
    category: 'SKILL',
  },
  {
    id: 'ach-007',
    icon: '🛡️',
    title: 'SECURITY EXPERT',
    description: 'Complete 10 Cybersecurity scenario missions.',
    isUnlocked: false,
    category: 'SKILL',
  },
  {
    id: 'ach-008',
    icon: '🤝',
    title: 'TEAM PLAYER',
    description: 'Complete 10 HR / Management scenarios.',
    isUnlocked: false,
    category: 'SKILL',
  },
  {
    id: 'ach-009',
    icon: '📊',
    title: 'RISK MASTER',
    description: 'Reach 80% Risk Awareness skill rating.',
    isUnlocked: true,
    unlockedAt: 'Today',
    category: 'MASTERY',
  },
  {
    id: 'ach-010',
    icon: '🏆',
    title: 'CYBERVERSE ELITE',
    description: 'Reach Level 10 in mission simulation mastery.',
    isUnlocked: false,
    category: 'MASTERY',
  },
];
