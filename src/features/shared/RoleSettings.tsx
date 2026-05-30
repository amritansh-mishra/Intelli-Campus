import { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';

export function RoleSettings({ title }: { title: string }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [voiceReminders, setVoiceReminders] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title={title} description="Account and notification preferences" />
      <Card className="space-y-4">
        <div>
          <p className="text-sm font-medium text-ink">Profile</p>
          <p className="text-sm text-muted">{user?.name}</p>
          <p className="text-sm text-muted">{user?.email}</p>
        </div>
        <Toggle label="Push notifications" checked={notifications} onChange={setNotifications} />
        <Toggle label="Voice reminders" checked={voiceReminders} onChange={setVoiceReminders} />
        <Toggle label="Email alerts" checked={emailAlerts} onChange={setEmailAlerts} />
      </Card>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between border-t border-line pt-4">
      <span className="text-sm text-ink">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded text-primary"
      />
    </label>
  );
}
