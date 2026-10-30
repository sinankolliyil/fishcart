/**
 * OPTIONAL Catalog Seed & Migration Script for FishCart CMS
 *
 * NOTE: This script is NOT executed automatically.
 * Per project rules, it requires an explicit execution and approval.
 *
 * Usage:
 *   # Dry run (safe, reads data, logs actions without writing to Sanity):
 *   npx ts-node scripts/seedCatalog.ts --dry-run
 *
 *   # Live execution (requires SANITY_AUTH_TOKEN in environment):
 *   SANITY_AUTH_TOKEN=your_token npx ts-node scripts/seedCatalog.ts --execute
 */

import { createClient } from '@sanity/client';

const isDryRun = !process.argv.includes('--execute');
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4uuomk8a';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';
const token = process.env.SANITY_AUTH_TOKEN;

console.log('=== FishCart CMS Migration / Seed Script ===');
console.log(`Mode: ${isDryRun ? 'DRY-RUN (Simulating only, no writes)' : 'EXECUTE (Writing to Sanity)'}`);
console.log(`Target Project ID: ${projectId || 'NOT SET'}`);
console.log(`Dataset: ${dataset}`);

if (!isDryRun && !token) {
  console.error('\nERROR: An active SANITY_AUTH_TOKEN write token is required to execute writes.');
  process.exit(1);
}

const client = projectId && token ? createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-01',
  token,
  useCdn: false,
}) : null;

interface SeedDoc {
  _id: string;
  _type: string;
  [key: string]: any;
}

// Categories to create
const CATEGORIES: SeedDoc[] = [
  { _id: 'category-fish', _type: 'category', title: 'Fish', slug: { current: 'fish' }, subtitle: '100+ Items', iconName: 'fish', displayOrder: 1, visibility: true },
  { _id: 'category-meat', _type: 'category', title: 'Meat', slug: { current: 'meat' }, subtitle: '50+ Items', iconName: 'beef', displayOrder: 2, visibility: true },
  { _id: 'category-chicken', _type: 'category', title: 'Chicken', slug: { current: 'chicken' }, subtitle: '30+ Items', iconName: 'drumstick', displayOrder: 3, visibility: true },
  { _id: 'category-eggs', _type: 'category', title: 'Eggs', slug: { current: 'eggs' }, subtitle: 'Farm Fresh', iconName: 'egg', displayOrder: 4, visibility: true },
];

