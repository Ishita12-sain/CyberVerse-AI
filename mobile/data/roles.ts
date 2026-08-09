export interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: string;
}

export const ROLES: RoleOption[] = [
  {
    id: 'it',
    title: 'IT & TECHNOLOGY',
    description: 'Cyber, technical and digital scenarios.',
    icon: '🛡️',
  },
  {
    id: 'hr',
    title: 'HUMAN RESOURCES',
    description: 'People, communication and workplace culture.',
    icon: '👥',
  },
  {
    id: 'finance',
    title: 'FINANCE',
    description: 'Financial decisions, risk and business.',
    icon: '📈',
  },
  {
    id: 'sales',
    title: 'SALES & MARKETING',
    description: 'Clients, negotiation and growth.',
    icon: '🎯',
  },
  {
    id: 'operations',
    title: 'OPERATIONS',
    description: 'Processes, priorities and execution.',
    icon: '⚙️',
  },
  {
    id: 'management',
    title: 'MANAGEMENT',
    description: 'Leadership, strategy and decision-making.',
    icon: '👑',
  },
  {
    id: 'legal',
    title: 'LEGAL & COMPLIANCE',
    description: 'Policy, compliance and ethical decisions.',
    icon: '⚖️',
  },
  {
    id: 'data',
    title: 'DATA & ANALYTICS',
    description: 'Data-driven decisions and business insights.',
    icon: '📊',
  },
];
