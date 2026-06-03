import { useState } from 'react';
import { Bell, Save, Mail, Smartphone, AlertTriangle } from 'lucide-react';
import { Button } from '../../../../shared/components/Button';
import { Card } from '../../../../shared/components/Card';
import { ToggleSwitch } from '../../../../shared/components/ToggleSwitch';

export function NotificationSettings() {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    events: true,
    emergency: true,
    voice: true,
    department: true,
    email: false,
    sms: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink flex items-center gap-2">
          <Bell className="w-6 h-6 text-primary" />
          Notification Preferences
        </h1>
        <p className="mt-1 text-sm text-muted">Configure default system-wide notification behaviors.</p>
      </div>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2 border-b border-line pb-4">
          <Smartphone className="w-5 h-5 text-muted" />
          Delivery Channels
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-ink">Push Notifications</p>
              <p className="text-sm text-muted">Send alerts to the web dashboard and mobile app.</p>
            </div>
            <ToggleSwitch checked={true} disabled onChange={() => {}} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-ink">Email Deliveries</p>
              <p className="text-sm text-muted">Send a daily digest or urgent alerts via email.</p>
            </div>
            <ToggleSwitch checked={settings.email} onChange={() => toggle('email')} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-ink">SMS Deliveries</p>
              <p className="text-sm text-muted">Fall back to SMS when push notifications are undeliverable.</p>
            </div>
            <ToggleSwitch checked={settings.sms} onChange={() => toggle('sms')} />
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2 border-b border-line pb-4">
          <AlertTriangle className="w-5 h-5 text-muted" />
          Alert Types
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-ink text-danger">Emergency Broadcasts</p>
              <p className="text-sm text-muted">Critical campus alerts that bypass user silent modes.</p>
            </div>
            <ToggleSwitch checked={settings.emergency} onChange={() => toggle('emergency')} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-ink">Event Reminders</p>
              <p className="text-sm text-muted">Automated reminders for registered events and exams.</p>
            </div>
            <ToggleSwitch checked={settings.events} onChange={() => toggle('events')} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-ink">AI Voice Reminders</p>
              <p className="text-sm text-muted">Enable automated phone calls for high-priority reminders.</p>
            </div>
            <ToggleSwitch checked={settings.voice} onChange={() => toggle('voice')} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm text-ink">Department Announcements</p>
              <p className="text-sm text-muted">Notices sent by HODs to specific departments.</p>
            </div>
            <ToggleSwitch checked={settings.department} onChange={() => toggle('department')} />
          </div>
        </div>
      </Card>

      <div className="flex justify-end pt-4">
        <Button variant="primary" onClick={handleSave} isLoading={saving} className="gap-2">
          <Save className="w-4 h-4" /> Save Preferences
        </Button>
      </div>
    </div>
  );
}
