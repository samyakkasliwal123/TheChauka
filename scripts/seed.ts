import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI required in .env.local");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const { Product } = await import("../src/models/Product");
  const { User } = await import("../src/models/User");
  const { Coupon } = await import("../src/models/Coupon");
  const { getSeedProducts, SEED_COUPONS } = await import("../src/data/seed-products");

  await Product.deleteMany({});
  await Coupon.deleteMany({});

  const products = getSeedProducts();
  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);

  await Coupon.insertMany(SEED_COUPONS);
  console.log(`Seeded ${SEED_COUPONS.length} coupons`);

  const adminEmail = process.env.ADMIN_EMAIL || "admin@thechauka.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashed = await bcrypt.hash(adminPassword, 12);
    await User.create({
      name: "Admin",
      email: adminEmail,
      password: hashed,
      role: "admin",
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log("Admin user already exists");
  }

  await mongoose.disconnect();
  console.log("Seed complete!");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
