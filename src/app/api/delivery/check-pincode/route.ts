import { NextRequest, NextResponse } from "next/server";
import { checkPincode } from "@/lib/delivery";

export async function GET(req: NextRequest) {
  const pincode = req.nextUrl.searchParams.get("pincode") || "";
  const result = checkPincode(pincode);
  return NextResponse.json(result);
}
