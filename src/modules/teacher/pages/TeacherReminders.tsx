import { TeacherLayout } from '../layouts/TeacherLayout';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Card } from '../../../shared/components/Card';

const reminders = [
  { title: 'CS301 — Final project due', date: 'Jun 15, 2026', channel: 'In-app + Email' },
  { title: 'Faculty meeting', date: 'Jun 10, 2026', channel: 'In-app' },
];

export default function TeacherReminders() {
  return (
    <TeacherLayout title="Reminders">
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Reminder system" description="Class and meeting reminders for students" />
        <ul className="space-y-2">
          {reminders.map((r) => (
            <li key={r.title}>
              <Card padding="md">
                <p className="font-medium text-ink">{r.title}</p>
                <p className="text-sm text-muted">{r.date} · {r.channel}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </TeacherLayout>
  );
}
