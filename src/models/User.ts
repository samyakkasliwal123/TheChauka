import mongoose, { Schema, models, model } from "mongoose";

const AddressSchema = new Schema({
  label: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  line1: { type: String, required: true },
  line2: String,
  city: { type: String, default: "Jaipur" },
  state: { type: String, default: "Rajasthan" },
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    loyaltyPoints: { type: Number, default: 0 },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    addresses: [AddressSchema],
    image: String,
    emailVerified: Date,
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
