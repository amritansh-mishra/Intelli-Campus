import React from 'react';
import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const inputId = id || label?.replace(/\s+/g, '-').toLowerCase();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-ink mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full rounded-md border bg-card px-3 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 transition-shadow',
              error
                ? 'border-danger focus:border-danger focus:ring-danger/20'
                : 'border-line focus:border-primary focus:ring-primary/20',
              icon && 'pl-10',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
