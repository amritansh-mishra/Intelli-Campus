export interface VoiceReminder {
  id: string;
  title: string;
  recipient: string;
  scheduledAt: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'in-progress' | 'completed';
}

export interface CallRecord {
  id: string;
  contact: string;
  purpose: string;
  status: 'ongoing' | 'scheduled' | 'completed' | 'failed';
  time: string;
  duration?: string;
}

export interface VoiceAgentStats {
  isActive: boolean;
  callsToday: number;
  successRate: number;
  lastCallTime: string;
  totalRemindersSent: number;
  voiceSuccessRate: number;
  monthlyUsage: { month: string; calls: number }[];
}

export const voiceAgentStats: VoiceAgentStats = {
  isActive: true,
  callsToday: 18,
  successRate: 94,
  lastCallTime: 'Today, 2:14 PM',
  totalRemindersSent: 1247,
  voiceSuccessRate: 91,
  monthlyUsage: [
    { month: 'Jan', calls: 420 },
    { month: 'Feb', calls: 510 },
    { month: 'Mar', calls: 480 },
    { month: 'Apr', calls: 590 },
    { month: 'May', calls: 620 },
    { month: 'Jun', calls: 680 },
  ],
};

export const ongoingCalls: CallRecord[] = [
  {
    id: '1',
    contact: 'Sarah Chen',
    purpose: 'CS101 exam reminder',
    status: 'ongoing',
    time: 'In progress',
    duration: '0:42',
  },
];

export const scheduledCalls: CallRecord[] = [
  {
    id: '2',
    contact: 'Michael Brown',
    purpose: 'Assignment deadline',
    status: 'scheduled',
    time: 'Today, 4:30 PM',
  },
  {
    id: '3',
    contact: 'Emily Davis',
    purpose: 'Faculty meeting',
    status: 'scheduled',
    time: 'Tomorrow, 9:00 AM',
  },
];

export const callHistory: CallRecord[] = [
  {
    id: '4',
    contact: 'James Wilson',
    purpose: 'Lab session reminder',
    status: 'completed',
    time: 'Today, 11:20 AM',
    duration: '1:15',
  },
  {
    id: '5',
    contact: 'Anna Lee',
    purpose: 'Registration deadline',
    status: 'completed',
    time: 'Today, 9:45 AM',
    duration: '0:58',
  },
  {
    id: '6',
    contact: 'David Kim',
    purpose: 'Scholarship interview',
    status: 'failed',
    time: 'Yesterday, 3:10 PM',
    duration: '0:12',
  },
];

export const voiceReminders: VoiceReminder[] = [
  {
    id: '1',
    title: 'Final exam — CS101',
    recipient: 'Sarah Chen',
    scheduledAt: 'Today, 3:00 PM',
    priority: 'High',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Project submission',
    recipient: 'Team Alpha (12)',
    scheduledAt: 'Today, 5:00 PM',
    priority: 'Medium',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Office hours reminder',
    recipient: 'Prof. Wilson',
    scheduledAt: 'Tomorrow, 8:30 AM',
    priority: 'Low',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Library book return',
    recipient: 'Michael Brown',
    scheduledAt: 'Today, 1:00 PM',
    priority: 'Low',
    status: 'in-progress',
  },
];

export const defaultVoiceConfig = {
  voiceType: 'Professional Female',
  language: 'English (US)',
  reminderTone: 'Friendly',
  aiCallsEnabled: true,
};
