import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Bell,
  Brain,
  Zap,
  Shield,
  ArrowRight,
  Clock,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const features = [
  {
    icon: Calendar,
    title: 'Smart Event Management',
    description: 'Organize your campus events with AI-powered categorization and scheduling.',
  },
  {
    icon: Bell,
    title: 'Intelligent Reminders',
    description: 'Never miss an important deadline with personalized voice and push notifications.',
  },
  {
    icon: Brain,
    title: 'AI Assistant',
    description: 'Voice-activated AI assistant helps you manage events hands-free.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Instant syncing across all your devices with real-time updates.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and protected with enterprise-grade security.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Share events and coordinate with classmates effortlessly.',
  },
];

const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '50K+', label: 'Events Created' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9', label: 'User Rating' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Computer Science Student',
    content: 'Intelli Campus has transformed how I manage my assignments and exam schedules. The AI reminders are a game-changer!',
  },
  {
    name: 'Prof. James Wilson',
    role: 'Mathematics Professor',
    content: 'I recommend this to all my students. It helps them stay organized and improves their time management significantly.',
  },
  {
    name: 'Michael Brown',
    role: 'Engineering Student',
    content: 'The voice assistant feature is incredible. I can add events while walking to class without touching my phone.',
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-rich-black text-pure-white">
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-accent-blue/10 via-transparent to-transparent" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"
          />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-accent-blue" />
              <span className="text-sm text-accent-blue font-medium">AI-Powered Platform</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-pure-white">Intelli Campus</span>
              <span className="block gradient-text mt-2">Smart AI Reminder Platform</span>
            </h1>

            <p className="text-lg sm:text-xl text-soft-gray max-w-2xl mx-auto mb-10">
              The intelligent campus management system that helps students and teachers
              never miss an important event, deadline, or meeting again.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/events">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
                >
                  <Calendar className="w-5 h-5" />
                  View Events
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  className="text-3xl sm:text-4xl font-bold text-pure-white mb-1"
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-soft-gray">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ArrowRight className="w-6 h-6 text-soft-gray rotate-90" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-pure-white mb-4">
              Powerful Features for
              <span className="gradient-text"> Smart Campus Management</span>
            </h2>
            <p className="text-soft-gray max-w-2xl mx-auto">
              Everything you need to stay organized and on top of your academic schedule
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)' }}
                className="glass-card-hover p-6 group"
              >
                <div className="p-3 rounded-lg bg-accent-blue/10 w-fit mb-4 group-hover:bg-accent-blue/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent-blue" />
                </div>
                <h3 className="text-lg font-semibold text-pure-white mb-2">{feature.title}</h3>
                <p className="text-soft-gray text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="about" className="py-24 bg-dark-navy/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-pure-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-soft-gray max-w-2xl mx-auto">
              Get started in minutes with our intuitive platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Events',
                description: 'Add your classes, assignments, exams, and campus activities to your calendar.',
                icon: Calendar,
              },
              {
                step: '02',
                title: 'Set Reminders',
                description: 'Configure AI-powered reminders with voice notifications and smart suggestions.',
                icon: Bell,
              },
              {
                step: '03',
                title: 'Stay Organized',
                description: 'Let our AI assistant keep you on track with intelligent notifications.',
                icon: CheckCircle2,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass-card p-6 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-blue/20 mb-4"
                  >
                    <item.icon className="w-8 h-8 text-accent-blue" />
                  </motion.div>
                  <div className="text-accent-blue text-sm font-bold mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold text-pure-white mb-3">{item.title}</h3>
                  <p className="text-soft-gray text-sm">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-accent-blue/50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-pure-white mb-4">
              Loved by <span className="gradient-text">Students & Teachers</span>
            </h2>
            <p className="text-soft-gray max-w-2xl mx-auto">
              Join thousands of users who've transformed their academic life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-pure-white">{testimonial.name}</p>
                    <p className="text-sm text-soft-gray">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-soft-gray text-sm italic">"{testimonial.content}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-dark-navy to-rich-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{
                boxShadow: ['0 0 20px rgba(59, 130, 246, 0.2)', '0 0 40px rgba(59, 130, 246, 0.4)', '0 0 20px rgba(59, 130, 246, 0.2)'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="glass-card p-12"
            >
              <Clock className="w-12 h-12 text-accent-blue mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-pure-white mb-4">
                Ready to Transform Your
                <span className="gradient-text"> Academic Life?</span>
              </h2>
              <p className="text-soft-gray mb-8 max-w-xl mx-auto">
                Join Intelli Campus today and never miss another important deadline.
                Start managing your campus life smarter.
              </p>
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
