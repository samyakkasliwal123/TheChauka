export const BRAND = {
  name: "The चौका",
  nameEn: "The Chauka",
  tagline: "घर का स्वाद आप नहीं भूलेंगे खाने के बाद!",
  taglineEn: "Every bite tastes like home.",
  usp: "Authentic homemade taste made from secret recipes passed down from grandmother to granddaughter across generations.",
  phone: "+919001595100",
  phoneDisplay: "+91 90015 95100",
  whatsapp: "919001595100",
  email: "orders@thechauka.com",
  address:
    "153, Mahavir Nagar II, Maharani Farm, Durgapura Road, Jaipur, Rajasthan 302018",
  paytm: "7014397797",
  contactPerson: "Pushpa Sogani",
} as const;

export const DELIVERY = {
  minOrder: 299,
  freeAbove: 999,
  defaultFee: 49,
  jaipurPincodes: [
    "302001", "302002", "302003", "302004", "302005", "302006",
    "302012", "302013", "302015", "302016", "302017", "302018",
    "302019", "302020", "302021", "302022", "302029", "302031",
    "302033", "302034", "302039",
  ],
  estimatedMinutes: { min: 45, max: 120 },
} as const;

export const CATEGORIES = [
  { id: "samosa", label: "Samosa & Starters", icon: "🥟" },
  { id: "kachori", label: "Kachori", icon: "🫓" },
  { id: "namkeen", label: "Namkeen & Mathri", icon: "🥨" },
  { id: "sweets", label: "Sweets & Laddoo", icon: "🍬" },
  { id: "seasonal", label: "Seasonal Specials", icon: "🌸" },
  { id: "festival", label: "Festival Packs", icon: "🪔" },
  { id: "party", label: "Party Orders", icon: "🎉" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const LOYALTY = {
  pointsPerRupee: 1,
  redeemRate: 100, // 100 points = ₹10
} as const;
