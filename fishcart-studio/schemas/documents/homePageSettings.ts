import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePageSettings',
  title: 'Homepage Additional Settings (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'infoCards',
      title: 'Four Value Info Cards (Row 4)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Card Title (e.g. Daily Selection)', type: 'string' }),
            defineField({ name: 'description', title: 'Description Text', type: 'text', rows: 2 }),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Check Circle (Daily Selection)', value: 'check' },
                  { title: 'Droplet (Hygienic & Safe)', value: 'droplet' },
                  { title: 'Leaf (Sourced Responsibly)', value: 'leaf' },
                  { title: 'Shield Check (Freshness You Can Trust)', value: 'shield' },
                ],
              },
            }),
          ],
        },
      ],
      initialValue: [
        {
          title: 'Daily Selection',
          description: 'Handpicked daily from trusted suppliers for the best quality.',
          icon: 'check',
        },
        {
          title: 'Hygienic & Safe',
          description: 'Cleaned, packed and delivered with highest hygiene standards.',
          icon: 'droplet',
        },
        {
          title: 'Sourced Responsibly',
          description: 'We care for the ocean and the environment for a better future.',
          icon: 'leaf',
        },
        {
          title: 'Freshness You Can Trust',
          description: 'We ensure premium quality and freshness in every product we deliver.',
          icon: 'shield',
        },
      ],
    }),
    defineField({
      name: 'featuredTestimonial',
      title: 'Homepage Spotlight Testimonial',
      type: 'object',
      fields: [
        defineField({ name: 'quote', title: 'Quote Text', type: 'text', rows: 2, initialValue: '"Super fresh products and great variety. Fishcart is our family\'s choice."' }),
        defineField({ name: 'author', title: 'Author (e.g. Priya S.)', type: 'string', initialValue: 'Priya S.' }),
        defineField({ name: 'rating', title: 'Stars', type: 'number', initialValue: 5 }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'infoCards',
    },
    prepare({ title }) {
      return {
        title: 'Homepage Extra Settings',
        subtitle: 'Value cards & featured testimonial (ID: homePageSettings)',
      };
    },
  },
});
