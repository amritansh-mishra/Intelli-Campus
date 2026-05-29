import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X } from 'lucide-react';

export function VoiceWaveAnimation({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-accent-blue rounded-full"
          animate={{
            height: active ? [8, 20, 8] : 8,
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function VoiceAssistantCard() {
  const [isActive, setIsActive] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-3xl" />

        <div className="flex items-center gap-4 mb-4">
          <motion.div
            animate={isActive ? {
              boxShadow: ['0 0 20px rgba(59, 130, 246, 0.3)', '0 0 40px rgba(59, 130, 246, 0.6)', '0 0 20px rgba(59, 130, 246, 0.3)']
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className={`p-4 rounded-full ${isActive ? 'bg-accent-blue' : 'bg-glass-white'}`}
          >
            <Mic className={`w-6 h-6 ${isActive ? 'text-white' : 'text-accent-blue'}`} />
          </motion.div>
          <div>
            <h3 className="font-semibold text-pure-white">AI Voice Assistant</h3>
            <p className="text-sm text-soft-gray">
              {isActive ? 'Listening...' : 'Click to activate'}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <VoiceWaveAnimation active={isActive} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-500'}`}
            />
            <span className="text-xs text-soft-gray">
              {isActive ? 'Voice Reminder Active' : 'Voice Reminder Disabled'}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30'
            }`}
          >
            {isActive ? 'Stop' : 'Start'}
          </motion.button>
        </div>

        <motion.div
          className="mt-4 pt-4 border-t border-glass-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs text-soft-gray mb-2">Quick Commands:</p>
          <div className="flex flex-wrap gap-2">
            {['Add event', 'Show today', 'Remind me'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => setIsPopupOpen(true)}
                className="px-3 py-1 text-xs rounded-full bg-glass-white hover:bg-glass-hover text-soft-gray hover:text-pure-white transition-colors"
              >
                "{cmd}"
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 max-w-sm w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-pure-white">AI Chat Assistant</h3>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="p-1 hover:bg-glass-hover rounded transition-colors"
                >
                  <X className="w-5 h-5 text-soft-gray" />
                </button>
              </div>

              <div className="h-48 overflow-y-auto mb-4 p-3 rounded-lg bg-black/20">
                <div className="flex items-start gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-accent-blue/20">
                    <Volume2 className="w-4 h-4 text-accent-blue" />
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-glass-white">
                    <p className="text-sm text-pure-white">
                      Hello! I'm your AI assistant. How can I help you today?
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type or speak a command..."
                  className="input-field flex-1 text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg bg-accent-blue hover:bg-accent-blue/80 transition-colors"
                >
                  <Mic className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
