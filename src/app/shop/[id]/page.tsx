import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ProductDetail } from "./ProductDetail";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const idNum = parseInt(id, 10);
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, idNum))
    .limit(1);
  if (!product) return { title: "Not found" };
  return {
    title: `${product.name} — LUX`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const idNum = parseInt(id, 10);
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, idNum))
    .limit(1);

  if (!product) notFound();

  const related = await db
    .select()
    .from(products)
    .where(eq(products.category, product.category))
    .limit(4);

  const relatedFiltered = related.filter((p) => p.id !== product.id).slice(0, 4);

  return <ProductDetail product={product} related={relatedFiltered} />;
}
