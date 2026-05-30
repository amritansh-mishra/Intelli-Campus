import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    code: { type: String, required: true, trim: true, unique: true },
    headOfDepartment: { type: String, trim: true },
    facultyCount: { type: Number, default: 0 },
    studentCount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Department = mongoose.model('Department', departmentSchema);
