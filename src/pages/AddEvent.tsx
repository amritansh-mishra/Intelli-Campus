import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CalendarPlus, Save, X } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';
import { Event } from '../data/dummyData';

export default function AddEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Event>({
    title: '',
    description: '',
    date: '',
    time: '',
    priority: 'Medium',
    reminder: true,
    category: 'Event',
  });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newEvent: Event = { ...formData, id: String(Date.now()) };
    const existing = JSON.parse(localStorage.getItem('events') || '[]') as Event[];
    localStorage.setItem('events', JSON.stringify([...existing, newEvent]));

    setIsSubmitting(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/events');
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <AppLayout title="Add Event">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          title="Add new event"
          description="Create an event and optional voice reminder"
        />

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="label-text">
                Event title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="e.g. CS101 final exam"
              />
            </div>

            <div>
              <label htmlFor="description" className="label-text">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="input-field resize-none"
                placeholder="Add details for this event"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="date" className="label-text">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label htmlFor="time" className="label-text">
                  Time
                </label>
                <input
                  id="time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="category" className="label-text">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Exam">Exam</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Assignment">Assignment</option>
                  <option value="Event">Event</option>
                  <option value="Study">Study</option>
                  <option value="Task">Task</option>
                </select>
              </div>
              <div>
                <span className="label-text">Priority</span>
                <div className="flex gap-2">
                  {(['High', 'Medium', 'Low'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, priority: level }))}
                      className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${
                        formData.priority === level
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-line text-muted hover:border-primary/30'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-line bg-surface p-4">
              <input
                type="checkbox"
                name="reminder"
                checked={formData.reminder}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-line text-primary focus:ring-primary/30"
              />
              <div>
                <p className="text-sm font-medium text-ink">Enable reminder</p>
                <p className="text-sm text-muted">
                  Include in notifications and voice agent queue
                </p>
              </div>
            </label>

            <div className="flex gap-3 border-t border-line pt-6">
              <Link to="/events" className="btn-secondary">
                <X className="h-4 w-4" />
                Cancel
              </Link>
              <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
                {isSubmitting ? (
                  'Saving...'
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create event
                  </>
                )}
              </button>
            </div>
          </form>
        </Card>
      </div>

      {showToast && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-success shadow-card">
          <CalendarPlus className="h-4 w-4" />
          Event created successfully
        </div>
      )}
    </AppLayout>
  );
}
