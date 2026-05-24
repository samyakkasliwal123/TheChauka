"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Malviya Nagar, Jaipur",
    text: "The methi mathri tastes exactly like my dadi used to make. I cried a little eating it. This is not a compliment — it's the truth.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    location: "Corporate gifting client",
    text: "We ordered 50 festival hampers for our team. Every single person asked where we got them from. The Chauka is now our official snack partner.",
    rating: 5,
  },
  {
    name: "Anita Jain",
    location: "C-Scheme, Jaipur",
    text: "Finally, samosas that aren't oily pockets of regret. Crispy, spiced perfectly, and you can taste the desi ghee. Ordering every Sunday now.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="bg-maroon py-24 text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-4xl font-bold">
          Voices From Our Chauka
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-cream/10 bg-cream/5 p-8 backdrop-blur-sm"
            >
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-haldi text-haldi" />
                ))}
              </div>
              <p className="mt-4 font-handwritten text-xl leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <footer className="mt-6">
                <cite className="not-italic font-semibold">{t.name}</cite>
                <p className="text-sm text-cream/60">{t.location}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
