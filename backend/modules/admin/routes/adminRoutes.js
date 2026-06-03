import { Router } from 'express';
import { getDashboard, getUsers, updateUserStatus, createUser, getUserById } from '../controllers/adminController.js';
import { authenticate, authorize, attachUser } from '../../../middleware/auth.js';

const router = Router();

router.use(authenticate, authorize('admin'), attachUser);

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:id', getUserById);
router.patch('/users/:id/status', updateUserStatus);

export default router;
