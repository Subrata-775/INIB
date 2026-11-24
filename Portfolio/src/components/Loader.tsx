import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const p = Math.min(((now - start) / duration) * 100, 100);
      if (!mounted) return;
      setProgress(Math.round(p));
      if (p < 100) requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    requestAnimationFrame(tick);
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Animated logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="relative h-20 w-20">
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-primary-500/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-1 rounded-xl border-2 border-secondary-500/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-gradient">SJ</span>
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="h-1 w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-cyan"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-muted mt-4 font-mono text-sm tabular-nums">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
