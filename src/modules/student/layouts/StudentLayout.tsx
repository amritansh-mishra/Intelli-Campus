import React from 'react';
import { StudentSidebar } from '../components/StudentSidebar';
import { StudentNavbar } from '../components/StudentNavbar';

interface StudentLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function StudentLayout({ children, title }: StudentLayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <StudentSidebar />
      <div className="flex min-h-screen flex-col lg:pl-60">
        <StudentNavbar title={title} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default StudentLayout;
