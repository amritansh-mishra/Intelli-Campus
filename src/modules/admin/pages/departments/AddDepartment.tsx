import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Save } from 'lucide-react';
import { PageHeader } from '../../../../shared/components/PageHeader';
import { Card } from '../../../../shared/components/Card';
import { Input } from '../../../../shared/components/Input';
import { Button } from '../../../../shared/components/Button';
import { departmentService } from '../../../../shared/services/campusService';

export function AddDepartment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    headOfDepartment: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await departmentService.create(formData);
      navigate('/admin/departments');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-8 h-full max-w-4xl">
      <PageHeader 
        title="Create Department" 
        description="Provision a new academic department or administrative branch." 
      />
      
      <Card padding="lg">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-ink mb-6 flex items-center gap-2 border-b border-line pb-4">
              <Building2 className="w-5 h-5 text-primary" />
              Department Details
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <Input 
                label="Department Name" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                required 
                placeholder="e.g. Computer Science and Engineering"
              />
              <Input 
                label="Department Code" 
                value={formData.code} 
                onChange={(e) => setFormData({ ...formData, code: e.target.value })} 
                required 
                placeholder="e.g. CSE"
              />
              <Input 
                label="Head of Department (HOD)" 
                value={formData.headOfDepartment} 
                onChange={(e) => setFormData({ ...formData, headOfDepartment: e.target.value })} 
                placeholder="e.g. Dr. Alan Turing"
              />
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-ink mb-1.5">Description (Optional)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe the focus of this department..."
                rows={4}
                className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-line">
            <Button variant="ghost" type="button" onClick={() => navigate('/admin/departments')}>Cancel</Button>
            <Button variant="primary" type="submit" isLoading={loading} className="gap-2">
              <Save className="w-4 h-4" /> Save Department
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
