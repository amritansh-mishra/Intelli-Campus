import { Phone, PhoneCall, History } from 'lucide-react';
import { Card, CardHeader } from '../../../shared/components/Card';
import { CallRecord } from '../../../data/voiceAgentData';

interface LiveCallPanelProps {
  ongoing: CallRecord[];
  scheduled: CallRecord[];
  history: CallRecord[];
}

const statusStyles: Record<CallRecord['status'], string> = {
  ongoing: 'bg-primary/10 text-primary',
  scheduled: 'bg-amber-50 text-warning',
  completed: 'bg-emerald-50 text-success',
  failed: 'bg-red-50 text-danger',
};

export function LiveCallPanel({ ongoing, scheduled, history }: LiveCallPanelProps) {
  return (
    <Card>
      <CardHeader
        title="Live call activity"
        description="Ongoing, scheduled, and recent calls"
      />
      <div className="space-y-6">
        <CallSection title="Ongoing" icon={PhoneCall} items={ongoing} empty="No active calls" />
        <CallSection title="Scheduled" icon={Phone} items={scheduled} empty="No scheduled calls" />
        <CallSection title="History" icon={History} items={history.slice(0, 4)} empty="No recent history" />
      </div>
    </Card>
  );
}

function CallSection({
  title,
  icon: Icon,
  items,
  empty,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: CallRecord[];
  empty: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-ink">
        <Icon className="h-4 w-4 text-muted" />
        {title}
      </div>
      {items.length === 0 ? (
        <p className="rounded-md border border-dashed border-line px-3 py-4 text-center text-sm text-muted">
          {empty}
        </p>
      ) : (
        <ul className="divide-y divide-line rounded-md border border-line">
          {items.map((call) => (
            <li key={call.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{call.contact}</p>
                <p className="truncate text-xs text-muted">{call.purpose}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[call.status]}`}
                >
                  {call.status}
                </span>
                <span className="text-xs text-muted">
                  {call.duration ? `${call.time} · ${call.duration}` : call.time}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
