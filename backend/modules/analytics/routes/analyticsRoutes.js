import { Router } from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import { authenticate, authorize, attachUser } from '../../../middleware/auth.js';

const router = Router();

router.use(authenticate, authorize('admin'), attachUser);

router.get('/', getAnalytics);

export default router;
