import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { BulkInquiry } from "@/models/BulkInquiry";
import { sendBulkInquiryNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  eventType: z.enum(["corporate", "wedding", "festival", "party", "other"]),
  guestCount: z.number().min(10),
  preferredDate: z.string(),
  items: z.array(z.string()).optional(),
  packaging: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    try {
      await connectDB();
      await BulkInquiry.create(data);
    } catch {
      console.log("[Bulk inquiry]", data);
    }

    await sendBulkInquiryNotification(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
