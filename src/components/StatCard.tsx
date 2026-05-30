import { LucideIcon } from 'lucide-react';
import { Card } from './ui/Card';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconClassName?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName = 'text-primary bg-primary/10',
}: StatCardProps) {
  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
        </div>
        <div className={`rounded-md p-2.5 ${iconClassName}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
