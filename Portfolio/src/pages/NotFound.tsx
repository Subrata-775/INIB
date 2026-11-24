import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute -right-24 bottom-24 -z-10 h-80 w-80 rounded-full bg-secondary-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="relative mx-auto mb-8 h-24 w-24">
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-primary-500/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Compass className="h-10 w-10 text-primary-500" />
          </div>
        </div>

        <h1 className="font-display text-7xl font-bold text-gradient sm:text-8xl">404</h1>
        <h2 className="mt-4 font-display text-2xl font-semibold">Page not found</h2>
        <p className="text-muted mx-auto mt-3 max-w-md">
          The page you're looking for has drifted off into space. Let's get you back home.
        </p>

        <Link to="/" className="btn-primary mt-8">
          <Home className="h-4 w-4" />
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
