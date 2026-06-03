import { useState } from 'react';
import { Palette, Save, Moon, Sun, Monitor, LayoutTemplate } from 'lucide-react';
import { Button } from '../../../../shared/components/Button';
import { Card } from '../../../../shared/components/Card';
import { ToggleSwitch } from '../../../../shared/components/ToggleSwitch';

export function AppearanceSettings() {
  const [saving, setSaving] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [theme, setTheme] = useState('system');
  const [density, setDensity] = useState('comfortable');
  const [accent, setAccent] = useState('blue');

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  const accents = [
    { id: 'blue', color: 'bg-blue-600', name: 'Enterprise Blue' },
    { id: 'indigo', color: 'bg-indigo-600', name: 'Deep Indigo' },
    { id: 'emerald', color: 'bg-emerald-600', name: 'Success Emerald' },
    { id: 'slate', color: 'bg-slate-800', name: 'Corporate Slate' },
  ];

  return (
    <div className="max-w-4xl space-y-8 pb-8 h-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink flex items-center gap-2">
          <Palette className="w-6 h-6 text-primary" />
          Appearance Settings
        </h1>
        <p className="mt-1 text-sm text-muted">Customize the look and feel of the Admin Portal.</p>
      </div>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 border-b border-line pb-4">Theme Preferences</h3>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { id: 'light', icon: Sun, label: 'Light Mode' },
            { id: 'dark', icon: Moon, label: 'Dark Mode' },
            { id: 'system', icon: Monitor, label: 'System Default' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
                theme === t.id ? 'border-primary bg-primary/5 text-primary' : 'border-line hover:border-primary/50 text-muted'
              }`}
            >
              <t.icon className="w-8 h-8 mb-3" />
              <span className="text-sm font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 border-b border-line pb-4">UI Density & Color</h3>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-ink mb-4">Table Density</label>
          <div className="flex gap-4">
            {[
              { id: 'comfortable', icon: LayoutTemplate, label: 'Comfortable', desc: 'More padding, easier to read' },
              { id: 'compact', icon: LayoutTemplate, label: 'Compact', desc: 'Less padding, more data visible' },
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setDensity(d.id)}
                className={`flex-1 flex items-start gap-3 p-4 rounded-lg border text-left transition-all ${
                  density === d.id ? 'border-primary bg-primary/5' : 'border-line hover:border-primary/50'
                }`}
              >
                <d.icon className={`w-5 h-5 shrink-0 ${density === d.id ? 'text-primary' : 'text-muted'}`} />
                <div>
                  <p className={`text-sm font-medium ${density === d.id ? 'text-primary' : 'text-ink'}`}>{d.label}</p>
                  <p className="text-xs text-muted mt-1">{d.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-4">Brand Accent Color</label>
          <div className="flex gap-4">
            {accents.map(c => (
              <button
                key={c.id}
                onClick={() => setAccent(c.id)}
                className={`group flex flex-col items-center gap-2`}
              >
                <div className={`w-12 h-12 rounded-full ${c.color} flex items-center justify-center shadow-sm transition-transform ${accent === c.id ? 'ring-4 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'}`}>
                  {accent === c.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-xs font-medium text-muted group-hover:text-ink transition-colors">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 border-b border-line pb-4">Accessibility</h3>
        <div className="flex items-start justify-between">
          <div className="max-w-xl">
            <p className="font-semibold text-sm text-ink mb-1">Reduce UI Animations</p>
            <p className="text-sm text-muted">Disables non-essential motion and transitions across the dashboard for better performance and accessibility.</p>
          </div>
          <ToggleSwitch checked={!animations} onChange={(v) => setAnimations(!v)} />
        </div>
      </Card>

      <div className="flex justify-end pt-4 border-t border-line">
        <Button variant="primary" onClick={handleSave} isLoading={saving} className="gap-2">
          <Save className="w-4 h-4" /> Save Preferences
        </Button>
      </div>
    </div>
  );
}
