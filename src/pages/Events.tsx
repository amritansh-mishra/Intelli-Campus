import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Plus,
  CalendarX,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import { SkeletonCard } from '../components/Loader';
import { dummyEvents, Event } from '../data/dummyData';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const allEvents = [...dummyEvents, ...storedEvents];

    setTimeout(() => {
      setEvents(allEvents);
      setLoading(false);
    }, 800);
  }, []);

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilter === 'all' || event.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const handleDelete = (id: string) => {
    const storedEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const updatedEvents = storedEvents.filter((e: Event) => e.id !== id);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    setEvents(events.filter((e) => e.id !== id));
  };

  const priorityCounts = {
    all: events.length,
    High: events.filter((e) => e.priority === 'High').length,
    Medium: events.filter((e) => e.priority === 'Medium').length,
    Low: events.filter((e) => e.priority === 'Low').length,
  };

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Sidebar />
      <Navbar showSearch onSearch={setSearchQuery} />

      <main className="lg:ml-60 pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                All Events
              </h1>
              <p className="text-gray-400">
                Manage and view all your campus events
              </p>
            </div>

            <Link
              to="/add-event"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium btn-glow"
            >
              <Plus className="w-5 h-5" />
              Add Event
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-4 mb-6"
          >
            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-white/20 transition-all"
              >
                <Filter className="w-4 h-4" />
                Filters
              </motion.button>

              <div className="flex items-center gap-2">
                {(['all', 'High', 'Medium', 'Low'] as const).map((priority) => (
                  <motion.button
                    key={priority}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPriorityFilter(priority)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      priorityFilter === priority
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-white/5 text-gray-400 border border-transparent hover:border-white/10'
                    }`}
                  >
                    {priority === 'all' ? 'All' : priority}
                    <span className="ml-2 text-xs opacity-60">
                      ({priorityCounts[priority]})
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort:</span>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:border-white/20 transition-all"
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className="w-4 h-4" />
                  ) : (
                    <SortDesc className="w-4 h-4" />
                  )}
                  Date
                </motion.button>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 rounded-full bg-white/5 mx-auto mb-6 flex items-center justify-center">
                <CalendarX className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No events found
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery
                  ? 'Try adjusting your search or filters'
                  : 'Create your first event to get started'}
              </p>
              <Link
                to="/add-event"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 text-blue-400 rounded-xl font-medium hover:bg-blue-500/30 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Event
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <EventCard event={event} onDelete={handleDelete} />
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredEvents.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-500">
                Showing {filteredEvents.length} of {events.length} events
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
