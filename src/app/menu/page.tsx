import { MenuClient } from "@/components/menu/menu-client";
import type { Product } from "@/types";
import { getSeedProducts } from "@/data/seed-products";

async function getProducts(): Promise<Product[]> {
  try {
    const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/products`, { next: { revalidate: 60 } });
    if (res.ok) return res.json();
  } catch {
    /* fallback */
  }
  return getSeedProducts().map((p, i) => ({
    ...p,
    _id: `seed-${i}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })) as Product[];
}

export const metadata = {
  title: "Menu",
  description: "Explore our handcrafted mathri, samosa, kachori, namkeen, and traditional sweets.",
};

export default async function MenuPage() {
  const products = await getProducts();
  return (
    <div className="bg-cream pb-24 dark:bg-spice-brown">
      <div className="border-b border-spice-warm/10 bg-rajasthan-pattern py-16 text-center">
        <h1 className="font-serif text-5xl font-bold text-maroon dark:text-cream">
          Our Menu
        </h1>
        <p className="mt-4 font-handwritten text-2xl text-saffron">
          Handcrafted with love, priced per tradition
        </p>
      </div>
      <MenuClient initialProducts={products} />
    </div>
  );
}
