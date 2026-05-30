import { useEffect, useState } from 'react';
import { TeacherLayout } from '../../components/layout/TeacherLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { teacherService } from '../../services/campusService';

export default function TeacherStudents() {
  const [students, setStudents] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    teacherService.getStudents().then(({ data }) => setStudents(data)).catch(() => {});
  }, []);

  return (
    <TeacherLayout title="Students">
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Students" description="Roster for your department courses" />
        <DataTable
          data={students}
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'studentId', header: 'Student ID' },
            { key: 'year', header: 'Year' },
          ]}
          emptyMessage="No students in your department yet"
        />
      </div>
    </TeacherLayout>
  );
}
