import { useState } from 'react';
import { User, Save, Upload } from 'lucide-react';
import { Button } from '../../../../shared/components/Button';
import { Input } from '../../../../shared/components/Input';
import { Card } from '../../../../shared/components/Card';
import { useAuth } from '../../../../context/AuthContext';

export function ProfileSettings() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@campus.edu',
    phone: '+1 (555) 000-0000',
    role: 'System Administrator',
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  return (
    <div className="max-w-4xl space-y-8 pb-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink flex items-center gap-2">
          <User className="w-6 h-6 text-primary" />
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-muted">Update your administrative profile details and public information.</p>
      </div>

      <Card padding="lg">
        <h3 className="text-lg font-semibold text-ink mb-6 border-b border-line pb-4">Personal Information</h3>
        
        <div className="flex flex-col sm:flex-row gap-8 mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-surface border border-line shadow-sm flex items-center justify-center text-3xl font-bold text-muted overflow-hidden relative group">
              {formData.name.charAt(0)}
              <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-colors">
                <Upload className="w-6 h-6 text-white" />
              </div>
            </div>
            <Button variant="secondary" size="sm" className="w-full">Change Avatar</Button>
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Input 
                label="Full Name" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              <Input 
                label="Email Address" 
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input 
                label="Phone Number" 
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input 
                label="Administrative Role" 
                value={formData.role}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-line">
          <Button variant="primary" onClick={handleSave} isLoading={saving} className="gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
}
