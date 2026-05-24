import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/products/product-detail-client";
import type { Product } from "@/types";
import { getSeedProducts } from "@/data/seed-products";
import { slugify } from "@/lib/utils";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/products/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) return res.json();
  } catch {
    /* fallback */
  }
  const products = getSeedProducts();
  const product = products.find((p) => slugify(p.name) === slug);
  if (!product) return null;
  const idx = products.indexOf(product);
  return {
    ...product,
    _id: `seed-${idx}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Product;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
