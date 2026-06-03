import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PageHeader } from '../../../shared/components/PageHeader';
import StatCard from '../../../shared/components/StatCard';
import { adminService } from '../services/adminService';
import { PieChart as PieChartIcon, TrendingUp, Users, Calendar } from 'lucide-react';

export default function AdminAnalytics() {
  const [data, setData] = useState({
    eventParticipation: 0,
    reminderSuccessRate: 0,
    attendanceTrend: [] as number[],
  });

  useEffect(() => {
    adminService.getAnalytics().then(({ data }) => setData(data)).catch(() => {
      setData({ eventParticipation: 87, reminderSuccessRate: 91, attendanceTrend: [88, 90, 87, 91, 89, 93] });
    });
  }, []);

  const chartData = data.attendanceTrend.map((val, idx) => ({
    name: `Week ${idx + 1}`,
    attendance: val,
  }));

  return (
    <div className="animate-in fade-in duration-500 pb-8">
      <PageHeader title="Platform Analytics" description="Comprehensive insights into user engagement and system performance" />
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard 
          title="Event Participation" 
          value={`${data.eventParticipation}%`} 
          icon={Users} 
          iconClassName="bg-primary/10 text-primary"
          trend={{ value: 4.2, label: 'vs last month', isPositive: true }}
        />
        <StatCard 
          title="Voice Reminder Success" 
          value={`${data.reminderSuccessRate}%`} 
          icon={PieChartIcon} 
          iconClassName="bg-success/10 text-success"
          trend={{ value: 1.5, label: 'vs last month', isPositive: true }}
        />
        <StatCard 
          title="System Uptime" 
          value="99.9%" 
          icon={TrendingUp} 
          iconClassName="bg-indigo-50 text-indigo-600"
        />
        <StatCard 
          title="Active Campaigns" 
          value="12" 
          icon={Calendar} 
          iconClassName="bg-warning/10 text-warning"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card border border-line rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-ink mb-6">Weekly Attendance Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="attendance" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-line rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-ink mb-6">Engagement by Department</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'CSE', val: 92 },
                { name: 'ECE', val: 85 },
                { name: 'MECH', val: 78 },
                { name: 'CIVIL', val: 82 },
                { name: 'MBA', val: 89 },
              ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip cursor={{ fill: '#F5F7FA' }} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="val" fill="#059669" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
