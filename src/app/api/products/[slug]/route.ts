import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { getSeedProducts } from "@/data/seed-products";
import { slugify } from "@/lib/utils";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    await connectDB();
    const product = await Product.findOne({ slug, isActive: true });
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({
      ...product.toObject(),
      _id: String(product._id),
    });
  } catch {
    const products = getSeedProducts();
    const product = products.find((p) => slugify(p.name) === slug);
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const idx = products.indexOf(product);
    return NextResponse.json({
      ...product,
      _id: `seed-${idx}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
}
