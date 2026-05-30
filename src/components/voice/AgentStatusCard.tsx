import { Mic, Phone, CheckCircle2, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { VoiceAgentStats } from '../../data/voiceAgentData';
import { Waveform } from './Waveform';

interface AgentStatusCardProps {
  stats: VoiceAgentStats;
}

export function AgentStatusCard({ stats }: AgentStatusCardProps) {
  return (
    <Card className="lg:col-span-2">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
            <Mic className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted">Agent status</p>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  stats.isActive ? 'bg-success' : 'bg-muted'
                }`}
              />
              <h2 className="text-lg font-semibold text-ink">
                {stats.isActive ? 'Active' : 'Inactive'}
              </h2>
            </div>
            <p className="mt-1 text-sm text-muted">Last call: {stats.lastCallTime}</p>
            {stats.isActive && (
              <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                <Waveform active />
                <span>Ready for outbound reminders</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          <Stat label="Calls today" value={String(stats.callsToday)} icon={Phone} />
          <Stat
            label="Success rate"
            value={`${stats.successRate}%`}
            icon={CheckCircle2}
          />
          <Stat label="Last call" value={stats.lastCallTime.split(',')[1]?.trim() ?? '—'} icon={Clock} small />
        </div>
      </div>
    </Card>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  small,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  small?: boolean;
}) {
  return (
    <div className="rounded-md border border-line bg-surface px-3 py-2">
      <Icon className="mb-1 h-4 w-4 text-muted" />
      <p className={`font-semibold text-ink ${small ? 'text-sm' : 'text-xl'}`}>{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
