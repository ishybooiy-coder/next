"use client";

import Link from "next/link";
import { useState, useEffect, type FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useCartCount, useWishlistCount } from "../lib/store";
import { debounce } from "../lib/utils";

const navLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Living Room", href: "/shop?category=living-room" },
  { label: "Bedroom", href: "/shop?category=bedroom" },
  { label: "Lighting", href: "/shop?category=lighting" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();

  useEffect(() => {
    const handleScroll = debounce(() => setScrolled(window.scrollY > 20), 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isActive = (href: string) => {
    if (href === "/shop" && pathname?.startsWith("/shop") && !href.includes("?")) return true;
    if (href !== "/shop" && pathname === href) return true;
    return false;
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-charcoal text-cream text-xs tracking-[0.15em] uppercase overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-2.5">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              <span className="px-8">
                Complimentary white-glove delivery on orders over $1,500
              </span>
              <span className="px-8 text-gold">✦</span>
              <span className="px-8">New Spring Collection — Now Available</span>
              <span className="px-8 text-gold">✦</span>
              <span className="px-8">
                Trade program now open for designers
              </span>
              <span className="px-8 text-gold">✦</span>
            </div>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-cream"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Left nav */}
            <div className="hidden lg:flex items-center gap-8 flex-1">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors ${
                    isActive(link.href)
                      ? "text-charcoal underline"
                      : "text-charcoal/80 hover:text-charcoal hover:underline"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-1 lg:flex-none text-center">
              <span className="font-serif text-3xl lg:text-4xl font-semibold tracking-[0.2em] text-charcoal">
                LUX
              </span>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-5 flex-1 justify-end">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 hover:text-gold transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                href="/wishlist"
                className="p-1.5 hover:text-gold transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-1.5 hover:text-gold transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <form
                  onSubmit={handleSearch}
                  className="pb-5 flex gap-3 items-center"
                >
                  <Search size={18} className="text-warm-gray" />

                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for sofas, lighting, rugs…"
                    className="flex-1 bg-transparent border-b border-sand-dark pb-2 text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:border-gold transition-colors"
                  />

                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="text-sm text-warm-gray hover:text-charcoal"
                  >
                    Close
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Secondary nav */}
        <div className="hidden lg:block border-t border-sand/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-center justify-center gap-10 h-11">
              {navLinks.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-[0.15em] uppercase transition-colors ${
                    isActive(link.href)
                      ? "text-charcoal underline"
                      : "text-charcoal/70 hover:text-charcoal hover:underline"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-cream lg:hidden overflow-y-auto"
          >
            <div className="pt-20 px-6 pb-10 space-y-1">
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 hover:text-gold transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-4 text-2xl font-serif border-b border-sand/50 transition-colors ${
                    isActive(link.href)
                      ? "text-charcoal font-bold"
                      : "text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
