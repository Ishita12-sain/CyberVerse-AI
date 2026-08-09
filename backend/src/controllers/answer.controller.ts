import { Request, Response, NextFunction } from 'express';
import { AnswerService } from '../services/answer.service';

const answerService = new AnswerService();

export const postAnswer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sessionId } = req.params;
    const { questionId, answer } = req.body;

    // 1. Validation: request body must contain questionId and answer
    if (!questionId || typeof questionId !== 'string' || !answer || typeof answer !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid request body. questionId and answer are required strings.'
      });
      return;
    }

    // 2. Submit answer
    const response = await answerService.submitAnswer(sessionId, questionId, answer);

    if (response.errorType) {
      switch (response.errorType) {
        case 'SESSION_NOT_FOUND':
          res.status(404).json({
            success: false,
            message: `Session with ID ${sessionId} not found.`
          });
          return;
        case 'QUESTION_NOT_FOUND':
          res.status(404).json({
            success: false,
            message: `Question with ID ${questionId} not found.`
          });
          return;
        case 'SESSION_INACTIVE':
          res.status(400).json({
            success: false,
            message: 'Session is no longer active.'
          });
          return;
        case 'QUESTION_MISMATCH':
          res.status(400).json({
            success: false,
            message: 'The submitted question does not belong to the session\'s mission.'
          });
          return;
        case 'DUPLICATE_ANSWER':
          res.status(400).json({
            success: false,
            message: 'You have already submitted an answer for this question in this session.'
          });
          return;
        default:
          res.status(500).json({
            success: false,
            message: 'An internal server error occurred.'
          });
          return;
      }
    }

    res.status(200).json({
      success: true,
      result: response.result
    });
  } catch (error) {
    next(error);
  }
};
