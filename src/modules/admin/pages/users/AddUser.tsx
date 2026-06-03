import { useState } from 'react';
import { PageHeader } from '../../../../shared/components/PageHeader';
import { Button } from '../../../../shared/components/Button';
import { Input } from '../../../../shared/components/Input';
import { adminService } from '../../services/adminService';
import { CheckCircle2 } from 'lucide-react';

export function AddUser() {
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    departmentId: '',
    employeeId: '',
    studentId: '',
    year: '',
    section: '',
    designation: '',
    subjects: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      await adminService.createUser({ ...formData, role });
      setSuccess(true);
      setFormData({
        name: '', email: '', password: '', phone: '', departmentId: '', 
        employeeId: '', studentId: '', year: '', section: '', designation: '', subjects: ''
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-8 max-w-4xl mx-auto">
      <PageHeader 
        title="Add New User" 
        description="Provision new accounts for students, faculty, and administrators." 
      />

      <div className="bg-card border border-line rounded-lg shadow-sm">
        <div className="border-b border-line p-6">
          <div className="flex gap-4">
            {(['student', 'teacher', 'admin'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => { setRole(r); setSuccess(false); }}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                  role === r
                    ? 'bg-primary text-white'
                    : 'bg-surface text-ink hover:bg-line/50 border border-line'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-success/20 rounded-md flex items-center gap-3 text-success">
              <CheckCircle2 className="w-5 h-5" />
              <div>
                <p className="text-sm font-semibold">User created successfully!</p>
                <p className="text-xs opacity-90">They will receive an email with their login credentials.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider border-b border-line pb-2">Basic Details</h3>
                <Input label="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                <Input label="Email Address" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@campus.edu" />
                <Input label="Temporary Password" type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                <Input label="Phone Number" type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" />
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wider border-b border-line pb-2">Role Specifics</h3>
                
                {role !== 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Department</label>
                    <select 
                      className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                      value={formData.departmentId}
                      onChange={e => setFormData({...formData, departmentId: e.target.value})}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="cse">Computer Science</option>
                      <option value="ece">Electronics</option>
                      <option value="mech">Mechanical</option>
                    </select>
                  </div>
                )}

                {role === 'student' && (
                  <>
                    <Input label="Roll / Student ID" required value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} placeholder="STU2026XXX" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Semester" type="number" min="1" max="8" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="1-8" />
                      <Input label="Section" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} placeholder="A, B, C" />
                    </div>
                  </>
                )}

                {role === 'teacher' && (
                  <>
                    <Input label="Employee ID" required value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} placeholder="FAC202X" />
                    <Input label="Designation" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} placeholder="Assistant Professor" />
                    <Input label="Subjects Handled" value={formData.subjects} onChange={e => setFormData({...formData, subjects: e.target.value})} placeholder="Data Structures, Algorithms" />
                  </>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-line flex justify-end gap-3">
              <Button type="button" variant="ghost">Cancel</Button>
              <Button type="submit" variant="primary" isLoading={loading}>Provision Account</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
