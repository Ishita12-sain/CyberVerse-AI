export interface HistoryMissionItem {
  id: string;
  missionId: string;
  title: string;
  category: string;
  score: number;
  xpEarned: number;
  isCorrect: boolean;
  completedAt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  aiInsight: string;
}

export interface PerformanceAnalytics {
  missionsCompleted: number;
  averageScore: number;
  accuracy: number;
  totalXP: number;
  breakdown: {
    correctPercentage: number;
    incorrectPercentage: number;
  };
  skills: {
    name: string;
    percentage: number;
  }[];
  categories: {
    name: string;
    percentage: number;
  }[];
}

export const MOCK_PERFORMANCE_ANALYTICS: PerformanceAnalytics = {
  missionsCompleted: 27,
  averageScore: 81,
  accuracy: 76,
  totalXP: 3840,
  breakdown: {
    correctPercentage: 76,
    incorrectPercentage: 24,
  },
  skills: [
    { name: 'Risk Awareness', percentage: 82 },
    { name: 'Decision Making', percentage: 76 },
    { name: 'Communication', percentage: 68 },
    { name: 'Leadership', percentage: 71 },
    { name: 'Problem Solving', percentage: 79 },
  ],
  categories: [
    { name: 'Cybersecurity', percentage: 86 },
    { name: 'Human Resources', percentage: 74 },
    { name: 'Finance', percentage: 69 },
    { name: 'Management', percentage: 81 },
    { name: 'IT & Technology', percentage: 78 },
    { name: 'Sales & Marketing', percentage: 73 },
  ],
};

export const MOCK_HISTORY_MISSIONS: HistoryMissionItem[] = [
  {
    id: 'hist-001',
    missionId: 'cyber-001',
    title: 'Suspicious Account Compromise',
    category: 'Cybersecurity',
    score: 86,
    xpEarned: 150,
    isCorrect: true,
    completedAt: '2026-08-09',
    userAnswer: 'Escalate the incident immediately to the security team.',
    correctAnswer: 'Escalate the incident immediately to the security team.',
    explanation: 'Early escalation prevents credential misuse from spreading across the directory.',
    aiInsight: 'Strong execution. Early escalation minimized the breach surface.',
  },
  {
    id: 'hist-002',
    missionId: 'fin-001',
    title: 'Unusual Expense Anomaly',
    category: 'Finance',
    score: 48,
    xpEarned: 50,
    isCorrect: false,
    completedAt: '2026-08-08',
    userAnswer: 'Approve the expense report and flag for review later.',
    correctAnswer: 'Freeze disbursement and request supporting audit documentation.',
    explanation: 'Approving anomalous expenses before audit check increases compliance liability.',
    aiInsight: 'Sub-optimal response. Freeze funds first when anomaly thresholds are breached.',
  },
  {
    id: 'hist-003',
    missionId: 'hr-001',
    title: 'Interdepartmental Lead Hostility',
    category: 'Human Resources',
    score: 79,
    xpEarned: 120,
    isCorrect: true,
    completedAt: '2026-08-08',
    userAnswer: 'Schedule a private 1-on-1 mediation session with neutral guidelines.',
    correctAnswer: 'Schedule a private 1-on-1 mediation session with neutral guidelines.',
    explanation: 'Direct neutral mediation reduces hostility while preserving team alignment.',
    aiInsight: 'Good conflict resolution approach.',
  },
  {
    id: 'hist-004',
    missionId: 'it-001',
    title: 'Critical Cloud Region Outage',
    category: 'IT & Technology',
    score: 95,
    xpEarned: 200,
    isCorrect: true,
    completedAt: '2026-08-07',
    userAnswer: 'Initiate automated failover to secondary cloud region.',
    correctAnswer: 'Initiate automated failover to secondary cloud region.',
    explanation: 'Automated failover restores service SLAs rapidly during outage events.',
    aiInsight: 'Optimal disaster recovery execution.',
  },
  {
    id: 'hist-005',
    missionId: 'mgmt-001',
    title: 'Resource Allocation Bottleneck',
    category: 'Management',
    score: 88,
    xpEarned: 160,
    isCorrect: true,
    completedAt: '2026-08-06',
    userAnswer: 'Reassign cross-functional engineering resources dynamically.',
    correctAnswer: 'Reassign cross-functional engineering resources dynamically.',
    explanation: 'Agile resource shifting addresses critical bottlenecks without delaying milestones.',
    aiInsight: 'Strategic leadership demonstrated.',
  },
  {
    id: 'hist-006',
    missionId: 'sales-001',
    title: 'High-Value Prospect Objection',
    category: 'Sales & Marketing',
    score: 55,
    xpEarned: 60,
    isCorrect: false,
    completedAt: '2026-08-05',
    userAnswer: 'Offer an unapproved custom discount to close contract immediately.',
    correctAnswer: 'Reframe product value propositions and consult sales engineering.',
    explanation: 'Unapproved discounting erodes margins and sets risky precedents.',
    aiInsight: 'Focus on value selling over discount concessions.',
  },
];
