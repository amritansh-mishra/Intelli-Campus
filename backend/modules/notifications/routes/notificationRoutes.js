import { Router } from 'express';
import {
  getNotifications,
  createNotification,
  markNotificationRead,
} from '../controllers/notificationController.js';
import { authenticate, authorize, attachUser } from '../../../middleware/auth.js';

const router = Router();

router.use(authenticate, attachUser);

router.get('/', getNotifications);
router.post('/', authorize('admin', 'teacher'), createNotification);
router.patch('/:id/read', markNotificationRead);

export default router;
