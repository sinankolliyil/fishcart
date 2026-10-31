import { defineField, defineType } from 'sanity';
import { createSuggestStringInput } from '../../components/SuggestStringInput';

// ─── Autocomplete Suggestion Inputs ───
const FormatInput = createSuggestStringInput(
  ['Filet', 'Whole', 'Steak Cut', 'Boneless', 'Curry Cut', 'Skinless', 'Chops', 'Wings', 'Drumstick', '12 Pack', '6 Pack', 'Shell-on'],
  'format'
);

const BadgeInput = createSuggestStringInput(
  ['Rich in Omega-3', 'Free Range', 'Farm Fresh', 'Fresh Catch', 'Halal Certified', 'Organic', 'Best Seller', 'Premium Choice', 'High in Protein', 'Good Source of Protein', 'Rich in Vitamins', 'Antibiotic-Free', 'Low Fat'],
  'badgeLabel'
);

const OriginInput = createSuggestStringInput(
  ['United Kingdom', 'Local Farms', 'Organic Farms', 'Norway', 'Scotland', 'Spain', 'Poland', 'New Zealand', 'Thailand', 'Netherlands', 'Iceland'],
  'origin'
);

const ServesInput = createSuggestStringInput(
  ['1 - 2 People', '2 - 3 People', '2 - 4 People', '3 - 5 People', '4 - 6 People', 'Family Pack'],
  'serves'
);

const BestForTitleInput = createSuggestStringInput(
  ['Curry', 'Grill', 'Pan Fry', 'Bake / Roast', 'Deep Fry', 'Steamed', 'Slow Cook / Stew', 'BBQ', 'Boil / Poach', 'Scramble & Bake'],
  'bestFor[].title'
);

const HowToCookSubtitleInput = createSuggestStringInput(
  ['Spicy & Delicious', 'Herb & Lemon', 'Pan Seared with Garlic Butter', 'Crispy & Golden', 'Slow Cooked & Tender', 'Quick 15 Min Meal', 'Classic Oven Baked', '6-Minute Classic', 'Creamy & Buttery'],
  'howToCook[].subtitle'
);

const HowToCookTimeInput = createSuggestStringInput(
  ['05:00', '06:00', '06:12', '06:48', '10 mins', '15 mins', '20 mins', '25 mins', '30 mins', '45 mins'],
  'howToCook[].time'
);

const SizeIdInput = createSuggestStringInput(
  ['small', 'medium', 'large', 'xl', '500g', '1kg', '1.5kg', '2kg', '6-pack', '12-pack'],
  'sizes[].id'
);

const SizeLabelInput = createSuggestStringInput(
  ['Small', 'Medium', 'Large', 'Extra Large', 'Standard Pack', 'Family Pack', '500g', '1kg', '1.5kg', '2kg'],
  'sizes[].label'
);

