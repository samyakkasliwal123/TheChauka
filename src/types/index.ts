export type UnitType = "kg" | "piece" | "pack";
export type SpiceLevel = "mild" | "medium" | "hot" | "none";
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface Product {
  _id: string;
  name: string;
  nameHindi?: string;
  slug: string;
  description: string;
  story: string;
  grandmotherNote?: string;
  category: string;
  price: number;
  unit: UnitType;
  minQuantity: number;
  images: string[];
  ingredients: string[];
  preparationStyle: string;
  servingSuggestions: string[];
  spiceLevel: SpiceLevel;
  isVeg: boolean;
  isBestSeller: boolean;
  isFreshDaily: boolean;
  stock: number;
  nutrition?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
  preparationTimeline?: { step: string; duration: string }[];
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  unit: UnitType;
  image: string;
}

export interface Address {
  _id?: string;
  label: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: UnitType;
  image?: string;
}

export interface Order {
  _id: string;
  orderId: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  address: Address;
  deliverySlot?: string;
  notes?: string;
  couponCode?: string;
  loyaltyPointsEarned: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  loyaltyPoints: number;
  favorites: string[];
  addresses: Address[];
  image?: string;
}

export interface Review {
  _id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface BulkInquiry {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  guestCount: number;
  preferredDate: string;
  items: string[];
  packaging: string;
  message?: string;
}
