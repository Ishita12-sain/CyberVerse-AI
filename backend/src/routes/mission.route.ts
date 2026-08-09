import { Router } from 'express';
import { getMissions } from '../controllers/mission.controller';

const router = Router();

router.get('/missions', getMissions);

export default router;
