export type NotificationType =
  | 'DAILY_MISSIONS'
  | 'STREAK_REMINDER'
  | 'AI_INSIGHT'
  | 'MISSION_COMPLETE'
  | 'LEVEL_UP';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  targetRoute?: string;
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-001',
    type: 'DAILY_MISSIONS',
    title: 'DAILY MISSIONS READY',
    message: 'Your 3 workplace simulation missions for today are ready.',
    timestamp: '2 min ago',
    isRead: false,
    targetRoute: '/missions',
  },
  {
    id: 'notif-002',
    type: 'STREAK_REMINDER',
    title: 'STREAK AT RISK',
    message: 'Complete at least one mission today to maintain your 7 day streak.',
    timestamp: '1 hour ago',
    isRead: false,
    targetRoute: '/missions',
  },
  {
    id: 'notif-003',
    type: 'AI_INSIGHT',
    title: 'NEW AI COACH INSIGHT',
    message: 'Your Risk Awareness decision score improved +6% this week.',
    timestamp: '3 hours ago',
    isRead: false,
    targetRoute: '/ai-coach',
  },
  {
    id: 'notif-004',
    type: 'MISSION_COMPLETE',
    title: 'MISSION PASSED',
    message: 'Suspicious Login Activity completed. You earned +150 XP.',
    timestamp: 'Yesterday',
    isRead: true,
    targetRoute: '/history',
  },
  {
    id: 'notif-005',
    type: 'LEVEL_UP',
    title: 'LEVEL UP REACHED',
    message: 'Congratulations! You reached Level 07 in IT & Technology.',
    timestamp: '2 days ago',
    isRead: true,
    targetRoute: '/profile',
  },
];
