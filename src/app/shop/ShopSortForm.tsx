"use client";

import { useRouter } from "next/navigation";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ShopSortForm({
  category,
  search,
  sort,
}: {
  category?: string;
  search?: string;
  sort: string;
}) {
  const router = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    if (value && value !== "featured") params.set("sort", value);
    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-xs tracking-wide uppercase text-warm-gray">
        Sort
      </label>
      <select
        value={sort}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-transparent border border-sand-dark px-3 py-2 text-sm focus:outline-none focus:border-charcoal cursor-pointer"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
