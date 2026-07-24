import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal — LUX",
  description: "Stories, guides, and inspiration from the LUX atelier.",
};

const posts = [
  {
    title: "The Return of Natural Materials",
    cat: "Trends",
    date: "March 14, 2026",
    excerpt:
      "From limewash walls to unglazed ceramics, the language of the handmade is returning to modern interiors — and for good reason.",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Inside a Copenhagen Apartment",
    cat: "Interiors",
    date: "February 28, 2026",
    excerpt:
      "A tour of a designer's home where Danish restraint meets quiet Japanese influence — and the furniture that makes it sing.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "How to Choose a Sofa That Lasts",
    cat: "Guides",
    date: "February 10, 2026",
    excerpt:
      "The frame, the foam, the fabric — and the five questions to ask before committing to the most important piece in your home.",
    img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "A Visit to the Linen Weavers of Ghent",
    cat: "Makers",
    date: "January 22, 2026",
    excerpt:
      "Four generations, one loom, and the slow philosophy behind the world's most coveted natural textile.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Lighting: The Overlooked Luxury",
    cat: "Guides",
    date: "January 08, 2026",
    excerpt:
      "Why the lamps you choose matter more than the furniture — and how to layer light for a truly livable room.",
    img: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "The Case for the Wooden Dining Table",
    cat: "Essays",
    date: "December 18, 2025",
    excerpt:
      "It will get scratched. It will get stained. And somehow, it will only grow more beautiful — which is rather the point.",
    img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
            The Journal
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal">
            Stories & Inspiration
          </h1>
          <p className="mt-5 text-warm-gray max-w-xl mx-auto">
            Dispatches from the world of considered design — makers,
            interiors, and the ideas behind beautiful things.
          </p>
        </div>

        {/* Featured */}
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 pb-16 border-b border-sand">
          <div className="aspect-[4/3] overflow-hidden bg-sand">
            <img
              src={featured.img}
              alt={featured.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gold">
              {featured.cat}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-tight">
              {featured.title}
            </h2>
            <p className="mt-5 text-warm-gray leading-relaxed text-lg">
              {featured.excerpt}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs text-warm-gray tracking-wide">
                {featured.date}
              </span>
              <a
                href="#"
                className="text-sm tracking-wide border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors"
              >
                Read Article →
              </a>
            </div>
          </div>
        </article>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {rest.map((post) => (
            <article key={post.title} className="group">
              <div className="aspect-[4/3] overflow-hidden bg-sand">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-xs tracking-[0.2em] uppercase text-gold mt-5">
                {post.cat}
              </p>
              <h3 className="font-serif text-2xl mt-2 group-hover:text-gold transition-colors">
                {post.title}
              </h3>
              <p className="mt-3 text-warm-gray text-sm leading-relaxed">
                {post.excerpt}
              </p>
              <p className="mt-4 text-xs text-warm-gray/70">{post.date}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
