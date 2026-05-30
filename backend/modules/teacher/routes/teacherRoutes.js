import { Router } from 'express';
import { getDashboard, getStudents } from '../controllers/teacherController.js';
import { authenticate, authorize, attachUser } from '../../../middleware/auth.js';

const router = Router();

router.use(authenticate, authorize('teacher'), attachUser);

router.get('/dashboard', getDashboard);
router.get('/students', getStudents);

export default router;
