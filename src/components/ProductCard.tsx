import Link from "next/link";
import { formatPrice } from "../lib/utils";
import { WishlistButton } from "./WishlistButton";
import type { Product } from "../db/schema";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <Link href={`/shop/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-[4/5] bg-sand overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <WishlistButton product={product} />
        </div>
        {product.featured && (
          <div className="absolute top-4 left-4 bg-charcoal text-cream text-[10px] tracking-[0.15em] uppercase px-3 py-1.5">
            Featured
          </div>
        )}
      </Link>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-serif text-lg text-charcoal hover:text-gold transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-warm-gray tracking-wide uppercase mt-1">
            {product.category.replace("-", " ")}
          </p>
        </div>
        <p className="font-serif text-lg text-charcoal">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}
