import { Badge, priorityToBadge } from '../../../shared/components/Badge';
import { Table, Column } from '../../../shared/components/Table';
import { VoiceReminder } from '../../../data/voiceAgentData';
import { Calendar, Phone } from 'lucide-react';

interface ReminderQueueProps {
  reminders: VoiceReminder[];
}

const statusLabel: Record<VoiceReminder['status'], { label: string, color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' }> = {
  pending: { label: 'Pending Queue', color: 'warning' },
  'in-progress': { label: 'Calling...', color: 'primary' },
  completed: { label: 'Delivered', color: 'success' },
};

export function ReminderQueue({ reminders }: ReminderQueueProps) {
  const columns: Column<VoiceReminder>[] = [
    {
      key: 'title',
      header: 'Reminder Campaign',
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-ink">{r.title}</span>
        </div>
      )
    },
    {
      key: 'recipient',
      header: 'Target Audience',
      render: (r) => <span className="text-muted font-medium">{r.recipient}</span>
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (r) => <Badge variant={priorityToBadge(r.priority)}>{r.priority}</Badge>
    },
    {
      key: 'scheduledAt',
      header: 'Dispatch Schedule',
      render: (r) => (
        <div className="flex items-center gap-2 text-muted text-sm">
          <Calendar className="w-4 h-4" />
          {r.scheduledAt}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Queue Status',
      render: (r) => {
        const status = statusLabel[r.status];
        return <Badge variant={status.color}>{status.label}</Badge>;
      }
    }
  ];

  return (
    <div className="bg-card border border-line rounded-lg shadow-sm">
      <div className="p-5 border-b border-line">
        <h2 className="text-lg font-semibold text-ink">Broadcast Queue</h2>
        <p className="text-sm text-muted">Pending and scheduled outbound voice campaigns</p>
      </div>
      <Table 
        columns={columns} 
        data={reminders} 
        emptyMessage="No pending voice reminders."
      />
    </div>
  );
}
