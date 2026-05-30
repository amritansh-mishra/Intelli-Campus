import { Router } from 'express';
import {
  getAllDepartments,
  createDepartment,
  removeDepartment,
  getDepartmentFaculty,
} from '../controllers/departmentController.js';
import { authenticate, authorize, attachUser } from '../../../middleware/auth.js';

const router = Router();

router.use(authenticate, attachUser);

router.get('/', authorize('admin', 'teacher', 'student'), getAllDepartments);
router.post('/', authorize('admin'), createDepartment);
router.delete('/:id', authorize('admin'), removeDepartment);
router.get('/:id/faculty', authorize('admin'), getDepartmentFaculty);

export default router;
