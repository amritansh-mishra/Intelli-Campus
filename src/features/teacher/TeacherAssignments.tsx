import { TeacherLayout } from '../../components/layout/TeacherLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';

const assignments = [
  { _id: '1', title: 'Research paper', course: 'CS301', due: 'Jun 12, 2026', submitted: 28, total: 35 },
  { _id: '2', title: 'Lab report #4', course: 'CS201', due: 'Jun 8, 2026', submitted: 35, total: 38 },
];

export default function TeacherAssignments() {
  return (
    <TeacherLayout title="Assignments">
      <div className="mx-auto max-w-5xl">
        <PageHeader title="Assignment management" description="Track submissions and deadlines" />
        <DataTable
          data={assignments}
          columns={[
            { key: 'title', header: 'Assignment' },
            { key: 'course', header: 'Course' },
            { key: 'due', header: 'Due date' },
            {
              key: 'progress',
              header: 'Submissions',
              render: (r) => (
                <Badge variant="neutral">
                  {r.submitted as number}/{r.total as number}
                </Badge>
              ),
            },
          ]}
        />
      </div>
    </TeacherLayout>
  );
}
