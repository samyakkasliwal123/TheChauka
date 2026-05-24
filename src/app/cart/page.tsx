"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { DELIVERY } from "@/lib/constants";
import { calculateDeliveryFee } from "@/lib/delivery";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <p className="font-serif text-2xl text-maroon dark:text-cream">Your cart is empty</p>
        <p className="mt-2 text-spice-warm">Time to taste tradition?</p>
        <Link href="/menu" className="mt-6">
          <Button variant="saffron">Browse Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-maroon dark:text-cream">Your Cart</h1>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 rounded-xl border border-spice-warm/10 bg-cream p-4 dark:bg-spice-brown/30"
          >
            {item.image && (
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </div>
            )}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link href={`/menu/${item.slug}`} className="font-serif text-lg font-semibold text-maroon hover:text-saffron dark:text-cream">
                  {item.name}
                </Link>
                <p className="text-sm text-spice-warm">
                  {formatPrice(item.price)} / {item.unit}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.quantity - (item.unit === "kg" ? 0.25 : 1)
                      )
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.quantity + (item.unit === "kg" ? 0.25 : 1)
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.productId)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-spice-warm/10 bg-cream-dark p-6 dark:bg-spice-brown/50">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span>
          </div>
          {subtotal < DELIVERY.minOrder && (
            <p className="text-xs text-saffron">
              Add {formatPrice(DELIVERY.minOrder - subtotal)} more for checkout
            </p>
          )}
          {subtotal < DELIVERY.freeAbove && subtotal >= DELIVERY.minOrder && (
            <p className="text-xs text-spice-warm">
              Free delivery above {formatPrice(DELIVERY.freeAbove)}
            </p>
          )}
        </div>
        <div className="mt-4 flex justify-between border-t border-spice-warm/10 pt-4 font-serif text-xl font-bold">
          <span>Total</span>
          <span className="text-maroon dark:text-saffron">{formatPrice(total)}</span>
        </div>
        <Link
          href={subtotal >= DELIVERY.minOrder ? "/checkout" : "#"}
          className="mt-6 block"
        >
          <Button
            variant="saffron"
            className="w-full"
            size="lg"
            disabled={subtotal < DELIVERY.minOrder}
          >
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}
