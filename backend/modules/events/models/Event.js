import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    category: { type: String, default: 'Event' },
    scope: { type: String, enum: ['campus', 'department', 'class'], default: 'campus' },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reminderEnabled: { type: Boolean, default: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);
