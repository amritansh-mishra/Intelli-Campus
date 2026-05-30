import { Card, CardHeader } from '../ui/Card';
import { Badge, priorityToBadge } from '../ui/Badge';
import { VoiceReminder } from '../../data/voiceAgentData';

interface ReminderQueueProps {
  reminders: VoiceReminder[];
}

const statusLabel: Record<VoiceReminder['status'], string> = {
  pending: 'Pending',
  'in-progress': 'In progress',
  completed: 'Completed',
};

export function ReminderQueue({ reminders }: ReminderQueueProps) {
  return (
    <Card>
      <CardHeader
        title="Voice reminder queue"
        description="Pending and scheduled outbound reminders"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-medium uppercase tracking-wide text-muted">
              <th className="pb-2 pr-4 font-medium">Reminder</th>
              <th className="pb-2 pr-4 font-medium">Recipient</th>
              <th className="pb-2 pr-4 font-medium">Priority</th>
              <th className="pb-2 pr-4 font-medium">Call time</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {reminders.map((item) => (
              <tr key={item.id} className="hover:bg-surface/80">
                <td className="py-3 pr-4 font-medium text-ink">{item.title}</td>
                <td className="py-3 pr-4 text-muted">{item.recipient}</td>
                <td className="py-3 pr-4">
                  <Badge variant={priorityToBadge(item.priority)}>{item.priority}</Badge>
                </td>
                <td className="py-3 pr-4 text-muted">{item.scheduledAt}</td>
                <td className="py-3">
                  <span className="text-muted">{statusLabel[item.status]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
