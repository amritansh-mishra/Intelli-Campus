import { motion } from 'framer-motion';
import { Mic, Bot } from 'lucide-react';
import { useState } from 'react';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 gradient-glow opacity-50" />

      <div className="relative flex items-center gap-4">
        <motion.div
          animate={isListening ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center relative">
            <Bot className="w-8 h-8 text-white" />
          </div>
          {isListening && (
            <>
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-blue-500"
              />
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                className="absolute inset-0 rounded-full bg-blue-500"
              />
            </>
          )}
        </motion.div>

        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">AI Voice Assistant</h3>
          <p className="text-sm text-gray-400 mb-3">
            {isListening ? 'Listening...' : 'Click to activate voice reminder'}
          </p>

          {isListening && (
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-blue-400 rounded-full voice-wave"
                  style={{ height: 16 + Math.random() * 16 }}
                />
              ))}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsListening(!isListening)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isListening
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isListening ? 'Stop' : 'Start'} Voice Command
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
