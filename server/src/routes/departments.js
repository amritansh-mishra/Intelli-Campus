import { Router } from 'express';
import { Department } from '../models/Department.js';
import { User } from '../models/User.js';
import { authenticate, authorize, attachUser } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, attachUser);

router.get('/', authorize('admin', 'teacher', 'student'), async (req, res) => {
  const departments = await Department.find().sort({ name: 1 });
  res.json(departments);
});

router.post('/', authorize('admin'), async (req, res) => {
  const { name, code, headOfDepartment } = req.body;
  if (!name || !code) {
    return res.status(400).json({ message: 'Name and code are required' });
  }
  const department = await Department.create({
    name,
    code,
    headOfDepartment,
    createdBy: req.userId,
  });
  res.status(201).json(department);
});

router.delete('/:id', authorize('admin'), async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.json({ message: 'Department removed' });
});

router.get('/:id/faculty', authorize('admin'), async (req, res) => {
  const faculty = await User.find({ role: 'teacher', departmentId: req.params.id }).select(
    '-password'
  );
  res.json(faculty);
});

export default router;
