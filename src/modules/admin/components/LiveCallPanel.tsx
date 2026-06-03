import { Phone, PhoneCall, History, PhoneForwarded } from 'lucide-react';
import { Waveform } from './Waveform';
import { CallRecord } from '../../../data/voiceAgentData';

interface LiveCallPanelProps {
  ongoing: CallRecord[];
  scheduled: CallRecord[];
  history: CallRecord[];
}

const statusStyles: Record<CallRecord['status'], string> = {
  ongoing: 'bg-primary/10 text-primary-600 border border-primary/20',
  scheduled: 'bg-amber-50 text-warning border border-warning/20',
  completed: 'bg-emerald-50 text-success border border-success/20',
  failed: 'bg-red-50 text-danger border border-danger/20',
};

export function LiveCallPanel({ ongoing, scheduled, history }: LiveCallPanelProps) {
  return (
    <div className="bg-card border border-line rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-5 border-b border-line shrink-0 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-primary" />
            Active Call Center
          </h2>
          <p className="text-sm text-muted">Monitor live outbound voice calls</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full border border-success/20">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          <span className="text-xs font-semibold text-success uppercase tracking-wide">System Online</span>
        </div>
      </div>
      
      <div className="flex-1 p-5 overflow-y-auto space-y-8">
        <CallSection title="Live Calls" icon={PhoneCall} items={ongoing} empty="No active calls" isLive />
        <CallSection title="Queued" icon={PhoneForwarded} items={scheduled} empty="No scheduled calls" />
        <CallSection title="Recent History" icon={History} items={history.slice(0, 3)} empty="No recent history" />
      </div>
    </div>
  );
}

function CallSection({
  title,
  icon: Icon,
  items,
  empty,
  isLive = false,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: CallRecord[];
  empty: string;
  isLive?: boolean;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink uppercase tracking-wider">
        <Icon className="h-4 w-4 text-muted" />
        {title} <span className="bg-surface px-2 py-0.5 rounded-full text-xs ml-auto text-muted">{items.length}</span>
      </div>
      
      {items.length === 0 ? (
        <div className="border border-dashed border-line rounded-md p-6 flex flex-col items-center justify-center text-center">
          <Phone className="w-8 h-8 text-line mb-2" />
          <p className="text-sm text-muted">{empty}</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((call) => (
            <li key={call.id} className="flex items-center justify-between p-3 rounded-md border border-line bg-surface/30 hover:bg-surface transition-colors group">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isLive ? 'bg-primary/10' : 'bg-card border border-line'}`}>
                  {isLive ? <Waveform active /> : <Phone className="w-4 h-4 text-muted" />}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-ink group-hover:text-primary transition-colors">{call.contact}</p>
                  <p className="truncate text-xs text-muted flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-line"></span>
                    {call.purpose}
                  </p>
                </div>
              </div>
              
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${statusStyles[call.status]}`}>
                  {call.status}
                </span>
                <span className="text-xs text-muted font-medium">
                  {call.duration ? `${call.time} • ${call.duration}` : call.time}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
