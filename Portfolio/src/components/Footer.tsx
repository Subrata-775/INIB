import { ArrowUp, Heart, Mail } from 'lucide-react';
import { SiGithub, SiX, SiInstagram } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { navLinks, profile, services } from '../data/portfolio';

const socials = [
  { Icon: SiGithub, href: profile.socials.github, label: 'GitHub' },
  { Icon: FaLinkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
  { Icon: Mail, href: profile.socials.email, label: 'Email' },
  { Icon: SiX, href: profile.socials.twitter, label: 'X' },
  { Icon: SiInstagram, href: profile.socials.instagram, label: 'Instagram' },
];

export default function Footer() {
  const handleNav = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden border-t border-soft pt-16">
      <div className="absolute inset-0 -z-10 bg-hero-gradient opacity-20" />
      <div className="container-x px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => handleNav('#home')} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 font-display text-sm font-bold text-white shadow-glow">
                AS
              </span>
              <span className="font-display text-base font-semibold">
                {profile.firstName}
                <span className="text-gradient">.</span>
              </span>
            </button>
            <p className="text-muted mt-4 max-w-xs text-sm leading-relaxed">
              {profile.intro}
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-soft text-muted transition-all hover:-translate-y-1 hover:border-primary-500/50 hover:text-primary-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-muted text-sm transition-colors hover:text-primary-500"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.title}>
                  <button
                    onClick={() => handleNav('#services')}
                    className="text-muted text-left text-sm transition-colors hover:text-primary-500"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="text-muted">{profile.location}</li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-muted transition-colors hover:text-primary-500"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone}`}
                  className="text-muted transition-colors hover:text-primary-500"
                >
                  {profile.phone}
                </a>
              </li>
            </ul>
            <button
              onClick={() => handleNav('#contact')}
              className="btn-primary mt-5 py-2.5 text-xs"
            >
              Start a project
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-soft py-6 sm:flex-row">
          <p className="text-muted flex items-center gap-1.5 text-sm">
            © {new Date().getFullYear()} {profile.name}. Built with
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
            and React.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-muted flex items-center gap-1.5 text-sm transition-colors hover:text-primary-500"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
