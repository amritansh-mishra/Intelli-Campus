import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, GraduationCap, Calendar, TrendingUp } from 'lucide-react';
import { PageHeader } from '../../../../shared/components/PageHeader';
import { Card } from '../../../../shared/components/Card';

const studentDistribution = [
  { name: 'CSE', students: 1200 },
  { name: 'ECE', students: 850 },
  { name: 'ISE', students: 650 },
  { name: 'MBA', students: 400 },
  { name: 'AIML', students: 300 },
];

const attendanceTrends = [
  { month: 'Aug', CSE: 85, ECE: 82, MBA: 88 },
  { month: 'Sep', CSE: 88, ECE: 85, MBA: 90 },
  { month: 'Oct', CSE: 82, ECE: 80, MBA: 85 },
  { month: 'Nov', CSE: 89, ECE: 87, MBA: 92 },
  { month: 'Dec', CSE: 92, ECE: 89, MBA: 94 },
];

const facultyDistribution = [
  { name: 'Professors', value: 45 },
  { name: 'Associate Profs', value: 80 },
  { name: 'Assistant Profs', value: 150 },
];

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function DepartmentAnalytics() {
  return (
    <div className="animate-in fade-in duration-500 pb-8 h-full">
      <PageHeader 
        title="Department Analytics" 
        description="Comprehensive overview of departmental performance and metrics." 
      />

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Students', value: '3,400', change: '+12%', icon: GraduationCap, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Total Faculty', value: '275', change: '+5%', icon: Users, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Events Hosted', value: '42', change: '+18%', icon: Calendar, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Avg Attendance', value: '88.5%', change: '-2%', icon: TrendingUp, color: 'text-danger', bg: 'bg-danger/10' },
        ].map((stat, i) => (
          <Card key={i} padding="md" className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-semibold text-ink tracking-tight">{stat.value}</p>
                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Student Distribution Chart */}
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-ink mb-6">Student Distribution</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentDistribution} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="students" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Attendance Trends Chart */}
        <Card padding="lg">
          <h3 className="text-lg font-semibold text-ink mb-6">Attendance Trends (Top 3)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="CSE" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="ECE" stroke="#10B981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="MBA" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <Card padding="lg" className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-ink mb-6">Faculty Composition</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={facultyDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {facultyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {facultyDistribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm text-muted">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </Card>
        
        <Card padding="lg" className="lg:col-span-2">
           <h3 className="text-lg font-semibold text-ink mb-6">Upcoming Department Events</h3>
           <div className="space-y-4">
              {[
                { title: 'Tech Symposium 2024', dept: 'CSE', date: 'Oct 15, 2024', status: 'Approved' },
                { title: 'Robotics Workshop', dept: 'ECE', date: 'Nov 02, 2024', status: 'Pending Review' },
                { title: 'Business Leadership Seminar', dept: 'MBA', date: 'Nov 12, 2024', status: 'Approved' },
              ].map((ev, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-line rounded-lg hover:bg-surface transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-medium text-ink">{ev.title}</h4>
                    <p className="text-sm text-muted mt-1">{ev.dept} Department • {ev.date}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${ev.status === 'Approved' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    {ev.status}
                  </span>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
}
