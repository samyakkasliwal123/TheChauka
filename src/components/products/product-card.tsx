"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const qty = product.unit === "kg" ? 0.25 : 1;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: qty,
      unit: product.unit,
      image: product.images[0] || "",
    });
    toast({
      title: "Added to cart",
      description: `${product.name} — ${qty} ${product.unit}`,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-spice-warm/10 bg-cream shadow-sm transition-shadow hover:shadow-xl dark:bg-spice-brown/30"
    >
      <Link href={`/menu/${product.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder-food.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-spice-brown/60 to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1">
            {product.isBestSeller && <Badge variant="saffron">Best Seller</Badge>}
            {product.isVeg && <Badge variant="veg">🌿 Veg</Badge>}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/menu/${product.slug}`}>
              <h3 className="font-serif text-lg font-semibold text-maroon group-hover:text-saffron dark:text-cream">
                {product.name}
              </h3>
            </Link>
            {product.nameHindi && (
              <p className="text-xs text-spice-warm/70">{product.nameHindi}</p>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-spice-warm">
            <Star className="h-3 w-3 fill-haldi text-haldi" />
            {product.rating.toFixed(1)}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-spice-warm/80">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-serif text-xl font-bold text-maroon dark:text-saffron">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-spice-warm/60"> / {product.unit}</span>
          </div>
          <Button variant="saffron" size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
