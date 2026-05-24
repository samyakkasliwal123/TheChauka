"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-rajasthan-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-cream/50 via-transparent to-cream dark:from-spice-brown/80 dark:to-spice-brown" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-handwritten text-2xl text-saffron md:text-3xl">
            {BRAND.tagline}
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-maroon dark:text-cream md:text-6xl lg:text-7xl">
            Recipes That Traveled Through Generations
          </h1>
          <p className="mt-6 max-w-lg text-lg text-spice-warm dark:text-cream/80">
            {BRAND.usp} From our Jaipur kitchen to your table — every bite tastes like home.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/menu">
              <Button variant="saffron" size="lg">
                Order Fresh Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Taste Tradition
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-square max-h-[600px] w-full"
        >
          <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-maroon/10 shadow-2xl">
            <Image
              id="180558"
              src="/screenshot.png"
              alt="Fresh homemade Indian snacks"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 to-transparent" />
            {/* Steam particles */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="steam-particle"
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: `${30 + (i % 3) * 10}%`,
                  width: `${30 + i * 8}px`,
                  height: `${30 + i * 8}px`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -bottom-4 -left-4 rounded-2xl bg-haldi px-6 py-4 shadow-lg"
          >
            <p className="font-handwritten text-lg text-spice-brown">
              Made fresh every morning
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
