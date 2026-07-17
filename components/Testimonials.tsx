import { Quote } from "lucide-react";
import Reveal from "./ui/Reveal";

/**
 * Placeholder quotes for the pitch demo — not real client testimonials.
 * Replace with PN Construction's actual client feedback once available.
 */
const TESTIMONIALS = [
  {
    quote:
      "PN Construction turned our dream home into reality. The process was smooth from start to finish.",
    name: "Sample Client",
    location: "Krishnagiri",
  },
  {
    quote:
      "Professional, punctual, and precise. Highly recommend for anyone building a new home.",
    name: "Sample Client",
    location: "Krishnagiri",
  },
  {
    quote:
      "The design work exceeded our expectations. Truly a modern, comfortable home.",
    name: "Sample Client",
    location: "Krishnagiri",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white px-6 py-24 md:px-10"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
            What Clients Say
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-surface p-8">
                <Quote size={28} className="text-blue" style={{ opacity: 0.4 }} />
                <p className="mt-4 text-sm leading-relaxed text-charcoal">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 text-sm font-semibold text-navy">{t.name}</div>
                <div className="text-xs text-muted">{t.location}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
