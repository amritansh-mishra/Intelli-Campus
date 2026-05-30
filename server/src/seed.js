import './loadEnv.js';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Department } from './models/Department.js';
import { Event } from './models/Event.js';
import { Notification } from './models/Notification.js';
import { VoiceReminder } from './models/VoiceReminder.js';

async function seed() {
  await connectDB();
  await Promise.all([
    User.deleteMany({}),
    Department.deleteMany({}),
    Event.deleteMany({}),
    Notification.deleteMany({}),
    VoiceReminder.deleteMany({}),
  ]);

  const cs = await Department.create({
    name: 'Computer Science',
    code: 'CS',
    headOfDepartment: 'Dr. Jane Smith',
    facultyCount: 12,
    studentCount: 240,
  });

  const admin = await User.create({
    name: 'Campus Admin',
    email: 'admin@campus.edu',
    password: 'admin123',
    role: 'admin',
  });

  const teacher = await User.create({
    name: 'Prof. James Wilson',
    email: 'teacher@campus.edu',
    password: 'teacher123',
    role: 'teacher',
    employeeId: 'FAC-1001',
    departmentId: cs._id,
  });

  const student = await User.create({
    name: 'Sarah Chen',
    email: 'student@campus.edu',
    password: 'student123',
    role: 'student',
    studentId: 'STU-2024001',
    departmentId: cs._id,
    year: 2,
  });

  await Event.create([
    {
      title: 'CS101 Final Exam',
      description: 'Final examination for Computer Science 101',
      date: new Date('2026-06-15'),
      time: '09:00',
      priority: 'High',
      category: 'Exam',
      scope: 'campus',
      createdBy: admin._id,
      reminderEnabled: true,
    },
    {
      title: 'Faculty Meeting',
      description: 'Monthly department sync',
      date: new Date('2026-05-10'),
      time: '14:00',
      priority: 'Medium',
      category: 'Meeting',
      scope: 'department',
      departmentId: cs._id,
      createdBy: teacher._id,
      reminderEnabled: true,
    },
  ]);

  await Notification.create({
    title: 'Campus-wide alert',
    message: 'Registration for summer courses opens Monday.',
    type: 'info',
    priority: 'high',
    audience: 'all',
    createdBy: admin._id,
  });

  await VoiceReminder.create({
    title: 'Exam reminder — CS101',
    recipientName: student.name,
    recipientId: student._id,
    scheduledAt: new Date('2026-05-08T15:00:00'),
    priority: 'High',
    status: 'pending',
    createdBy: admin._id,
  });

  console.log('Seed complete. Demo accounts:');
  console.log('  Admin:   admin@campus.edu / admin123');
  console.log('  Teacher: teacher@campus.edu / teacher123');
  console.log('  Student: student@campus.edu / student123');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
