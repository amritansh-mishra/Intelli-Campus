import { NotificationsPage } from '../../../shared/components/NotificationsPage';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Button } from '../../../shared/components/Button';
import { Plus, BellRing } from 'lucide-react';

export default function AdminNotifications() {
  return (
    <div className="animate-in fade-in duration-500 pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink flex items-center gap-2">
            <BellRing className="w-6 h-6 text-primary" />
            Notification Center
          </h1>
          <p className="mt-1 text-sm text-muted">Broadcast emergency alerts, campus news, and department notices</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> New Broadcast
        </Button>
      </div>

      <div className="bg-card border border-line rounded-lg shadow-sm p-6">
        <NotificationsPage title="Recent Alerts" />
      </div>
    </div>
  );
}
