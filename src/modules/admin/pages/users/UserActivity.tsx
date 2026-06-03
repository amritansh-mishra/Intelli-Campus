import { Calendar, ShieldCheck, PhoneCall, FileText, Bell } from 'lucide-react';
import { PageHeader } from '../../../../shared/components/PageHeader';
import { ActivityTimeline, TimelineEvent } from '../../../../shared/components/ActivityTimeline';
import { Card } from '../../../../shared/components/Card';

export function UserActivity() {
  const activityLogs: TimelineEvent[] = [
    { 
      id: '1', 
      type: 'login', 
      title: 'Security Alert: New Device Login', 
      description: 'Admin user logged in from new device (Windows 11) • IP: 192.168.1.100', 
      timestamp: new Date(Date.now() - 1000 * 60 * 5), 
      icon: ShieldCheck 
    },
    { 
      id: '2', 
      type: 'voice', 
      title: 'Voice Agent Campaign Completed', 
      description: 'Dispatched 450 AI voice reminders to 2nd year students regarding fee payment.', 
      timestamp: new Date(Date.now() - 1000 * 60 * 45), 
      icon: PhoneCall 
    },
    { 
      id: '3', 
      type: 'event', 
      title: 'Event Created: Annual Tech Symposium', 
      description: 'Prof. John Doe created a new event and requested administrative approval.', 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), 
      icon: Calendar 
    },
    { 
      id: '4', 
      type: 'login', 
      title: 'Bulk User Import Completed', 
      description: 'System successfully imported 120 new student records into CSE department.', 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), 
      icon: FileText 
    },
    { 
      id: '5', 
      type: 'event', 
      title: 'Emergency Notification Broadcast', 
      description: 'Sent SMS and Email alert to all faculty regarding campus closure.', 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), 
      icon: Bell 
    },
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-8 h-full">
      <PageHeader 
        title="System Activity Logs" 
        description="Monitor system-wide events, security alerts, and administrative actions." 
      />
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card padding="lg">
            <h3 className="text-lg font-semibold text-ink mb-6 border-b border-line pb-4">Recent Activity</h3>
            <ActivityTimeline events={activityLogs} />
          </Card>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <Card padding="md">
            <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">Activity Summary</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span className="text-sm text-muted">Total Logins (24h)</span>
                <span className="font-semibold text-ink">1,245</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-muted">Failed Attempts</span>
                <span className="font-semibold text-danger">12</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-muted">Voice Calls Made</span>
                <span className="font-semibold text-ink">850</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sm text-muted">Active Sessions</span>
                <span className="font-semibold text-success">342</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
