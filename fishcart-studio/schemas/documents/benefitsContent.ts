import { defineField, defineType } from 'sanity';

const ICON_OPTIONS = [
  { title: 'Dumbbell (Protein / Muscle)', value: 'dumbbell' },
  { title: 'Droplets (Omega-3 / Fats)', value: 'droplets' },
  { title: 'Heart (Heart Health)', value: 'heart' },
  { title: 'Brain (Cognitive / Choline)', value: 'brain' },
  { title: 'Sun (Vitamins D & B12)', value: 'sun' },
  { title: 'Leaf (Low Fat / Clean)', value: 'leaf' },
  { title: 'Shield (Iron / Immunity / Selenium)', value: 'shield' },
  { title: 'Zap (Zinc / Niacin / Energy)', value: 'zap' },
  { title: 'Flame (Energy / Metabolism)', value: 'flame' },
  { title: 'Apple (Digestibility)', value: 'apple' },
  { title: 'Eye (Vision / Lutein)', value: 'eye' },
];

function createBenefitCardField(
  name: string,
  title: string,
  fieldset: string,
  defaultTitle: string,
  defaultDesc: string,
  defaultIcon: string
) {
  return defineField({
    name,
    title,
    type: 'object',
    fieldset,
    fields: [
      defineField({
        name: 'title',
        title: 'Benefit Title',
        type: 'string',
        initialValue: defaultTitle,
        validation: (r) => r.required(),
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 2,
        initialValue: defaultDesc,
        validation: (r) => r.required(),
      }),
      defineField({
        name: 'icon',
        title: 'Icon Type',
        type: 'string',
        options: {
          list: ICON_OPTIONS,
        },
        initialValue: defaultIcon,
      }),
    ],
  });
}

