import { VoiceAgentPanel } from '../components/VoiceAgentPanel';

export default function AdminVoiceAgent() {
  return (
    <div className="animate-in fade-in duration-500 pb-8">
      <VoiceAgentPanel showScheduleAction />
    </div>
  );
}
