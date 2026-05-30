import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ClipboardList, Bell, Mic, ArrowRight } from 'lucide-react';
import { StudentLayout } from '../../components/layout/StudentLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import StatCard from '../../components/StatCard';
import { studentService } from '../../services/campusService';

export default function StudentDashboard() {
  const [stats, setStats] = useState({
    upcomingEvents: 0,
    assignmentDeadlines: 5,
    activeReminders: 0,
    attendanceRate: 94,
  });

  useEffect(() => {
    studentService.getDashboard().then(({ data }) => setStats(data)).catch(() => {});
  }, []);

  return (
    <StudentLayout title="Dashboard">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Student dashboard" description="Your schedule, deadlines, and reminders" />
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Upcoming events" value={stats.upcomingEvents} icon={Calendar} />
          <StatCard title="Assignments due" value={stats.assignmentDeadlines} icon={ClipboardList} iconClassName="text-warning bg-amber-50" />
          <StatCard title="Reminders" value={stats.activeReminders} icon={Bell} iconClassName="text-primary bg-primary/10" />
          <StatCard title="Attendance" value={`${stats.attendanceRate}%`} icon={Mic} iconClassName="text-success bg-emerald-50" />
        </div>
        <Link to="/student/events" className="flex items-center justify-between rounded-md border border-line bg-card p-4 hover:shadow-card-hover">
          <span className="font-medium text-ink">Browse campus events</span>
          <ArrowRight className="h-4 w-4 text-primary" />
        </Link>
      </div>
    </StudentLayout>
  );
}
