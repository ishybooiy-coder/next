"use client";

import { Heart } from "lucide-react";
import { useWishlist, useHasInWishlist, type WishlistItem } from "../lib/store";
import type { Product } from "../db/schema";

export function WishlistButton({ product }: { product: Product }) {
  const { toggle } = useWishlist();
  const has = useHasInWishlist(product.id);

  const item: WishlistItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      className={`p-2.5 rounded-full transition-all ${
        has
          ? "bg-gold text-white"
          : "bg-cream/90 backdrop-blur-sm text-charcoal hover:bg-cream"
      }`}
      aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart size={16} fill={has ? "currentColor" : "none"} />
    </button>
  );
}
