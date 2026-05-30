import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { requireDb } from './middleware/requireDb.js';

import authRoutes from './modules/auth/routes/authRoutes.js';
import adminRoutes from './modules/admin/routes/adminRoutes.js';
import teacherRoutes from './modules/teacher/routes/teacherRoutes.js';
import studentRoutes from './modules/student/routes/studentRoutes.js';
import departmentRoutes from './modules/admin/routes/departmentRoutes.js';
import eventRoutes from './modules/events/routes/eventRoutes.js';
import notificationRoutes from './modules/notifications/routes/notificationRoutes.js';
import voiceRoutes from './modules/voice-agent/routes/voiceRoutes.js';
import analyticsRoutes from './modules/analytics/routes/analyticsRoutes.js';

const app = express();
const api = express.Router();

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
api.use('/admin/analytics', analyticsRoutes);
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

export default app;
