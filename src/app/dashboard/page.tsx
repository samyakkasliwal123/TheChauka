"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Package, Heart, MapPin, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";
import { LOYALTY } from "@/lib/constants";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-maroon dark:text-cream">
        Namaste, {session?.user?.name?.split(" ")[0] || "Friend"}
      </h1>
      <p className="mt-2 text-spice-warm">Your taste of home awaits</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Package, label: "Orders", href: "/dashboard/orders", count: orders.length },
          { icon: Heart, label: "Favorites", href: "/dashboard/favorites" },
          { icon: MapPin, label: "Addresses", href: "/dashboard/addresses" },
          { icon: Gift, label: "Loyalty", href: "#", desc: `${LOYALTY.pointsPerRupee} pt/₹1` },
        ].map((item) => (
          <Link key={item.label} href={item.href}>
            <Card className="transition-shadow hover:shadow-lg">
              <CardContent className="flex items-center gap-4 p-6">
                <item.icon className="h-8 w-8 text-saffron" />
                <div>
                  <p className="font-semibold">{item.label}</p>
                  {item.count !== undefined && (
                    <p className="text-sm text-spice-warm">{item.count} total</p>
                  )}
                  {item.desc && <p className="text-sm text-spice-warm">{item.desc}</p>}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="mt-12">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Link href="/dashboard/orders">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-spice-warm">No orders yet. <Link href="/menu" className="text-saffron">Order now</Link></p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between rounded-lg border border-spice-warm/10 p-4"
                >
                  <div>
                    <p className="font-semibold">{order.orderId}</p>
                    <p className="text-sm text-spice-warm capitalize">{order.status.replace(/_/g, " ")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(order.total)}</p>
                    <Link href="/dashboard/orders">
                      <Button variant="outline" size="sm" className="mt-2">
                        Reorder
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
