import { Mission } from '../types/mission.types';

const MOCK_MISSIONS: Mission[] = [
  {
    id: 'mission-001',
    title: 'Suspicious Email',
    description: 'You receive an urgent email asking you to verify your account credentials immediately.',
    category: 'Phishing',
    difficulty: 'Medium'
  },
  {
    id: 'mission-002',
    title: 'Stronghold Check',
    description: 'Evaluate a set of passwords and upgrade them to meet modern entropy standards.',
    category: 'Password Security',
    difficulty: 'Easy'
  },
  {
    id: 'mission-003',
    title: 'The Imposter',
    description: 'Identify social engineering manipulation tactics in a transcribed phone conversation with IT support.',
    category: 'Social Engineering',
    difficulty: 'Hard'
  },
  {
    id: 'mission-004',
    title: 'Sandboxed Threat',
    description: 'Analyze behavior logs of an unknown executable to classify its malware family and mitigate its spread.',
    category: 'Malware',
    difficulty: 'Hard'
  },
  {
    id: 'mission-005',
    title: 'Exfiltration Vector',
    description: 'Audit database configurations and access logs to secure sensitive customer data from being leaked.',
    category: 'Data Security',
    difficulty: 'Medium'
  }
];

export class MissionService {
  public async getAllMissions(): Promise<Mission[]> {
    // Simulating database latency or asynchronous operation
    return MOCK_MISSIONS;
  }
}
