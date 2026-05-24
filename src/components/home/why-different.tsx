"use client";

import { motion } from "framer-motion";
import { Heart, Leaf, Clock, Award } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Generational Recipes",
    description:
      "Secret spice blends and techniques passed from great-grandmother to granddaughter — never written down, only felt.",
  },
  {
    icon: Leaf,
    title: "Pure & Vegetarian",
    description:
      "Jain-friendly. No preservatives. Desi ghee, hand-ground masalas, and ingredients you can pronounce.",
  },
  {
    icon: Clock,
    title: "Made Fresh Daily",
    description:
      "Every batch prepared each morning in small quantities. We never freeze, never reheat yesterday's stock.",
  },
  {
    icon: Award,
    title: "Not Factory-Made",
    description:
      "Hand-rolled, slow-fried on brass utensils. The irregular shape is proof — machines can't replicate love.",
  },
];

export function WhyDifferent() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold text-maroon dark:text-cream">
            Why Our Taste Is Different
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-spice-warm dark:text-cream/70">
            This isn&apos;t delivery food. This is the taste of Sunday mornings at nani&apos;s house.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-spice-warm/10 bg-cream p-8 text-center shadow-sm transition-shadow hover:shadow-lg dark:bg-spice-brown/30"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-maroon/10 text-maroon dark:bg-saffron/20 dark:text-saffron">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-maroon dark:text-cream">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-spice-warm dark:text-cream/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
