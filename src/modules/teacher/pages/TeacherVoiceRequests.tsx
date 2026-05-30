import { useState } from 'react';
import { TeacherLayout } from '../layouts/TeacherLayout';
import { PageHeader } from '../../../shared/components/PageHeader';
import { Card } from '../../../shared/components/Card';
import { voiceService } from '../../../shared/services/campusService';

export default function TeacherVoiceRequests() {
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await voiceService.create({
      title,
      recipientName: recipient,
      scheduledAt: new Date(scheduledAt),
      priority: 'Medium',
      status: 'pending',
    });
    setMessage('Voice reminder request submitted for processing.');
    setTitle('');
    setRecipient('');
    setScheduledAt('');
  };

  return (
    <TeacherLayout title="Voice Requests">
      <div className="mx-auto max-w-xl">
        <PageHeader title="AI voice reminder requests" description="Schedule outbound calls for your class" />
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="input-field" placeholder="Reminder title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input className="input-field" placeholder="Student / group name" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
            <input type="datetime-local" className="input-field" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} required />
            <button type="submit" className="btn-primary w-full">Submit request</button>
          </form>
          {message && <p className="mt-3 text-sm text-success">{message}</p>}
        </Card>
      </div>
    </TeacherLayout>
  );
}
