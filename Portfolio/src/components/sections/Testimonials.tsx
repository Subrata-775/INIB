import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { testimonials } from '../../data/portfolio';
import { SectionHeading } from '../ui/Reveal';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="section-pad relative">
      <div className="absolute inset-0 -z-10 bg-hero-gradient opacity-30" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people"
          highlight="say"
          subtitle="Kind words from teammates, clients, and collaborators."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="glass-card relative overflow-hidden p-8 sm:p-10">
            <Quote className="absolute -right-4 -top-4 h-24 w-24 text-primary-500/10" />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-5 text-lg leading-relaxed sm:text-xl">"{t.text}"</p>

                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-500/40"
                  />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-muted text-sm">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDir(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-6 bg-primary-500' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-soft text-muted transition-all hover:border-primary-500/50 hover:text-primary-500"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-soft text-muted transition-all hover:border-primary-500/50 hover:text-primary-500"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
