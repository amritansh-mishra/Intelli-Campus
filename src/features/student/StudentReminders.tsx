import { StudentLayout } from '../../components/layout/StudentLayout';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';

export default function StudentReminders() {
  return (
    <StudentLayout title="Reminders">
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Smart reminders" description="Customize how you receive alerts" />
        <Card className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm text-ink">Push notifications</span>
            <input type="checkbox" defaultChecked className="h-4 w-4 text-primary" />
          </label>
          <label className="flex items-center justify-between border-t border-line pt-3">
            <span className="text-sm text-ink">AI voice calls</span>
            <input type="checkbox" defaultChecked className="h-4 w-4 text-primary" />
          </label>
          <label className="flex items-center justify-between border-t border-line pt-3">
            <span className="text-sm text-ink">Email summaries</span>
            <input type="checkbox" className="h-4 w-4 text-primary" />
          </label>
        </Card>
      </div>
    </StudentLayout>
  );
}
