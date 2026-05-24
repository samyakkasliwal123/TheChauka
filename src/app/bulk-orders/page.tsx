"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { BRAND } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  eventType: z.enum(["corporate", "wedding", "festival", "party", "other"]),
  guestCount: z.coerce.number().min(10),
  preferredDate: z.string(),
  packaging: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function BulkOrdersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [guestCount, setGuestCount] = useState(50);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { eventType: "festival", guestCount: 50 },
  });

  const estimatedKg = Math.ceil(guestCount * 0.15);
  const estimatedCost = estimatedKg * 400;

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/bulk-inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, items: ["Custom platter"] }),
    });
    if (res.ok) {
      setSubmitted(true);
      toast({ title: "Inquiry sent!", description: "We'll contact you within 24 hours." });
    } else {
      toast({ title: "Error", description: "Please try again or WhatsApp us." });
    }
  };

  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    `Hi! I need a bulk order quote for ${guestCount} guests.`
  )}`;

  return (
    <div className="bg-cream pb-24 dark:bg-spice-brown">
      <div className="bg-rajasthan-pattern py-16 text-center">
        <h1 className="font-serif text-5xl font-bold text-maroon dark:text-cream">
          Bulk & Festival Orders
        </h1>
        <p className="mt-4 text-spice-warm">Weddings • Corporate • Diwali • Party Catering</p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request a Quote</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <p className="text-center text-lg text-maroon">
                Thank you! We&apos;ll reach out soon. You can also WhatsApp us directly.
              </p>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...register("phone")} />
                </div>
                <div>
                  <Label htmlFor="eventType">Event Type</Label>
                  <select
                    id="eventType"
                    {...register("eventType")}
                    className="flex h-11 w-full rounded-md border border-spice-warm/20 bg-cream px-4"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate</option>
                    <option value="festival">Festival</option>
                    <option value="party">Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label>Guest Count: {guestCount}</Label>
                  <input
                    type="range"
                    min={10}
                    max={500}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full"
                  />
                  <input type="hidden" {...register("guestCount")} value={guestCount} />
                </div>
                <div>
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input id="preferredDate" type="date" {...register("preferredDate")} />
                </div>
                <div>
                  <Label htmlFor="packaging">Packaging Preference</Label>
                  <Input
                    id="packaging"
                    placeholder="Heritage box, jute bag, custom label..."
                    {...register("packaging")}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    {...register("message")}
                    className="flex min-h-[100px] w-full rounded-md border border-spice-warm/20 bg-cream px-4 py-2"
                  />
                </div>
                <Button type="submit" variant="saffron" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quantity Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-spice-warm">
                For {guestCount} guests, we recommend approximately{" "}
                <strong>{estimatedKg} kg</strong> of mixed snacks.
              </p>
              <p className="mt-4 font-serif text-2xl text-saffron">
                Estimated: ₹{estimatedCost.toLocaleString("en-IN")}+
              </p>
              <p className="mt-2 text-xs text-spice-warm/60">
                Final quote depends on selection. Custom packaging available.
              </p>
            </CardContent>
          </Card>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-semibold text-white shadow-lg hover:opacity-90"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
