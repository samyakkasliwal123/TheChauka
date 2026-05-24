import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getRazorpayInstance, isRazorpayConfigured } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { amount } = await req.json();
  if (!amount || amount < 1) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  if (!isRazorpayConfigured()) {
    return NextResponse.json({
      mock: true,
      orderId: `mock_order_${Date.now()}`,
      amount: amount * 100,
      currency: "INR",
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "mock_key",
    });
  }

  const razorpay = getRazorpayInstance()!;
  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: `rcpt_${Date.now()}`,
  });

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
