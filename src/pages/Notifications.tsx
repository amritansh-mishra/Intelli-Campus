import { useState } from 'react';
import { Bell, AlertCircle, Info, Check, CheckCheck, Trash2 } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { dummyNotifications, Notification } from '../data/dummyData';

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered =
    filter === 'all' ? notifications : notifications.filter((n) => !n.read);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-danger" />;
      case 'reminder':
        return <Bell className="h-5 w-5 text-warning" />;
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <AppLayout title="Notifications">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title="Notifications"
          description={
            unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'All caught up'
          }
          action={
            unreadCount > 0 ? (
              <button
                type="button"
                onClick={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
                className="btn-secondary"
              >
                <CheckCheck className="h-4 w-4" />
                Mark all read
              </button>
            ) : undefined
          }
        />

        <div className="mb-4 flex gap-2">
          {(['all', 'unread'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-line text-muted hover:text-ink'
              }`}
            >
              {f === 'all' ? `All (${notifications.length})` : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <Card className="py-12 text-center">
            <Bell className="mx-auto mb-3 h-10 w-10 text-muted/40" />
            <p className="font-medium text-ink">No notifications</p>
            <p className="text-sm text-muted">Check back later for updates</p>
          </Card>
        ) : (
          <ul className="space-y-2">
            {filtered.map((notification) => (
              <li key={notification.id}>
                <Card
                  className={`${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                  padding="md"
                >
                  <div className="flex gap-3">
                    <div className="rounded-md bg-surface p-2">{getIcon(notification.type)}</div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-ink">{notification.title}</p>
                      <p className="text-sm text-muted">{notification.message}</p>
                      <p className="mt-1 text-xs text-muted">{notification.time}</p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() =>
                            setNotifications(
                              notifications.map((n) =>
                                n.id === notification.id ? { ...n, read: true } : n
                              )
                            )
                          }
                          className="btn-ghost p-2"
                          aria-label="Mark as read"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          setNotifications(notifications.filter((n) => n.id !== notification.id))
                        }
                        className="btn-ghost p-2 text-danger"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}
