import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductCard } from "@/components/ProductCard";
import { eq, and, like, type SQL } from "drizzle-orm";
import Link from "next/link";
import type { Metadata } from "next";
import { ShopSortForm } from "./ShopSortForm";

export const metadata: Metadata = {
  title: "Shop — LUX",
  description: "Browse the full LUX collection.",
};

export const dynamic = "force-dynamic";

const categories = [
  { value: "", label: "All" },
  { value: "living-room", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "dining", label: "Dining" },
  { value: "lighting", label: "Lighting" },
  { value: "accessories", label: "Accessories" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}) {
  const { category, search, sort } = await searchParams;

  const conditions: SQL[] = [];
  if (category) conditions.push(eq(products.category, category));
  if (search) conditions.push(like(products.name, `%${search}%`));

  let allProducts = conditions.length
    ? await db.select().from(products).where(and(...conditions))
    : await db.select().from(products);

  switch (sort) {
    case "newest":
      allProducts = [...allProducts].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      break;
    case "price-asc":
      allProducts = [...allProducts].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      allProducts = [...allProducts].sort((a, b) => b.price - a.price);
      break;
    default:
      allProducts = [...allProducts].sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      );
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
            The Collection
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-charcoal">
            {category
              ? categories.find((c) => c.value === category)?.label ?? "Shop"
              : search
                ? `Results for "${search}"`
                : "All Furniture"}
          </h1>
          <p className="mt-4 text-warm-gray max-w-xl mx-auto">
            {allProducts.length} piece{allProducts.length === 1 ? "" : "s"} ·
            Crafted by hand, delivered to your door.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-sand">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = (category ?? "") === cat.value;
              return (
                <Link
                  key={cat.value}
                  href={
                    cat.value
                      ? `/shop?category=${cat.value}${search ? `&search=${encodeURIComponent(search)}` : ""}`
                      : `/shop${search ? `?search=${encodeURIComponent(search)}` : ""}`
                  }
                  className={`px-4 py-2 text-xs tracking-[0.15em] uppercase border transition-colors ${
                    active
                      ? "bg-charcoal text-cream border-charcoal"
                      : "bg-transparent text-charcoal border-sand-dark hover:border-charcoal"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>

          <ShopSortForm
            category={category}
            search={search}
            sort={sort ?? "featured"}
          />
        </div>

        {/* Grid */}
        {allProducts.length === 0 ? (
          <div className="text-center py-24 text-warm-gray">
            <p className="text-lg">No pieces match your criteria.</p>
            <Link
              href="/shop"
              className="mt-4 inline-block text-sm tracking-wide underline hover:text-gold"
            >
              View all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 mt-10">
            {allProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