const SizeSubLabelInput = createSuggestStringInput(
  ['(0 - 500g)', '(500g - 1kg)', '(1kg - 2kg)', '(2kg - 3kg)', '(3kg+)', '(53g - 63g)', '(63g - 73g)', '(73g+)', 'Serves 1-2', 'Serves 2-3', 'Serves 4-6'],
  'sizes[].subLabel'
);

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'list',     title: '1. Product List Card',          default: true },
    { name: 'details',  title: '2. Product Details — Overview' },
    { name: 'sizes',    title: '3. Sizes'                       },
    { name: 'nutrition',title: '4. Nutrition & Health'          },
    { name: 'allergy',  title: '5. Allergy Info'                },
    { name: 'cooking',  title: '6. Cooking & Recipes'           },
  ],
  fields: [

    // ══════════════════════════════════════════════════════════
    // GROUP 1 — Product List Card
    // These fields appear on the product card in the category listing page
    // ══════════════════════════════════════════════════════════

    defineField({
      name: 'status',
      title: 'Product Availability',
      type: 'string',
      group: 'list',
      description: 'Available: Active & clickable on the website. Not Available: Faded & not clickable.',
      options: {
        list: [
          { title: 'Available', value: 'enabled' },
          { title: 'Not Available', value: 'disabled' },
        ],
        layout: 'radio',
      },
      initialValue: 'enabled',
    }),

    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      group: 'list',
      description: 'Shown as the card heading — e.g. "Scottish Salmon Fillet", "Beef Chunks", "Whole Chicken"',
      validation: (r) => r.required().max(120),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      group: 'list',
      description: 'Auto-generated from the title. Used in the product URL — e.g. /product/scottish-salmon-fillet',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'string',
      group: 'list',
      description: 'Which section of the website this product appears in',
      options: {
        list: [
          { title: '🐟 Fish',    value: 'fish'    },
          { title: '🥩 Meat',    value: 'meat'    },
          { title: '🍗 Chicken', value: 'chicken' },
          { title: '🥚 Eggs',    value: 'eggs'    },
        ],
        layout: 'radio',
      },
      initialValue: 'fish',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'visibility',
      title: 'Visibility (Show / Hide)',
      type: 'string',
      group: 'list',
      description: 'Hide mode: item will NOT show on listings on the website.',
      options: {
        list: [
          { title: 'Show (Visible on website)', value: 'show' },
          { title: 'Hide (Hidden from listings)', value: 'hide' },
        ],
        layout: 'radio',
      },
      initialValue: 'show',
    }),

    defineField({
      name: 'image',
      title: 'Product Photo',
      type: 'image',
      group: 'list',
      description: 'Main product photo shown on the card and at the top of the details page',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'origin',
      title: 'Origin / Source',
      type: 'string',
      group: 'list',
      description: 'Shown on the card as "{Origin} • {Format}" — e.g. "Scotland", "Norway", "Local Farms"',
      components: { input: OriginInput },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'format',
      title: 'Format / Cut Style',
      type: 'string',
      group: 'list',
      description: 'Shown on the card alongside Origin — e.g. "Filet", "Whole", "Boneless", "12 Pack"',
      components: { input: FormatInput },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'price',
      title: 'Base Price (£)',
      type: 'number',
      group: 'list',
      description: 'Price in GBP shown on the card — e.g. 14.99',
      validation: (r) => r.required().min(0),
    }),

    defineField({
      name: 'unit',
      title: 'Price Unit',
      type: 'string',
      group: 'list',
      description: 'Displayed as "£14.99 / kg" or "£3.80 / pack" on the card and details page',
      options: {
        list: [
          { title: 'per kg  (£x.xx / kg)',   value: 'kg'    },
          { title: 'per pack (£x.xx / pack)', value: 'pack'  },
          { title: 'per piece (£x.xx / piece)', value: 'piece' },
          { title: 'per tray (£x.xx / tray)', value: 'tray'  },
        ],
      },
      initialValue: 'kg',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'badgeLabel',
      title: 'Badge Label',
      type: 'string',
      group: 'list',
      description: 'Small highlight pill shown on the card — e.g. "Rich in Omega-3", "Halal Certified", "Free Range". Leave empty if not needed.',
      components: { input: BadgeInput },
    }),

    // ══════════════════════════════════════════════════════════
    // GROUP 2 — Product Details — Overview tab
    // ══════════════════════════════════════════════════════════

    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'text',
      group: 'details',
      rows: 3,
      description: 'Short paragraph shown at the top of the details page below the title',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'rating',
      title: 'Customer Rating (1.0 – 5.0)',
      type: 'number',
      group: 'details',
      description: 'Star rating shown next to the product title on the details page — e.g. 4.8',
      initialValue: 4.8,
      validation: (r) => r.required().min(1).max(5),
    }),

    defineField({
      name: 'reviewCount',
      title: 'Number of Reviews',
      type: 'number',
      group: 'details',
      description: 'Shown as "(128 Reviews)" next to the star rating on the details page',
      initialValue: 128,
      validation: (r) => r.required().min(0),
    }),

    defineField({
      name: 'serves',
      title: 'Serving Portion',
      type: 'string',
      group: 'details',
      description: 'Portion guide shown in the details — e.g. "2 - 4 People", "Family Pack"',
      components: { input: ServesInput },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery Photos',
      type: 'array',
      group: 'details',
      description: 'Additional images shown as thumbnails in the image carousel on the details page (up to 4 extra photos)',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    defineField({
      name: 'catchFrom',
      title: 'Catch From / Sourcing Info',
      type: 'object',
      group: 'details',
      description: '"Catch From" card on the Overview tab — shows where the product is sourced from',
      fields: [
        defineField({
          name: 'location',
          title: 'Sourcing Location',
          type: 'string',
          description: 'e.g. "Norway, North Atlantic Ocean" or "Local Certified Farms, UK"',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'points',
          title: 'Sourcing Highlights',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Bullet points — e.g. "Sustainably wild-caught", "Cold clean waters", "100% pasture-raised"',
          validation: (r) => r.required().min(1),
        }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'specialty',
      title: 'Specialty / Quality Highlights',
      type: 'array',
      group: 'details',
      description: '"Specialty" card on the Overview tab — bullet points about the product\'s unique qualities',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(1),
    }),

    defineField({
      name: 'famousOn',
      title: 'Famous On (Popular Cuisines)',
      type: 'array',
      group: 'details',
      description: '"Famous On" card on the Overview tab — e.g. "Japanese Sushi", "British Roast", "Butter Chicken"',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(1),
    }),

    // ══════════════════════════════════════════════════════════
    // GROUP 3 — Sizes
    // Size selector pills shown on the right side of the details page
    // ══════════════════════════════════════════════════════════

    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      group: 'sizes',
      description: 'Size options shown as selector pills ("Select Size") on the details page. Each size can have its own price.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Size ID',
              type: 'string',
              description: 'Internal ID — e.g. "small", "medium", "1kg"',
              components: { input: SizeIdInput },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'label',
              title: 'Size Label',
              type: 'string',
              description: 'Shown on the pill button — e.g. "Small", "Medium", "1kg"',
              components: { input: SizeLabelInput },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'subLabel',
              title: 'Sub-label (Weight or Portion)',
              type: 'string',
              description: 'Shown below the label — e.g. "(500g – 1kg)", "(53g – 63g)"',
              components: { input: SizeSubLabelInput },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price for this Size (£)',
              type: 'number',
              description: 'Price shown on the details page when this size is selected. Leave blank to use the base price.',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'subLabel', price: 'price' },
            prepare({ title, subtitle, price }) {
              const numPrice = typeof price === 'number' ? price : Number(price);
              const hasPrice = !isNaN(numPrice) && numPrice > 0;
              return {
                title: `${title || 'Size'} ${subtitle || ''}`,
                subtitle: hasPrice ? `£${numPrice.toFixed(2)}` : 'Uses base price',
              };
            },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),

    // ══════════════════════════════════════════════════════════
    // GROUP 4 — Nutrition & Health
    // Shown in the "Nutrition" tab and Overview tab on the details page
    // ══════════════════════════════════════════════════════════

    defineField({
      name: 'nutritionInfo',
      title: 'Nutritional Facts',
      type: 'object',
      group: 'nutrition',
      description: 'The 4 nutrition stat cards (Protein, Calories, Omega-3, Fat) shown in the Nutrition tab and Overview tab',
      fields: [
        defineField({
          name: 'amount',
          title: 'Serving Amount',
          type: 'string',
          description: 'e.g. "Per 100g"',
          initialValue: 'Per 100g',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'protein',
          title: 'Protein',
          type: 'string',
          description: 'e.g. "20.4g"',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'calories',
          title: 'Calories',
          type: 'string',
          description: 'e.g. "208 kcal"',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'omega3',
          title: 'Omega-3',
          type: 'string',
          description: 'e.g. "2.3g". For non-fish products enter "N/A"',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'fat',
          title: 'Total Fat',
          type: 'string',
          description: 'e.g. "13.4g"',
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'goodFor',
      title: 'Good For (Health Benefits)',
      type: 'array',
      group: 'nutrition',
      description: '"Good For" card on the Overview tab — e.g. "Heart Health", "Muscle Recovery", "Brain Function"',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(1),
    }),

    // ══════════════════════════════════════════════════════════
    // GROUP 5 — Allergy Info
    // Shown in the "Allergy Info" tab and on the Overview tab
    // ══════════════════════════════════════════════════════════

    defineField({
      name: 'allergyInfo',
      title: 'Allergy Information',
      type: 'object',
      group: 'allergy',
      description: 'Shown in the red allergy warning card on the details page',
      fields: [
        defineField({
          name: 'title',
          title: 'Allergy Title',
          type: 'string',
          description: 'e.g. "Contains Fish", "Halal Certified", "Contains Eggs"',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'desc',
          title: 'Allergy Description',
          type: 'text',
          rows: 2,
          description: 'Main allergy warning text — e.g. "People with allergies should avoid consuming this product."',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'warning',
          title: 'Additional Warning',
          type: 'string',
          description: 'Secondary warning — e.g. "May contain small bones despite careful filleting."',
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),

    // ══════════════════════════════════════════════════════════
    // GROUP 6 — Cooking & Recipes
    // Shown in the "Cooking" tab and Overview tab on the details page
    // ══════════════════════════════════════════════════════════

    defineField({
      name: 'bestFor',
      title: 'Best For (Preparation Methods)',
      type: 'array',
      group: 'cooking',
      description: '"Best For" card on the Overview tab — each entry shows a cooking method with a description and image',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Cooking Method',
              type: 'string',
              description: 'e.g. "Curry", "Grill", "Pan Fry", "Slow Cook / Stew"',
              components: { input: BestForTitleInput },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Short Description',
              type: 'text',
              rows: 2,
              description: 'Tip shown below the method title — e.g. "Perfect for creamy, rich curries"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'image',
              title: 'Method Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Small circular photo shown next to the cooking method',
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', media: 'image' },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),

    defineField({
      name: 'howToCook',
      title: 'How To Cook — Recipe Cards',
      type: 'array',
      group: 'cooking',
      description: 'Recipe video thumbnails shown in the "How to Cook" section on the Overview tab. Each card shows a title, subtitle, and cook time over a background image.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Recipe Title',
              type: 'string',
              description: 'e.g. "Salmon Curry Recipe", "Grilled Ribeye Chops"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Style / Subtitle',
              type: 'string',
              description: 'e.g. "Spicy & Delicious", "Herb & Lemon"',
              components: { input: HowToCookSubtitleInput },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'time',
              title: 'Cook Time',
              type: 'string',
              description: 'e.g. "15 mins", "06:12"',
              components: { input: HowToCookTimeInput },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'image',
              title: 'Recipe Thumbnail Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Background image for the recipe card',
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'subtitle', media: 'image' },
          },
        },
      ],
      validation: (r) => r.required().min(1),
    }),

  ],

  orderings: [
    {
      title: 'Category then Title',
      name: 'categoryTitle',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'title',    direction: 'asc' },
      ],
    },
    {
      title: 'Price: Low to High',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
    {
      title: 'Price: High to Low',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      price: 'price',
      unit: 'unit',
      media: 'image',
      format: 'format',
      category: 'category',
      status: 'status',
      visibility: 'visibility',
    },
    prepare({ title, price, unit, media, format, category, status, visibility }) {
      const numPrice = typeof price === 'number' ? price : Number(price);
      const hasValidPrice = !isNaN(numPrice) && numPrice > 0;
      const priceStr = hasValidPrice ? `£${numPrice.toFixed(2)} / ${unit || 'kg'}` : '';
      const catEmoji =
        category === 'fish'    ? '🐟' :
        category === 'meat'    ? '🥩' :
        category === 'chicken' ? '🍗' :
        category === 'eggs'    ? '🥚' : '📦';
      
      const tags: string[] = [];
      if (visibility === 'hide') tags.push('🚫 Hidden');
      if (status === 'disabled') tags.push('🔴 Disabled');
      const tagStr = tags.length > 0 ? ` (${tags.join(', ')})` : '';

      return {
        title: `${catEmoji} ${title || 'Untitled Product'}${tagStr}`,
        subtitle: [format, priceStr].filter(Boolean).join(' · ') || 'Product',
        media,
      };
    },
  },
});
