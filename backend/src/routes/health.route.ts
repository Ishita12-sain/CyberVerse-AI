import { Router, Request, Response } from 'express';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'CyberVerse AI backend is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

export default router;
