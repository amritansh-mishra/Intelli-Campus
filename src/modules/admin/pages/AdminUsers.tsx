import { useEffect, useState } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { PageHeader } from '../../../shared/components/PageHeader';
import { DataTable } from '../../../shared/components/DataTable';
import { adminService } from '../services/adminService';
import { Badge } from '../../../shared/components/Badge';

interface UserRow {
  _id: string;
  name: string;
  email: string;
  employeeId?: string;
  studentId?: string;
  year?: number;
  isActive: boolean;
}

export function AdminUsers({ role, title }: { role: 'teacher' | 'student'; title: string }) {
  const [users, setUsers] = useState<UserRow[]>([]);

  useEffect(() => {
    adminService.getUsers(role).then(({ data }) => setUsers(data)).catch(() => {});
  }, [role]);

  return (
    <AdminLayout title={title}>
      <div className="mx-auto max-w-5xl">
        <PageHeader title={title} description={`Manage ${role} accounts and access`} />
        <DataTable
          data={users as unknown as Record<string, unknown>[]}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            {
              key: 'id',
              header: role === 'teacher' ? 'Employee ID' : 'Student ID',
              render: (row) =>
                role === 'teacher' ? (row.employeeId as string) || '—' : (row.studentId as string) || '—',
            },
            {
              key: 'status',
              header: 'Status',
              render: (row) => (
                <Badge variant={row.isActive ? 'success' : 'danger'}>
                  {row.isActive ? 'Active' : 'Inactive'}
                </Badge>
              ),
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
}

export function AdminTeachers() {
  return <AdminUsers role="teacher" title="Teachers" />;
}

export function AdminStudents() {
  return <AdminUsers role="student" title="Students" />;
}
