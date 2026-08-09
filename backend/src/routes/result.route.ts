import { Router } from 'express';
import { completeSession, getSessionResult } from '../controllers/result.controller';

const router = Router();

router.post('/sessions/:sessionId/complete', completeSession);
router.get('/sessions/:sessionId/result', getSessionResult);

export default router;
