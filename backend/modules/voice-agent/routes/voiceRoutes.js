import { Router } from 'express';
import {
  getVoiceReminders,
  getVoiceStats,
  createVoiceReminder,
  updateVoiceReminder,
} from '../controllers/voiceController.js';
import { authenticate, authorize, attachUser } from '../../../middleware/auth.js';

const router = Router();

router.use(authenticate, attachUser);

router.get('/', getVoiceReminders);
router.get('/stats', authorize('admin', 'teacher'), getVoiceStats);
router.post('/', authorize('admin', 'teacher'), createVoiceReminder);
router.patch('/:id', authorize('admin', 'teacher'), updateVoiceReminder);

export default router;
