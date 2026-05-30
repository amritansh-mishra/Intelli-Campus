import mongoose from 'mongoose';

const voiceReminderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    recipientName: { type: String, required: true },
    recipientPhone: { type: String },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    scheduledAt: { type: Date, required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'failed', 'scheduled'],
      default: 'pending',
    },
    voiceType: { type: String, default: 'Professional Female' },
    language: { type: String, default: 'English (US)' },
    tone: { type: String, default: 'Friendly' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    callDuration: { type: String },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export const VoiceReminder = mongoose.model('VoiceReminder', voiceReminderSchema);
