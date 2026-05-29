import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  FileText,
  AlertTriangle,
  ChevronDown,
  Check,
  Bell,
  BellOff,
  Sparkles,
} from 'lucide-react';
import { useEvents } from '../context/EventsContext';
import { useToast } from '../context/ToastContext';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Loader } from '../components/Loader';

interface FormData {
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  priority: 'high' | 'medium' | 'low';
  reminder_enabled: boolean;
}

const priorityOptions: { value: 'high' | 'medium' | 'low'; label: string; color: string }[] = [
  { value: 'high', label: 'High', color: 'red' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'low', label: 'Low', color: 'green' },
];

function FloatingLabelInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  icon: Icon,
  min,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  min?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Icon className={`w-5 h-5 transition-colors ${isFocused ? 'text-accent-blue' : 'text-soft-gray'}`} />
        </div>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        min={min}
        required={required}
        className={`input-field ${Icon ? 'pl-12' : ''} peer ${isFocused ? 'border-accent-blue shadow-[0_0_0_3px_rgba(59,130,246,0.2)]' : ''}`}
        placeholder=" "
      />

      <motion.label
        animate={{
          y: hasValue || isFocused ? -24 : 0,
          scale: hasValue || isFocused ? 0.85 : 1,
          x: hasValue || isFocused ? (Icon ? -8 : 0) : (Icon ? 48 : 14),
        }}
        transition={{ duration: 0.2 }}
        className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none origin-left ${
          hasValue || isFocused ? 'text-accent-blue bg-dark-navy px-1' : 'text-soft-gray'
        }`}
      >
        {label}{required && ' *'}
      </motion.label>
    </div>
  );
}

function PriorityDropdown({
  value,
  onChange,
}: {
  value: 'high' | 'medium' | 'low';
  onChange: (value: 'high' | 'medium' | 'low') => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = priorityOptions.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        className={`w-full flex items-center justify-between p-4 rounded-xl bg-black/30 border transition-all ${
          isOpen ? 'border-accent-blue shadow-[0_0_0_3px_rgba(59,130,246,0.2)]' : 'border-glass-border'
        }`}
      >
        <div className="flex items-center gap-3">
          <AlertTriangle className={`w-5 h-5 ${selected?.value === 'high' ? 'text-red-500' : selected?.value === 'medium' ? 'text-yellow-500' : 'text-green-500'}`} />
          <span className="text-pure-white">{selected?.label} Priority</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-soft-gray" />
        </motion.div>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-20"
        >
          {priorityOptions.map((option) => (
            <motion.button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              className={`w-full flex items-center justify-between p-4 transition-colors ${
                value === option.value ? 'bg-glass-white' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  option.value === 'high' ? 'bg-red-500' : option.value === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <span className="text-pure-white">{option.label}</span>
              </div>
              {value === option.value && <Check className="w-5 h-5 text-accent-blue" />}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export function AddEventPage() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    priority: 'medium',
    reminder_enabled: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.event_date || !formData.event_time) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);

    try {
      const success = await addEvent({
        title: formData.title,
        description: formData.description,
        event_date: formData.event_date,
        event_time: formData.event_time,
        priority: formData.priority,
        reminder_enabled: formData.reminder_enabled,
      });

      if (success) {
        showToast('Event created successfully!', 'success');
        navigate('/events');
      } else {
        showToast('Failed to create event. Please try again.', 'error');
      }
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-rich-black">
      <Sidebar />
      <div className="ml-60">
        <Navbar variant="dashboard" />

        <main className="p-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex p-4 rounded-2xl bg-accent-blue/20 mb-4"
              >
                <Sparkles className="w-8 h-8 text-accent-blue" />
              </motion.div>
              <h1 className="text-3xl font-bold text-pure-white mb-2">Create New Event</h1>
              <p className="text-soft-gray">Add a new event to your campus schedule</p>
            </div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 space-y-6"
            >
              {/* Title */}
              <FloatingLabelInput
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                icon={FileText}
              />

              {/* Description */}
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Event description (optional)"
                  className="input-field resize-none"
                />
                <div className="absolute right-3 bottom-3 text-xs text-soft-gray">
                  {formData.description.length}/500
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  label="Date"
                  type="date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  required
                  icon={Calendar}
                  min={getMinDate()}
                />
                <FloatingLabelInput
                  label="Time"
                  type="time"
                  name="event_time"
                  value={formData.event_time}
                  onChange={handleChange}
                  required
                  icon={Clock}
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm text-soft-gray mb-2">Priority Level</label>
                <PriorityDropdown
                  value={formData.priority}
                  onChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                />
              </div>

              {/* Reminder Toggle */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 rounded-xl bg-glass-white border border-glass-border"
              >
                <div className="flex items-center gap-3">
                  {formData.reminder_enabled ? (
                    <Bell className="w-5 h-5 text-accent-blue" />
                  ) : (
                    <BellOff className="w-5 h-5 text-soft-gray" />
                  )}
                  <div>
                    <p className="text-pure-white font-medium">Enable Reminder</p>
                    <p className="text-sm text-soft-gray">
                      {formData.reminder_enabled ? 'You will receive notifications' : 'No notifications for this event'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, reminder_enabled: !prev.reminder_enabled }))}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    formData.reminder_enabled ? 'bg-accent-blue' : 'bg-glass-border'
                  }`}
                >
                  <motion.div
                    animate={{ x: formData.reminder_enabled ? 28 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-5 h-5 bg-white rounded-full absolute top-1"
                  />
                </button>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className="relative w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader size="sm" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Create Event</span>
                  </>
                )}
              </motion.button>

              {/* Preview */}
              {(formData.title || formData.event_date) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-6 border-t border-glass-border"
                >
                  <p className="text-sm text-soft-gray mb-3">Preview</p>
                  <div className="p-4 rounded-xl bg-black/30 border border-glass-border">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-pure-white">{formData.title || 'Event Title'}</h3>
                      <span className={`badge badge-${formData.priority}`}>{formData.priority}</span>
                    </div>
                    {formData.description && (
                      <p className="text-sm text-soft-gray mb-2">{formData.description}</p>
                    )}
                    <div className="flex gap-4 text-xs text-soft-gray">
                      <span>{formData.event_date || 'Date'}</span>
                      <span>{formData.event_time || 'Time'}</span>
                      {formData.reminder_enabled && (
                        <span className="text-accent-blue">Reminder On</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
