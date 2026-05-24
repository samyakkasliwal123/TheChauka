import { DELIVERY } from "./constants";

export function checkPincode(pincode: string): {
  available: boolean;
  message: string;
  estimatedDelivery: string;
} {
  const normalized = pincode.trim();
  if (normalized.length !== 6) {
    return {
      available: false,
      message: "Please enter a valid 6-digit pincode",
      estimatedDelivery: "",
    };
  }

  const available = DELIVERY.jaipurPincodes.some((p) =>
    normalized.startsWith(p.substring(0, 3))
  ) || normalized.startsWith("302");

  if (available) {
    return {
      available: true,
      message: "Great news! We deliver to your area in Jaipur.",
      estimatedDelivery: `${DELIVERY.estimatedMinutes.min}–${DELIVERY.estimatedMinutes.max} minutes`,
    };
  }

  return {
    available: false,
    message: "We currently deliver within Jaipur only. Pickup available at our kitchen.",
    estimatedDelivery: "",
  };
}

export function calculateDeliveryFee(subtotal: number): number {
  if (subtotal >= DELIVERY.freeAbove) return 0;
  if (subtotal < DELIVERY.minOrder) return DELIVERY.defaultFee;
  return DELIVERY.defaultFee;
}

export function applyCoupon(
  subtotal: number,
  coupon: { discountType: string; discountValue: number; maxDiscount?: number }
): number {
  if (coupon.discountType === "percentage") {
    const discount = (subtotal * coupon.discountValue) / 100;
    return coupon.maxDiscount
      ? Math.min(discount, coupon.maxDiscount)
      : discount;
  }
  return coupon.discountValue;
}
