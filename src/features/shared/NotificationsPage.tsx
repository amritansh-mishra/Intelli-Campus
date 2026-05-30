import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { notificationService } from '../../services/campusService';
import { AppNotification } from '../../types';
import { dummyNotifications } from '../../data/dummyData';

export function NotificationsPage({ title }: { title: string }) {
  const [items, setItems] = useState<AppNotification[]>([]);

  useEffect(() => {
    notificationService
      .getAll()
      .then(({ data }) => setItems(data))
      .catch(() =>
        setItems(
          dummyNotifications.map((n) => ({
            _id: n.id,
            title: n.title,
            message: n.message,
            type: n.type,
            read: n.read,
            createdAt: n.time,
          }))
        )
      );
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={title} description="Alerts, reminders, and campus announcements" />
      <ul className="space-y-2">
        {items.map((n) => (
          <li key={n._id}>
            <Card padding="md" className={!n.read ? 'border-l-4 border-l-primary' : ''}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-ink">{n.title}</p>
                  <p className="text-sm text-muted">{n.message}</p>
                </div>
                <Badge variant={n.type === 'alert' ? 'danger' : 'neutral'}>{n.type}</Badge>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
