import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { AgentStatusCard } from '../components/voice/AgentStatusCard';
import { LiveCallPanel } from '../components/voice/LiveCallPanel';
import { ReminderQueue } from '../components/voice/ReminderQueue';
import {
  VoiceConfiguration,
  VoiceConfigState,
} from '../components/voice/VoiceConfiguration';
import { VoiceAnalytics } from '../components/voice/VoiceAnalytics';
import {
  voiceAgentStats,
  ongoingCalls,
  scheduledCalls,
  callHistory,
  voiceReminders,
  defaultVoiceConfig,
} from '../data/voiceAgentData';
import { dummyEvents } from '../data/dummyData';

export default function AiVoiceAgent() {
  const [config, setConfig] = useState<VoiceConfigState>(defaultVoiceConfig);

  return (
    <AppLayout title="AI Voice Agent" events={dummyEvents}>
      <div className="mx-auto max-w-7xl">
        <PageHeader
          title="AI Voice Agent"
          description="Manage automated voice reminders for students and faculty."
          action={
            <Link to="/add-event" className="btn-primary">
              Schedule reminder
            </Link>
          }
        />

        <div className="mb-6 grid gap-6 lg:grid-cols-3">
          <AgentStatusCard stats={voiceAgentStats} />
          <LiveCallPanel
            ongoing={ongoingCalls}
            scheduled={scheduledCalls}
            history={callHistory}
          />
        </div>

        <div className="mb-6">
          <ReminderQueue reminders={voiceReminders} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <VoiceConfiguration config={config} onChange={setConfig} />
          <VoiceAnalytics stats={voiceAgentStats} />
        </div>
      </div>
    </AppLayout>
  );
}
