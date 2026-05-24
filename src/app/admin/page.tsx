"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/types";

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);

  const statusOptions = [
    "pending",
    "confirmed",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-maroon dark:text-cream">
        Admin Dashboard
      </h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-spice-warm/10 bg-cream-dark p-6 dark:bg-spice-brown/50">
          <p className="text-sm text-spice-warm">Total Orders</p>
          <p className="font-serif text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="rounded-xl border border-spice-warm/10 bg-cream-dark p-6 dark:bg-spice-brown/50">
          <p className="text-sm text-spice-warm">Revenue (Paid)</p>
          <p className="font-serif text-3xl font-bold text-saffron">
            {formatPrice(totalRevenue)}
          </p>
        </div>
        <div className="rounded-xl border border-spice-warm/10 bg-cream-dark p-6 dark:bg-spice-brown/50">
          <p className="text-sm text-spice-warm">Pending</p>
          <p className="font-serif text-3xl font-bold">
            {orders.filter((o) => o.status === "pending").length}
          </p>
        </div>
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Order Management</h2>
      {loading ? (
        <p className="mt-4 text-spice-warm">Loading...</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-spice-warm/10 text-left">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-spice-warm/5">
                  <td className="p-3 font-mono text-xs">{order.orderId}</td>
                  <td className="p-3">{order.address?.fullName}</td>
                  <td className="p-3">{formatPrice(order.total)}</td>
                  <td className="p-3">
                    <Badge>{order.status}</Badge>
                  </td>
                  <td className="p-3 capitalize">{order.paymentStatus}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="rounded border border-spice-warm/20 bg-cream px-2 py-1 text-xs"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <p className="mt-8 text-center text-spice-warm">No orders yet</p>
          )}
        </div>
      )}

      <div className="mt-12 rounded-xl border border-dashed border-spice-warm/20 p-8 text-center text-spice-warm">
        <p>Product CRUD, coupon management, and analytics — extend via /api/admin routes</p>
        <p className="mt-2 text-xs">Seed database with npm run seed for full product catalog</p>
      </div>
    </div>
  );
}
