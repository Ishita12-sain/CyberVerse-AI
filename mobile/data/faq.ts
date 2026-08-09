export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const MOCK_FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-001',
    question: 'How do missions work?',
    answer:
      'Missions are realistic workplace simulation scenarios. You read a situational briefing, analyze key indicators, and choose the most effective operational decision.',
    category: 'Missions',
  },
  {
    id: 'faq-002',
    question: 'How is my score calculated?',
    answer:
      'Scores are determined by decision quality. Optimal strategies score 90–100%, while sub-optimal responses earn 40–60% based on scenario risk levels.',
    category: 'Scoring',
  },
  {
    id: 'faq-003',
    question: 'How does XP work?',
    answer:
      'You earn XP for every scenario completed. Correct decisions grant full reward XP, while partial XP is awarded for sub-optimal answers as learning rewards.',
    category: 'XP & Level',
  },
  {
    id: 'faq-004',
    question: 'How are daily missions selected?',
    answer:
      'Every 24 hours, CyberVerse selects 3 targeted missions customized for your workplace role from our 100+ mission library.',
    category: 'Daily Missions',
  },
  {
    id: 'faq-005',
    question: 'How does AI Coach work?',
    answer:
      'The AI Coach evaluates your decision against real-world best practices, highlighting what went well, areas for improvement, and actionable guidance.',
    category: 'AI Coach',
  },
  {
    id: 'faq-006',
    question: 'How are skill percentages calculated?',
    answer:
      'Your skill ratings (Risk Awareness, Decision Making, etc.) dynamically update based on mission outcomes and targeted scenario categories.',
    category: 'Skills',
  },
  {
    id: 'faq-007',
    question: 'What happens when I answer incorrectly?',
    answer:
      'An incorrect decision does not end your progress. CyberVerse explains why the decision was risky, shows the better approach, and identifies focus areas.',
    category: 'Scoring',
  },
  {
    id: 'faq-008',
    question: 'How does the streak system work?',
    answer:
      'Complete at least one daily mission each calendar day to maintain your streak. Consecutive days build your streak rank on global leaderboards.',
    category: 'Streaks',
  },
];
