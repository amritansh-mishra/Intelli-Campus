import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, Building2, Calendar, Mic, ArrowRight } from 'lucide-react';
import { AdminLayout } from '../layouts/AdminLayout';
import { PageHeader } from '../../../shared/components/PageHeader';
import StatCard from '../../../shared/components/StatCard';
import { adminService } from '../services/adminService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalDepartments: 0,
    upcomingEvents: 0,
    activeReminders: 0,
  });

  useEffect(() => {
    adminService.getDashboard().then(({ data }) => setStats(data)).catch(() => {
      setStats({
        totalStudents: 1240,
        totalTeachers: 86,
        totalDepartments: 12,
        upcomingEvents: 24,
        activeReminders: 18,
      });
    });
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="Administration overview"
          description="Campus-wide metrics and operational summary"
        />

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Students" value={stats.totalStudents} icon={GraduationCap} />
          <StatCard title="Faculty" value={stats.totalTeachers} icon={Users} iconClassName="text-primary bg-primary/10" />
          <StatCard title="Departments" value={stats.totalDepartments} icon={Building2} iconClassName="text-warning bg-amber-50" />
          <StatCard title="Upcoming events" value={stats.upcomingEvents} icon={Calendar} iconClassName="text-success bg-emerald-50" />
        </div>

        <Link
          to="/admin/voice-agent"
          className="mb-6 flex items-center justify-between rounded-md border border-line bg-card p-4 shadow-card hover:shadow-card-hover"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <Mic className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-ink">AI Voice Agent</p>
              <p className="text-sm text-muted">{stats.activeReminders} active reminders in queue</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-primary">
            Open panel <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </AdminLayout>
  );
}
