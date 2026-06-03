import { motion } from 'framer-motion';

interface WaveformProps {
  active?: boolean;
  className?: string;
  color?: string;
}

export function Waveform({ active = false, className = '', color = 'bg-primary' }: WaveformProps) {
  return (
    <div className={`flex h-8 items-center justify-center gap-1 origin-center ${className}`} aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          initial={{ height: 8 }}
          animate={active ? { height: [8, Math.random() * 20 + 10, 8] } : { height: 8 }}
          transition={active ? {
            repeat: Infinity,
            duration: 0.8 + Math.random() * 0.4,
            ease: "easeInOut",
            delay: i * 0.1,
          } : { duration: 0.3 }}
          className={`w-1.5 rounded-full ${color}`}
        />
      ))}
    </div>
  );
}
