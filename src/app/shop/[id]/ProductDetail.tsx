"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Heart, Truck, Shield, RotateCcw } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCart, useWishlist, useHasInWishlist, type WishlistItem } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/db/schema";

const variants: Record<string, string[]> = {
  "living-room": ["Natural Linen", "Charcoal Bouclé", "Sage Velvet"],
  bedroom: ["Oak", "Walnut", "Ash"],
  lighting: ["Brass", "Blackened Steel", "Aged Bronze"],
  dining: ["Oak", "Walnut", "Marble"],
  accessories: ["Ivory", "Terracotta", "Stone"],
};

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const { add } = useCart();
  const { toggle } = useWishlist();
  const has = useHasInWishlist(product.id);

  const gallery = [product.image, ...(product.gallery || [])];
  const variantList = variants[product.category] || ["One Size"];
  const variantName = variantList[selectedVariant];

  const wishlistItem: WishlistItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  };

  const handleAdd = () => {
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: variantName,
    });
    for (let i = 1; i < qty; i++) {
      add({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: variantName,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav className="text-xs tracking-wide text-warm-gray mb-10">
          <Link href="/" className="hover:text-charcoal">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-charcoal">Shop</Link>
          <span className="mx-2">/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-charcoal"
          >
            {product.category.replace("-", " ")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-sand overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={gallery[selectedImage]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden bg-sand transition-opacity ${
                      selectedImage === i ? "opacity-100" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
              {product.category.replace("-", " ")}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal">
              {product.name}
            </h1>
            <p className="font-serif text-2xl text-charcoal mt-4">
              {formatPrice(product.price)}
            </p>

            <p className="mt-8 text-warm-gray leading-relaxed">
              {product.description}
            </p>

            {/* Variant */}
            <div className="mt-10">
              <p className="text-xs tracking-[0.15em] uppercase text-charcoal mb-3">
                {product.category === "lighting" ||
                product.category === "accessories"
                  ? "Finish"
                  : "Upholstery"}{" "}
                · <span className="text-warm-gray">{variantName}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {variantList.map((v, i) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(i)}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      selectedVariant === i
                        ? "border-charcoal bg-charcoal text-cream"
                        : "border-sand-dark hover:border-charcoal"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8 flex items-center gap-6">
              <p className="text-xs tracking-[0.15em] uppercase text-charcoal">
                Quantity
              </p>
              <div className="flex items-center border border-sand-dark">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 hover:bg-sand/50 transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="px-6 text-sm min-w-[3rem] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(10, qty + 1))}
                  className="p-3 hover:bg-sand/50 transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 bg-charcoal text-cream py-5 text-sm tracking-[0.15em] uppercase hover:bg-gold transition-colors"
              >
                {added ? "✓ Added to Bag" : "Add to Bag"}
              </button>
              <button
                onClick={() => toggle(wishlistItem)}
                className="px-6 py-5 border border-charcoal hover:bg-charcoal hover:text-cream transition-colors flex items-center justify-center gap-2"
              >
                <Heart size={16} fill={has ? "currentColor" : "none"} />
                <span className="text-sm tracking-[0.15em] uppercase">
                  {has ? "Saved" : "Save"}
                </span>
              </button>
            </div>

            {/* Details */}
            <div className="mt-12 pt-8 border-t border-sand space-y-6">
              <div>
                <h3 className="text-xs tracking-[0.15em] uppercase text-charcoal mb-2">
                  Description
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {product.details}
                </p>
              </div>

              {product.materials?.length > 0 && (
                <div>
                  <h3 className="text-xs tracking-[0.15em] uppercase text-charcoal mb-2">
                    Materials
                  </h3>
                  <p className="text-sm text-warm-gray">
                    {product.materials.join(" · ")}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { Icon: Truck, label: "Free Delivery" },
                  { Icon: Shield, label: "10-Year Warranty" },
                  { Icon: RotateCcw, label: "30-Day Returns" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="text-center">
                    <Icon size={18} className="mx-auto text-gold" />
                    <p className="text-xs mt-2 text-warm-gray">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-serif text-3xl mb-10">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
