import { TeacherLayout } from '../../components/layout/TeacherLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';

const schedule = [
  { _id: '1', course: 'CS101', room: 'Hall A', time: 'Mon/Wed 09:00', students: 42 },
  { _id: '2', course: 'CS201', room: 'Lab 3', time: 'Tue/Thu 11:00', students: 38 },
  { _id: '3', course: 'CS301', room: 'Hall B', time: 'Fri 14:00', students: 35 },
];

export default function TeacherClasses() {
  return (
    <TeacherLayout title="My Classes">
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Class schedule" description="Weekly teaching schedule and room assignments" />
        <DataTable
          data={schedule}
          columns={[
            { key: 'course', header: 'Course' },
            { key: 'room', header: 'Room' },
            { key: 'time', header: 'Schedule' },
            { key: 'students', header: 'Students' },
          ]}
        />
        <Card className="mt-4">
          <p className="text-sm text-muted">Attendance for CS101 this week: 94% average</p>
        </Card>
      </div>
    </TeacherLayout>
  );
}
