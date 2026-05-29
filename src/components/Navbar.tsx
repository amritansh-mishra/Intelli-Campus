import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { Event } from '../services/supabase';

interface NavbarProps {
  events?: Event[];
  variant?: 'landing' | 'dashboard';
}

export function Navbar({ events = [], variant = 'landing' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (variant === 'landing') {
    return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-dark-navy/80 backdrop-blur-xl border-b border-glass-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="p-2 rounded-lg bg-accent-blue/20 group-hover:bg-accent-blue/30 transition-colors"
              >
                <GraduationCap className="w-6 h-6 text-accent-blue" />
              </motion.div>
              <span className="font-bold text-xl text-pure-white">Intelli Campus</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {['Features', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-soft-gray hover:text-pure-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/dashboard"
                className="btn-secondary"
              >
                Login
              </Link>
              <Link
                to="/dashboard"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-glass-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-pure-white" />
              ) : (
                <Menu className="w-6 h-6 text-pure-white" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-dark-navy border-b border-glass-border"
          >
            <div className="px-4 py-4 space-y-4">
              {['Features', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-soft-gray hover:text-pure-white transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <Link to="/dashboard" className="btn-secondary w-full text-center block">
                  Login
                </Link>
                <Link to="/dashboard" className="btn-primary w-full text-center block">
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-dark-navy border-b border-glass-border">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-pure-white capitalize">
              {location.pathname.split('/').filter(Boolean).join(' ') || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <NotificationBell events={events} />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-blue-600 flex items-center justify-center text-white font-semibold">
                U
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
