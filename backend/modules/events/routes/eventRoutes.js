import { Router } from 'express';
import { getEvents, createEvent, deleteEvent, registerForEvent } from '../controllers/eventController.js';
import { authenticate, authorize, attachUser } from '../../../middleware/auth.js';

const router = Router();

router.use(authenticate, attachUser);

router.get('/', getEvents);
router.post('/', authorize('admin', 'teacher'), createEvent);
router.delete('/:id', authorize('admin', 'teacher'), deleteEvent);
router.post('/:id/register', authorize('student'), registerForEvent);

export default router;
