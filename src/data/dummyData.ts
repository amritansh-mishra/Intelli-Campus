export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  reminder: boolean;
  category?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'reminder' | 'alert' | 'info';
  read: boolean;
}

export interface Stats {
  totalEvents: number;
  highPriority: number;
  todayMeetings: number;
  upcomingReminders: number;
}

export const dummyEvents: Event[] = [
  {
    id: '1',
    title: 'CS101 Final Exam',
    description: 'Computer Science final examination covering all chapters from the semester.',
    date: '2024-01-15',
    time: '09:00',
    priority: 'High',
    reminder: true,
    category: 'Exam',
  },
  {
    id: '2',
    title: 'Team Project Meeting',
    description: 'Weekly sync with the project team to discuss progress and next steps.',
    date: '2024-01-12',
    time: '14:00',
    priority: 'Medium',
    reminder: true,
    category: 'Meeting',
  },
  {
    id: '3',
    title: 'Assignment Deadline',
    description: 'Submit the research paper on Machine Learning applications.',
    date: '2024-01-18',
    time: '23:59',
    priority: 'High',
    reminder: true,
    category: 'Assignment',
  },
  {
    id: '4',
    title: 'Campus Workshop',
    description: 'AI and Future Technologies workshop in the main auditorium.',
    date: '2024-01-20',
    time: '10:00',
    priority: 'Low',
    reminder: false,
    category: 'Event',
  },
  {
    id: '5',
    title: 'Study Group Session',
    description: 'Algorithms study group session for the upcoming quiz.',
    date: '2024-01-13',
    time: '16:00',
    priority: 'Medium',
    reminder: true,
    category: 'Study',
  },
  {
    id: '6',
    title: 'Library Book Return',
    description: 'Return borrowed books to avoid late fees.',
    date: '2024-01-14',
    time: '12:00',
    priority: 'Low',
    reminder: false,
    category: 'Task',
  },
];

export const dummyNotifications: Notification[] = [
  {
    id: '1',
    title: 'Exam Tomorrow!',
    message: 'CS101 Final Exam starts tomorrow at 9:00 AM',
    time: '2 hours ago',
    type: 'alert',
    read: false,
  },
  {
    id: '2',
    title: 'Meeting in 30 minutes',
    message: 'Team Project Meeting starts soon',
    time: '30 min ago',
    type: 'reminder',
    read: false,
  },
  {
    id: '3',
    title: 'Assignment Due',
    message: 'Research paper submission deadline approaching',
    time: '1 day ago',
    type: 'alert',
    read: true,
  },
  {
    id: '4',
    title: 'New Event Added',
    message: 'Campus Workshop has been added to your calendar',
    time: '2 days ago',
    type: 'info',
    read: true,
  },
];

export const dummyStats: Stats = {
  totalEvents: 24,
  highPriority: 5,
  todayMeetings: 3,
  upcomingReminders: 8,
};
