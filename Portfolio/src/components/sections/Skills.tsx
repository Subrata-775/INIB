import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  Database,
  BrainCircuit,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { useRef } from 'react';
import { skillCategories } from '../../data/portfolio';
import { SectionHeading, stagger, fadeUp } from '../ui/Reveal';

const icons: Record<string, LucideIcon> = {
  Code2,
  Layout,
  Server,
  Database,
  BrainCircuit,
  Wrench,
};

function SkillBar({ name, level, start }: { name: string; level: number; start: boolean }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-muted font-mono text-xs tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-cyan"
          initial={{ width: 0 }}
          animate={start ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="skills" className="section-pad relative">
      <div className="absolute inset-0 -z-10 bg-hero-gradient opacity-40" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Skills"
          title="My technical"
          highlight="toolkit"
          subtitle="A full-stack and AI skill set honed across products, research, and open source."
        />

        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((cat) => {
            const Icon = icons[cat.icon] ?? Code2;
            return (
              <motion.div
                key={cat.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="glass-card group relative overflow-hidden p-6 transition-shadow duration-300 hover:shadow-glow"
              >
                {/* hover glow */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 text-primary-500">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{cat.name}</h3>
                </div>

                <div className="space-y-3.5">
                  {cat.skills.map((s) => (
                    <SkillBar key={s.name} name={s.name} level={s.level} start={inView} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
