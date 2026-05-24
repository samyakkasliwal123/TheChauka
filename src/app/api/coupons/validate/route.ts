import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Coupon } from "@/models/Coupon";
import { applyCoupon } from "@/lib/delivery";
import { SEED_COUPONS } from "@/data/seed-products";

export async function POST(req: NextRequest) {
  const { code, subtotal } = await req.json();

  if (!code || !subtotal) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    await connectDB();
    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Invalid coupon" });
    }

    if (subtotal < (coupon.minOrder || 0)) {
      return NextResponse.json({
        valid: false,
        message: `Minimum order ₹${coupon.minOrder} required`,
      });
    }

    const discount = applyCoupon(subtotal, coupon);
    return NextResponse.json({
      valid: true,
      discount,
      description: coupon.description,
    });
  } catch {
    const coupon = SEED_COUPONS.find((c) => c.code === code.toUpperCase());
    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Invalid coupon" });
    }
    if (subtotal < coupon.minOrder) {
      return NextResponse.json({
        valid: false,
        message: `Minimum order ₹${coupon.minOrder} required`,
      });
    }
    const discount = applyCoupon(subtotal, coupon);
    return NextResponse.json({ valid: true, discount, description: coupon.description });
  }
}
