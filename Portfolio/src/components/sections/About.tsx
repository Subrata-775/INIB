import { motion } from "framer-motion";
import {
  GraduationCap,
  Target,
  Flame,
  Puzzle,
  Users,
  MessageSquare,
} from "lucide-react";
import { about, stats, timeline } from "../../data/portfolio";
import { useCountUp } from "../../hooks/useCountUp";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal, SectionHeading, stagger, fadeUp } from "../ui/Reveal";

const highlightIcons = [
  GraduationCap,
  Target,
  Flame,
  Puzzle,
  Users,
  MessageSquare,
];

function StatCard({
  stat,
  start,
}: {
  stat: (typeof stats)[number];
  start: boolean;
}) {
  const value = useCountUp(stat.value, 1800, start);
  return (
    <div className="glass-card group p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow">
      <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
        {value.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="text-muted mt-1.5 text-xs font-medium sm:text-sm">
        {stat.label}
      </div>
    </div>
  );
}

export default function About() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section id="about" className="relative py-28 lg:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="About Me"
          title="Engineer who ships"
          highlight="& ships often"
          subtitle="A blend of full-stack craft and applied AI — focused on products that feel effortless."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — intro + highlights */}
          <div>
            <Reveal>
              <div className="space-y-4">
                {about.paragraphs.map((p) => (
                  <p key={p} className="text-muted leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* next  */}

            <div className="mt-16 space-y-0">
              {timeline.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="relative pl-8">
                    {/* line */}
                    {i < timeline.length - 1 && (
                      <span className="absolute left-3 top-3 h-full w-px bg-gradient-to-b from-primary-500/40 to-transparent" />
                    )}
                    {/* dot */}
                    <span className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-primary-500 bg-surface" />
                    <div className="glass-card mb-4 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold">{item.title}</h4>
                        <span className="chip text-[10px]">{item.type}</span>
                      </div>
                      <p className="text-muted mt-0.5 text-xs">
                        {item.org} · {item.date}
                      </p>
                      <p className="text-muted mt-2 text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right — stats + timeline */}
          <div>
            <div ref={statsRef} className="grid grid-cols-2 gap-10">
              {stats.map((s) => (
                <StatCard key={s.label} stat={s} start={statsInView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
