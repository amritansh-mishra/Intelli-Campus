import { Department } from '../models/Department.js';
import { User } from '../../auth/models/User.js';

export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createDepartment = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDepartmentFaculty = async (req, res) => {
  try {
    const faculty = await User.find({ role: 'teacher', departmentId: req.params.id }).select(
      '-password'
    );
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
