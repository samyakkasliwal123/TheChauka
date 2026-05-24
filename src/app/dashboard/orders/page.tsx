"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/types";
import { toast } from "@/hooks/use-toast";

const statusColors: Record<string, "default" | "saffron" | "haldi" | "outline"> = {
  pending: "outline",
  confirmed: "saffron",
  preparing: "haldi",
  out_for_delivery: "saffron",
  delivered: "default",
  cancelled: "outline",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success) {
      toast({
        title: "Order placed successfully!",
        description: `Order ${success} is being prepared with love.`,
      });
    }
  }, [success]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-maroon dark:text-cream">
        Order History
      </h1>

      <div className="mt-8 space-y-4">
        {orders.length === 0 ? (
          <p className="text-spice-warm">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="rounded-xl border border-spice-warm/10 p-6 dark:bg-spice-brown/30"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{order.orderId}</p>
                  <p className="text-sm text-spice-warm">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      dateStyle: "long",
                    })}
                  </p>
                </div>
                <Badge variant={statusColors[order.status] || "outline"}>
                  {order.status.replace(/_/g, " ")}
                </Badge>
              </div>
              <ul className="mt-4 space-y-1 text-sm">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} — {formatPrice(item.price * item.quantity)}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-serif text-lg font-bold text-maroon dark:text-saffron">
                Total: {formatPrice(order.total)}
              </p>
              {order.loyaltyPointsEarned > 0 && (
                <p className="text-xs text-saffron">
                  +{order.loyaltyPointsEarned} loyalty points earned
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
