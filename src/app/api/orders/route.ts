import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import { Coupon } from "@/models/Coupon";
import { generateOrderId } from "@/lib/utils";
import { calculateDeliveryFee, applyCoupon } from "@/lib/delivery";
import { sendOrderConfirmation } from "@/lib/email";
import { LOYALTY } from "@/lib/constants";

const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      unit: z.enum(["kg", "piece", "pack"]),
      image: z.string().optional(),
    })
  ),
  address: z.object({
    fullName: z.string(),
    phone: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    label: z.string().optional(),
  }),
  deliverySlot: z.string().optional(),
  notes: z.string().optional(),
  couponCode: z.string().optional(),
  paymentMethod: z.string().optional(),
  razorpayOrderId: z.string().optional(),
  razorpayPaymentId: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const orders = await Order.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(
      orders.map((o) => ({ ...o, _id: String(o._id), userId: String(o.userId) }))
    );
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = orderSchema.parse(body);

    const subtotal = data.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    let discount = 0;
    if (data.couponCode) {
      await connectDB();
      const coupon = await Coupon.findOne({
        code: data.couponCode.toUpperCase(),
        isActive: true,
      });
      if (coupon && subtotal >= (coupon.minOrder || 0)) {
        discount = applyCoupon(subtotal, coupon);
      }
    }

    const deliveryFee = calculateDeliveryFee(subtotal);
    const total = Math.max(0, subtotal + deliveryFee - discount);
    const loyaltyPointsEarned = Math.floor(total * LOYALTY.pointsPerRupee);
    const orderId = generateOrderId();
    const isPaid = !!data.razorpayPaymentId;

    await connectDB();
    const order = await Order.create({
      orderId,
      userId: session.user.id,
      items: data.items,
      subtotal,
      deliveryFee,
      discount,
      total,
      address: { ...data.address, label: data.address.label || "Home" },
      deliverySlot: data.deliverySlot,
      notes: data.notes,
      couponCode: data.couponCode,
      paymentMethod: data.paymentMethod || "razorpay",
      razorpayOrderId: data.razorpayOrderId,
      razorpayPaymentId: data.razorpayPaymentId,
      paymentStatus: isPaid ? "paid" : "pending",
      status: isPaid ? "confirmed" : "pending",
      loyaltyPointsEarned,
    });

    await User.findByIdAndUpdate(session.user.id, {
      $inc: { loyaltyPoints: loyaltyPointsEarned },
    });

    if (session.user.email) {
      await sendOrderConfirmation(session.user.email, orderId, total);
    }

    return NextResponse.json({
      order: { ...order.toObject(), _id: String(order._id) },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Order failed" }, { status: 500 });
  }
}
