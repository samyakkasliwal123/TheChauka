import { Resend } from "resend";
import { BRAND } from "./constants";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendOrderConfirmation(
  to: string,
  orderId: string,
  total: number
) {
  if (!resend) {
    console.log(`[Email mock] Order ${orderId} confirmed to ${to}, total ₹${total}`);
    return { success: true, mock: true };
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM || `orders@${BRAND.nameEn.toLowerCase().replace(" ", "")}.com`,
    to,
    subject: `Order Confirmed — ${orderId} | ${BRAND.nameEn}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F8F0E3;">
        <h1 style="color: #6B1E2E;">${BRAND.nameEn}</h1>
        <p style="color: #3D2314;">Your order <strong>${orderId}</strong> has been confirmed.</p>
        <p style="color: #3D2314;">Total: <strong>₹${total}</strong></p>
        <p style="color: #5C3D2E; font-style: italic;">${BRAND.taglineEn}</p>
        <p style="color: #888; font-size: 12px;">Pickup: ${BRAND.address}</p>
      </div>
    `,
  });

  return { success: true };
}

export async function sendBulkInquiryNotification(data: {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: number;
}) {
  if (!resend) {
    console.log("[Email mock] Bulk inquiry:", data);
    return { success: true, mock: true };
  }

  const adminEmail = process.env.ADMIN_EMAIL || BRAND.email;
  await resend.emails.send({
    from: process.env.EMAIL_FROM || "orders@thechauka.com",
    to: adminEmail,
    subject: `New Bulk Order Inquiry — ${data.eventType}`,
    html: `<p>New inquiry from ${data.name} (${data.phone}) for ${data.guestCount} guests.</p>`,
  });

  return { success: true };
}
