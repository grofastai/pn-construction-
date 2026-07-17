"use client";

import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Reveal from "./ui/Reveal";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="bg-surface px-6 py-24 md:px-10" aria-label="Contact">
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Get In Touch
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
            Let&apos;s Build Your Home
          </h2>
          <p className="mt-4 text-base text-muted">
            Tell us about your project and we&apos;ll get back to you.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue/10">
                <Phone size={18} className="text-blue" />
              </div>
              <span className="text-sm text-charcoal">+91 XXXXX XXXXX</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue/10">
                <Mail size={18} className="text-blue" />
              </div>
              <span className="text-sm text-charcoal">
                info@pnconstructionbuilders.example
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue/10">
                <MapPin size={18} className="text-blue" />
              </div>
              <span className="text-sm text-charcoal">Krishnagiri, Tamil Nadu, India</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-navy">Thank you!</h3>
                <p className="mt-2 text-sm text-muted">
                  We&apos;ve received your message and will be in touch soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-blue"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-blue"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                  >
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    className="w-full rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-blue"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className="w-full resize-none rounded-lg border border-navy/10 bg-surface px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-blue"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-blue-dark"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
