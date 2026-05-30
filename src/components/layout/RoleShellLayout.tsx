import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Bell, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthUser } from '../../types';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface RoleShellLayoutProps {
  children: React.ReactNode;
  title: string;
  navItems: NavItem[];
  roleLabel: string;
}

export function RoleShellLayout({
  children,
  title,
  navItems,
  roleLabel,
}: RoleShellLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col bg-sidebar text-white">
        <div className="border-b border-white/10 px-4 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Intelli Campus</p>
              <p className="text-xs text-white/50">{roleLabel}</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="mb-2 truncate px-2 text-xs text-white/60">{user?.email}</div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-60">
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
              <UserBadge user={user} />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

function UserBadge({ user }: { user: AuthUser | null }) {
  if (!user) return null;
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
      {user.name.charAt(0)}
    </div>
  );
}
