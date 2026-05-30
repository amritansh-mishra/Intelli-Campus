import { Card, CardHeader } from '../ui/Card';

export interface VoiceConfigState {
  voiceType: string;
  language: string;
  reminderTone: string;
  aiCallsEnabled: boolean;
}

interface VoiceConfigurationProps {
  config: VoiceConfigState;
  onChange: (config: VoiceConfigState) => void;
}

export function VoiceConfiguration({ config, onChange }: VoiceConfigurationProps) {
  const update = (patch: Partial<VoiceConfigState>) => {
    onChange({ ...config, ...patch });
  };

  return (
    <Card>
      <CardHeader
        title="Voice configuration"
        description="Customize how the AI agent delivers reminders"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Voice type">
          <select
            className="input-field"
            value={config.voiceType}
            onChange={(e) => update({ voiceType: e.target.value })}
          >
            <option>Professional Female</option>
            <option>Professional Male</option>
            <option>Neutral</option>
          </select>
        </Field>
        <Field label="Language">
          <select
            className="input-field"
            value={config.language}
            onChange={(e) => update({ language: e.target.value })}
          >
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </Field>
        <Field label="Reminder tone">
          <select
            className="input-field"
            value={config.reminderTone}
            onChange={(e) => update({ reminderTone: e.target.value })}
          >
            <option>Friendly</option>
            <option>Formal</option>
            <option>Concise</option>
          </select>
        </Field>
        <Field label="AI outbound calls">
          <label className="flex cursor-pointer items-center justify-between rounded-md border border-line bg-surface px-3 py-2.5">
            <span className="text-sm text-ink">Enable automated voice calls</span>
            <input
              type="checkbox"
              checked={config.aiCallsEnabled}
              onChange={(e) => update({ aiCallsEnabled: e.target.checked })}
              className="h-4 w-4 rounded border-line text-primary focus:ring-primary/30"
            />
          </label>
        </Field>
      </div>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label-text">{label}</label>
      {children}
    </div>
  );
}