// Singletons to initialize idempotently if missing
const SINGLETONS: SeedDoc[] = [
  {
    _id: 'topRightItemCount',
    _type: 'topRightItemCount',
    fishSubtitle: '100+ Items',
    meatSubtitle: '50+ Items',
    chickenSubtitle: '30+ Items',
    eggsSubtitle: 'Farm Fresh',
  },
  {
    _id: 'storeContact',
    _type: 'storeContact',
    businessName: 'FishCart Store',
    contactPageHeading: 'Contact Us',
    contactPageDescription: "We're here to help! Get in touch with us for any queries, orders or support.",
    phone: '+44 1206 123456',
    phoneNote: 'Have a question or need assistance? Call us anytime.',
    email: 'hello@fishcart.co.uk',
    emailNote: "Drop us an email and we'll get back to you.",
    storeAddress: 'Unit 5 Hythe Quay, England, CO2 8JB',
    headOfficeAddress: '123, Fresh Fish Street, T. Nagar, Chennai, Tamil Nadu - 600017',
    workingHours: 'Monday - Sunday: 8:00 AM - 10:00 PM',
    mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=80.19,13.04,80.25,13.08&layer=mapnik',
  },
  {
    _id: 'aboutUs',
    _type: 'aboutUs',
    heroSubtitle: 'About Us',
    heroHeading: 'Fresh. Hygienic. \nTrusted. Delivered.',
    heroDescription:
      'We are passionate about delivering the freshest non-veg products to your doorstep. Quality, hygiene and trust are at the heart of everything we do.',
    teamSignature: 'Team FishCart',
    selectionTagline: 'What We Offer',
    selectionHeading: 'Explore Our Fresh Selection',
    selectionSubtitle: 'Handpicked non-veg products, cleaned with care and delivered fresh.',
    selectionCards: [
      { title: 'Fish', href: '/fish' },
      { title: 'Meat', href: '/meat' },
      { title: 'Chicken', href: '/chicken' },
      { title: 'Egg', href: '/eggs' },
    ],
    whyChooseHeading: 'Why Choose FishCart?',
    highlights: [
      { title: 'Premium Quality', description: 'We never compromise on quality.', icon: 'medal' },
      { title: 'Fresh & Hygienic', description: 'Maintained with the highest standards.', icon: 'thermometer' },
      { title: 'Trusted & Reliable', description: 'Thousands of families trust us every day.', icon: 'heart' },
      { title: 'Customer First', description: "We're here for you, always.", icon: 'headset' },
    ],
    visibility: true,
  },
  {
    _id: 'benefitsContent',
    _type: 'benefitsContent',
    pageTitle: 'Nutritional Value',
    pageSubtitle: 'Discover the powerful health benefits of our fresh products.',
    whyFreshMatters: {
      title: 'Why Fresh Matters',
      description:
        'Fresh, responsibly sourced food helps preserve nutrients, improves taste, and supports a healthier lifestyle.',
    },
    visibility: true,
  },
  {
    _id: 'ourStory',
    _type: 'ourStory',
    heroHeading: 'Our Story',
    heroDescription:
      'From a small online initiative to your trusted fresh partner. Our journey is built on hard work, honesty, and the love of our customers.',
    statistics: [
      { value: '1+', label: 'Years of Trust', description: 'Serving you with freshness & care.', icon: 'award' },
      { value: '10,000+', label: 'Happy Customers', description: 'Your support is our strength.', icon: 'heart' },
      { value: '15,000+', label: 'Orders Delivered', description: 'Pre-orders delivered with smile', icon: 'truck' },
      { value: '100%', label: 'Quality Promise', description: 'Freshness & hygiene guaranteed', icon: 'shieldCheck' },
    ],
    journeyCards: [
      {
        title: 'How It All Started',
        description:
          'One year ago, we started our journey with a simple idea – to deliver fresh fish and meat to our community. We began with online pre-orders and doorstep delivery.',
        bulletPoints: [
          'Took pre-orders through WhatsApp & calls',
          'Carefully sourced and packed every order',
          'Delivered to your doorstep with on-time promise',
        ],
      },
      {
        title: 'Growing With You',
        description:
          'Your trust and support motivated us to take the next big step – our own shop!',
        bulletPoints: [
          'Better variety, better quality',
          'More control on freshness',
          'Stronger supply network',
        ],
      },
    ],
    promiseHeading: 'Our Promise\nTo You',
    promiseSubtitle: 'We promise to deliver the freshest.',
    promises: [
      { text: 'Never compromise on quality', icon: 'shieldCheck' },
      { text: 'Hygienically cleaned & packed', icon: 'shieldCheck' },
      { text: 'Sourced from trusted suppliers', icon: 'truck' },
      { text: 'Delivered with care & on time', icon: 'package' },
      { text: '100% satisfaction or we make it right', icon: 'heart' },
      { text: 'Sustainable Sourcing', icon: 'shieldCheck' },
    ],
    processHeading: "From Ocean To Our Shop – Here's How It Happens",
    processSteps: [
      { stepNumber: 1, title: 'Daily Catch' },
      { stepNumber: 2, title: 'Sorting & Cleaning' },
      { stepNumber: 3, title: 'Ice Packing' },
      { stepNumber: 4, title: 'Air Freight' },
      { stepNumber: 5, title: 'Import & Inspection' },
      { stepNumber: 6, title: 'Cold Storage & Transport' },
      { stepNumber: 7, title: 'Final Check at Our Shop' },
      { stepNumber: 8, title: 'Delivered to You' },
    ],
    thankYouHeading: 'Thank You!',
    thankYouText: 'Every order, every feedback, and every smile pushes us to do better every day.',
    closingQuote: "We don't just sell fish & meat,\nwe deliver trust, health and happiness.",
    visibility: true,
  },
];

async function run() {
  console.log('\n[1/3] Preparing Categories...');
  for (const cat of CATEGORIES) {
    console.log(`  - Category: ${cat.title} (ID: ${cat._id})`);
    if (!isDryRun && client) {
      await client.createOrReplace(cat as any);
    }
  }

  console.log('\n[2/3] Preparing Protected Singletons...');
  for (const single of SINGLETONS) {
    console.log(`  - Singleton: ${single._id} (Type: ${single._type})`);
    if (!isDryRun && client) {
      await client.createIfNotExists(single as any);
    }
  }

  console.log('\n[3/3] Report Summary:');
  console.log(`  - Categories processed: ${CATEGORIES.length}`);
  console.log(`  - Singletons processed: ${SINGLETONS.length}`);
  if (isDryRun) {
    console.log('\nDry-run complete. No changes were committed to your Sanity dataset.');
  } else {
    console.log('\nSeed execution complete.'); 
  }
}

run().catch((err) => {
  console.error('Migration error:', err);
  process.exit(1);
});
