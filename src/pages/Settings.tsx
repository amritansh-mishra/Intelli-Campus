import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Bell,
  Volume2,
  Globe,
  Shield,
  Palette,
  Check,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onChange(!enabled)}
      className={`relative w-14 h-7 rounded-full transition-colors ${
        enabled ? 'bg-blue-500' : 'bg-white/10'
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 28 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
      />
    </motion.button>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    sounds: true,
    autoReminders: true,
    emailAlerts: false,
    language: 'English',
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const settingGroups = [
    {
      title: 'Appearance',
      icon: Palette,
      settings: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Enable dark theme for better visibility',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'notifications',
          label: 'Push Notifications',
          description: 'Receive push notifications for events',
          type: 'toggle',
        },
        {
          key: 'emailAlerts',
          label: 'Email Alerts',
          description: 'Get email notifications for important events',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Sound & Voice',
      icon: Volume2,
      settings: [
        {
          key: 'sounds',
          label: 'Sound Effects',
          description: 'Play sounds for notifications and actions',
          type: 'toggle',
        },
        {
          key: 'autoReminders',
          label: 'Auto Voice Reminders',
          description: 'Enable AI voice assistant for reminders',
          type: 'toggle',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        {
          key: 'privacy',
          label: 'Privacy Mode',
          description: 'Hide event details in notifications',
          type: 'toggle',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Sidebar />
      <Navbar />

      <main className="lg:ml-60 pt-24 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-400">Customize your experience</p>
            </div>
          </motion.div>

          <div className="space-y-6">
            {settingGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIndex * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                  <group.icon className="w-5 h-5 text-blue-400" />
                  <h2 className="font-semibold text-white">{group.title}</h2>
                </div>

                <div className="divide-y divide-white/5">
                  {group.settings.map((setting, index) => (
                    <motion.div
                      key={setting.key}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                      className="p-4 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="text-white font-medium">
                          {setting.label}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {setting.description}
                        </p>
                      </div>
                      <ToggleSwitch
                        enabled={settings[setting.key as keyof typeof settings] as boolean}
                        onChange={(value) => updateSetting(setting.key, value)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <h2 className="font-semibold text-white">Language</h2>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['English', 'Spanish', 'French', 'German'].map((lang) => (
                    <motion.button
                      key={lang}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => updateSetting('language', lang)}
                      className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${
                        settings.language === lang
                          ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {settings.language === lang && (
                        <Check className="w-4 h-4" />
                      )}
                      <span>{lang}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-500 text-sm"
            >
              Intelli Campus v1.0.0
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
