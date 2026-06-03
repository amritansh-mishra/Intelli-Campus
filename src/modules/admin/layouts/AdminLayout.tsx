import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Calendar, Bell, Mic, Settings, PieChart, LogOut } from 'lucide-react';
import { Sidebar } from '../../../shared/components/Sidebar';
import { useAuth } from '../../../context/AuthContext';

const adminNavItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { 
    path: '/admin/users', 
    label: 'Users', 
    icon: Users,
    subItems: [
      { path: '/admin/users', label: 'All Users' },
      { path: '/admin/users/students', label: 'Students' },
      { path: '/admin/users/teachers', label: 'Teachers' },
      { path: '/admin/users/admins', label: 'Admins' },
      { path: '/admin/users/add', label: 'Add User' },
      { path: '/admin/users/activity', label: 'Activity Logs' },
    ]
  },
  { 
    path: '/admin/departments', 
    label: 'Departments', 
    icon: Building2,
    subItems: [
      { path: '/admin/departments', label: 'All Departments' },
      { path: '/admin/departments/add', label: 'Add Department' },
      { path: '/admin/departments/analytics', label: 'Analytics' },
    ]
  },
  { path: '/admin/events', label: 'Events', icon: Calendar },
  { path: '/admin/voice-agent', label: 'AI Voice Agent', icon: Mic },
  { path: '/admin/notifications', label: 'Notifications', icon: Bell },
  { path: '/admin/analytics', label: 'Analytics', icon: PieChart },
  { 
    path: '/admin/settings', 
    label: 'Settings', 
    icon: Settings,
    subItems: [
      { path: '/admin/settings/profile', label: 'Profile' },
      { path: '/admin/settings/security', label: 'Security' },
      { path: '/admin/settings/notifications', label: 'Notifications' },
      { path: '/admin/settings/voice', label: 'Voice AI' },
      { path: '/admin/settings/preferences', label: 'Preferences' },
      { path: '/admin/settings/appearance', label: 'Appearance' },
    ]
  },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      <Sidebar 
        navItems={adminNavItems} 
        title="Admin Portal" 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />
      
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${isCollapsed ? 'ml-[72px]' : 'ml-[72px] lg:ml-64'}`}>
        <header className="sticky top-0 z-30 bg-card border-b border-line shadow-sm px-6 h-16 flex items-center justify-between shrink-0">
          <h1 className="text-lg font-semibold text-ink">Admin Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-muted hover:bg-surface rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-card"></span>
            </button>
            <div className="flex items-center gap-3 border-l border-line pl-4">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-sm font-medium text-ink">{user?.name || 'Admin User'}</span>
                <span className="text-xs text-muted capitalize">{user?.role || 'Administrator'}</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-medium text-sm shadow-sm">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-muted hover:text-danger hover:bg-red-50 rounded-md transition-colors ml-1"
                title="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
