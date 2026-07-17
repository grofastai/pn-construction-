import Image from "next/image";
import Reveal from "./ui/Reveal";

export default function About() {
  return (
    <section id="about" className="bg-white px-6 py-24 md:px-10" aria-label="About">
      <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/portfolio/6.jpg"
              alt="Modern residential architecture, representative of the design style PN Construction Builders works in"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            About Us
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
            About PN Construction Builders
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
            PN Construction Builders is a Krishnagiri-based home construction company
            committed to building homes that blend modern design with lasting quality.
            From the first sketch to the final handover, we work closely with every
            family to turn their vision into a place they&apos;re proud to call home.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            We believe good construction is built on trust, clear communication, and
            attention to detail — at every stage of the project.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
