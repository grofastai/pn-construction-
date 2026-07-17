import Image from "next/image";
import Reveal from "./ui/Reveal";

const IMAGES = Array.from({ length: 8 }, (_, i) => `/images/portfolio/${i + 1}.jpg`);

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-surface px-6 py-24 md:px-10" aria-label="Portfolio">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
            Design Inspiration
          </span>
          <h2 className="mt-4 text-3xl font-bold text-navy md:text-4xl">
            The Style We Build
          </h2>
          <p className="mt-4 text-sm text-muted">
            A showcase of the modern residential design aesthetic we bring to every
            project.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {IMAGES.map((src, i) => (
            <Reveal key={src} delay={(i % 4) * 0.08} className="aspect-square">
              <div className="group relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={`Modern residential design reference ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-pn-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
