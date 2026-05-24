import Link from "next/link";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { getSeedProducts } from "@/data/seed-products";

async function getFeatured(): Promise<Product[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/products?bestSeller=true`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      return data.slice(0, 4);
    }
  } catch {
    /* fallback */
  }
  return getSeedProducts()
    .filter((p) => p.isBestSeller)
    .slice(0, 4)
    .map((p, i) => ({
      ...p,
      _id: `seed-${i}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })) as Product[];
}

export async function FeaturedProducts() {
  const products = await getFeatured();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-4xl font-bold text-maroon dark:text-cream">
              Featured Snacks
            </h2>
            <p className="mt-2 text-spice-warm">Customer favourites from our kitchen</p>
          </div>
          <Link href="/menu" className="hidden sm:block">
            <Button variant="outline">View Full Menu</Button>
          </Link>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
