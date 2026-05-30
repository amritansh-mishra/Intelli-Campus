import { Bell } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface AdminNavbarProps {
  title: string;
}

export function AdminNavbar({ title }: AdminNavbarProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-card">
      <div className="flex h-14 items-center justify-between px-6">
        <h1 className="text-base font-semibold text-ink">{title}</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-md border border-line p-2 text-muted hover:bg-surface"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          {user && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
              {user.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
