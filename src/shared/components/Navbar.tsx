import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { Event } from '../../data/dummyData';

interface NavbarProps {
  events?: Event[];
  variant?: 'landing' | 'dashboard';
  title?: string;
}

export function Navbar({ events = [], variant = 'landing', title = 'Dashboard' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (variant === 'landing') {
    return (
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors ${
          scrolled ? 'border-line bg-card/95 shadow-card backdrop-blur-sm' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <span className="text-base font-semibold text-ink">Intelli Campus</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {['Features', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login" className="btn-secondary">
              Sign in
            </Link>
            <Link to="/login" className="btn-primary">
              Campus portal
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md border border-line p-2 md:hidden"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-line bg-card px-4 py-4 md:hidden">
            {['Features', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-sm text-muted"
              >
                {item}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/login" className="btn-secondary text-center">
                Sign in
              </Link>
              <Link to="/signup" className="btn-primary text-center">
                Register
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-card">
      <div className="flex h-14 items-center justify-between px-6">
        <h1 className="text-base font-semibold text-ink">{title}</h1>
        <div className="flex items-center gap-3">
          <NotificationBell events={events} />
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
            U
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
