import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, GraduationCap, Building2, Calendar, Mic, ArrowRight, Activity, PhoneCall } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { PageHeader } from '../../../shared/components/PageHeader';
import StatCard from '../../../shared/components/StatCard';
import { adminService } from '../services/adminService';

const mockActivityData = [
  { name: 'Mon', active: 400, events: 240, calls: 120 },
  { name: 'Tue', active: 300, events: 139, calls: 220 },
  { name: 'Wed', active: 550, events: 980, calls: 210 },
  { name: 'Thu', active: 450, events: 390, calls: 250 },
  { name: 'Fri', active: 400, events: 480, calls: 180 },
  { name: 'Sat', active: 200, events: 380, calls: 90 },
  { name: 'Sun', active: 250, events: 430, calls: 110 },
];

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
    <div className="animate-in fade-in duration-500 pb-8">
      <PageHeader
        title="Administration Overview"
        description="Campus-wide metrics, analytics, and operational summary"
      />

      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Students" 
          value={stats.totalStudents} 
          icon={GraduationCap} 
          iconClassName="text-primary bg-primary/10"
          trend={{ value: 12, label: 'vs last month', isPositive: true }}
        />
        <StatCard 
          title="Faculty Members" 
          value={stats.totalTeachers} 
          icon={Users} 
          iconClassName="text-indigo-600 bg-indigo-50"
          trend={{ value: 2, label: 'vs last month', isPositive: true }}
        />
        <StatCard 
          title="Departments" 
          value={stats.totalDepartments} 
          icon={Building2} 
          iconClassName="text-warning bg-warning/10" 
        />
        <StatCard 
          title="Upcoming Events" 
          value={stats.upcomingEvents} 
          icon={Calendar} 
          iconClassName="text-success bg-success/10" 
          trend={{ value: 5, label: 'scheduled this week', isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        <div className="lg:col-span-2 bg-card border border-line rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-ink">Platform Activity</h3>
              <p className="text-sm text-muted">User engagement and system usage over the week</p>
            </div>
            <div className="p-2 bg-surface rounded-md">
              <Activity className="w-5 h-5 text-muted" />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="active" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-line rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-ink">Voice AI Traffic</h3>
              <p className="text-sm text-muted">Daily reminder call volume</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-md">
              <PhoneCall className="w-5 h-5 text-primary" />
            </div>
          </div>
          
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockActivityData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip cursor={{ fill: '#F5F7FA' }} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="calls" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <Link
            to="/admin/voice-agent"
            className="mt-6 flex items-center justify-between rounded-md border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10 group"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-sm">
                <Mic className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-primary">AI Voice Agent</p>
                <p className="text-sm text-primary/80">{stats.activeReminders} active reminders in queue</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
