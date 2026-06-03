import React from 'react';
import { cn } from '../utils/cn';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  size = 'md',
}: ToggleSwitchProps) {
  const sizes = {
    sm: { width: 'w-8', height: 'h-4', circle: 'w-3 h-3', translate: 'translate-x-4' },
    md: { width: 'w-11', height: 'h-6', circle: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { width: 'w-14', height: 'h-7', circle: 'w-6 h-6', translate: 'translate-x-7' },
  };

  const { width, height, circle, translate } = sizes[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        `relative inline-flex ${width} ${height} shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1`,
        checked ? 'bg-primary' : 'bg-line',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          `pointer-events-none inline-block ${circle} transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`,
          checked ? translate : 'translate-x-0'
        )}
      />
    </button>
  );
}
