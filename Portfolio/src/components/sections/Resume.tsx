import { motion } from 'framer-motion';
import { Download, Eye, FileText, GraduationCap, Award, Briefcase } from 'lucide-react';
import { profile } from '../../data/portfolio';
import { Reveal, SectionHeading } from '../ui/Reveal';

const highlights = [
  { icon: GraduationCap, label: 'B.Tech CSE' },
  { icon: Briefcase, label: '5+ Project' },
  { icon: Award, label: '100+ DSA Solving' },
];

export default function Resume() {
  return (
    <section id="resume" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Resume"
          title="My"
          highlight="resume"
          subtitle="A snapshot of my experience, education, and certifications in one document."
        />

        <Reveal>
          <div className="glass-card mx-auto mt-12 max-w-3xl overflow-hidden">
            <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-glow">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{profile.name}</h3>
                    <p className="text-muted text-sm">Full Stack & AI Engineer · Resume.pdf</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {highlights.map(({ icon: Icon, label }) => (
                    <span key={label} className="chip">
                      <Icon className="h-3.5 w-3.5 text-primary-500" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <a
                  href={profile.resumeUrl}
                  className="btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Eye className="h-4 w-4" />
                  View Resume
                </a>
                <a href={profile.resumeUrl} className="btn-ghost" download>
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
            </div>

            {/* decorative bar */}
            <motion.div
              className="h-1.5 w-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-cyan"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
