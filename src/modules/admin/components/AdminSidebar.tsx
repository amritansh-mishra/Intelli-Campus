import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, GraduationCap, LayoutDashboard, Building2, Users, Calendar, Mic, BarChart3, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const adminNav = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/departments', label: 'Departments', icon: Building2 },
  { path: '/admin/teachers', label: 'Teachers', icon: Users },
  { path: '/admin/students', label: 'Students', icon: GraduationCap },
  { path: '/admin/events', label: 'Events', icon: Calendar },
  { path: '/admin/voice-agent', label: 'AI Voice Agent', icon: Mic },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/notifications', label: 'Notifications', icon: Bell },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col bg-sidebar text-white">
      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Intelli Campus</p>
            <p className="text-xs text-white/50">College Administration</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {adminNav.map((item) => {
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
  );
}

export default AdminSidebar;
