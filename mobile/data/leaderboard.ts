export interface LeaderboardUser {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  avatarUri?: string | null;
  weeklyXP: number;
  monthlyXP: number;
  totalXP: number;
  isCurrentUser?: boolean;
}

export const MOCK_LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    id: 'user-001',
    name: 'Elena Rostova',
    role: 'Cybersecurity',
    avatarInitials: 'ER',
    weeklyXP: 1950,
    monthlyXP: 6840,
    totalXP: 19400,
  },
  {
    id: 'user-002',
    name: 'Marcus Chen',
    role: 'IT & Technology',
    avatarInitials: 'MC',
    weeklyXP: 1820,
    monthlyXP: 6420,
    totalXP: 18200,
  },
  {
    id: 'user-003',
    name: 'Sarah Jenkins',
    role: 'Human Resources',
    avatarInitials: 'SJ',
    weeklyXP: 1640,
    monthlyXP: 5900,
    totalXP: 16800,
  },
  {
    id: 'user-004',
    name: 'Rahul Sharma',
    role: 'Finance',
    avatarInitials: 'RS',
    weeklyXP: 1480,
    monthlyXP: 5400,
    totalXP: 15200,
  },
  {
    id: 'user-005',
    name: 'Priya Patel',
    role: 'Operations',
    avatarInitials: 'PP',
    weeklyXP: 1350,
    monthlyXP: 4950,
    totalXP: 14100,
  },
  {
    id: 'user-006',
    name: 'Alex',
    role: 'IT & Technology',
    avatarInitials: 'A',
    weeklyXP: 1240,
    monthlyXP: 4620,
    totalXP: 12400,
    isCurrentUser: true,
  },
  {
    id: 'user-007',
    name: 'David Kim',
    role: 'Management',
    avatarInitials: 'DK',
    weeklyXP: 1120,
    monthlyXP: 4200,
    totalXP: 11800,
  },
  {
    id: 'user-008',
    name: 'Sofia Alvarez',
    role: 'Legal & Compliance',
    avatarInitials: 'SA',
    weeklyXP: 1050,
    monthlyXP: 3900,
    totalXP: 10900,
  },
  {
    id: 'user-009',
    name: 'James Wilson',
    role: 'Data & Analytics',
    avatarInitials: 'JW',
    weeklyXP: 980,
    monthlyXP: 3600,
    totalXP: 9900,
  },
  {
    id: 'user-010',
    name: 'Aisha Malik',
    role: 'Sales & Marketing',
    avatarInitials: 'AM',
    weeklyXP: 910,
    monthlyXP: 3300,
    totalXP: 9100,
  },
  {
    id: 'user-011',
    name: 'Lucas Vance',
    role: 'Cybersecurity',
    avatarInitials: 'LV',
    weeklyXP: 840,
    monthlyXP: 3100,
    totalXP: 8400,
  },
  {
    id: 'user-012',
    name: 'Chloe Bennett',
    role: 'Human Resources',
    avatarInitials: 'CB',
    weeklyXP: 760,
    monthlyXP: 2800,
    totalXP: 7600,
  },
];
