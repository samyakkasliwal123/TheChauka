import Link from "next/link";
import { HeroSection } from "@/components/home/hero-section";
import { StorySection } from "@/components/home/story-section";
import { WhyDifferent } from "@/components/home/why-different";
import { Testimonials } from "@/components/home/testimonials";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <WhyDifferent />
      <FeaturedProducts />

      <section className="bg-saffron/10 py-20 dark:bg-saffron/5">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-maroon dark:text-cream">
            Prepared Fresh Every Morning
          </h2>
          <p className="mt-4 text-spice-warm dark:text-cream/80">
            Our kitchen opens at 5 AM. By 10 AM, the first batches of mathri, samosa, and ladoo
            are ready — still warm, still carrying the aroma of home.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-maroon dark:text-cream">
            Festival & Bulk Orders
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-spice-warm">
            Weddings, corporate gifting, Diwali hampers — we craft custom platters with heritage packaging.
          </p>
          <Link href="/bulk-orders" className="mt-8 inline-block">
            <Button variant="saffron" size="lg">
              Request a Quote
            </Button>
          </Link>
        </div>
      </section>

      <section className="border-y border-spice-warm/10 bg-cream-dark py-16 dark:bg-spice-brown/30">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-bold text-maroon dark:text-cream">
            Jaipur Local Delivery
          </h2>
          <p className="mt-2 text-spice-warm">
            Pickup at {BRAND.address.split(",")[0]} — or delivery across Jaipur pincodes.
          </p>
          <p className="mt-4 font-semibold text-saffron">
            Call {BRAND.phoneDisplay} • {BRAND.contactPerson}
          </p>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
