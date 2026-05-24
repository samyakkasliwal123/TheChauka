"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { calculateDeliveryFee } from "@/lib/delivery";
import { toast } from "@/hooks/use-toast";
import { BRAND } from "@/lib/constants";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [pincode, setPincode] = useState("");
  const [pincodeMsg, setPincodeMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "",
    deliverySlot: "morning",
    notes: "",
  });

  const subtotal = getSubtotal();
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = subtotal + deliveryFee - discount;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/checkout");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.name) {
      setForm((f) => ({ ...f, fullName: session.user?.name || "" }));
    }
  }, [session]);

  const checkPincode = async () => {
    const res = await fetch(`/api/delivery/check-pincode?pincode=${pincode}`);
    const data = await res.json();
    setPincodeMsg(data.message);
    setForm((f) => ({ ...f, pincode }));
  };

  const applyCoupon = async () => {
    const res = await fetch("/api/coupons/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: coupon, subtotal }),
    });
    const data = await res.json();
    if (data.valid) {
      setDiscount(data.discount);
      toast({ title: "Coupon applied!", description: data.description });
    } else {
      toast({ title: "Invalid coupon", description: data.message });
    }
  };

  const placeOrder = async (paymentData?: {
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
  }) => {
    setLoading(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          unit: i.unit,
          image: i.image,
        })),
        address: { ...form, label: "Home" },
        deliverySlot: form.deliverySlot,
        notes: form.notes,
        couponCode: discount > 0 ? coupon : undefined,
        paymentMethod: paymentData ? "razorpay" : "cod",
        ...paymentData,
      }),
    });

    setLoading(false);
    if (res.ok) {
      const { order } = await res.json();
      clearCart();
      router.push(`/dashboard/orders?success=${order.orderId}`);
    } else {
      toast({ title: "Order failed", description: "Please try again" });
    }
  };

  const payWithRazorpay = async () => {
    const payRes = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total }),
    });
    const payData = await payRes.json();

    if (payData.mock) {
      await placeOrder({
        razorpayOrderId: payData.orderId,
        razorpayPaymentId: `mock_pay_${Date.now()}`,
      });
      return;
    }

    const options = {
      key: payData.key,
      amount: payData.amount,
      currency: payData.currency,
      name: BRAND.nameEn,
      description: "Order payment",
      order_id: payData.orderId,
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
      }) => {
        await placeOrder({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
        });
      },
      prefill: { name: form.fullName, contact: form.phone },
      theme: { color: "#6B1E2E" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (status === "loading" || items.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-spice-warm">Loading checkout...</p>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-serif text-4xl font-bold text-maroon dark:text-cream">
          Checkout
        </h1>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <section className="rounded-xl border border-spice-warm/10 p-6">
              <h2 className="font-serif text-xl font-semibold">Delivery Address</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label>Full Name</Label>
                  <Input
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Pincode</Label>
                  <div className="flex gap-2">
                    <Input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      maxLength={6}
                    />
                    <Button type="button" variant="outline" onClick={checkPincode}>
                      Check
                    </Button>
                  </div>
                  {pincodeMsg && (
                    <p className="mt-1 text-xs text-saffron">{pincodeMsg}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <Label>Address Line 1</Label>
                  <Input
                    value={form.line1}
                    onChange={(e) => setForm({ ...form, line1: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label>Delivery Slot</Label>
                  <select
                    value={form.deliverySlot}
                    onChange={(e) => setForm({ ...form, deliverySlot: e.target.value })}
                    className="flex h-11 w-full rounded-md border border-spice-warm/20 bg-cream px-4"
                  >
                    <option value="morning">Morning (10 AM – 1 PM)</option>
                    <option value="afternoon">Afternoon (2 PM – 5 PM)</option>
                    <option value="evening">Evening (6 PM – 9 PM)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label>Order Notes</Label>
                  <Input
                    placeholder="Less spicy, call before delivery..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-spice-warm/10 p-6">
              <h2 className="font-serif text-xl font-semibold">Coupon</h2>
              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="CHAUKA10"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                />
                <Button variant="outline" onClick={applyCoupon}>
                  Apply
                </Button>
              </div>
            </section>
          </div>

          <div className="rounded-xl border border-spice-warm/10 bg-cream-dark p-6 dark:bg-spice-brown/50">
            <h2 className="font-serif text-xl font-semibold">Order Summary</h2>
            <div className="mt-4 space-y-2">
              {items.map((i) => (
                <div key={i.productId} className="flex justify-between text-sm">
                  <span>
                    {i.name} × {i.quantity}
                  </span>
                  <span>{formatPrice(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-spice-warm/10 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{formatPrice(deliveryFee)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-serif text-xl font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              variant="saffron"
              className="mt-6 w-full"
              size="lg"
              disabled={loading || !form.fullName || !form.phone || !form.line1}
              onClick={payWithRazorpay}
            >
              {loading ? "Processing..." : `Pay ${formatPrice(total)}`}
            </Button>
            <Button
              variant="outline"
              className="mt-3 w-full"
              disabled={loading}
              onClick={() => placeOrder()}
            >
              Cash on Delivery / Pickup
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
