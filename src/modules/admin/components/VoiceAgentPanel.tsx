import { useEffect, useState } from 'react';
import { PageHeader } from '../../../shared/components/PageHeader';
import { AgentStatusCard } from './AgentStatusCard';
import { LiveCallPanel } from './LiveCallPanel';
import { ReminderQueue } from './ReminderQueue';
import {
  VoiceConfiguration,
  VoiceConfigState,
} from './VoiceConfiguration';
import { VoiceAnalytics } from './VoiceAnalytics';
import {
  voiceAgentStats,
  ongoingCalls,
  scheduledCalls,
  callHistory,
  voiceReminders,
  defaultVoiceConfig,
  VoiceAgentStats,
  VoiceReminder,
} from '../../../data/voiceAgentData';
import { voiceService } from '../../../shared/services/campusService';

interface VoiceAgentPanelProps {
  showScheduleAction?: boolean;
  onSchedule?: () => void;
}

export function VoiceAgentPanel({ showScheduleAction, onSchedule }: VoiceAgentPanelProps) {
  const [config, setConfig] = useState<VoiceConfigState>(defaultVoiceConfig);
  const [stats, setStats] = useState<VoiceAgentStats>(voiceAgentStats);
  const [reminders, setReminders] = useState<VoiceReminder[]>(voiceReminders);

  useEffect(() => {
    voiceService.getStats().then(({ data }) => {
      setStats((prev) => ({
        ...prev,
        ...data,
        monthlyUsage: prev.monthlyUsage,
      }));
    }).catch(() => {});

    voiceService.getAll().then(({ data }) => {
      if (data.length) {
        setReminders(
          data.map((r) => ({
            id: r._id,
            title: r.title,
            recipient: r.recipientName,
            scheduledAt: new Date(r.scheduledAt).toLocaleString(),
            priority: r.priority,
            status: r.status as VoiceReminder['status'],
          }))
        );
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="AI Voice Agent"
        description="Outbound voice reminders, call queue, and performance analytics"
        action={
          showScheduleAction ? (
            <button type="button" onClick={onSchedule} className="btn-primary">
              Schedule reminder
            </button>
          ) : undefined
        }
      />

      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <AgentStatusCard stats={stats} />
        <LiveCallPanel
          ongoing={ongoingCalls}
          scheduled={scheduledCalls}
          history={callHistory}
        />
      </div>

      <div className="mb-6">
        <ReminderQueue reminders={reminders} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <VoiceConfiguration config={config} onChange={setConfig} />
        <VoiceAnalytics stats={stats} />
      </div>
    </div>
  );
}
