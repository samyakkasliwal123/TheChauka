import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { getSeedProducts } from "@/data/seed-products";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const bestSeller = searchParams.get("bestSeller");

  try {
    await connectDB();
    const filter: Record<string, unknown> = { isActive: true };
    if (category) filter.category = category;
    if (bestSeller === "true") filter.isBestSeller = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({ isBestSeller: -1, name: 1 }).lean();
    return NextResponse.json(
      products.map((p) => ({ ...p, _id: String(p._id) }))
    );
  } catch {
    let products = getSeedProducts().map((p, i) => ({
      ...p,
      _id: `seed-${i}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    if (category) products = products.filter((p) => p.category === category);
    if (bestSeller === "true") products = products.filter((p) => p.isBestSeller);
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(products);
  }
}
