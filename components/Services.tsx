import { Home, Ruler, Hammer } from "lucide-react";
import Reveal from "./ui/Reveal";

const SERVICES = [
  {
    icon: Home,
    title: "New Home Construction",
    description:
      "Complete home builds from foundation to finish, designed around how your family lives.",
  },
  {
    icon: Ruler,
    title: "Custom Design",
    description:
      "Modern architectural designs tailored to your plot, budget, and lifestyle.",
  },
  {
    icon: Hammer,
    title: "Renovation & Remodeling",
    description:
      "Transform your existing home with expert renovation and remodeling services.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-surface px-6 py-24 md:px-10" aria-label="Services">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">Our Services</h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: "var(--blue)" }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-navy">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
