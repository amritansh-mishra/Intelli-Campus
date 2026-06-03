import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, GraduationCap, LucideIcon } from 'lucide-react';

export interface SubNavItem {
  path: string;
  label: string;
}

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  subItems?: SubNavItem[];
}

interface SidebarProps {
  navItems: NavItem[];
  title?: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ navItems, title = 'Intelli Campus', isCollapsed, onToggle }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const width = isCollapsed ? 'w-[72px]' : 'w-64';

  const toggleMenu = (path: string) => {
    if (isCollapsed) onToggle();
    setExpandedMenus(prev => ({ ...prev, [path]: !prev[path] }));
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar/20 bg-sidebar text-white transition-[width] duration-300 ${width}`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 h-16 shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white shrink-0 shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-base font-semibold tracking-wide truncate">{title}</span>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white shrink-0 shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="rounded-md p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white shrink-0"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isActiveParent = location.pathname.startsWith(item.path);
            const isExpanded = expandedMenus[item.path] || isActiveParent;

            return (
              <li key={item.path}>
                {hasSubItems ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.path)}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActiveParent && !isExpanded
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`h-5 w-5 shrink-0 ${isCollapsed ? 'mx-auto' : ''} ${isActiveParent ? 'text-primary-400' : ''}`} />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-white' : 'text-white/40'}`} 
                        />
                      )}
                    </button>

                    {/* SubMenu Items */}
                    {!isCollapsed && isExpanded && (
                      <ul className="mt-1 space-y-1 px-3 pb-2">
                        {item.subItems!.map((sub) => (
                          <li key={sub.path}>
                            <NavLink
                              to={sub.path}
                              end={sub.path === item.path}
                              className={({ isActive }) =>
                                `flex items-center gap-3 rounded-md pl-8 pr-3 py-2 text-sm font-medium transition-colors relative ${
                                  isActive
                                    ? 'text-white bg-white/10'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`
                              }
                            >
                              {({ isActive }) => (
                                <>
                                  {isActive && (
                                    <span className="absolute left-3.5 w-1.5 h-1.5 rounded-full bg-primary-400" />
                                  )}
                                  <span className="truncate">{sub.label}</span>
                                </>
                              )}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    title={isCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary-400 bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className={`h-5 w-5 shrink-0 ${isCollapsed ? 'mx-auto' : ''}`} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {!isCollapsed && (
        <div className="border-t border-white/10 px-5 py-4 shrink-0">
          <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Enterprise ERP</p>
          <p className="text-xs text-white/30 mt-1">v2.0.0-beta</p>
        </div>
      )}
    </aside>
  );
}
