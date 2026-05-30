import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';
import { departmentService } from '../../services/campusService';
import { Department } from '../../types';

export default function AdminDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [head, setHead] = useState('');

  const load = () => {
    departmentService.getAll().then(({ data }) => setDepartments(data)).catch(() => {});
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await departmentService.create({ name, code, headOfDepartment: head });
    setName('');
    setCode('');
    setHead('');
    load();
  };

  const handleRemove = async (id: string) => {
    await departmentService.remove(id);
    load();
  };

  return (
    <AdminLayout title="Departments">
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader title="Department management" description="Add, view, and manage academic departments" />

        <Card>
          <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-4">
            <input className="input-field" placeholder="Department name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className="input-field" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} required />
            <input className="input-field" placeholder="Head of department" value={head} onChange={(e) => setHead(e.target.value)} />
            <button type="submit" className="btn-primary">Add department</button>
          </form>
        </Card>

        <DataTable
          data={departments as unknown as Record<string, unknown>[]}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'code', header: 'Code' },
            { key: 'headOfDepartment', header: 'Head' },
            { key: 'facultyCount', header: 'Faculty' },
            { key: 'studentCount', header: 'Students' },
            {
              key: 'actions',
              header: '',
              render: (row) => (
                <button type="button" className="text-sm text-danger" onClick={() => handleRemove(row._id as string)}>
                  Remove
                </button>
              ),
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
}
