interface WaveformProps {
  active?: boolean;
  className?: string;
}

export function Waveform({ active = false, className = '' }: WaveformProps) {
  return (
    <div className={`flex h-6 items-end gap-0.5 ${className}`} aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`w-1 rounded-sm bg-primary/70 ${
            active ? 'voice-wave-bar h-4 origin-bottom' : 'h-2 opacity-40'
          }`}
        />
      ))}
    </div>
  );
}
