import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7 } },
};

export const zoom: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <span className="chip mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="text-muted mt-4 text-base leading-relaxed sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
