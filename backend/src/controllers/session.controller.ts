import { Request, Response, NextFunction } from 'express';
import { SessionService } from '../services/session.service';

const sessionService = new SessionService();

export const createSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { missionId } = req.body;

    // 1. Validation: missionId is required and must be a string
    if (!missionId || typeof missionId !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid request body. missionId is required and must be a string.'
      });
      return;
    }

    // 2. Call service
    const session = await sessionService.createSession(missionId);
    if (!session) {
      res.status(404).json({
        success: false,
        message: `Mission with ID ${missionId} not found.`
      });
      return;
    }

    res.status(201).json({
      success: true,
      session
    });
  } catch (error) {
    next(error);
  }
};

export const getSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      res.status(400).json({
        success: false,
        message: 'sessionId parameter is required.'
      });
      return;
    }

    const session = await sessionService.getSession(sessionId);
    if (!session) {
      res.status(404).json({
        success: false,
        message: `Session with ID ${sessionId} not found.`
      });
      return;
    }

    res.status(200).json({
      success: true,
      session
    });
  } catch (error) {
    next(error);
  }
};
