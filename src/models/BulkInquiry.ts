import mongoose, { Schema, models, model } from "mongoose";

const BulkInquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventType: {
      type: String,
      enum: ["corporate", "wedding", "festival", "party", "other"],
      required: true,
    },
    guestCount: { type: Number, required: true },
    preferredDate: { type: Date, required: true },
    items: [String],
    packaging: String,
    estimatedBudget: Number,
    message: String,
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "confirmed", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export const BulkInquiry = models.BulkInquiry || model("BulkInquiry", BulkInquirySchema);
