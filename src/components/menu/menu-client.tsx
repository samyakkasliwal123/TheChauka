"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/product-card";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function MenuClient({ initialProducts }: { initialProducts: Product[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());

  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchCat = !category || p.category === category;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [initialProducts, category, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-spice-warm/50" />
        <Input
          placeholder="Search mathri, samosa, ladoo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory(null)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
            !category
              ? "bg-maroon text-cream"
              : "bg-cream-dark text-spice-warm hover:bg-maroon/10 dark:bg-spice-brown/50"
          )}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              category === cat.id
                ? "bg-maroon text-cream"
                : "bg-cream-dark text-spice-warm hover:bg-maroon/10 dark:bg-spice-brown/50"
            )}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm text-spice-warm">
        {filtered.length} items • Most items priced per kg (minimum 250g)
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product, i) => (
          <ProductCard key={product._id} product={product} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-spice-warm">
          No items found. Try a different search.
        </p>
      )}

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-spice-warm/10 bg-cream/95 p-4 backdrop-blur-md dark:bg-spice-brown/95 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{items.length} items • {formatPrice(subtotal)}</span>
            <Link href="/cart">
              <Button variant="saffron">View Cart</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
