import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import { certifications } from '../../data/portfolio';
import { SectionHeading, stagger, fadeUp } from '../ui/Reveal';

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad relative">
      <div className="absolute inset-0 -z-10 bg-hero-gradient opacity-30" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Certifications"
          title="Verified"
          highlight="credentials"
          subtitle="Industry certifications backing the skills I bring to every project."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="glass-card group overflow-hidden transition-shadow duration-300 hover:shadow-glow"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/90 text-white backdrop-blur-sm">
                  <BadgeCheck className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-base font-semibold leading-snug">{cert.title}</h3>
                <p className="text-muted mt-1 text-xs">
                  {cert.org} · {cert.date}
                </p>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 transition-colors hover:text-secondary-500"
                >
                  Verify
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
