import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ClipboardList, Users, Phone, ArrowRight } from 'lucide-react';
import { TeacherLayout } from '../layouts/TeacherLayout';
import { PageHeader } from '../../../shared/components/PageHeader';
import StatCard from '../../../shared/components/StatCard';
import { teacherService } from '../services/teacherService';

export default function TeacherDashboard() {
  const [stats, setStats] = useState({
    upcomingClasses: 4,
    pendingAssignments: 3,
    studentCount: 0,
    voiceRequests: 0,
  });

  useEffect(() => {
    teacherService.getDashboard().then(({ data }) => setStats(data)).catch(() => {});
  }, []);

  return (
    <TeacherLayout title="Dashboard">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Faculty dashboard" description="Classes, assignments, and student communication" />
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Classes today" value={stats.upcomingClasses} icon={BookOpen} />
          <StatCard title="Pending assignments" value={stats.pendingAssignments} icon={ClipboardList} iconClassName="text-warning bg-amber-50" />
          <StatCard title="Students" value={stats.studentCount} icon={Users} iconClassName="text-success bg-emerald-50" />
          <StatCard title="Voice requests" value={stats.voiceRequests} icon={Phone} />
        </div>
        <Link
          to="/teacher/voice-requests"
          className="flex items-center justify-between rounded-md border border-line bg-card p-4 hover:shadow-card-hover"
        >
          <span className="font-medium text-ink">Request AI voice reminder</span>
          <ArrowRight className="h-4 w-4 text-primary" />
        </Link>
      </div>
    </TeacherLayout>
  );
}
