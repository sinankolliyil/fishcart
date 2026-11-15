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
      name: 'selectedReviews',
      title: 'Choose Reviews from Testimonials & Reviews',
      description:
        'Pick one or more reviews from the Testimonials & Reviews section (Website Reviews, Google Reviews, or Customer Testimonials) to display on this homepage card.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'customerReview' },
            { type: 'googleReview' },
            { type: 'testimonial' },
          ],
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
        subtitle: 'Homepage Customer Review Card',
      };
    },
  },
});

