"use client";

import Link from "next/link";
import { Heart, X, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { items, remove } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Heart size={48} className="mx-auto text-warm-gray" strokeWidth={1} />
          <h1 className="font-serif text-5xl text-charcoal mt-8">
            Your wishlist is empty
          </h1>
          <p className="mt-5 text-warm-gray">
            Save pieces you love by tapping the heart on any product.
          </p>
          <Link
            href="/shop"
            className="mt-10 inline-flex items-center gap-2 bg-charcoal text-cream px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-gold transition-colors"
          >
            Discover the Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
              Saved
            </p>
            <h1 className="font-serif text-5xl text-charcoal">Wishlist</h1>
            <p className="text-warm-gray mt-3">
              {items.length} piece{items.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items.map((item) => (
            <div key={item.id} className="group relative">
              <Link href={`/shop/${item.id}`} className="block relative overflow-hidden">
                <div className="aspect-[4/5] bg-sand overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>
              <button
                onClick={() => remove(item.id)}
                className="absolute top-4 right-4 p-2.5 bg-cream/90 backdrop-blur-sm hover:bg-cream text-charcoal rounded-full"
                aria-label="Remove from wishlist"
              >
                <X size={16} />
              </button>
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <Link href={`/shop/${item.id}`}>
                    <h3 className="font-serif text-lg hover:text-gold transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                </div>
                <p className="font-serif text-lg">
                  {formatPrice(item.price)}
                </p>
              </div>
              <Link
                href={`/shop/${item.id}`}
                className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase border-b border-charcoal pb-1 hover:text-gold hover:border-gold transition-colors"
              >
                <ShoppingBag size={12} /> Add to Bag
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
