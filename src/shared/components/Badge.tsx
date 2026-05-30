type BadgeVariant = 'high' | 'medium' | 'low' | 'success' | 'warning' | 'danger' | 'neutral';

const variantStyles: Record<BadgeVariant, string> = {
  high: 'bg-red-50 text-danger border-red-200',
  medium: 'bg-amber-50 text-warning border-amber-200',
  low: 'bg-emerald-50 text-success border-emerald-200',
  success: 'bg-emerald-50 text-success border-emerald-200',
  warning: 'bg-amber-50 text-warning border-amber-200',
  danger: 'bg-red-50 text-danger border-red-200',
  neutral: 'bg-surface text-muted border-line',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function priorityToBadge(priority: string): BadgeVariant {
  const key = priority.toLowerCase();
  if (key === 'high') return 'high';
  if (key === 'medium') return 'medium';
  if (key === 'low') return 'low';
  return 'neutral';
}
