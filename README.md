# The Chauka (चौका)

Premium full-stack web application for a Jaipur-based homemade Indian snacks brand. Built with emotional storytelling, heritage aesthetics, and a complete ordering flow.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, shadcn-style UI
- **Backend:** Next.js API Routes, MongoDB + Mongoose
- **Auth:** Auth.js (NextAuth v5)
- **Payments:** Razorpay
- **Email:** Resend
- **Images:** Cloudinary-ready (optional)

## Features

- Cinematic landing page with heritage storytelling
- Full menu with search, filters, per-kg & per-piece pricing
- Product detail pages with grandmother's recipe notes
- Cart & premium checkout (Razorpay + COD/pickup)
- User dashboard (orders, loyalty points)
- Admin dashboard (order management, status updates)
- Bulk/festival order inquiries with WhatsApp integration
- Pincode delivery checker (Jaipur)
- Coupon support (`CHAUKA10`, `FESTIVAL250`)
- Dark mode, PWA manifest, SEO schema markup
- Seed data from actual menu (40+ products)

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 3. MongoDB

Run MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/atlas). Set `MONGODB_URI` in `.env.local`.

### 4. Seed database

```bash
npm run seed
```

This creates all menu products, coupons, and an admin user.

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Default Admin Login

After seeding:

- **Email:** `admin@thechauka.com` (or your `ADMIN_EMAIL`)
- **Password:** `admin123` (or your `ADMIN_PASSWORD`)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/menu` | Product catalog |
| `/menu/[slug]` | Product detail |
| `/about` | Family story & timeline |
| `/bulk-orders` | Corporate/festival inquiries |
| `/cart` | Shopping cart |
| `/checkout` | Checkout (auth required) |
| `/dashboard` | User account |
| `/admin` | Admin panel (admin role) |
| `/auth/login` | Sign in |
| `/auth/register` | Sign up |

## Razorpay Setup

1. Create account at [razorpay.com](https://razorpay.com)
2. Add test keys to `.env.local`
3. Without keys, checkout runs in **mock mode** (auto-confirms payment)

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

Set `NEXT_PUBLIC_APP_URL` to your production domain.

## Project Structure

```
src/
├── app/              # Pages & API routes
├── components/       # UI & layout components
├── data/             # Seed product data
├── hooks/            # Custom hooks
├── lib/              # Utilities, db, email, delivery
├── models/           # Mongoose schemas
├── store/            # Zustand cart store
└── types/            # TypeScript types
```

## Menu Data

Products are seeded from The Chauka's actual menu including:

- Mathri varieties (₹320–550/kg)
- Namkeen, chivda, moongfali
- Sweets & ladoo (₹450–1200/kg)
- Samosa (₹100/piece), kachori (₹500/piece)
- Festival hampers & party packs

## Contact (Brand)

- **Phone:** +91 90015 95100 (Pushpa Sogani)
- **Address:** 153, Mahavir Nagar II, Maharani Farm, Durgapura Road, Jaipur

## License

Private — The Chauka brand assets and recipes.
