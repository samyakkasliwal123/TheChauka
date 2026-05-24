import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Caveat } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { BRAND } from "@/lib/constants";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: `${BRAND.nameEn} | Authentic Homemade Snacks from Jaipur`,
    template: `%s | ${BRAND.nameEn}`,
  },
  description: BRAND.usp,
  keywords: [
    "Jaipur snacks",
    "homemade mathri",
    "samosa Jaipur",
    "kachori",
    "namkeen",
    "grandmother recipes",
    "The Chauka",
  ],
  openGraph: {
    title: BRAND.nameEn,
    description: BRAND.taglineEn,
    locale: "en_IN",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: BRAND.nameEn,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F0E3" },
    { media: "(prefers-color-scheme: dark)", color: "#3D2314" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable} font-sans`}
        suppressHydrationWarning
      >
        <OrganizationJsonLd />
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
