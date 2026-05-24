import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    nameHindi: String,
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    story: { type: String, required: true },
    grandmotherNote: String,
    category: {
      type: String,
      enum: ["samosa", "kachori", "namkeen", "sweets", "seasonal", "festival", "party"],
      required: true,
    },
    price: { type: Number, required: true },
    unit: { type: String, enum: ["kg", "piece", "pack"], default: "kg" },
    minQuantity: { type: Number, default: 1 },
    images: [String],
    ingredients: [String],
    preparationStyle: String,
    servingSuggestions: [String],
    spiceLevel: {
      type: String,
      enum: ["mild", "medium", "hot", "none"],
      default: "mild",
    },
    isVeg: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    isFreshDaily: { type: Boolean, default: true },
    stock: { type: Number, default: 100 },
    nutrition: {
      calories: Number,
      protein: String,
      carbs: String,
      fat: String,
    },
    preparationTimeline: [
      {
        step: String,
        duration: String,
      },
    ],
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    tags: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProductSchema.index({ category: 1, isActive: 1 });

export const Product = models.Product || model("Product", ProductSchema);
