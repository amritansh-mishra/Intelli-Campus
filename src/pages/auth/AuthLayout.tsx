import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <div className="hidden w-1/2 flex-col justify-between border-r border-line bg-sidebar p-10 text-white lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-lg font-semibold">Intelli Campus</span>
        </div>
        <div>
          <h2 className="text-2xl font-semibold leading-snug">
            AI-powered university operations & voice communication
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/70">
            Secure role-based access for administrators, faculty, and students.
          </p>
        </div>
        <p className="text-xs text-white/40">© Intelli Campus · Enterprise ERP</p>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12">
        <Link to="/" className="mb-8 flex items-center gap-2 text-ink lg:hidden">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-semibold">Intelli Campus</span>
        </Link>
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-2xl font-semibold text-ink">{title}</h1>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
