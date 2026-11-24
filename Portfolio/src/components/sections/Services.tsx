import { motion } from 'framer-motion';
import {
  Layers,
  BrainCircuit,
  Webhook,
  MonitorSmartphone,
  Gauge,
  Cloud,
  Lightbulb,
  type LucideIcon,
  ArrowUpRight,
} from 'lucide-react';
import { services } from '../../data/portfolio';
import { SectionHeading, stagger, fadeUp } from '../ui/Reveal';

const icons: Record<string, LucideIcon> = {
  Layers,
  BrainCircuit,
  Webhook,
  MonitorSmartphone,
  Gauge,
  Cloud,
  Lightbulb,
};

export default function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title="What I can"
          highlight="build for you"
          subtitle="From a single feature to a full product — engineering that scales with your ambition."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = icons[service.icon] ?? Layers;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="glass-card group relative overflow-hidden p-6 transition-shadow duration-300 hover:shadow-glow"
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-secondary-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-glow">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">{service.description}</p>

                <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-primary-500 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
