import { motion } from 'framer-motion';
import { Calendar, Bell, Search, Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'calendar' | 'bell' | 'search' | 'inbox';
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

const icons = {
  calendar: Calendar,
  bell: Bell,
  search: Search,
  inbox: Inbox,
};

export function EmptyState({ title, description, icon = 'inbox', action }: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6 p-6 rounded-full bg-glass-white"
      >
        <Icon className="w-16 h-16 text-pure-white/40" />
      </motion.div>

      <h3 className="text-xl font-semibold text-pure-white mb-2">{title}</h3>
      <p className="text-soft-gray text-center max-w-md mb-6">{description}</p>

      {action && (
        action.href ? (
          <Link to={action.href} className="btn-primary inline-flex items-center gap-2">
            {action.label}
          </Link>
        ) : (
          <button onClick={action.onClick} className="btn-primary inline-flex items-center gap-2">
            {action.label}
          </button>
        )
      )}
    </motion.div>
  );
}
