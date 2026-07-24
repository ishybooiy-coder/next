"use client";

import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";
import { useCart, useCartTotal } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, remove, updateQty, clear } = useCart();
  const total = useCartTotal();

  const shipping = total >= 150000 ? 0 : 15000; // $1500 threshold
  const grandTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-serif text-5xl text-charcoal">Your bag is empty</h1>
          <p className="mt-5 text-warm-gray">
            Discover our curated collection of modern furniture and home objects.
          </p>
          <Link
            href="/shop"
            className="mt-10 inline-flex items-center gap-2 bg-charcoal text-cream px-8 py-4 text-sm tracking-[0.15em] uppercase hover:bg-gold transition-colors"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h1 className="font-serif text-5xl text-charcoal mb-2">Shopping Bag</h1>
        <p className="text-warm-gray mb-12">
          {items.length} item{items.length === 1 ? "" : "s"}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => {
              const key = `${item.id}-${item.variant || ""}`;
              return (
                <div
                  key={key}
                  className="flex gap-6 pb-6 border-b border-sand"
                >
                  <Link
                    href={`/shop/${item.id}`}
                    className="w-32 h-40 bg-sand flex-shrink-0 overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <Link
                          href={`/shop/${item.id}`}
                          className="font-serif text-xl hover:text-gold transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.variant && (
                          <p className="text-xs text-warm-gray mt-1 tracking-wide">
                            {item.variant}
                          </p>
                        )}
                      </div>
                      <p className="font-serif text-lg">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-sand-dark">
                        <button
                          onClick={() =>
                            updateQty(item.id, item.quantity - 1, item.variant)
                          }
                          className="p-2 hover:bg-sand/50 text-xs"
                        >
                          −
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQty(item.id, item.quantity + 1, item.variant)
                          }
                          className="p-2 hover:bg-sand/50 text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => remove(item.id, item.variant)}
                        className="text-warm-gray hover:text-charcoal text-xs tracking-wide"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={clear}
              className="text-xs tracking-wide text-warm-gray hover:text-charcoal"
            >
              Clear bag
            </button>
          </div>

          {/* Summary */}
          <div className="bg-ivory p-8 h-fit sticky top-32">
            <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-warm-gray">Subtotal</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-warm-gray">Shipping</dt>
                <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
              </div>
              {shipping === 0 && (
                <p className="text-xs text-gold italic">
                  ✦ White-glove delivery included
                </p>
              )}
              <div className="pt-4 border-t border-sand flex justify-between font-serif text-lg">
                <dt>Total</dt>
                <dd>{formatPrice(grandTotal)}</dd>
              </div>
            </dl>

            <button className="mt-8 w-full bg-charcoal text-cream py-4 text-sm tracking-[0.15em] uppercase hover:bg-gold transition-colors">
              Proceed to Checkout
            </button>

            <p className="mt-4 text-xs text-warm-gray text-center">
              Secure payment · Ships within 2-4 weeks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
