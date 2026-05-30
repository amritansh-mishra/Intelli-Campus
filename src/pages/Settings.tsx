import { useState } from 'react';
import { Bell, Volume2, Shield, Check } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader } from '../components/ui/Card';

function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        enabled ? 'bg-primary' : 'bg-line'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    sounds: true,
    autoReminders: true,
    emailAlerts: false,
    privacy: false,
    language: 'English',
  });

  const updateSetting = (key: keyof typeof settings, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const groups = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { key: 'notifications' as const, label: 'Push notifications', desc: 'In-app alerts for events' },
        { key: 'emailAlerts' as const, label: 'Email alerts', desc: 'Important updates via email' },
      ],
    },
    {
      title: 'Sound & voice',
      icon: Volume2,
      items: [
        { key: 'sounds' as const, label: 'Sound effects', desc: 'UI feedback sounds' },
        { key: 'autoReminders' as const, label: 'AI voice reminders', desc: 'Outbound calls via voice agent' },
      ],
    },
    {
      title: 'Privacy',
      icon: Shield,
      items: [
        { key: 'privacy' as const, label: 'Privacy mode', desc: 'Hide event details in notifications' },
      ],
    },
  ];

  return (
    <AppLayout title="Settings">
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Settings" description="Manage your preferences and account" />

        <div className="space-y-6">
          {groups.map((group) => (
            <Card key={group.title}>
              <CardHeader title={group.title} />
              <ul className="divide-y divide-line">
                {group.items.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">{item.label}</p>
                      <p className="text-sm text-muted">{item.desc}</p>
                    </div>
                    <ToggleSwitch
                      enabled={settings[item.key] as boolean}
                      onChange={(v) => updateSetting(item.key, v)}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          ))}

          <Card>
            <CardHeader title="Language" description="Display language" />
            <div className="flex flex-wrap gap-2">
              {['English', 'Spanish', 'French', 'German'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => updateSetting('language', lang)}
                  className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                    settings.language === lang
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-line text-muted hover:border-primary/30'
                  }`}
                >
                  {settings.language === lang && <Check className="h-4 w-4" />}
                  {lang}
                </button>
              ))}
            </div>
          </Card>

          <p className="text-center text-xs text-muted">Intelli Campus v1.0.0</p>
        </div>
      </div>
    </AppLayout>
  );
}
