import { useState } from 'react';
import { ShieldCheck, Save, KeyRound, MonitorSmartphone, Laptop, Smartphone } from 'lucide-react';
import { Button } from '../../../../shared/components/Button';
import { Input } from '../../../../shared/components/Input';
import { Card } from '../../../../shared/components/Card';
import { ToggleSwitch } from '../../../../shared/components/ToggleSwitch';

export function SecuritySettings() {
  const [saving, setSaving] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  const sessions = [
    { id: '1', device: 'MacBook Pro 16"', os: 'macOS', browser: 'Chrome', ip: '192.168.1.45', time: 'Active now', current: true, icon: Laptop },
    { id: '2', device: 'iPhone 14 Pro', os: 'iOS 16', browser: 'Safari', ip: '10.0.0.12', time: 'Last active 2 hours ago', current: false, icon: Smartphone },
  ];

  return (
    <div className="max-w-4xl space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          Security & Access
        </h1>
        <p className="mt-1 text-sm text-muted">Manage your password, 2FA, and active sessions.</p>
      </div>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2 border-b border-line pb-4">
          <KeyRound className="w-5 h-5 text-muted" />
          Change Password
        </h3>
        <div className="space-y-6 max-w-md">
          <Input label="Current Password" type="password" placeholder="••••••••" />
          <Input label="New Password" type="password" placeholder="••••••••" />
          <Input label="Confirm New Password" type="password" placeholder="••••••••" />
          <Button variant="primary" onClick={handleSave} isLoading={saving} className="gap-2">
            <Save className="w-4 h-4" /> Update Password
          </Button>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2 border-b border-line pb-4">
          <ShieldCheck className="w-5 h-5 text-muted" />
          Two-Factor Authentication
        </h3>
        <div className="flex items-start justify-between">
          <div className="max-w-xl">
            <p className="font-semibold text-sm text-ink mb-1">Authenticator App</p>
            <p className="text-sm text-muted mb-4">Use an authenticator app (like Google Authenticator or Authy) to generate one-time security codes.</p>
            {twoFactor && (
              <Button variant="secondary" size="sm">Configure Authenticator</Button>
            )}
          </div>
          <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} />
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2 border-b border-line pb-4">
          <MonitorSmartphone className="w-5 h-5 text-muted" />
          Active Sessions
        </h3>
        <ul className="divide-y divide-line">
          {sessions.map(session => (
            <li key={session.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-surface border border-line flex items-center justify-center shrink-0">
                  <session.icon className="w-5 h-5 text-muted" />
                </div>
                <div>
                  <p className="font-medium text-sm text-ink flex items-center gap-2">
                    {session.device} 
                    {session.current && <span className="bg-success/10 text-success text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full">Current</span>}
                  </p>
                  <p className="text-xs text-muted mt-1">{session.os} • {session.browser} • {session.ip}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-muted">{session.time}</span>
                {!session.current && (
                  <button className="text-xs font-medium text-danger hover:text-red-700 transition-colors">
                    Revoke Access
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-line">
          <Button variant="ghost" className="text-danger hover:bg-red-50 hover:text-red-700">Sign out of all other sessions</Button>
        </div>
      </Card>
    </div>
  );
}
