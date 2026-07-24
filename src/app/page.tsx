import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

const collections = [
  {
    title: "Living Room",
    category: "living-room",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80&auto=format&fit=crop",
  },
  {
    title: "Bedroom",
    category: "bedroom",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80&auto=format&fit=crop",
  },
  {
    title: "Lighting",
    category: "lighting",
    image:
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=900&q=80&auto=format&fit=crop",
  },
];

export default async function Home() {
  const featured = await db
    .select()
    .from(products)
    .where(eq(products.featured, true))
    .limit(4);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1800&q=85&auto=format&fit=crop"
          alt="Modern living room"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent" />

        <div className="relative mx-auto max-w-7xl h-full flex flex-col justify-end pb-20 px-6 lg:px-10">
          <p className="text-cream/80 tracking-[0.2em] uppercase text-sm mb-5">
            Spring Collection · 2026
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream max-w-4xl leading-[1.05]">
            Quiet luxury, made to live with.
          </h1>
          <p className="mt-6 text-cream/80 max-w-xl text-lg leading-relaxed">
            A considered edit of furniture and objects from independent makers
            — designed to age gracefully and feel at home for decades.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-cream text-charcoal px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-gold hover:text-cream transition-colors"
            >
              Shop the Collection
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-cream/60 text-cream px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-cream/10 transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee of values */}
      <section className="border-y border-sand bg-cream py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { title: "Free Shipping", sub: "On orders over $1,500" },
              { title: "White Glove", sub: "Delivery & assembly included" },
              { title: "10-Year Warranty", sub: "On all upholstered pieces" },
              { title: "Trade Program", sub: "20% off for designers" },
            ].map((v) => (
              <div key={v.title}>
                <p className="font-serif text-lg text-charcoal">{v.title}</p>
                <p className="text-xs text-warm-gray mt-1 tracking-wide">
                  {v.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
                Curated
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                Featured Pieces
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-sm tracking-wide text-charcoal hover:text-gold transition-colors"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {featured.length > 0
              ? featured.map((p) => <ProductCard key={p.id} product={p} />)
              : Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] bg-sand animate-pulse rounded"
                  />
                ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-24 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
              Explore
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
              Shop by Room
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((col) => (
              <Link
                key={col.category}
                href={`/shop?category=${col.category}`}
                className="group relative block aspect-[3/4] overflow-hidden"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="font-serif text-3xl text-cream">
                    {col.title}
                  </h3>
                  <p className="mt-2 text-cream/80 text-sm tracking-wide inline-flex items-center gap-2">
                    Shop now <ArrowRight size={14} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=80&auto=format&fit=crop"
              alt="Craftsman at work"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-4">
              The LUX Philosophy
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">
              Fewer, better things.
            </h2>
            <p className="mt-6 text-warm-gray leading-relaxed text-lg">
              We believe the things we live with should be as considered as the
              lives we lead. Every piece in our collection is made by hand, by
              artisans we know by name, using materials that will only grow more
              beautiful with time.
            </p>
            <p className="mt-4 text-warm-gray leading-relaxed">
              From the linen sofas woven in Belgium to the oak dining tables
              shaped in Kyoto — each object carries a story, and the quiet
              confidence of slow craft.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-charcoal border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors"
            >
              Read Our Story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="py-24 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
                The Journal
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal">
                Stories & Inspiration
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-sm tracking-wide text-charcoal hover:text-gold transition-colors"
            >
              All Articles <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "The Return of Natural Materials",
                cat: "Trends",
                img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80&auto=format&fit=crop",
              },
              {
                title: "Inside a Copenhagen Apartment",
                cat: "Interiors",
                img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format&fit=crop",
              },
              {
                title: "How to Choose a Sofa That Lasts",
                cat: "Guides",
                img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80&auto=format&fit=crop",
              },
            ].map((post) => (
              <Link
                key={post.title}
                href="/blog"
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden bg-sand">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs tracking-[0.15em] uppercase text-gold mt-5">
                  {post.cat}
                </p>
                <h3 className="font-serif text-2xl mt-2 group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-charcoal text-cream">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl">
            Stay in the atelier.
          </h2>
          <p className="mt-5 text-cream/70 leading-relaxed">
            Receive new arrivals, atelier dispatches, and 10% off your first
            order.
          </p>
          <form
            action="#"
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="flex-1 bg-transparent border border-cream/30 px-5 py-4 text-sm placeholder:text-cream/40 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="bg-gold text-cream px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-cream hover:text-charcoal transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
