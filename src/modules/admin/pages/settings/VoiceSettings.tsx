import { useState } from 'react';
import { Mic, Phone, Save, Volume2 } from 'lucide-react';
import { Button } from '../../../../shared/components/Button';
import { Input } from '../../../../shared/components/Input';
import { Card } from '../../../../shared/components/Card';
import { ToggleSwitch } from '../../../../shared/components/ToggleSwitch';

export function VoiceSettings() {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink flex items-center gap-2">
          <Mic className="w-6 h-6 text-primary" />
          AI Voice Configuration
        </h1>
        <p className="mt-1 text-sm text-muted">Manage Twilio integration, voice models, and outbound templates.</p>
      </div>

      <div className="flex items-center justify-between p-5 bg-card border border-line rounded-lg shadow-sm">
        <div>
          <h3 className="font-semibold text-ink text-sm">Enable AI Voice Agent</h3>
          <p className="text-sm text-muted mt-1">Allow the system to make automated outbound calls for events and emergencies.</p>
        </div>
        <ToggleSwitch checked={voiceEnabled} onChange={setVoiceEnabled} size="lg" />
      </div>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2">
          <Phone className="w-5 h-5 text-muted" />
          Twilio API Integration
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 mb-6">
          <Input label="Account SID" placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" defaultValue="AC48a9b2c3d4e5f6g7h8i9j0k1l2m3n4o5" />
          <Input label="Auth Token" type="password" placeholder="Enter Twilio Auth Token" defaultValue="••••••••••••••••••••••••••••••••" />
          <Input label="Outbound Caller ID (Phone Number)" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
          <Input label="Webhook URL" placeholder="https://api.yourcampus.edu/voice/webhook" defaultValue="https://api.intellicampus.edu/voice/webhook" disabled />
        </div>
        <div className="flex justify-end pt-4 border-t border-line">
          <Button variant="secondary" className="mr-3">Test Connection</Button>
          <Button variant="primary" onClick={handleSave} isLoading={saving} className="gap-2">
            <Save className="w-4 h-4" /> Save Configuration
          </Button>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-muted" />
          AI Voice Model & Parameters
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 mb-6">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Voice Persona</label>
            <select className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
              <option value="alloy">Alloy (Neutral, professional)</option>
              <option value="echo">Echo (Male, authoritative)</option>
              <option value="nova">Nova (Female, energetic)</option>
              <option value="shimmer">Shimmer (Female, warm)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Language & Accent</label>
            <select className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
              <option value="en-US">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="en-IN">English (India)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Speaking Rate</label>
            <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full mt-2 accent-primary" />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>Slow</span>
              <span>Normal (1.0x)</span>
              <span>Fast</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Default Reminder Timing</label>
            <select className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
              <option value="24">24 Hours before event</option>
              <option value="12">12 Hours before event</option>
              <option value="2">2 Hours before event</option>
            </select>
          </div>
        </div>
        <div className="pt-4 border-t border-line">
          <label className="block text-sm font-medium text-ink mb-1.5">Standard Voice Template Example</label>
          <div className="p-4 bg-surface rounded-md border border-line">
            <p className="text-sm font-medium text-ink/80 italic">
              "Hello [Name], this is an automated reminder from Intelli Campus. Your [Event Type], [Event Name], is scheduled for [Date] at [Time]. Please be present on time. Thank you."
            </p>
          </div>
        </div>
        <div className="flex justify-end pt-6">
          <Button variant="primary" onClick={handleSave} isLoading={saving} className="gap-2">
            <Save className="w-4 h-4" /> Save Voice Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
}
