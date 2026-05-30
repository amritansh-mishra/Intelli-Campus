import { useEffect, useState } from 'react';
import { StudentLayout } from '../layouts/StudentLayout';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Card } from '../../../shared/components/Card';
import { Badge, priorityToBadge } from '../../../shared/components/Badge';
import { eventService } from '../../../shared/services/campusService';
import { CampusEvent } from '../../../types';

export default function StudentEvents() {
  const [events, setEvents] = useState<CampusEvent[]>([]);

  useEffect(() => {
    eventService.getAll().then(({ data }) => setEvents(data)).catch(() => {});
  }, []);

  const register = async (id: string) => {
    await eventService.register(id);
    alert('Registered successfully');
  };

  return (
    <StudentLayout title="Events">
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Campus events" description="Register for upcoming activities" />
        <ul className="space-y-3">
          {events.map((e) => (
            <li key={e._id}>
              <Card padding="md" className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-ink">{e.title}</p>
                  <p className="text-sm text-muted">
                    {new Date(e.date).toLocaleDateString()} at {e.time}
                  </p>
                  <Badge variant={priorityToBadge(e.priority)} className="mt-2">
                    {e.priority}
                  </Badge>
                </div>
                <button type="button" className="btn-primary" onClick={() => register(e._id)}>
                  Register
                </button>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </StudentLayout>
  );
}
