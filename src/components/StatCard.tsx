import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  delay = 0,
}: StatCardProps) {
  const count = useMotionValue(0);
  const displayValue = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      delay: delay * 0.1,
      ease: 'easeOut',
    });

    return () => controls.stop();
  }, [count, value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden"
    >
      <div
        className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${color} opacity-20`}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <motion.h3 className="text-3xl font-bold text-white">
            {displayValue}
          </motion.h3>
        </div>
        <div
          className={`p-3 rounded-xl ${color.replace('bg-', 'bg-opacity-20 bg-')}`}
        >
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay * 0.1 + 0.3, duration: 0.8 }}
        className={`absolute bottom-0 left-0 h-1 ${color}`}
        style={{ transformOrigin: 'left', width: '100%' }}
      />
    </motion.div>
  );
}
