import express, { Express } from 'express';
import cors from 'cors';
import healthRouter from './routes/health.route';
import { errorHandler } from './middleware/error.middleware';

const app: Express = express();

// Basic Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
