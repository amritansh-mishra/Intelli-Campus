import { Card, CardHeader } from '../ui/Card';
import { VoiceAgentStats } from '../../data/voiceAgentData';

interface VoiceAnalyticsProps {
  stats: VoiceAgentStats;
}

export function VoiceAnalytics({ stats }: VoiceAnalyticsProps) {
  const maxCalls = Math.max(...stats.monthlyUsage.map((m) => m.calls));

  return (
    <Card>
      <CardHeader
        title="Analytics"
        description="Voice reminder performance and usage"
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Metric
          label="Total reminders sent"
          value={stats.totalRemindersSent.toLocaleString()}
        />
        <Metric
          label="Voice success rate"
          value={`${stats.voiceSuccessRate}%`}
          highlight
        />
      </div>
      <div>
        <p className="mb-3 text-sm font-medium text-ink">Monthly usage</p>
        <div className="flex h-40 items-end gap-2 border-t border-line pt-4">
          {stats.monthlyUsage.map((month) => (
            <div key={month.month} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end justify-center">
                <div
                  className="w-full max-w-[2rem] rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                  style={{ height: `${(month.calls / maxCalls) * 100}%`, minHeight: '8px' }}
                  title={`${month.calls} calls`}
                />
              </div>
              <span className="text-xs text-muted">{month.month}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-md border border-line bg-surface px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${highlight ? 'text-primary' : 'text-ink'}`}>
        {value}
      </p>
    </div>
  );
}
