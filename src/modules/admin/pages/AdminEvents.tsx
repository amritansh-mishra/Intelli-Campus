import { useEffect, useState } from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Card } from '../../../shared/components/Card';
import { DataTable } from '../../../shared/components/DataTable';
import { Badge, priorityToBadge } from '../../../shared/components/Badge';
import { eventService } from '../../../shared/services/campusService';
import { CampusEvent } from '../../../types';

export default function AdminEvents() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '09:00',
    priority: 'Medium',
  });

  const load = () => eventService.getAll().then(({ data }) => setEvents(data)).catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await eventService.create({
      ...form,
      date: new Date(form.date),
      scope: 'campus',
      reminderEnabled: true,
    });
    setForm({ title: '', description: '', date: '', time: '09:00', priority: 'Medium' });
    load();
  };

  return (
    <AdminLayout title="Events">
      <div className="mx-auto max-w-5xl space-y-6">
        <PageHeader title="Campus events" description="Create and broadcast campus-wide events" />

        <Card>
          <form onSubmit={handleCreate} className="grid gap-3 sm:grid-cols-2">
            <input className="input-field sm:col-span-2" placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <input className="input-field sm:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input type="date" className="input-field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            <input type="time" className="input-field" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
            <button type="submit" className="btn-primary sm:col-span-2">Create event</button>
          </form>
        </Card>

        <DataTable
          data={events as unknown as Record<string, unknown>[]}
          columns={[
            { key: 'title', header: 'Event' },
            { key: 'date', header: 'Date', render: (r) => new Date(r.date as string).toLocaleDateString() },
            { key: 'time', header: 'Time' },
            {
              key: 'priority',
              header: 'Priority',
              render: (r) => <Badge variant={priorityToBadge(r.priority as string)}>{r.priority as string}</Badge>,
            },
          ]}
        />
      </div>
    </AdminLayout>
  );
}