export default defineType({
  name: 'benefitsContent',
  title: 'Benefits & Nutrition Content (Singleton)',
  type: 'document',
  fieldsets: [
    { name: 'header', title: '1. Page Header & Bottom Box', options: { collapsible: true, collapsed: false } },
    { name: 'fish', title: '2. 🐟 Fish Nutritional Benefits (6 Cards)', options: { collapsible: true, collapsed: false } },
    { name: 'meat', title: '3. 🥩 Meat Nutritional Benefits (6 Cards)', options: { collapsible: true, collapsed: false } },
    { name: 'chicken', title: '4. 🍗 Chicken Nutritional Benefits (6 Cards)', options: { collapsible: true, collapsed: false } },
    { name: 'eggs', title: '5. 🥚 Egg Nutritional Benefits (6 Cards)', options: { collapsible: true, collapsed: false } },
  ],
  initialValue: {
    pageTitle: 'Nutritional Value',
    pageSubtitle: 'Discover the powerful health benefits of our fresh products.',
    whyFreshMatters: {
      title: 'Why Fresh Matters',
      description:
        'Fresh, responsibly sourced food helps preserve nutrients, improves taste, and supports a healthier lifestyle.',
    },
    fish1: { title: 'High in Protein', description: 'Essential building blocks for muscles, skin, and overall body repair.', icon: 'dumbbell' },
    fish2: { title: 'Rich in Omega-3', description: 'Healthy fatty acids that reduce inflammation and support heart health.', icon: 'droplets' },
    fish3: { title: 'Supports Heart Health', description: 'Regular consumption helps maintain healthy cholesterol and blood pressure.', icon: 'heart' },
    fish4: { title: 'Good for Brain Function', description: 'DHA and EPA improve memory, focus, and cognitive performance.', icon: 'brain' },
    fish5: { title: 'Rich in Vitamins D & B12', description: 'Vital vitamins for bone health, energy, and immune function.', icon: 'sun' },
    fish6: { title: 'Low in Saturated Fat', description: 'A lean protein choice that supports a balanced, heart-friendly diet.', icon: 'leaf' },
    meat1: { title: 'High Quality Protein', description: 'Complete amino acid profile for optimal muscle building and repair.', icon: 'dumbbell' },
    meat2: { title: 'Rich in Iron', description: 'Heme iron for healthy red blood cells and oxygen transport.', icon: 'shield' },
    meat3: { title: 'Excellent Source of Zinc', description: 'Supports immune function, wound healing, and cell growth.', icon: 'zap' },
    meat4: { title: 'Supports Muscle Growth', description: 'Creatine and protein work together for strength and recovery.', icon: 'dumbbell' },
    meat5: { title: 'Rich in Vitamin B12', description: 'Essential for nerve function, DNA synthesis, and energy production.', icon: 'sun' },
    meat6: { title: 'Energy Boosting Nutrients', description: 'B-vitamins and iron provide sustained energy throughout the day.', icon: 'flame' },
    chicken1: { title: 'Lean Protein', description: 'High protein content with minimal fat, ideal for fitness goals.', icon: 'dumbbell' },
    chicken2: { title: 'Low Fat', description: 'One of the leanest meat options for a healthy, balanced diet.', icon: 'leaf' },
    chicken3: { title: 'Rich in Niacin', description: 'Vitamin B3 supports metabolism, skin health, and nervous system.', icon: 'zap' },
    chicken4: { title: 'Supports Muscle Recovery', description: 'Fast-absorbing protein helps repair muscles after exercise.', icon: 'dumbbell' },
    chicken5: { title: 'Rich in Selenium', description: 'A powerful antioxidant that protects cells and boosts immunity.', icon: 'shield' },
    chicken6: { title: 'Easy to Digest', description: 'Gentle on the stomach, making it suitable for all age groups.', icon: 'apple' },
    egg1: { title: 'Complete Protein', description: 'Contains all nine essential amino acids in perfect proportions.', icon: 'dumbbell' },
    egg2: { title: 'Rich in Choline', description: 'Critical nutrient for brain health, liver function, and metabolism.', icon: 'brain' },
    egg3: { title: 'Supports Brain Development', description: 'Essential nutrients for cognitive growth in children and adults.', icon: 'brain' },
    egg4: { title: 'Good Source of Vitamin D', description: 'Supports bone strength, immune health, and calcium absorption.', icon: 'sun' },
    egg5: { title: 'Contains Healthy Fats', description: 'Balanced fatty acids that support hormone production and cell health.', icon: 'droplets' },
    egg6: { title: 'Supports Eye Health', description: 'Lutein and zeaxanthin protect against age-related vision decline.', icon: 'eye' },
    visibility: true,
  },
  fields: [
    // ─── Header & Bottom Box ───
    defineField({
      name: 'pageTitle',
      title: 'Page Title / Header',
      type: 'string',
      fieldset: 'header',
      initialValue: 'Nutritional Value',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageSubtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 2,
      fieldset: 'header',
      initialValue: 'Discover the powerful health benefits of our fresh products.',
    }),
    defineField({
      name: 'whyFreshMatters',
      title: 'Why Fresh Matters Bottom Box',
      type: 'object',
      fieldset: 'header',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Why Fresh Matters' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
          initialValue:
            'Fresh, responsibly sourced food helps preserve nutrients, improves taste, and supports a healthier lifestyle.',
        }),
      ],
    }),

    // ─── Fish Benefits (6 Cards) ───
    createBenefitCardField('fish1', 'Card 1: High in Protein', 'fish', 'High in Protein', 'Essential building blocks for muscles, skin, and overall body repair.', 'dumbbell'),
    createBenefitCardField('fish2', 'Card 2: Rich in Omega-3', 'fish', 'Rich in Omega-3', 'Healthy fatty acids that reduce inflammation and support heart health.', 'droplets'),
    createBenefitCardField('fish3', 'Card 3: Supports Heart Health', 'fish', 'Supports Heart Health', 'Regular consumption helps maintain healthy cholesterol and blood pressure.', 'heart'),
    createBenefitCardField('fish4', 'Card 4: Good for Brain Function', 'fish', 'Good for Brain Function', 'DHA and EPA improve memory, focus, and cognitive performance.', 'brain'),
    createBenefitCardField('fish5', 'Card 5: Rich in Vitamins D & B12', 'fish', 'Rich in Vitamins D & B12', 'Vital vitamins for bone health, energy, and immune function.', 'sun'),
    createBenefitCardField('fish6', 'Card 6: Low in Saturated Fat', 'fish', 'Low in Saturated Fat', 'A lean protein choice that supports a balanced, heart-friendly diet.', 'leaf'),

    // ─── Meat Benefits (6 Cards) ───
    createBenefitCardField('meat1', 'Card 1: High Quality Protein', 'meat', 'High Quality Protein', 'Complete amino acid profile for optimal muscle building and repair.', 'dumbbell'),
    createBenefitCardField('meat2', 'Card 2: Rich in Iron', 'meat', 'Rich in Iron', 'Heme iron for healthy red blood cells and oxygen transport.', 'shield'),
    createBenefitCardField('meat3', 'Card 3: Excellent Source of Zinc', 'meat', 'Excellent Source of Zinc', 'Supports immune function, wound healing, and cell growth.', 'zap'),
    createBenefitCardField('meat4', 'Card 4: Supports Muscle Growth', 'meat', 'Supports Muscle Growth', 'Creatine and protein work together for strength and recovery.', 'dumbbell'),
    createBenefitCardField('meat5', 'Card 5: Rich in Vitamin B12', 'meat', 'Rich in Vitamin B12', 'Essential for nerve function, DNA synthesis, and energy production.', 'sun'),
    createBenefitCardField('meat6', 'Card 6: Energy Boosting Nutrients', 'meat', 'Energy Boosting Nutrients', 'B-vitamins and iron provide sustained energy throughout the day.', 'flame'),

    // ─── Chicken Benefits (6 Cards) ───
    createBenefitCardField('chicken1', 'Card 1: Lean Protein', 'chicken', 'Lean Protein', 'High protein content with minimal fat, ideal for fitness goals.', 'dumbbell'),
    createBenefitCardField('chicken2', 'Card 2: Low Fat', 'chicken', 'Low Fat', 'One of the leanest meat options for a healthy, balanced diet.', 'leaf'),
    createBenefitCardField('chicken3', 'Card 3: Rich in Niacin', 'chicken', 'Rich in Niacin', 'Vitamin B3 supports metabolism, skin health, and nervous system.', 'zap'),
    createBenefitCardField('chicken4', 'Card 4: Supports Muscle Recovery', 'chicken', 'Supports Muscle Recovery', 'Fast-absorbing protein helps repair muscles after exercise.', 'dumbbell'),
    createBenefitCardField('chicken5', 'Card 5: Rich in Selenium', 'chicken', 'Rich in Selenium', 'A powerful antioxidant that protects cells and boosts immunity.', 'shield'),
    createBenefitCardField('chicken6', 'Card 6: Easy to Digest', 'chicken', 'Easy to Digest', 'Gentle on the stomach, making it suitable for all age groups.', 'apple'),

    // ─── Egg Benefits (6 Cards) ───
    createBenefitCardField('egg1', 'Card 1: Complete Protein', 'eggs', 'Complete Protein', 'Contains all nine essential amino acids in perfect proportions.', 'dumbbell'),
    createBenefitCardField('egg2', 'Card 2: Rich in Choline', 'eggs', 'Rich in Choline', 'Critical nutrient for brain health, liver function, and metabolism.', 'brain'),
    createBenefitCardField('egg3', 'Card 3: Supports Brain Development', 'eggs', 'Supports Brain Development', 'Essential nutrients for cognitive growth in children and adults.', 'brain'),
    createBenefitCardField('egg4', 'Card 4: Good Source of Vitamin D', 'eggs', 'Good Source of Vitamin D', 'Supports bone strength, immune health, and calcium absorption.', 'sun'),
    createBenefitCardField('egg5', 'Card 5: Contains Healthy Fats', 'eggs', 'Contains Healthy Fats', 'Balanced fatty acids that support hormone production and cell health.', 'droplets'),
    createBenefitCardField('egg6', 'Card 6: Supports Eye Health', 'eggs', 'Supports Eye Health', 'Lutein and zeaxanthin protect against age-related vision decline.', 'eye'),

    defineField({
      name: 'visibility',
      title: 'Visible on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Nutritional Value / Benefits Page',
        subtitle: 'Singleton Document (ID: benefitsContent)',
      };
    },
  },
});
