import { useState } from 'react';
import { Settings, Save, Clock, Calendar, Database } from 'lucide-react';
import { Button } from '../../../../shared/components/Button';
import { Card } from '../../../../shared/components/Card';
import { ToggleSwitch } from '../../../../shared/components/ToggleSwitch';

export function SystemPreferences() {
  const [saving, setSaving] = useState(false);
  const [cache, setCache] = useState(true);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          System Preferences
        </h1>
        <p className="mt-1 text-sm text-muted">Configure regional settings, date formats, and core system behaviors.</p>
      </div>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2 border-b border-line pb-4">
          <Clock className="w-5 h-5 text-muted" />
          Time & Region
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">System Timezone</label>
            <select className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
              <option value="Asia/Kolkata">India Standard Time (IST)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">Greenwich Mean Time (GMT)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Date Format</label>
            <select className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
              <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 25/12/2024)</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 12/25/2024)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2024-12-25)</option>
            </select>
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2 border-b border-line pb-4">
          <Calendar className="w-5 h-5 text-muted" />
          Default Event Settings
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Default Event Priority</label>
            <select className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Default Event Category</label>
            <select className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow">
              <option value="Academic">Academic</option>
              <option value="Cultural">Cultural</option>
              <option value="Club">Club</option>
            </select>
          </div>
        </div>
      </Card>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2 border-b border-line pb-4">
          <Database className="w-5 h-5 text-muted" />
          Advanced
        </h3>
        <div className="flex items-start justify-between mb-6">
          <div className="max-w-xl">
            <p className="font-semibold text-sm text-ink mb-1">Enable Query Caching</p>
            <p className="text-sm text-muted">Caches frequently accessed dashboard analytics to improve load times.</p>
          </div>
          <ToggleSwitch checked={cache} onChange={setCache} />
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
