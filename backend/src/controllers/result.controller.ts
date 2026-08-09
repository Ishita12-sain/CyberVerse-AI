import { Request, Response, NextFunction } from 'express';
import { ResultService } from '../services/result.service';

const resultService = new ResultService();

export const completeSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sessionId } = req.params;

    const response = await resultService.completeSession(sessionId);

    if (response.errorType) {
      switch (response.errorType) {
        case 'SESSION_NOT_FOUND':
          res.status(404).json({
            success: false,
            message: `Session with ID ${sessionId} not found.`
          });
          return;
        case 'ALREADY_COMPLETED':
          res.status(400).json({
            success: false,
            message: 'Session is already completed.'
          });
          return;
        case 'SESSION_ABANDONED':
          res.status(400).json({
            success: false,
            message: 'Session has been abandoned and cannot be completed.'
          });
          return;
        case 'INCOMPLETE_ANSWERS':
          res.status(400).json({
            success: false,
            message: 'Cannot complete session. Not all questions in the mission have been answered.'
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

export const getSessionResult = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sessionId } = req.params;

    const response = await resultService.getSessionResult(sessionId);

    if (response.errorType) {
      switch (response.errorType) {
        case 'SESSION_NOT_FOUND':
          res.status(404).json({
            success: false,
            message: `Session with ID ${sessionId} not found.`
          });
          return;
        case 'NOT_COMPLETED':
          res.status(400).json({
            success: false,
            message: 'Session has not been completed yet.'
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
