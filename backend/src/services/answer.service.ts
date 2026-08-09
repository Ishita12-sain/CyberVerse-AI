import { Question, AnswerResult } from '../types/answer.types';
import { SessionService } from './session.service';

const sessionService = new SessionService();

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'question-001',
    missionId: 'mission-001',
    questionText: 'You receive an urgent email asking you to click a link and verify your account. What should you do?',
    options: [
      'Click the link immediately',
      'Reply with my password',
      'Report the email as phishing',
      'Forward it to everyone'
    ],
    correctAnswer: 'Report the email as phishing',
    xpReward: 100,
    riskImpact: 10
  },
  {
    id: 'question-002',
    missionId: 'mission-001',
    questionText: "You notice the sender address of an email is security@paypaI-support.com (with an 'I' instead of 'l'). What does this indicate?",
    options: [
      'It is a legitimate PayPal address',
      'It is a typo squatting phishing attempt',
      'It is a secure encrypted channel',
      'It is an internal company email'
    ],
    correctAnswer: 'It is a typo squatting phishing attempt',
    xpReward: 100,
    riskImpact: 15
  },
  {
    id: 'question-003',
    missionId: 'mission-001',
    questionText: 'An email promises a free $500 gift card if you log in with your corporate credentials. What is the main risk?',
    options: [
      'Losing the gift card value',
      'Credential harvesting and corporate account takeover',
      'System performance slowdown',
      'Nothing, corporate filters will block any risk'
    ],
    correctAnswer: 'Credential harvesting and corporate account takeover',
    xpReward: 100,
    riskImpact: 20
  }
];

export interface SubmitAnswerResponse {
  errorType?: 'SESSION_NOT_FOUND' | 'SESSION_INACTIVE' | 'QUESTION_NOT_FOUND' | 'QUESTION_MISMATCH' | 'DUPLICATE_ANSWER';
  result?: AnswerResult;
}

export class AnswerService {
  public async getQuestionsByMission(missionId: string): Promise<Question[]> {
    return MOCK_QUESTIONS.filter(q => q.missionId === missionId);
  }

  public async submitAnswer(
    sessionId: string,
    questionId: string,
    submittedAnswer: string
  ): Promise<SubmitAnswerResponse> {
    // 1. Validate session
    const session = await sessionService.getSession(sessionId);
    if (!session) {
      return { errorType: 'SESSION_NOT_FOUND' };
    }

    if (session.status !== 'active') {
      return { errorType: 'SESSION_INACTIVE' };
    }

    // 2. Validate question
    const question = MOCK_QUESTIONS.find(q => q.id === questionId);
    if (!question) {
      return { errorType: 'QUESTION_NOT_FOUND' };
    }

    // 3. Verify question belongs to session's mission
    if (question.missionId !== session.missionId) {
      return { errorType: 'QUESTION_MISMATCH' };
    }

    // 4. Prevent duplicate answers
    const history = session.answerHistory || [];
    const isAlreadyAnswered = history.some(entry => entry.questionId === questionId);
    if (isAlreadyAnswered) {
      return { errorType: 'DUPLICATE_ANSWER' };
    }

    // 5. Evaluate answer
    const isCorrect = question.correctAnswer.toLowerCase() === submittedAnswer.trim().toLowerCase();
    const xpEarned = isCorrect ? question.xpReward : 0;
    
    // Calculate new stats
    const newXp = session.xp + xpEarned;
    
    // Risk score math: correct decreases risk, incorrect increases risk. Keep bound >= 0.
    const riskChange = isCorrect ? -question.riskImpact : question.riskImpact;
    const newRiskScore = Math.max(0, session.riskScore + riskChange);

    // Calculate next question index
    const nextQuestion = session.currentQuestion + 1;

    // Update answer history array
    const updatedHistory = [...history, { questionId, correct: isCorrect }];

    // 6. Update session
    await sessionService.updateSession(sessionId, {
      xp: newXp,
      riskScore: newRiskScore,
      currentQuestion: nextQuestion,
      answerHistory: updatedHistory
    });

    return {
      result: {
        questionId,
        correct: isCorrect,
        xpEarned,
        riskChange,
        currentXp: newXp,
        riskScore: newRiskScore,
        nextQuestion
      }
    };
  }
}
