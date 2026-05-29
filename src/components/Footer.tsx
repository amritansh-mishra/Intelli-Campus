import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Heart, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-dark-navy border-t border-glass-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="p-2 rounded-lg bg-accent-blue/20"
              >
                <GraduationCap className="w-6 h-6 text-accent-blue" />
              </motion.div>
              <span className="font-bold text-xl text-pure-white">Intelli Campus</span>
            </div>
            <p className="text-soft-gray text-sm max-w-md mb-4">
              AI-powered campus reminder and event management platform.
              Never miss an important event, deadline, or meeting again.
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 rounded-lg bg-glass-white hover:bg-glass-hover transition-colors"
              >
                <Github className="w-5 h-5 text-soft-gray hover:text-pure-white" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 rounded-lg bg-glass-white hover:bg-glass-hover transition-colors"
              >
                <Twitter className="w-5 h-5 text-soft-gray hover:text-pure-white" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-2 rounded-lg bg-glass-white hover:bg-glass-hover transition-colors"
              >
                <Linkedin className="w-5 h-5 text-soft-gray hover:text-pure-white" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-pure-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Dashboard', 'Events', 'Add Event', 'Notifications'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-soft-gray hover:text-pure-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-pure-white mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'FAQ', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-soft-gray hover:text-pure-white transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-glass-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-soft-gray text-sm">
              © {new Date().getFullYear()} Intelli Campus. All rights reserved.
            </p>
            <p className="text-soft-gray text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
