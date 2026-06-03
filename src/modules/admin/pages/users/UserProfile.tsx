import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { Mail, Phone, Building2, Calendar, ShieldCheck, PhoneCall, ArrowLeft } from 'lucide-react';
import { PageHeader } from '../../../../shared/components/PageHeader';
import { ActivityTimeline, TimelineEvent } from '../../../../shared/components/ActivityTimeline';
import { Badge } from '../../../../shared/components/Badge';
import { Button } from '../../../../shared/components/Button';

export function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      adminService.getUser(id)
        .then(({ data }) => setUser(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="p-8">Loading profile...</div>;
  if (!user) return <div className="p-8">User not found.</div>;

  // Enhance user object with some display defaults if missing
  const displayUser = {
    ...user,
    roleDisplay: user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Unknown',
    department: 'Computer Science (CSE)', // Mocking department text for now since it's an ID
    status: user.isActive ? 'Active' : 'Inactive',
    semester: user.year ? `${user.year} Semester` : '',
    studentId: user.studentId || user.employeeId || 'N/A'
  };

  const activityLogs: TimelineEvent[] = [
    { id: '1', type: 'login', title: 'System Login', description: 'Logged in from macOS (Chrome) • IP: 192.168.1.1', timestamp: new Date(Date.now() - 3600000), icon: ShieldCheck },
    { id: '2', type: 'voice', title: 'Voice Reminder Received', description: 'AI Call: "Upcoming Mid-term Exams reminder"', timestamp: new Date(Date.now() - 86400000), icon: PhoneCall },
    { id: '3', type: 'event', title: 'Event Registration', description: 'Registered for Annual Tech Symposium', timestamp: new Date(Date.now() - 172800000), icon: Calendar },
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-8 max-w-5xl mx-auto">
      <Link to="/admin/users" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to users list
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{displayUser.name}</h1>
          <p className="mt-1 text-sm text-muted">User Profile & Activity Log</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Reset Password</Button>
          <Button variant="danger">Suspend Account</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Details Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card border border-line rounded-lg shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/10 to-indigo-500/10"></div>
            <div className="px-6 pb-6 relative">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-card shadow-sm flex items-center justify-center -mt-10 mb-4 mx-auto">
                <span className="text-2xl font-bold text-primary">{displayUser.name.charAt(0)}</span>
              </div>
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-ink">{displayUser.name}</h2>
                <p className="text-sm text-primary font-medium">{displayUser.studentId}</p>
                <div className="mt-2">
                  <Badge variant={displayUser.isActive ? 'success' : 'danger'}>{displayUser.status}</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted shrink-0" />
                  <span className="text-ink truncate">{displayUser.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted shrink-0" />
                  <span className="text-ink">{displayUser.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-muted shrink-0" />
                  <span className="text-ink">{displayUser.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="w-4 h-4 text-muted shrink-0" />
                  <span className="text-ink">{displayUser.roleDisplay} {displayUser.semester ? `(${displayUser.semester})` : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-line rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-ink mb-6">Recent Activity</h3>
            <ActivityTimeline events={activityLogs} />
          </div>
        </div>
      </div>
    </div>
  );
}
