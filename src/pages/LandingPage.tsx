import { Link } from 'react-router-dom';
import {
  Calendar,
  Bell,
  Mic,
  Shield,
  ArrowRight,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const features = [
  {
    icon: Mic,
    title: 'AI Voice Agent',
    description:
      'Automated voice reminders for exams, deadlines, and campus events with configurable tone and language.',
  },
  {
    icon: Calendar,
    title: 'Event management',
    description:
      'Organize academic schedules, meetings, and assignments in one centralized calendar.',
  },
  {
    icon: Bell,
    title: 'Smart notifications',
    description:
      'Priority-based alerts so students and faculty never miss critical deadlines.',
  },
  {
    icon: Shield,
    title: 'Enterprise security',
    description:
      'Role-based access and audit-friendly workflows designed for university IT standards.',
  },
];

const stats = [
  { value: '10K+', label: 'Active users' },
  { value: '50K+', label: 'Events managed' },
  { value: '94%', label: 'Voice call success' },
  { value: '99.9%', label: 'Platform uptime' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar variant="landing" />

      <section className="border-b border-line bg-card pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium text-primary">
              University productivity platform
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Campus operations with AI-powered voice reminders
            </h1>
            <p className="mt-4 text-lg text-muted">
              Intelli Campus helps students and faculty manage events, notifications,
              and outbound voice reminders from a single enterprise dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login" className="btn-primary">
                Sign in to portal
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/signup" className="btn-secondary">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold text-ink">Built for campus teams</h2>
          <p className="mt-2 max-w-xl text-muted">
            Practical tools for academic scheduling—not experimental UI patterns.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="app-card app-card-hover rounded-md p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-card py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:grid-cols-4 sm:px-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold text-ink">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-ink">
                Designed like the tools you already use
              </h2>
              <p className="mt-3 text-muted">
                Clean layouts, consistent spacing, and familiar patterns—so adoption
                feels natural for administrators, faculty, and students.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Centralized event and reminder management',
                  'Voice agent analytics and call history',
                  'Configurable reminder tone and language',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="app-card rounded-md p-6">
              <div className="mb-4 flex items-center gap-2 border-b border-line pb-4">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium text-ink">Trusted on campus</span>
              </div>
              <blockquote className="text-sm text-muted">
                &ldquo;The voice reminder queue reduced missed exam notifications across
                our department. It feels like enterprise software, not a demo.&rdquo;
              </blockquote>
              <p className="mt-3 text-sm font-medium text-ink">Prof. James Wilson</p>
              <p className="text-xs text-muted">Department of Mathematics</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-sidebar py-14 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold">Ready to streamline campus reminders?</h2>
          <p className="mx-auto mt-2 max-w-lg text-white/70">
            Start with the AI Voice Agent or explore the full dashboard.
          </p>
          <Link
            to="/signup"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-sidebar transition-colors hover:bg-white/90"
          >
            Get started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
