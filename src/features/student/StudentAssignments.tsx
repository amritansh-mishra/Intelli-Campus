import { StudentLayout } from '../../components/layout/StudentLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';

const assignments = [
  { _id: '1', title: 'Research paper', course: 'CS301', due: 'Jun 15, 2026', status: 'In progress' },
  { _id: '2', title: 'Lab report #4', course: 'CS201', due: 'Jun 8, 2026', status: 'Submitted' },
];

export default function StudentAssignments() {
  return (
    <StudentLayout title="Assignments">
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Assignments" description="Deadlines and submission status" />
        <DataTable
          data={assignments}
          columns={[
            { key: 'title', header: 'Assignment' },
            { key: 'course', header: 'Course' },
            { key: 'due', header: 'Due' },
            {
              key: 'status',
              header: 'Status',
              render: (r) => (
                <Badge variant={r.status === 'Submitted' ? 'success' : 'warning'}>
                  {r.status as string}
                </Badge>
              ),
            },
          ]}
        />
      </div>
    </StudentLayout>
  );
}
