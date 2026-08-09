import { MissionResult } from '../types/result.types';
import { SessionService } from './session.service';
import { AnswerService } from './answer.service';

const sessionService = new SessionService();
const answerService = new AnswerService();

export interface CompleteSessionResponse {
  errorType?: 'SESSION_NOT_FOUND' | 'ALREADY_COMPLETED' | 'SESSION_ABANDONED' | 'INCOMPLETE_ANSWERS';
  result?: MissionResult;
}

export interface GetResultResponse {
  errorType?: 'SESSION_NOT_FOUND' | 'NOT_COMPLETED';
  result?: MissionResult;
}

export class ResultService {
  public async completeSession(sessionId: string): Promise<CompleteSessionResponse> {
    // 1. Find session
    const session = await sessionService.getSession(sessionId);
    if (!session) {
      return { errorType: 'SESSION_NOT_FOUND' };
    }

    // 2. Validate status
    if (session.status === 'completed') {
      return { errorType: 'ALREADY_COMPLETED' };
    }
    if (session.status === 'abandoned') {
      return { errorType: 'SESSION_ABANDONED' };
    }

    // 3. Check how many questions belong to the session's mission
    const missionQuestions = await answerService.getQuestionsByMission(session.missionId);
    const totalQuestions = missionQuestions.length;

    // 4. Check how many have been answered
    const history = session.answerHistory || [];
    const answeredCount = history.length;

    // 5. If not all questions are answered, return 400
    if (answeredCount < totalQuestions) {
      return { errorType: 'INCOMPLETE_ANSWERS' };
    }

    // 6. Calculate statistics
    const correctAnswers = history.filter(h => h.correct).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const completedAt = new Date().toISOString();

    // 7. Update session status and completedAt
    await sessionService.updateSession(sessionId, {
      status: 'completed',
      completedAt
    });

    return {
      result: {
        sessionId,
        missionId: session.missionId,
        status: 'completed',
        totalQuestions,
        correctAnswers,
        incorrectAnswers,
        totalXp: session.xp,
        finalRiskScore: session.riskScore,
        startedAt: session.startedAt,
        completedAt
      }
    };
  }

  public async getSessionResult(sessionId: string): Promise<GetResultResponse> {
    // 1. Find session
    const session = await sessionService.getSession(sessionId);
    if (!session) {
      return { errorType: 'SESSION_NOT_FOUND' };
    }

    // 2. Verify completed status
    if (session.status !== 'completed' || !session.completedAt) {
      return { errorType: 'NOT_COMPLETED' };
    }

    // Calculate total questions belonging to the session's mission
    const missionQuestions = await answerService.getQuestionsByMission(session.missionId);
    const totalQuestions = missionQuestions.length;
    const history = session.answerHistory || [];
    const correctAnswers = history.filter(h => h.correct).length;
    const incorrectAnswers = totalQuestions - correctAnswers;

    return {
      result: {
        sessionId,
        missionId: session.missionId,
        status: 'completed',
        totalQuestions,
        correctAnswers,
        incorrectAnswers,
        totalXp: session.xp,
        finalRiskScore: session.riskScore,
        startedAt: session.startedAt,
        completedAt: session.completedAt
      }
    };
  }
}
