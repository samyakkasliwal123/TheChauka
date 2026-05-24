import { slugify } from "@/lib/utils";

const IMG = {
  mathri: "https://images.unsplash.com/photo-1606491956689-2ea9a6460b8a?w=800&q=80",
  samosa: "https://images.unsplash.com/photo-1601050690597-df9a7f316b9a?w=800&q=80",
  kachori: "https://images.unsplash.com/photo-1626074353765-517a16e8a854?w=800&q=80",
  namkeen: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
  ladoo: "https://images.unsplash.com/photo-1589301760014-d7f395ebce6e?w=800&q=80",
  gujiya: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
  chivda: "https://images.unsplash.com/photo-1565557623267-25f3e8ee6a6c?w=800&q=80",
  kitchen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
};

type SeedProduct = {
  name: string;
  nameHindi?: string;
  category: string;
  price: number;
  unit: "kg" | "piece" | "pack";
  isBestSeller?: boolean;
  spiceLevel?: "mild" | "medium" | "hot" | "none";
  image?: string;
};

const menuItems: SeedProduct[] = [
  // Mathri & Namkeen
  { name: "Gol Mathri", nameHindi: "गोल मठरी", category: "namkeen", price: 320, unit: "kg" },
  { name: "Aata Mathri", nameHindi: "आटा मठरी", category: "namkeen", price: 320, unit: "kg" },
  { name: "Sankhe Mathri", category: "namkeen", price: 320, unit: "kg" },
  { name: "Jo ki Namkeen Mathri", category: "namkeen", price: 320, unit: "kg" },
  { name: "Ghee ke Moyan ki Mathri", category: "namkeen", price: 320, unit: "kg", isBestSeller: true },
  { name: "Mint Mathri", category: "namkeen", price: 320, unit: "kg" },
  { name: "Roti wali Mathri", category: "namkeen", price: 320, unit: "kg" },
  { name: "Methi Mathri", category: "namkeen", price: 320, unit: "kg" },
  { name: "Chaat Masala Mathri", category: "namkeen", price: 350, unit: "kg", spiceLevel: "medium" },
  { name: "Nimbu Mathri", category: "namkeen", price: 350, unit: "kg" },
  { name: "Maggi Masala Mathri", category: "namkeen", price: 360, unit: "kg", spiceLevel: "medium" },
  { name: "Daal ki Mathri", category: "namkeen", price: 380, unit: "kg" },
  { name: "Besan ki Papdi", category: "namkeen", price: 380, unit: "kg" },
  { name: "Neem Mathri", category: "namkeen", price: 380, unit: "kg" },
  { name: "Organic Mathri", category: "namkeen", price: 380, unit: "kg" },
  { name: "Shakar Pare", category: "namkeen", price: 450, unit: "kg", spiceLevel: "none" },
  { name: "Deshi Ghee ki Meethi Mathri", category: "namkeen", price: 550, unit: "kg", isBestSeller: true },
  { name: "Deshi Ghee ka Petha", category: "sweets", price: 550, unit: "kg" },
  { name: "Namkeen Mix", category: "namkeen", price: 300, unit: "kg", isBestSeller: true },
  { name: "Dahi Papdi", category: "namkeen", price: 350, unit: "kg" },
  { name: "Moongfali", category: "namkeen", price: 350, unit: "kg" },
  { name: "Chivda", category: "namkeen", price: 350, unit: "kg" },
  { name: "Khasta Kachori", category: "kachori", price: 370, unit: "kg", isBestSeller: true },
  // Sweets
  { name: "Khopra Pak", category: "sweets", price: 500, unit: "kg" },
  { name: "Besan Chakki", category: "sweets", price: 550, unit: "kg" },
  { name: "Til Patti", category: "sweets", price: 500, unit: "kg" },
  { name: "Til ke Ladoo", category: "sweets", price: 450, unit: "kg", isBestSeller: true },
  { name: "Besan Ladoo", category: "sweets", price: 550, unit: "kg", isBestSeller: true },
  { name: "Moong Dal ke Ladoo", category: "sweets", price: 600, unit: "kg" },
  { name: "Aata Ladoo", category: "sweets", price: 550, unit: "kg" },
  { name: "Methi ke Ladoo", category: "sweets", price: 1000, unit: "kg" },
  { name: "Dry Fruits Ladoo", category: "sweets", price: 1200, unit: "kg", isBestSeller: true },
  { name: "Chashni wali Gujiya", category: "sweets", price: 450, unit: "kg" },
  { name: "Gujiya", category: "sweets", price: 620, unit: "kg", isBestSeller: true },
  // Per piece
  { name: "Dal Pakwan", category: "samosa", price: 15, unit: "piece", minQty: 4 },
  { name: "Katori Chaat", category: "samosa", price: 15, unit: "piece" },
  { name: "Kachori", category: "kachori", price: 20, unit: "piece", isBestSeller: true },
  { name: "Samosa", category: "samosa", price: 20, unit: "piece", isBestSeller: true, spiceLevel: "medium" },
  // Festival & party packs
  { name: "Diwali Premium Hamper", category: "festival", price: 2499, unit: "pack", isBestSeller: true },
  { name: "Holi Snack Box", category: "festival", price: 1499, unit: "pack" },
  { name: "Wedding Snack Platter", category: "party", price: 4999, unit: "pack" },
  { name: "Corporate Gifting Box", category: "party", price: 1999, unit: "pack" },
  { name: "Mirchi Vada (Seasonal)", category: "seasonal", price: 25, unit: "piece", spiceLevel: "hot" },
  { name: "Pyaz Kachori", category: "kachori", price: 25, unit: "piece", isBestSeller: true },
] as SeedProduct[];

