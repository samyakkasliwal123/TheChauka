import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100).lean();
    return NextResponse.json(
      orders.map((o) => ({
        ...o,
        _id: String(o._id),
        userId: String(o.userId),
      }))
    );
  } catch {
    return NextResponse.json([]);
  }
}
