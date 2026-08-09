import { Session } from '../types/session.types';
import { MissionService } from './mission.service';

const missionService = new MissionService();
const inMemorySessions: Map<string, Session> = new Map();
let sessionCounter = 1;

export class SessionService {
  public async createSession(missionId: string): Promise<Session | null> {
    // 1. Verify mission exists
    const missions = await missionService.getAllMissions();
    const missionExists = missions.some(m => m.id === missionId);
    if (!missionExists) {
      return null;
    }

    // 2. Generate unique sessionId
    const paddedId = String(sessionCounter++).padStart(3, '0');
    const sessionId = `session-${paddedId}`;

    const newSession: Session = {
      id: sessionId,
      missionId,
      status: 'active',
      startedAt: new Date().toISOString(),
      currentQuestion: 1,
      xp: 0,
      riskScore: 0
    };

    inMemorySessions.set(sessionId, newSession);
    return newSession;
  }

  public async getSession(sessionId: string): Promise<Session | null> {
    return inMemorySessions.get(sessionId) || null;
  }

  public async updateSession(sessionId: string, updates: Partial<Session>): Promise<Session | null> {
    const session = inMemorySessions.get(sessionId);
    if (!session) {
      return null;
    }
    const updatedSession = { ...session, ...updates };
    inMemorySessions.set(sessionId, updatedSession);
    return updatedSession;
  }
}
