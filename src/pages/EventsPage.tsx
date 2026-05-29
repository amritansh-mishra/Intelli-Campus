import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  LayoutGrid,
  List,
  Plus,
  ChevronDown,
  Check,
  X,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useEvents } from '../context/EventsContext';
import { useToast } from '../context/ToastContext';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { EventCard } from '../components/EventCard';
import { EmptyState } from '../components/EmptyState';
import { SkeletonGrid } from '../components/Loader';
import { Event } from '../services/supabase';
import { format, parseISO, isPast, isToday, isFuture } from 'date-fns';

type SortOption = 'date-asc' | 'date-desc' | 'priority' | 'title';
type FilterPriority = 'all' | 'high' | 'medium' | 'low';
type ViewMode = 'grid' | 'list';

function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-gray" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search events..."
        className="input-field pl-12 w-full"
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-glass-hover transition-colors"
        >
          <X className="w-4 h-4 text-soft-gray" />
        </motion.button>
      )}
    </div>
  );
}

function FilterDropdown({
  value,
  onChange,
}: {
  value: FilterPriority;
  onChange: (value: FilterPriority) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'all' as const, label: 'All Priorities' },
    { value: 'high' as const, label: 'High', color: 'bg-red-500' },
    { value: 'medium' as const, label: 'Medium', color: 'bg-yellow-500' },
    { value: 'low' as const, label: 'Low', color: 'bg-green-500' },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-glass-white border border-glass-border hover:bg-glass-hover transition-colors"
      >
        <Filter className="w-4 h-4 text-soft-gray" />
        <span className="text-pure-white text-sm">{
          value === 'all' ? 'All' : value.charAt(0).toUpperCase() + value.slice(1)
        }</span>
        <ChevronDown className="w-4 h-4 text-soft-gray" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-48 glass-card overflow-hidden z-20"
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                className={`w-full flex items-center justify-between px-4 py-3 ${
                  value === option.value ? 'bg-glass-white' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  {option.color && <div className={`w-2 h-2 rounded-full ${option.color}`} />}
                  <span className="text-pure-white text-sm">{option.label}</span>
                </div>
                {value === option.value && <Check className="w-4 h-4 text-accent-blue" />}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'date-asc' as const, label: 'Date (Earliest)', icon: SortAsc },
    { value: 'date-desc' as const, label: 'Date (Latest)', icon: SortDesc },
    { value: 'priority' as const, label: 'Priority', icon: AlertTriangle },
    { value: 'title' as const, label: 'Title (A-Z)', icon: SortAsc },
  ];

  const selected = options.find((opt) => opt.value === value);
  const SelectedIcon = selected?.icon;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-glass-white border border-glass-border hover:bg-glass-hover transition-colors"
      >
        {SelectedIcon && <SelectedIcon className="w-4 h-4 text-soft-gray" />}
        <span className="text-pure-white text-sm hidden sm:inline">{selected?.label}</span>
        <ChevronDown className="w-4 h-4 text-soft-gray" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-48 glass-card overflow-hidden z-20"
          >
            {options.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                className={`w-full flex items-center justify-between px-4 py-3 ${
                  value === option.value ? 'bg-glass-white' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <option.icon className="w-4 h-4 text-soft-gray" />
                  <span className="text-pure-white text-sm">{option.label}</span>
                </div>
                {value === option.value && <Check className="w-4 h-4 text-accent-blue" />}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ViewModeToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-glass-white border border-glass-border">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange('grid')}
        className={`p-2 rounded-md transition-colors ${
          value === 'grid' ? 'bg-accent-blue text-white' : 'text-soft-gray hover:text-pure-white'
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange('list')}
        className={`p-2 rounded-md transition-colors ${
          value === 'list' ? 'bg-accent-blue text-white' : 'text-soft-gray hover:text-pure-white'
        }`}
      >
        <List className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  eventName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventName: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <Trash2 className="w-6 h-6" />
              <h3 className="text-xl font-semibold text-pure-white">Delete Event</h3>
            </div>
            <p className="text-soft-gray mb-6">
              Are you sure you want to delete "<span className="text-pure-white">{eventName}</span>"?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function EventsPage() {
  const { events, loading, deleteEvent } = useEvents();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = [...events];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query)
      );
    }

    // Priority filter
    if (filterPriority !== 'all') {
      filtered = filtered.filter((event) => event.priority === filterPriority);
    }

    // Sort
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'date-asc': {
          const dateA = new Date(`${a.event_date}T${a.event_time}`);
          const dateB = new Date(`${b.event_date}T${b.event_time}`);
          return dateA.getTime() - dateB.getTime();
        }
        case 'date-desc': {
          const dateA = new Date(`${a.event_date}T${a.event_time}`);
          const dateB = new Date(`${b.event_date}T${b.event_time}`);
          return dateB.getTime() - dateA.getTime();
        }
        case 'priority':
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchQuery, filterPriority, sortOption]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const success = await deleteEvent(deleteTarget.id);
    if (success) {
      showToast('Event deleted successfully', 'success');
    } else {
      showToast('Failed to delete event', 'error');
    }
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-rich-black">
      <Sidebar />
      <div className="ml-60">
        <Navbar events={events} variant="dashboard" />

        <main className="p-6 sm:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-pure-white mb-1">Events</h1>
              <p className="text-soft-gray">
                {loading ? 'Loading...' : `${filteredAndSortedEvents.length} events found`}
              </p>
            </div>

            <Link to="/add-event">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Event</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <FilterDropdown value={filterPriority} onChange={setFilterPriority} />
                <SortDropdown value={sortOption} onChange={setSortOption} />
                <ViewModeToggle value={viewMode} onChange={setViewMode} />
              </div>
            </div>
          </motion.div>

          {/* Events Grid/List */}
          {loading ? (
            <SkeletonGrid count={6} />
          ) : filteredAndSortedEvents.length === 0 ? (
            <EmptyState
              title={searchQuery ? 'No events found' : 'No events yet'}
              description={
                searchQuery
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first event to get started'
              }
              icon="calendar"
              action={{
                label: 'Add Event',
                href: '/add-event',
              }}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredAndSortedEvents.map((event, index) => (
                <EventCard
                  key={event.id}
                  event={event}
                  delay={index * 0.05}
                  onDelete={() => setDeleteTarget(event)}
                />
              ))}
            </motion.div>
          )}
        </main>
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        eventName={deleteTarget?.title || ''}
      />
    </div>
  );
}
