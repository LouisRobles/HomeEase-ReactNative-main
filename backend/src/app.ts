import express from 'express';
import cors from 'cors';
import authRoutes from '@routes/auth';
import { errorHandler } from '@middleware/errorHandler';

const app = express();
const jsonBodyLimit = process.env.JSON_BODY_LIMIT || '1mb';
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Middleware
app.use(express.json({ limit: jsonBodyLimit }));
app.use(express.urlencoded({ extended: true, limit: jsonBodyLimit }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

// Error handling
app.use(errorHandler);

export default app;
