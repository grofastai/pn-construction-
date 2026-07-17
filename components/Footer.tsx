import Logo from "./Logo";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy px-6 py-14 text-white md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            Building homes, building trust — PN Construction Builders, Krishnagiri.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/80">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/50">
        &copy; {new Date().getFullYear()} PN Construction Builders. All rights reserved.
      </div>
    </footer>
  );
}
