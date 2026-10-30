import { defineField, defineType } from 'sanity';
import { createSuggestStringInput } from '../../components/SuggestStringInput';

// ─── Dynamic Autocomplete Suggestion Inputs ───
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

const FilterCountryInput = createSuggestStringInput(
  ['United Kingdom', 'Norway', 'Scotland', 'Spain', 'Poland', 'New Zealand', 'Thailand', 'Netherlands', 'Organic Farms', 'Local Farms'],
  'filterCountry'
);

const ServesInput = createSuggestStringInput(
  ['1 - 2 People', '2 - 3 People', '2 - 4 People', '3 - 5 People', '4 - 6 People', 'Family Pack'],
  'serves'
);

const CutOptionIdInput = createSuggestStringInput(
  ['fillet', 'whole', 'steak', 'curry-cut', 'boneless', 'cleaned', 'skin-on', 'chops', 'bone-in', '6-pack', '12-pack', '30-tray'],
  'cutOptions[].id'
);

const CutOptionLabelInput = createSuggestStringInput(
  ['Fillet', 'Steak', 'Whole Cleaned', 'Curry Cut', 'Boneless Cubes', 'Cleaned & Gutted', 'Skin-on Fillet', 'Chops & Steaks', 'Bone-in Curry Cut', '6 Pack Box', '12 Pack Box', '30 Egg Tray'],
  'cutOptions[].label'
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

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'list', title: '1. Product List (Card Info)', default: true },
    { name: 'overview', title: '2. Details - Overview' },
    { name: 'sizes', title: '3. Sizes & Cuts' },
    { name: 'nutrition', title: '4. Nutrition & Health' },
    { name: 'allergy', title: '5. Allergy Info' },
    { name: 'cooking', title: '6. Cooking & Recipes' },
    { name: 'status', title: '7. Status & Order' },
  ],
  fields: [
    // ══════════════════════════════════════════════════════
    // GROUP 1: Product List (Card Info)
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      group: 'list',
      description: 'Display name on product card and header (e.g. Scottish Salmon Fillet, Beef Chunks, Whole Chicken)',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / URL ID',
      type: 'slug',
      group: 'list',
      description: 'Unique identifier for the product URL (e.g. scottish-salmon-fillet)',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Product Category',
      type: 'string',
      group: 'list',
      description: 'Select which category this product belongs to',
      options: {
        list: [
          { title: '🐟 Fish', value: 'fish' },
          { title: '🥩 Meat', value: 'meat' },
          { title: '🍗 Chicken', value: 'chicken' },
          { title: '🥚 Eggs', value: 'eggs' },
        ],
        layout: 'radio',
      },
      initialValue: 'fish',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'format',
      title: 'Format / Cut Style',
      type: 'string',
      group: 'list',
      description: 'Cut style shown on product card as "{Origin} • {Format}" (e.g. Filet, Whole, Steak Cut, Boneless, 12 Pack)',
      components: { input: FormatInput },
      initialValue: 'Filet',
    }),
    defineField({
      name: 'origin',
      title: 'Display Origin',
      type: 'string',
      group: 'list',
      description: 'Display country / source shown on card (e.g. Scotland, Spain, Norway, Local Farms)',
      components: { input: OriginInput },
      initialValue: 'United Kingdom',
    }),
    defineField({
      name: 'filterCountry',
      title: 'Sourcing Country (for Filters)',
      type: 'string',
      group: 'list',
      description: 'Country used by the sidebar filter on the catalog page',
      components: { input: FilterCountryInput },
      initialValue: 'United Kingdom',
    }),
    defineField({
      name: 'badgeLabel',
      title: 'Badge Label (Optional)',
      type: 'string',
      group: 'list',
      description: 'Optional highlight pill on product card (e.g. Rich in Omega-3, High in Protein, Antibiotic-Free, Free Range)',
      components: { input: BadgeInput },
    }),
    defineField({
      name: 'price',
      title: 'Base Price (£)',
      type: 'number',
      group: 'list',
      description: 'Base price in GBP (£) displayed on catalog cards',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'unit',
      title: 'Price Unit',
      type: 'string',
      group: 'list',
      description: 'Displayed as "£14.99 / kg" or "£3.80 / pack"',
      options: {
        list: [
          { title: 'per kg (kg)', value: 'kg' },
          { title: 'per pack (pack)', value: 'pack' },
          { title: 'per piece (piece)', value: 'piece' },
          { title: 'per tray (tray)', value: 'tray' },
        ],
      },
      initialValue: 'kg',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Product Photo',
      type: 'image',
      group: 'list',
      description: 'Primary product photo displayed on catalog cards and the details hero area',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageSrc',
      title: 'Static Image Asset Path (Fallback)',
      type: 'string',
      group: 'list',
      description: 'Default asset path (e.g. /assets/2_image.png) used when no uploaded photo is set',
    }),
    defineField({
      name: 'isFavorite',
      title: 'Default Saved / Favorite',
      type: 'boolean',
      group: 'list',
      description: 'Show heart icon pre-selected by default',
      initialValue: false,
    }),

    // ══════════════════════════════════════════════════════
    // GROUP 2: Product Details - Overview
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'description',
      title: 'Product Description',
      type: 'text',
      group: 'overview',
      rows: 3,
      description: 'Introductory overview paragraph shown at the top of the details page and under the Details tab',
    }),
    defineField({
      name: 'rating',
      title: 'Customer Rating (1.0 - 5.0)',
      type: 'number',
      group: 'overview',
      description: 'Star rating number displayed next to product title (e.g. 4.8)',
      initialValue: 4.8,
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'number',
      group: 'overview',
      description: 'Number of customer reviews displayed (e.g. 128)',
      initialValue: 128,
    }),
    defineField({
      name: 'serves',
      title: 'Serving Portion Guide',
      type: 'string',
      group: 'overview',
      description: 'Serving portion estimate (e.g. 2 - 4 People, Family Pack)',
      components: { input: ServesInput },
      initialValue: '2 - 4 People',
    }),
    defineField({
      name: 'catchFrom',
      title: 'Catch / Sourcing Info',
      type: 'object',
      group: 'overview',
      description: 'Displayed in the "Catch From" card on the Overview tab and Details tab',
      fields: [
        defineField({
          name: 'location',
          title: 'Sourcing Location / Region',
          type: 'string',
          description: 'e.g. Norway, North Atlantic Ocean or Local Certified Farms, UK',
        }),
        defineField({
          name: 'points',
          title: 'Sourcing Highlights',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'e.g. Sustainably wild-caught, Cold clean waters, 100% pasture-raised',
        }),
      ],
    }),
    defineField({
      name: 'specialty',
      title: 'Specialty / Quality Highlights',
      type: 'array',
      group: 'overview',
      description: 'Bullet points shown in the "Specialty" card and "Quality & Highlights" tab',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'famousOn',
      title: 'Famous On (Popular Cuisines)',
      type: 'array',
      group: 'overview',
      description: 'Bullet points shown in the "Famous On" card (e.g. Japanese Sushi, British Roast, Butter Chicken)',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Gallery Photos',
      type: 'array',
      group: 'overview',
      description: 'Thumbnail images shown in the gallery below the main product photo (up to 4 extra photos)',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // ══════════════════════════════════════════════════════
    // GROUP 3: Sizes & Cuts
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'sizes',
      title: 'Available Sizes & Portions',
      type: 'array',
      group: 'sizes',
      description: 'Size options shown in the "Select Size" pills and the "Sizes & Cuts" tab',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Size ID',
              type: 'string',
              components: { input: SizeIdInput },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'label',
              title: 'Size Label',
              type: 'string',
              description: 'e.g. Small, Medium, Large, Standard Pack, 1kg',
              components: { input: SizeLabelInput },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'subLabel',
              title: 'Sub-label (Weight or Portions)',
              type: 'string',
              description: 'e.g. (500g - 1kg), (1kg - 2kg), (53g - 63g)',
              components: { input: SizeSubLabelInput },
            }),
            defineField({
              name: 'price',
              title: 'Size Price (£)',
              type: 'number',
              description: 'Price override for this size option',
            }),
            defineField({
              name: 'stock',
              title: 'Stock Quantity',
              type: 'number',
              initialValue: 10,
            }),
            defineField({
              name: 'availability',
              title: 'In Stock',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'subLabel',
              price: 'price',
              availability: 'availability',
            },
            prepare({ title, subtitle, price, availability }) {
              const numPrice = typeof price === 'number' ? price : Number(price);
              const hasPrice = !isNaN(numPrice) && numPrice > 0;
              return {
                title: `${title || 'Size'} ${subtitle ? subtitle : ''}`,
                subtitle: `${hasPrice ? `£${numPrice.toFixed(2)}` : 'Base price'} ${availability === false ? '[Out of stock]' : ''}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'cutOptions',
      title: 'Cut Options',
      type: 'array',
      group: 'sizes',
      description: 'Cut choices displayed in the "Cut Options" section under the Sizes & Cuts tab',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Cut ID',
              type: 'string',
              components: { input: CutOptionIdInput },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'label',
              title: 'Cut Label',
              type: 'string',
              description: 'e.g. Fillet, Steak, Whole Cleaned, Boneless Cubes, Chops, 12 Pack Box',
              components: { input: CutOptionLabelInput },
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'id' },
          },
        },
      ],
    }),

    // ══════════════════════════════════════════════════════
    // GROUP 4: Nutrition & Health
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'nutritionInfo',
      title: 'Nutritional Facts',
      type: 'object',
      group: 'nutrition',
      description: 'Displayed in the 4 nutrition stat cards (Protein, Calories, Omega-3, Fat)',
      fields: [
        defineField({ name: 'amount', title: 'Serving Amount', type: 'string', initialValue: 'Per 100g' }),
        defineField({ name: 'protein', title: 'Protein', type: 'string', description: 'e.g. 20.4g', initialValue: '20.4g' }),
        defineField({ name: 'calories', title: 'Calories', type: 'string', description: 'e.g. 208 kcal', initialValue: '208 kcal' }),
        defineField({ name: 'omega3', title: 'Omega-3', type: 'string', description: 'e.g. 2.3g', initialValue: '2.3g' }),
        defineField({ name: 'fat', title: 'Total Fat', type: 'string', description: 'e.g. 13.4g', initialValue: '13.4g' }),
      ],
    }),
    defineField({
      name: 'goodFor',
      title: 'Health Benefits / Good For',
      type: 'array',
      group: 'nutrition',
      description: 'Bullet points shown in the "Good For" card and "Health Benefits" list',
      of: [{ type: 'string' }],
    }),

    // ══════════════════════════════════════════════════════
    // GROUP 5: Allergy Info
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'allergyInfo',
      title: 'Allergy Information',
      type: 'object',
      group: 'allergy',
      description: 'Displayed in the red allergy warning card on the Overview and Allergy Info tabs',
      fields: [
        defineField({ name: 'title', title: 'Allergy Title', type: 'string', description: 'e.g. Contains Fish or Halal Certified', initialValue: 'Contains Fish' }),
        defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2, initialValue: 'People with allergies should avoid consuming this product.' }),
        defineField({ name: 'warning', title: 'Warning Statement', type: 'string', initialValue: 'May contain small bones despite careful filleting.' }),
      ],
    }),

    // ══════════════════════════════════════════════════════
    // GROUP 6: Cooking & Recipes
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'bestFor',
      title: 'Best For (Preparation Methods)',
      type: 'array',
      group: 'cooking',
      description: 'Displayed in the "Best For" card on the Overview tab (e.g. Curry, Grill, Pan Fry, Slow Cook)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Preparation Method',
              type: 'string',
              description: 'e.g. Curry, Grill, Pan Fry, Slow Cook / Stew',
              components: { input: BestForTitleInput },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Short tip (e.g. Perfect for creamy, rich curries)',
            }),
            defineField({
              name: 'image',
              title: 'Illustration / Photo',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', media: 'image' },
          },
        },
      ],
    }),
    defineField({
      name: 'howToCook',
      title: 'How To Cook Recipes',
      type: 'array',
      group: 'cooking',
      description: 'Recipe cards shown in the "How to Cook" section on the Overview and Cooking tabs',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Recipe Title',
              type: 'string',
              description: 'e.g. Salmon Curry Recipe, Grilled Ribeye Chops',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle / Style',
              type: 'string',
              description: 'e.g. Spicy & Delicious or Herb & Lemon',
              components: { input: HowToCookSubtitleInput },
            }),
            defineField({
              name: 'time',
              title: 'Cook Time',
              type: 'string',
              description: 'e.g. 15 mins or 06:12',
              components: { input: HowToCookTimeInput },
            }),
            defineField({
              name: 'image',
              title: 'Recipe Image / Thumbnail',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'subtitle', media: 'image' },
          },
        },
      ],
    }),

    // ══════════════════════════════════════════════════════
    // GROUP 7: Status & Ordering
    // ══════════════════════════════════════════════════════
    defineField({
      name: 'availabilityStatus',
      title: 'Availability Status',
      type: 'string',
      group: 'status',
      options: {
        list: [
          { title: 'Available (In Stock)', value: 'available' },
          { title: 'Unavailable (Out of Stock)', value: 'unavailable' },
        ],
        layout: 'radio',
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'visibilityStatus',
      title: 'Visibility Status',
      type: 'string',
      group: 'status',
      options: {
        list: [
          { title: 'Visible on Website', value: 'visible' },
          { title: 'Hidden (Draft / Archive)', value: 'hidden' },
        ],
        layout: 'radio',
      },
      initialValue: 'visible',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order / Priority',
      type: 'number',
      group: 'status',
      description: 'Lower numbers appear first on the category list (e.g. 1, 2, 3)',
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
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
      availabilityStatus: 'availabilityStatus',
      visibilityStatus: 'visibilityStatus',
    },
    prepare({ title, price, unit, media, format, category, availabilityStatus, visibilityStatus }) {
      const numPrice = typeof price === 'number' ? price : Number(price);
      const hasValidPrice = !isNaN(numPrice) && numPrice > 0;
      const priceStr = hasValidPrice ? `£${numPrice.toFixed(2)}/${unit || 'kg'}` : '';
      const formatStr = typeof format === 'string' && format ? format : '';
      const catEmoji =
        category === 'fish'
          ? '🐟'
          : category === 'meat'
            ? '🥩'
            : category === 'chicken'
              ? '🍗'
              : category === 'eggs'
                ? '🥚'
                : '📦';
      const statusStr =
        visibilityStatus === 'hidden'
          ? ' [HIDDEN]'
          : availabilityStatus === 'unavailable'
            ? ' [OUT OF STOCK]'
            : '';

      const subtitleParts = [formatStr, priceStr].filter(Boolean);

      return {
        title: `${catEmoji} ${title || 'Untitled Product'}${statusStr}`,
        subtitle: subtitleParts.length > 0 ? subtitleParts.join(' · ') : 'Product',
        media,
      };
    },
  },
});

