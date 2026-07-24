import Link from "next/link";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Furniture", href: "/shop" },
      { label: "Living Room", href: "/shop?category=living-room" },
      { label: "Bedroom", href: "/shop?category=bedroom" },
      { label: "Lighting", href: "/shop?category=lighting" },
      { label: "Accessories", href: "/shop?category=accessories" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Journal", href: "/blog" },
      { label: "Sustainability", href: "/about#sustainability" },
      { label: "Trade Program", href: "/about#trade" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Shipping", href: "/faq#shipping" },
      { label: "Returns", href: "/faq#returns" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-serif text-3xl font-semibold tracking-[0.2em]">
              LUX
            </span>
            <p className="mt-6 text-sm leading-relaxed text-cream/70 max-w-xs">
              Curated furniture and home objects crafted by artisans around the
              world. Designed to last generations.
            </p>

            <form
              action="#"
              className="mt-8 flex border-b border-cream/20 pb-2 max-w-xs"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="flex-1 bg-transparent placeholder:text-cream/40 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="text-xs tracking-[0.15em] uppercase hover:text-gold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs tracking-[0.2em] uppercase text-gold mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/70 hover:text-cream transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/50 tracking-wide">
            © {new Date().getFullYear()} LUX Atelier. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-cream/50 tracking-wide">
            <a href="#" className="hover:text-cream transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
