import { motion } from 'framer-motion';
import { X, Bell, AlertCircle, Info } from 'lucide-react';
import { dummyNotifications } from '../data/dummyData';

interface NotificationPanelProps {
  onClose: () => void;
}

export default function NotificationPanel({ onClose }: NotificationPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-yellow-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="absolute right-0 top-14 w-80 glass-card border border-white/10 rounded-xl shadow-xl overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="font-semibold text-white">Notifications</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {dummyNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            className={`p-4 border-b border-white/5 cursor-pointer ${
              !notification.read ? 'bg-blue-500/5' : ''
            }`}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">
                    {notification.title}
                  </h4>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-3 text-center border-t border-white/10">
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View all notifications
        </button>
      </div>
    </motion.div>
  );
}
