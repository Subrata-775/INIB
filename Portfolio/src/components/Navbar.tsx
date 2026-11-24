import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "../data/portfolio";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const scrolled = useScrollPosition(30);
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-[90]"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8 lg:px-12 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`flex w-full items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled ? "glass shadow-glass" : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => handleNav("#home")}
            className="flex items-center gap-2.5"
            aria-label="Home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 font-display text-sm font-bold text-white shadow-glow">
              SJ
            </span>
            <span className="font-display text-base font-semibold tracking-tight">
              {profile.firstName}
              <span className="text-gradient">.</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                    active === link.href
                      ? "text-primary-500"
                      : "text-muted hover:text-primary-500"
                  }`}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-primary-500/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-soft text-muted transition-all hover:text-primary-500"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <a
              href={profile.resumeUrl}
              className="btn-primary hidden h-9 px-4 py-0 text-xs sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-soft text-muted lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-5 sm:mx-8 lg:hidden"
          >
            <div className="glass-card overflow-hidden p-2">
              <ul className="grid grid-cols-2 gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNav(link.href)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                        active === link.href
                          ? "bg-primary-500/10 text-primary-500"
                          : "text-muted hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Download className="h-4 w-4" />
                View Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
