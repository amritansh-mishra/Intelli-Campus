import { AdminLayout } from '../../components/layout/AdminLayout';
import { VoiceAgentPanel } from '../voice/VoiceAgentPanel';

export default function AdminVoiceAgent() {
  return (
    <AdminLayout title="AI Voice Agent">
      <VoiceAgentPanel showScheduleAction />
    </AdminLayout>
  );
}
