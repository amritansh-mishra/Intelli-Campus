import { StudentLayout } from '../../components/layout/StudentLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';

const clubs = [
  { name: 'Computer Science Society', members: 120, meeting: 'Wed 5:00 PM' },
  { name: 'Robotics Club', members: 45, meeting: 'Fri 4:00 PM' },
  { name: 'Debate Union', members: 60, meeting: 'Tue 6:00 PM' },
];

export default function StudentClubs() {
  return (
    <StudentLayout title="Clubs">
      <div className="mx-auto max-w-4xl">
        <PageHeader title="Club activities" description="Join and manage extracurricular activities" />
        <div className="grid gap-4 sm:grid-cols-2">
          {clubs.map((c) => (
            <Card key={c.name} hover>
              <p className="font-semibold text-ink">{c.name}</p>
              <p className="text-sm text-muted">{c.members} members · {c.meeting}</p>
              <button type="button" className="btn-secondary mt-4 text-sm">
                Join club
              </button>
            </Card>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
