import { Request, Response, NextFunction } from 'express';
import { MissionService } from '../services/mission.service';

const missionService = new MissionService();

export const getMissions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const missions = await missionService.getAllMissions();
    res.status(200).json({
      success: true,
      missions
    });
  } catch (error) {
    next(error);
  }
};
