import { BRAND } from "@/lib/constants";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: BRAND.nameEn,
    description: BRAND.usp,
    address: {
      "@type": "PostalAddress",
      streetAddress: "153, Mahavir Nagar II, Maharani Farm, Durgapura Road",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302018",
      addressCountry: "IN",
    },
    telephone: BRAND.phone,
    servesCuisine: "Indian",
    priceRange: "₹₹",
    openingHours: "Mo-Su 08:00-20:00",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
