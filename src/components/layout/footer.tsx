import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { BRAND } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-spice-warm/10 bg-maroon text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl font-bold">{BRAND.name}</h2>
            <p className="mt-2 font-handwritten text-xl text-haldi">
              {BRAND.taglineEn}
            </p>
            <p className="mt-4 max-w-md text-sm text-cream/80">
              {BRAND.usp}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li><Link href="/menu" className="hover:text-haldi">Menu</Link></li>
              <li><Link href="/about" className="hover:text-haldi">Our Story</Link></li>
              <li><Link href="/bulk-orders" className="hover:text-haldi">Bulk Orders</Link></li>
              <li><Link href="/cart" className="hover:text-haldi">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold">Visit Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-haldi" />
                <span>{BRAND.address}</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 text-haldi" />
                <a href={`tel:${BRAND.phone}`} className="hover:text-haldi">
                  {BRAND.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-haldi" />
                <span>{BRAND.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.nameEn}. Made with love in Jaipur.</p>
          <p>Jain • Pure Vegetarian • Homemade Daily</p>
        </div>
      </div>
    </footer>
  );
}
