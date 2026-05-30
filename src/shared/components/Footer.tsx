import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold text-ink">Intelli Campus</span>
            </div>
            <p className="max-w-md text-sm text-muted">
              Enterprise campus productivity with AI-powered voice reminders for students
              and faculty.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/voice-agent" className="text-muted hover:text-ink">
                  AI Voice Agent
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted hover:text-ink">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted hover:text-ink">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-ink">Support</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>Help center</li>
              <li>Privacy policy</li>
              <li>Terms of service</li>
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-line pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} Intelli Campus. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
