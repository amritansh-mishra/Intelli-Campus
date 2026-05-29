import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Moon,
  Sun,
  Bell,
  User,
  Lock,
  Globe,
  Palette,
  Volume2,
  Smartphone,
  Mail,
  Shield,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { useToast } from '../context/ToastContext';

interface SettingItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  type: 'toggle' | 'link' | 'select';
  value?: boolean;
}

function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-14 h-7 rounded-full transition-colors ${
        enabled ? 'bg-accent-blue' : 'bg-glass-border'
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 28 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-5 h-5 bg-white rounded-full absolute top-1"
      />
    </button>
  );
}

function SettingRow({
  item,
  onChange,
}: {
  item: SettingItem;
  onChange: (id: string, value: boolean) => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01, x: 4 }}
      className="flex items-center justify-between p-4 rounded-xl bg-glass-white hover:bg-glass-hover transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-accent-blue/10">
          <item.icon className="w-5 h-5 text-accent-blue" />
        </div>
        <div>
          <p className="font-medium text-pure-white">{item.title}</p>
          <p className="text-sm text-soft-gray">{item.description}</p>
        </div>
      </div>

      {item.type === 'toggle' ? (
        <ToggleSwitch enabled={item.value || false} onChange={(v) => onChange(item.id, v)} />
      ) : (
        <ChevronRight className="w-5 h-5 text-soft-gray" />
      )}
    </motion.div>
  );
}

export function SettingsPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    emailAlerts: true,
    voiceReminders: true,
    soundEffects: true,
    mobileSync: true,
    twoFactor: false,
  });

  const handleChange = (id: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: value }));
    showToast(`Setting ${value ? 'enabled' : 'disabled'}`, 'success');
  };

  const settingGroups = [
    {
      title: 'Appearance',
      items: [
        {
          id: 'darkMode',
          icon: Moon,
          title: 'Dark Mode',
          description: 'Enable dark theme across the app',
          type: 'toggle' as const,
          value: settings.darkMode,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          id: 'notifications',
          icon: Bell,
          title: 'Push Notifications',
          description: 'Receive push notifications for events',
          type: 'toggle' as const,
          value: settings.notifications,
        },
        {
          id: 'emailAlerts',
          icon: Mail,
          title: 'Email Alerts',
          description: 'Get email notifications for important events',
          type: 'toggle' as const,
          value: settings.emailAlerts,
        },
        {
          id: 'voiceReminders',
          icon: Volume2,
          title: 'Voice Reminders',
          description: 'AI voice assistant for reminders',
          type: 'toggle' as const,
          value: settings.voiceReminders,
        },
        {
          id: 'soundEffects',
          icon: Smartphone,
          title: 'Sound Effects',
          description: 'Play sounds for notifications',
          type: 'toggle' as const,
          value: settings.soundEffects,
        },
      ],
    },
    {
      title: 'Sync & Security',
      items: [
        {
          id: 'mobileSync',
          icon: Smartphone,
          title: 'Mobile Sync',
          description: 'Sync events across all devices',
          type: 'toggle' as const,
          value: settings.mobileSync,
        },
        {
          id: 'twoFactor',
          icon: Shield,
          title: 'Two-Factor Authentication',
          description: 'Add extra security to your account',
          type: 'toggle' as const,
          value: settings.twoFactor,
        },
      ],
    },
  ];

  const profileSections = [
    { id: 'account', icon: User, title: 'Account Settings', description: 'Manage your account details' },
    { id: 'privacy', icon: Lock, title: 'Privacy & Security', description: 'Control your data and privacy' },
    { id: 'language', icon: Globe, title: 'Language & Region', description: 'Set your preferred language' },
    { id: 'theme', icon: Palette, title: 'Theme Customization', description: 'Customize colors and fonts' },
  ];

  return (
    <div className="min-h-screen bg-rich-black">
      <Sidebar />
      <div className="ml-60">
        <Navbar variant="dashboard" />

        <main className="p-6 sm:p-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-pure-white mb-2">Settings</h1>
            <p className="text-soft-gray">Manage your app preferences and account</p>
          </motion.div>

          {/* Profile Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 mb-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                U
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-pure-white">User Name</h3>
                <p className="text-soft-gray">user@email.com</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2"
              >
                Edit Profile
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profileSections.map((section) => (
                <motion.div
                  key={section.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-glass-white hover:bg-glass-hover cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <section.icon className="w-5 h-5 text-accent-blue" />
                    <div>
                      <p className="font-medium text-pure-white">{section.title}</p>
                      <p className="text-xs text-soft-gray">{section.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-soft-gray" />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Settings Groups */}
          {settingGroups.map((group, groupIndex) => (
            <motion.section
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + groupIndex * 0.1 }}
              className="glass-card p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-pure-white mb-4">{group.title}</h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <SettingRow key={item.id} item={item} onChange={handleChange} />
                ))}
              </div>
            </motion.section>
          ))}

          {/* Logout */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => showToast('Logged out successfully', 'info')}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </motion.button>

          {/* Version */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8 text-soft-gray text-sm"
          >
            <p>Intelli Campus v1.0.0</p>
            <p className="mt-1">Built with love for students</p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
