import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['alert', 'reminder', 'info', 'emergency'], default: 'info' },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    audience: { type: String, enum: ['all', 'admin', 'teacher', 'student', 'department'], default: 'all' },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Notification = mongoose.model('Notification', notificationSchema);
