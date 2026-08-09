import express, { Express } from 'express';
import cors from 'cors';
import healthRouter from './routes/health.route';
import missionRouter from './routes/mission.route';
import sessionRouter from './routes/session.route';
import answerRouter from './routes/answer.route';
import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

// Basic Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRouter);
app.use('/api', missionRouter);
app.use('/api', sessionRouter);
app.use('/api', answerRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
