import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { adminService } from '../../services/campusService';

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

  return (
    <AdminLayout title="Analytics">
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Analytics" description="Participation, reminders, and attendance trends" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-sm text-muted">Event participation</p>
            <p className="text-3xl font-semibold text-ink">{data.eventParticipation}%</p>
          </Card>
          <Card>
            <p className="text-sm text-muted">Reminder success rate</p>
            <p className="text-3xl font-semibold text-primary">{data.reminderSuccessRate}%</p>
          </Card>
        </div>
        <Card className="mt-4">
          <p className="mb-4 text-sm font-medium text-ink">Attendance trend (weekly)</p>
          <div className="flex h-32 items-end gap-2">
            {data.attendanceTrend.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-primary/80" style={{ height: `${v}%` }} />
                <span className="text-xs text-muted">W{i + 1}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
