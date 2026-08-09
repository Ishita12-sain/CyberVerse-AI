import { Router } from 'express';
import { postAnswer } from '../controllers/answer.controller';

const router = Router();

router.post('/sessions/:sessionId/answers', postAnswer);

export default router;
