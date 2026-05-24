"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function StorySection() {
  return (
    <section className="bg-cream-dark py-24 dark:bg-spice-brown/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
              alt="Grandmother cooking traditional recipes"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-handwritten text-2xl text-saffron">
              Our Heritage
            </span>
            <h2 className="mt-2 font-serif text-4xl font-bold text-maroon dark:text-cream">
              From Dadi&apos;s Kitchen to Your Heart
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-spice-warm dark:text-cream/80">
              In a quiet lane of Jaipur, three generations of women have stirred the same brass kadhai,
              rolled the same dough, and guarded the same spice blends. What began as Pushpa Ji&apos;s
              grandmother&apos;s secret mathri recipe is now The Chauka — a celebration of homemade
              authenticity in a world of factory food.
            </p>
            <blockquote className="mt-8 border-l-4 border-saffron pl-6 font-handwritten text-2xl text-maroon dark:text-haldi">
              &ldquo;Khana sirf pet bharne ke liye nahi — yaadon ko jodne ke liye hota hai.&rdquo;
              <footer className="mt-2 text-base font-sans text-spice-warm">
                — Pushpa Sogani, Founder
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
