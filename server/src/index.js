import './loadEnv.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { requireDb } from './middleware/requireDb.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import teacherRoutes from './routes/teacher.js';
import studentRoutes from './routes/student.js';
import departmentRoutes from './routes/departments.js';
import eventRoutes from './routes/events.js';
import notificationRoutes from './routes/notifications.js';
import voiceRoutes from './routes/voice.js';

const app = express();
const api = express.Router();
// Default 5001 — macOS often reserves 5000 for AirPlay Receiver
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

api.get('/health', (_, res) =>
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
);

api.use(requireDb);

api.use('/auth', authRoutes);
api.use('/admin', adminRoutes);
api.use('/teacher', teacherRoutes);
api.use('/student', studentRoutes);
api.use('/departments', departmentRoutes);
api.use('/events', eventRoutes);
api.use('/notifications', notificationRoutes);
api.use('/voice', voiceRoutes);

app.use('/api', api);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}/api`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