interface SeedProductExt extends SeedProduct {
  minQty?: number;
}

function getImage(category: string): string {
  switch (category) {
    case "samosa": return IMG.samosa;
    case "kachori": return IMG.kachori;
    case "namkeen": return IMG.mathri;
    case "sweets": return IMG.ladoo;
    case "festival":
    case "party": return IMG.gujiya;
    case "seasonal": return IMG.kachori;
    default: return IMG.namkeen;
  }
}

function buildStory(name: string): string {
  return `At The Chauka, ${name} is not merely a snack — it is a memory pressed into flour and spice. Prepared each morning in our Jaipur kitchen using recipes whispered from grandmother to granddaughter, every batch carries the warmth of a home that never forgot how to feed with love.`;
}

function buildGrandmotherNote(name: string): string {
  return `"Beta, ${name} ko jaldi mat pakao — dheemi aanch par sabr se. Wahi raaz hai jo meri dadi ne mujhe sikhaya tha." — Dadi Pushpa`;
}

export function getSeedProducts() {
  return (menuItems as SeedProductExt[]).map((item) => {
    const slug = slugify(item.name);
    const unit = item.unit;
    const minQuantity = item.minQty ?? (unit === "kg" ? 0.25 : 1);

    return {
      name: item.name,
      nameHindi: item.nameHindi,
      slug,
      description: `Handcrafted ${item.name} made fresh daily in Jaipur. ${unit === "kg" ? "Sold per kilogram — minimum order 250g." : "Sold per piece."} Pure vegetarian, no preservatives.`,
      story: buildStory(item.name),
      grandmotherNote: buildGrandmotherNote(item.name),
      category: item.category,
      price: item.price,
      unit,
      minQuantity,
      images: [item.image || getImage(item.category), getImage(item.category)],
      ingredients: [
        "Whole wheat flour / Besan (as per recipe)",
        "Desi ghee",
        "Rock salt",
        "Hand-ground spices",
        "Filtered water",
      ],
      preparationStyle:
        "Slow-crafted on traditional brass utensils. Dough rested overnight. Fried in small batches in pure desi ghee at controlled temperature for that signature khasta texture.",
      servingSuggestions: [
        "Best enjoyed fresh with green chutney",
        "Pair with masala chai",
        "Store in airtight container for up to 7 days",
      ],
      spiceLevel: item.spiceLevel || "mild",
      isVeg: true,
      isBestSeller: item.isBestSeller || false,
      isFreshDaily: true,
      stock: 100,
      nutrition: {
        calories: unit === "piece" ? 120 : 450,
        protein: "6-8g",
        carbs: "45-55g",
        fat: "18-25g",
      },
      preparationTimeline: [
        { step: "Dough preparation with rested atta", duration: "45 min" },
        { step: "Hand-rolling & shaping", duration: "60 min" },
        { step: "Slow frying in desi ghee", duration: "90 min" },
        { step: "Cooling & packing", duration: "30 min" },
      ],
      rating: 4.5 + Math.random() * 0.4,
      reviewCount: Math.floor(Math.random() * 80) + 12,
      tags: [item.category, "homemade", "jaipur", "vegetarian"],
      isActive: true,
    };
  });
}

export const SEED_COUPONS = [
  {
    code: "CHAUKA10",
    description: "10% off on first order",
    discountType: "percentage" as const,
    discountValue: 10,
    minOrder: 499,
    maxDiscount: 150,
    usageLimit: 1000,
    isActive: true,
  },
  {
    code: "FESTIVAL250",
    description: "₹250 off on orders above ₹1999",
    discountType: "fixed" as const,
    discountValue: 250,
    minOrder: 1999,
    isActive: true,
  },
];
