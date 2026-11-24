import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { SiGithub, SiX, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useState, type FormEvent } from "react";
import { profile } from "../../data/portfolio";
import { SectionHeading } from "../ui/Reveal";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const initial: FormState = { name: "", email: "", subject: "", message: "" };

const contactInfo = [
  { icon: MapPin, label: "Location", value: profile.location },
  {
    icon: Phone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  { icon: Clock, label: "Availability", value: profile.availability },
];

const socials = [
  { icon: SiGithub, href: profile.socials.github, label: "GitHub" },
  { icon: FaLinkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: SiX, href: profile.socials.twitter, label: "X" },
  { icon: SiInstagram, href: profile.socials.instagram, label: "Instagram" },
];

function validate(form: FormState): Errors {
  const e: Errors = {};
  if (!form.name.trim()) e.name = "Please enter your name.";
  if (!form.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = "Enter a valid email.";
  if (!form.subject.trim()) e.subject = "Please add a subject.";
  if (!form.message.trim()) e.message = "Please write a message.";
  else if (form.message.trim().length < 10) e.message = "Message is too short.";
  return e;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errs = validate(form);
    setErrors(errs);

    if (Object.keys(errs).length) return;

    setStatus("sending");

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      console.log(result.text);

      setStatus("sent");
      setForm(initial);

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (error) {
      console.error(error);
      alert("Failed to send email.");
      setStatus("idle");
    }
  };
  const fieldClass = (key: keyof FormState) =>
    `w-full rounded-xl
   border
   ${errors[key] ? "border-red-500/60" : "border-soft"}
   bg-white
   px-4 py-3
   text-base
   text-gray-900
   placeholder:text-gray-400
   caret-primary-500
   outline-none
   transition-all duration-200
   focus:border-primary-500
   focus:ring-2 focus:ring-primary-500/20`;
  return (
    <section id="contact" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build"
          highlight="something"
          subtitle="Have a project, role, or idea in mind? I'd love to hear about it."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Left — info */}
          <div className="space-y-4">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="glass-card flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 text-primary-500">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-muted text-xs font-medium uppercase tracking-wide">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium hover:text-primary-500"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="text-sm font-medium">{value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="glass-card p-5">
              <div className="text-muted mb-3 text-xs font-medium uppercase tracking-wide">
                Follow me
              </div>
              <div className="flex gap-2.5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-soft text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/50 hover:text-primary-500"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <form
            onSubmit={onSubmit}
            className="glass-card space-y-5 p-6 sm:p-8"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label className="text-muted mb-2 block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your Name"
                  required
                  className={`w-full rounded-xl border ${
                    errors.name ? "border-red-500/60" : "border-soft"
                  } bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 caret-primary-500 outline-none transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-muted mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={`w-full rounded-xl border ${
                    errors.email ? "border-red-500/60" : "border-soft"
                  } bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 caret-primary-500 outline-none transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="text-muted mb-2 block text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="What's this about?"
                required
                className={`w-full rounded-xl border ${
                  errors.subject ? "border-red-500/60" : "border-soft"
                } bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 caret-primary-500 outline-none transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-muted mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                value={form.message}
                name="message"
                onChange={(e) => update("message", e.target.value)}
                rows={6}
                placeholder="Tell me about your project..."
                required
                className={`w-full resize-none rounded-xl border ${
                  errors.message ? "border-red-500/60" : "border-soft"
                } bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 caret-primary-500 outline-none transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>

            <AnimatePresence>
              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Message sent successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
