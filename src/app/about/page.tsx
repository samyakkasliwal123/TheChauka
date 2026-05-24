"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

const timeline = [
  {
    era: "1940s",
    title: "Great Grandmother",
    description:
      "In a village near Sikar, the first secret mathri recipe was born — rolled on a stone chakla, fried in home-churned ghee.",
  },
  {
    era: "1970s",
    title: "Grandmother",
    description:
      "The recipes traveled to Jaipur. Festival seasons meant hundreds of kilos, all handmade by the women of the family.",
  },
  {
    era: "Today",
    title: "Pushpa & Family",
    description:
      "The Chauka opens its doors — same recipes, same brass utensils, now shared with every home that misses authentic taste.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream dark:bg-spice-brown">
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80"
          alt="Traditional Indian kitchen"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-maroon/70" />
        <div className="relative z-10 px-4 text-center text-cream">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold md:text-7xl"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-handwritten text-2xl text-haldi"
          >
            Three generations. One kitchen. Infinite memories.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-xl leading-relaxed text-spice-warm dark:text-cream/80">
          {BRAND.name} is not a restaurant chain. It is a family&apos;s promise — that the taste
          of your grandmother&apos;s kitchen can still exist in a world of instant noodles and
          factory samosas. Based in Jaipur, we prepare every item by hand, in small batches,
          using recipes that were never written down until now.
        </p>
      </section>

      <section className="bg-cream-dark py-24 dark:bg-spice-brown/50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-center font-serif text-4xl font-bold text-maroon dark:text-cream">
            The Journey
          </h2>
          <div className="relative mt-16">
            <div className="absolute left-8 top-0 h-full w-0.5 bg-saffron/30 md:left-1/2" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.era}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative mb-16 flex ${
                  i % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div className="ml-16 w-full max-w-md rounded-2xl border border-spice-warm/10 bg-cream p-8 shadow-sm dark:bg-spice-brown md:ml-0 md:w-[calc(50%-2rem)]">
                  <span className="font-serif text-2xl font-bold text-saffron">{item.era}</span>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-maroon dark:text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-spice-warm dark:text-cream/70">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-serif text-4xl font-bold text-maroon dark:text-cream">
            Not Factory-Made
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-spice-warm">
            We don&apos;t have a production line. We have a chauka — a kitchen table where flour
            meets love. Every mathri is hand-pressed. Every samosa is hand-folded. Every ladoo is
            hand-rolled. The irregularity is our signature.
          </p>
        </div>
      </section>
    </div>
  );
}
