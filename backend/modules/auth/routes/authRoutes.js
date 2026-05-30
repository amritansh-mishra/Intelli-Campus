import { Router } from 'express';
import { login, register, forgotPassword, getMe } from '../controllers/authController.js';
import { authenticate, attachUser } from '../../../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/me', authenticate, attachUser, getMe);

export default router;
