"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Star, Share2, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductDetailClient({ product }: { product: Product }) {
  const [qty, setQty] = useState(product.unit === "kg" ? 0.25 : 1);
  const [imgIdx, setImgIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: qty,
      unit: product.unit,
      image: product.images[0] || "",
    });
    toast({ title: "Added to cart", description: `${product.name} × ${qty}` });
  };

  const step = product.unit === "kg" ? 0.25 : 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl">
            <Image
              src={product.images[imgIdx] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="50vw"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 ${
                    imgIdx === i ? "border-saffron" : "border-transparent"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex flex-wrap gap-2">
            {product.isBestSeller && <Badge variant="saffron">Best Seller</Badge>}
            {product.isVeg && (
              <Badge variant="veg">
                <Leaf className="mr-1 h-3 w-3" /> Pure Veg
              </Badge>
            )}
            {product.isFreshDaily && <Badge variant="haldi">Fresh Daily</Badge>}
          </div>

          <h1 className="mt-4 font-serif text-4xl font-bold text-maroon dark:text-cream">
            {product.name}
          </h1>
          {product.nameHindi && (
            <p className="text-lg text-spice-warm/70">{product.nameHindi}</p>
          )}

          <div className="mt-2 flex items-center gap-2">
            <Star className="h-5 w-5 fill-haldi text-haldi" />
            <span className="font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-spice-warm/60">({product.reviewCount} reviews)</span>
          </div>

          <p className="mt-6 font-serif text-3xl font-bold text-saffron">
            {formatPrice(product.price)}
            <span className="text-base font-normal text-spice-warm"> / {product.unit}</span>
          </p>

          <p className="mt-6 leading-relaxed text-spice-warm dark:text-cream/80">
            {product.story}
          </p>

          {product.grandmotherNote && (
            <blockquote className="mt-6 rounded-xl border-l-4 border-maroon bg-cream-dark p-6 font-handwritten text-xl text-maroon dark:bg-spice-brown/50 dark:text-haldi">
              {product.grandmotherNote}
            </blockquote>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-spice-warm/20">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQty(Math.max(product.minQuantity, qty - step))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-16 text-center font-semibold">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty(qty + step)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="saffron" size="lg" className="flex-1" onClick={handleAdd}>
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                navigator.share?.({
                  title: product.name,
                  url: window.location.href,
                });
              }}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 space-y-8">
            <section>
              <h3 className="font-serif text-xl font-semibold text-maroon dark:text-cream">
                Ingredients
              </h3>
              <ul className="mt-3 list-inside list-disc text-spice-warm">
                {product.ingredients.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-serif text-xl font-semibold text-maroon dark:text-cream">
                Preparation
              </h3>
              <p className="mt-2 text-spice-warm">{product.preparationStyle}</p>
              {product.preparationTimeline && (
                <ol className="mt-4 space-y-2">
                  {product.preparationTimeline.map((step, i) => (
                    <li key={i} className="flex justify-between border-b border-spice-warm/10 py-2 text-sm">
                      <span>{step.step}</span>
                      <span className="text-saffron">{step.duration}</span>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            {product.nutrition && (
              <section>
                <h3 className="font-serif text-xl font-semibold text-maroon dark:text-cream">
                  Nutrition (approx per serving)
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                  {product.nutrition.calories && (
                    <div className="rounded-lg bg-cream-dark p-3 dark:bg-spice-brown/50">
                      <span className="text-spice-warm/60">Calories</span>
                      <p className="font-semibold">{product.nutrition.calories}</p>
                    </div>
                  )}
                  {product.nutrition.protein && (
                    <div className="rounded-lg bg-cream-dark p-3 dark:bg-spice-brown/50">
                      <span className="text-spice-warm/60">Protein</span>
                      <p className="font-semibold">{product.nutrition.protein}</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          <Link href="/menu" className="mt-8 inline-block text-maroon hover:text-saffron">
            ← Back to Menu
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
