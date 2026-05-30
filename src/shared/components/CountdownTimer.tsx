import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { Card } from './Card';

interface CountdownTimerProps {
  targetDate: string;
  targetTime: string;
  title: string;
}

export default function CountdownTimer({
  targetDate,
  targetTime,
  title,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(`${targetDate}T${targetTime}`).getTime();
    const tick = () => {
      const difference = target - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  const boxes = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <Card>
      <div className="mb-3 flex items-center gap-2">
        <Timer className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-medium text-ink">{title}</h4>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {boxes.map((box) => (
          <div key={box.label} className="text-center">
            <div className="rounded-md border border-line bg-surface py-2">
              <span className="text-lg font-semibold text-ink">
                {String(box.value).padStart(2, '0')}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted">{box.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
