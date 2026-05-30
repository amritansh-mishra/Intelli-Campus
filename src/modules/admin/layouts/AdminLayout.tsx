import React from 'react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminNavbar } from '../components/AdminNavbar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar />
      <div className="flex min-h-screen flex-col lg:pl-60">
        <AdminNavbar title={title} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
