import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    employeeId: { type: String, trim: true },
    studentId: { type: String, trim: true },
    year: { type: Number },
    phone: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, role: 1 }, { unique: true });

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  if (!this.password) return Promise.resolve(false);
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model('User', userSchema);
