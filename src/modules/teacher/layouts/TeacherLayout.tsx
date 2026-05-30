import React from 'react';
import { TeacherSidebar } from '../components/TeacherSidebar';
import { TeacherNavbar } from '../components/TeacherNavbar';

interface TeacherLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function TeacherLayout({ children, title }: TeacherLayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <TeacherSidebar />
      <div className="flex min-h-screen flex-col lg:pl-60">
        <TeacherNavbar title={title} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default TeacherLayout;
