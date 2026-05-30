import { Router } from 'express';
import { getDashboard } from '../controllers/studentController.js';
import { authenticate, authorize, attachUser } from '../../../middleware/auth.js';

const router = Router();

router.use(authenticate, authorize('student'), attachUser);

router.get('/dashboard', getDashboard);

export default router;
