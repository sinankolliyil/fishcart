# FishCart Studio — Independent Content Management System

FishCart Studio is an independent Sanity Studio v3 application providing an administrative dashboard to manage content across the FishCart website.

---

## 1. Quick Start

### Installation
Navigate to the studio directory and install dependencies:
```bash
cd fishcart-studio
npm install
```

### Local Development
Run the local Studio development server:
```bash
npm run dev
```

The Studio will start at:
```
http://localhost:3333
```

---

## 2. Authentication & Login

When you open `http://localhost:3333`:
1. If you are not authenticated, Sanity Studio will automatically present the official Sanity authentication interface.
2. Sign in with your authenticated Sanity account (Google, GitHub, or Email).
3. Sanity verifies your account permissions against the project.
4. Once authorized, you can access the content management workspace.

---

## 3. Environment Configuration

Create a `.env` file in `fishcart-studio/` based on `.env.example`:
```env
SANITY_STUDIO_PROJECT_ID=<YOUR_NEW_PROJECT_ID>
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2024-03-01
```

---

## 4. Admin Interface Layout

The Studio organizes content into 5 intuitive sections:

1. **Products & Catalog**:
   - All Products
   - Fish Products (pre-filtered)
   - Meat Products (pre-filtered)
   - Chicken Products (pre-filtered)
   - Eggs Products (pre-filtered)
   - Product Categories
   - Filter Options (By Country, By Type, By Size)

2. **Homepage Management**:
   - Top Ribbon Announcements (marquee offers)
   - Main Image Carousel (Hero)
   - Category Item Counts (Top Right Cards)
   - Featured Recipe Carousel
   - Customer Testimonials
   - Promotional Banners & Offers
   - Additional Homepage Settings

3. **Recipes (How To Cook)**:
   - All Recipes
   - Filtered by Category (Fish, Meat, Chicken, Egg)
   - Filtered by Visibility (Visible vs. Hidden)

4. **Website Content Pages (Singletons)**:
   - Our Story Page (`ourStory`)
   - About Us Page (`aboutUs`)
   - Benefits & Nutrition Page (`benefitsContent`)

5. **Store Contact & Footer (Singleton)**:
   - Store Contact Information (`storeContact`)

---

## 5. Singleton Document Protection

The following document types are strictly protected singletons with stable IDs:
- `ourStory`
- `aboutUs`
- `benefitsContent`
- `storeContact`
- `homeRibbon`
- `topRightItemCount`
- `homeRecipes`
- `homeCarousel`
- `homePageSettings`

These documents cannot be duplicated or deleted in the Studio interface, preventing accidental disruption of live website sections.
