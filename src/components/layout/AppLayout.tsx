import { Sidebar } from '../Sidebar';
import { Navbar } from '../Navbar';
import { Event } from '../../data/dummyData';

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  events?: Event[];
}

export function AppLayout({ children, title, events = [] }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <div className="flex min-h-screen flex-col transition-[padding] duration-300 lg:pl-60">
        <Navbar variant="dashboard" title={title} events={events} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
