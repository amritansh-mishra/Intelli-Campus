import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Calendar as CalendarIcon, MoreVertical, Edit2, Trash2, Bell } from 'lucide-react';
import { format } from 'date-fns';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Table, Column } from '../../../shared/components/Table';
import { Modal } from '../../../shared/components/Modal';
import { Button } from '../../../shared/components/Button';
import { Input } from '../../../shared/components/Input';
import { Badge, priorityToBadge } from '../../../shared/components/Badge';
import { eventService } from '../../../shared/services/campusService';
import { CampusEvent } from '../../../types';

export default function AdminEvents() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '09:00',
    priority: 'Medium',
    category: 'Academic',
    reminderEnabled: true,
  });

  const load = () => {
    setIsLoading(true);
    eventService.getAll()
      .then(({ data }) => setEvents(data))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await eventService.create({
      ...form,
      date: new Date(form.date),
      scope: 'campus',
    });
    setIsModalOpen(false);
    setForm({ title: '', description: '', date: '', time: '09:00', priority: 'Medium', category: 'Academic', reminderEnabled: true });
    load();
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(search.toLowerCase()) || 
    (e.description && e.description.toLowerCase().includes(search.toLowerCase()))
  );

  const columns: Column<CampusEvent>[] = [
    {
      key: 'title',
      header: 'Event Details',
      render: (row) => (
        <div>
          <p className="font-medium text-ink">{row.title}</p>
          <p className="text-sm text-muted line-clamp-1 w-64">{row.description}</p>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Schedule',
      render: (row) => (
        <div className="flex items-center gap-2 text-sm text-ink">
          <CalendarIcon className="w-4 h-4 text-muted" />
          {format(new Date(row.date), 'MMM d, yyyy')} • {row.time}
        </div>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (row) => <Badge variant={priorityToBadge(row.priority)}>{row.priority}</Badge>,
    },
    {
      key: 'reminderEnabled',
      header: 'Voice AI Reminder',
      render: (row) => (
        <div className="flex items-center gap-1">
          {row.reminderEnabled ? (
            <Badge variant="primary"><Bell className="w-3 h-3 mr-1 inline" /> Scheduled</Badge>
          ) : (
            <Badge variant="secondary">None</Badge>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: () => (
        <div className="flex items-center justify-end gap-2">
          <button className="p-1.5 text-muted hover:text-ink hover:bg-surface rounded transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-muted hover:text-danger hover:bg-red-50 rounded transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-muted hover:text-ink hover:bg-surface rounded transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 pb-8">
      <PageHeader 
        title="Event Management" 
        description="Schedule campus events and automated voice AI reminders."
        action={
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" /> New Event
          </Button>
        }
      />

      <div className="bg-card border border-line rounded-lg shadow-sm mb-6 p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-line rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow"
          />
        </div>
        <Button variant="secondary" className="gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      <Table 
        columns={columns} 
        data={filteredEvents} 
        isLoading={isLoading} 
        emptyMessage="No campus events found." 
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Event"
        maxWidth="lg"
      >
        <form onSubmit={handleCreate} className="space-y-5">
          <Input 
            label="Event Title" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            required 
            placeholder="e.g. Annual Tech Symposium"
          />
          
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Description</label>
            <textarea
              className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
              rows={3}
              placeholder="Briefly describe the event..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Date" 
              type="date" 
              value={form.date} 
              onChange={(e) => setForm({ ...form, date: e.target.value })} 
              required 
            />
            <Input 
              label="Time" 
              type="time" 
              value={form.time} 
              onChange={(e) => setForm({ ...form, time: e.target.value })} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Priority</label>
              <select 
                className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Category</label>
              <select 
                className="w-full rounded-md border border-line bg-card px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="Academic">Academic</option>
                <option value="Placement">Placement</option>
                <option value="Cultural">Cultural</option>
                <option value="Club">Club</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="reminderEnabled"
                checked={form.reminderEnabled}
                onChange={(e) => setForm({ ...form, reminderEnabled: e.target.checked })}
                className="rounded border-line text-primary focus:ring-primary"
              />
              <label htmlFor="reminderEnabled" className="text-sm font-medium text-ink">
                Schedule automated AI Voice Reminder
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-line">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Event
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
