import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projectFilters, projects } from '../../data/portfolio';
import { SectionHeading } from '../ui/Reveal';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => p.category.includes(filter)),
    [filter]
  );

  return (
    <section id="projects" className="section-pad relative">
      <div className="absolute inset-0 -z-10 bg-hero-gradient opacity-30" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects"
          title="Selected"
          highlight="work"
          subtitle="A sample of products spanning full-stack web, AI, and developer tooling."
        />

        {/* Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {projectFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                filter === f
                  ? 'text-white'
                  : 'text-muted hover:text-primary-500'
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{ background: 'linear-gradient(120deg, #3b82f6, #8b5cf6)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="glass-card group flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-glow"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    {project.category.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold">{project.name}</h3>
                  <p className="text-muted mt-2 text-sm leading-relaxed">{project.description}</p>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.features.map((f) => (
                      <li key={f} className="chip text-[10px]">
                        <Star className="h-2.5 w-2.5 text-primary-500" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-primary-500/10 px-2 py-0.5 font-mono text-[10px] text-primary-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-2 pt-5">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary flex-1 py-2 text-xs"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost flex-1 py-2 text-xs"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Code
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
