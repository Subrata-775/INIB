import { motion } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTypescript,
  SiTensorflow,
  SiDocker,
  SiMongodb,
  SiGithub,
  SiX,
  SiInstagram,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Mail, ArrowRight, Download, FolderGit2 } from "lucide-react";
import { profile } from "../../data/portfolio";
import { useTypingEffect } from "../../hooks/useTypingEffect";

const floatingIcons = [
  { Icon: SiReact, className: "text-[#61DAFB]", x: "8%", y: "18%", delay: 0 },
  {
    Icon: SiNodedotjs,
    className: "text-[#339933]",
    x: "82%",
    y: "12%",
    delay: 0.6,
  },
  {
    Icon: SiPython,
    className: "text-[#3776AB]",
    x: "14%",
    y: "72%",
    delay: 1.1,
  },
  {
    Icon: SiTensorflow,
    className: "text-[#FF6F00]",
    x: "88%",
    y: "68%",
    delay: 0.3,
  },
  {
    Icon: SiTypescript,
    className: "text-[#3178C6]",
    x: "46%",
    y: "8%",
    delay: 0.9,
  },
  {
    Icon: SiDocker,
    className: "text-[#2496ED]",
    x: "90%",
    y: "42%",
    delay: 1.4,
  },
  {
    Icon: SiMongodb,
    className: "text-[#47A248]",
    x: "6%",
    y: "44%",
    delay: 0.4,
  },
];

const socials = [
  { Icon: SiGithub, href: profile.socials.github, label: "GitHub" },
  { Icon: FaLinkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  { Icon: Mail, href: profile.socials.email, label: "Email" },
  { Icon: SiX, href: profile.socials.twitter, label: "X" },
  { Icon: SiInstagram, href: profile.socials.instagram, label: "Instagram" },
];

export default function Hero() {
  const typed = useTypingEffect(profile.taglines);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pt-28 sm:pt-32"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-hero-gradient" />
      <div className="absolute inset-0 -z-10 bg-grid-dark bg-[size:44px_44px] opacity-60 dark:block hidden" />
      <div className="absolute inset-0 -z-10 bg-grid-light bg-[size:44px_44px] opacity-60 light:block hidden" />
      {/* Blur circles */}
      <div className="absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute -right-24 top-40 -z-10 h-80 w-80 rounded-full bg-secondary-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-accent-cyan/15 blur-3xl" />

      {/* Floating particles */}
      {[...Array(14)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary-400/40"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="container-x grid items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-2 lg:px-12">
        {/* Left */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chip mb-5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I'm <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {profile.roles.map((role) => (
              <span
                key={role}
                className="chip border-primary-500/30 text-primary-500"
              >
                {role}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 h-7 font-mono text-base text-secondary-400 sm:text-lg"
          >
            <span className="text-gradient">{typed}</span>
            <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-secondary-400 align-middle" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted mt-5 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#contact" className="btn-primary">
              Hire Me
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Download className="h-4 w-4" />
              View Resume
            </a>
            <a href="#projects" className="btn-ghost">
              <FolderGit2 className="h-4 w-4" />
              View Projects
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex items-center gap-3"
          >
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-soft text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/50 hover:text-primary-500"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg"
        >
          {/* Rotating ring */}
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-primary-500/20" />
          <div className="absolute inset-6 rounded-full border border-secondary-500/15" />

          {/* Glow */}
          <div className="absolute inset-10 rounded-full bg-gradient-to-br from-primary-500/30 via-secondary-500/20 to-accent-cyan/20 blur-2xl" />

          {/* Avatar */}
          <div className="absolute inset-8 overflow-hidden rounded-full border border-white/10 shadow-glow">
            <img
              src={profile.avatar}
              alt={profile.name}
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Floating tech icons */}
          {floatingIcons.map(({ Icon, className, x, y, delay }, i) => (
            <motion.div
              key={i}
              className="absolute flex h-12 w-12 items-center justify-center rounded-2xl glass shadow-glass"
              style={{ left: x, top: y }}
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            >
              <Icon className={`h-6 w-6 ${className}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-muted/40 p-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-primary-500"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
