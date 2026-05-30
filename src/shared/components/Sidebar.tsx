import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  Calendar,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Mic,
} from 'lucide-react';

const navItems = [
  { path: '/voice-agent', label: 'AI Voice Agent', icon: Mic },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/add-event', label: 'Add Event', icon: PlusCircle },
  { path: '/events', label: 'Events', icon: Calendar },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const width = isCollapsed ? 'w-[72px]' : 'w-60';

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar/20 bg-sidebar text-white transition-[width] duration-300 ${width}`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-semibold">Intelli Campus</span>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                title={isCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="border-t border-white/10 px-4 py-3">
          <p className="text-xs text-white/50">University productivity</p>
          <p className="text-xs text-white/40">v1.0</p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
