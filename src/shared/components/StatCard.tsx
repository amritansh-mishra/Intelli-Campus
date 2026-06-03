import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconClassName?: string;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName = 'text-primary bg-primary/10',
  trend,
}: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-card border border-line rounded-lg p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-ink tracking-tight">{value}</p>
        </div>
        <div className={`rounded-md p-2.5 ${iconClassName}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span
            className={`font-medium ${
              trend.isPositive ? 'text-success' : 'text-danger'
            }`}
          >
            {trend.isPositive ? '+' : '-'}{trend.value}%
          </span>
          <span className="text-muted">{trend.label}</span>
        </div>
      )}
    </motion.div>
  );
}
