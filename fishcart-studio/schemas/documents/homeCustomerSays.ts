import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeCustomerSays',
  title: 'What Our Customers Say (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'What Our Customers Say',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviews',
      title: 'Customer Reviews (Kept Empty)',
      type: 'array',
      description: 'Add customer reviews to display on the homepage card. Kept empty by default.',
      initialValue: [],
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'customerName',
              title: 'Customer Name',
              type: 'string',
              description: 'e.g. Priya S.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'rating',
              title: 'Star Rating (1 - 5)',
              type: 'number',
              initialValue: 5,
              validation: (rule) => rule.min(1).max(5),
            }),
            defineField({
              name: 'reviewText',
              title: 'Review Text / Quote',
              type: 'text',
              rows: 3,
              description: 'e.g. "Super fresh products and great variety. Fishcart is our family\'s choice."',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'tagline',
              title: 'Optional Subtitle / Badge',
              type: 'string',
              description: 'e.g. Verified Buyer, Google Review',
            }),
          ],
          preview: {
            select: {
              title: 'customerName',
              subtitle: 'reviewText',
              rating: 'rating',
            },
            prepare({ title, subtitle, rating }) {
              return {
                title: `${title || 'Customer'} (${rating || 5}★)`,
                subtitle: subtitle || 'No quote entered',
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'sectionHeading',
    },
    prepare({ title }) {
      return {
        title: title || 'What Our Customers Say',
        subtitle: 'Homepage Customer Review Card (Empty by default)',
      };
    },
  },
});
