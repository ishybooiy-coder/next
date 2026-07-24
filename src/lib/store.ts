"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">) => void;
  remove: (id: number, variant?: string) => void;
  updateQty: (id: number, quantity: number, variant?: string) => void;
  clear: () => void;
  cartCount: number;
  cartTotal: number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.id === item.id && i.variant === item.variant
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.variant === item.variant
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
      },
      remove: (id, variant) =>
        set({
          items: get().items.filter(
            (i) => !(i.id === id && i.variant === variant)
          ),
        }),
      updateQty: (id, quantity, variant) => {
        if (quantity <= 0) return get().remove(id, variant);
        set({
          items: get().items.map((i) =>
            i.id === id && i.variant === variant ? { ...i, quantity } : i
          ),
        });
      },
      clear: () => set({ items: [] }),
      get cartCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
      get cartTotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },
    }),
    {
      name: "lux-cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : (undefined as any)
      ),
    }
  )
);

// Helper selectors to avoid getter issues with persist
export const useCartCount = () =>
  useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
export const useCartTotal = () =>
  useCart((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));

export type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type WishlistState = {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  remove: (id: number) => void;
  has: (id: number) => boolean;
  wishlistCount: number;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) => {
        const exists = get().items.find((i) => i.id === item.id);
        if (exists) {
          set({ items: get().items.filter((i) => i.id !== item.id) });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      has: (id) => get().items.some((i) => i.id === id),
      get wishlistCount() {
        return get().items.length;
      },
    }),
    {
      name: "lux-wishlist",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? window.localStorage : (undefined as any)
      ),
    }
  )
);

export const useWishlistCount = () => useWishlist((s) => s.items.length);
export const useHasInWishlist = (id: number) =>
  useWishlist((s) => s.items.some((i) => i.id === id));
