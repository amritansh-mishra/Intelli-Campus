import { AdminLayout } from '../layouts/AdminLayout';
import { VoiceAgentPanel } from '../components/VoiceAgentPanel';

export default function AdminVoiceAgent() {
  return (
    <AdminLayout title="AI Voice Agent">
      <VoiceAgentPanel showScheduleAction />
    </AdminLayout>
  );
}
