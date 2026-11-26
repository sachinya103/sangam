# Sangam Mobile Centre (`sangammobilecentre.com`)

Dynamic mobile accessories e-commerce platform for **Sangam Mobile Centre, Varanasi, Uttar Pradesh**.

## Key Features
- **Storefront**: Flipkart-inspired Blue (`#1769D2`) & White (`#FFFFFF`) storefront with 10 accessory categories, keyword search, category filtering, price/discount sorting, and product detail pages with Schema.org JSON-LD.
- **Shop Pickup Only**: Prominently communicates Varanasi store pickup (`₹0` delivery fee, no delivery address forms, Cash or UPI payment at pickup).
- **WhatsApp Ordering with Server Recording**: Every order clicked via **Order on WhatsApp** records the order in the store database (`POST /api/orders`) with server-side price and stock validation before generating the URL-encoded `https://wa.me/919118755579?text=...` message.
- **Optional Customer OTP Login**: Mobile number OTP verification, profile management, saved cart synchronization, and order history.
- **Secure Admin Panel (`/admin`)**: First-run owner passcode setup (or `ADMIN_PASSCODE` env var), dashboard KPIs, Product CRUD with image upload & demo inventory management, Order lifecycle (`Pending WhatsApp` -> `Confirmed` with atomic stock deduction -> `Ready for Pickup` -> `Collected` / `Rejected` / `Abandoned`), and Shop/Banner/Offer settings.

## Local Setup & Commands
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and configure `ADMIN_PASSCODE` (or claim it on first visit to `/admin/login`).
3. Run unit tests:
   ```bash
   npm test
   ```
4. Start development server on port `3000`:
   ```bash
   npm run dev
   ```
5. Build for production and start:
   ```bash
   npm run build
   npm start
   ```

## Production Deployment & Custom Domain (`sangammobilecentre.com`)
- **Vercel Deployment**: The repository includes `vercel.json` and `api/index.ts` so both the Vite frontend and Express `/api/*` endpoints deploy together. Make sure **all folders** (`src/`, `server/`, `api/`, `index.html`, `package.json`, `vercel.json`, `vite.config.ts`) are pushed to the repository root; if Vercel shows `Failed to resolve /src/main.tsx from /vercel/path0/index.html`, verify that `src/main.tsx` is present at the same root level as `index.html` in GitHub (and check Vercel **Project Settings → Root Directory**).
- **Node.js Server Hosting**: Alternatively deploy to Cloud Run, Railway, Render, or a VPS running `npm run build && npm start` on port `3000` with `NODE_ENV=production`, `APP_URL=https://sangammobilecentre.com`, and `ADMIN_PASSCODE`.
- **Domain Connection (`sangammobilecentre.com`)**:
  1. Add `sangammobilecentre.com` and `www.sangammobilecentre.com` in your hosting provider's Custom Domains settings.
  2. Point your DNS `A` record (`@`) and `CNAME` record (`www`) to the host's provided IP / CNAME target.
  3. Enable automatic SSL/HTTPS and verify `https://sangammobilecentre.com/sitemap.xml` and `/robots.txt`.
- **Optional Cloud Integrations**: Configure `MONGODB_URI`, `FIREBASE_API_KEY`, `CLOUDINARY_*`, and `RAZORPAY_*` environment variables when connecting external managed services.
