import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { getSeedProducts } from "@/data/seed-products";
import { getRecommendations } from "@/lib/recommendations";
import type { Product as ProductType } from "@/types";

export async function GET(req: NextRequest) {
  const cartIds = req.nextUrl.searchParams.get("cartIds")?.split(",").filter(Boolean) || [];

  try {
    await connectDB();
    const all = await Product.find({ isActive: true }).lean();
    const products = all.map((p) => ({
      ...p,
      _id: String(p._id),
    })) as unknown as ProductType[];
    const recs = getRecommendations(products, cartIds);
    return NextResponse.json(recs);
  } catch {
    const products = getSeedProducts().map((p, i) => ({
      ...p,
      _id: `seed-${i}`,
    })) as unknown as ProductType[];
    return NextResponse.json(getRecommendations(products, cartIds));
  }
}
