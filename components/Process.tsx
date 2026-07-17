import Reveal from "./ui/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Consultation",
    description: "We start by understanding your vision, budget, and land.",
  },
  {
    number: "02",
    title: "Design",
    description: "Our team creates a custom design plan tailored to your needs.",
  },
  {
    number: "03",
    title: "Construction",
    description:
      "Skilled teams bring the design to life with quality materials and craftsmanship.",
  },
  {
    number: "04",
    title: "Handover",
    description: "We deliver your finished home, ready to move in.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-white px-6 py-24 md:px-10" aria-label="Our process">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            How We Work
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">Our Process</h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div className="relative">
                <span
                  className="text-5xl font-bold"
                  style={{ color: "var(--blue)", opacity: 0.25 }}
                >
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
