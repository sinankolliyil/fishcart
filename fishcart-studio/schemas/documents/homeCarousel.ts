import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeCarousel',
  title: 'Homepage Main Hero Carousel (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'slides',
      title: 'Carousel Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Slide Title (e.g. "Finest Fresh Fish")', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Slide Subtitle / Description', type: 'text', rows: 2, validation: (r) => r.required() }),
            defineField({ name: 'image', title: 'Slide Background Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
            defineField({ name: 'destinationUrl', title: 'Destination Link (e.g. /fish)', type: 'string' }),
            defineField({ name: 'offerText', title: 'Offer Badge Text (optional)', type: 'string' }),
            defineField({ name: 'active', title: 'Is Slide Active', type: 'boolean', initialValue: true }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
              active: 'active',
            },
            prepare({ title, subtitle, media, active }) {
              return {
                title: `${title} ${active === false ? '[Inactive]' : ''}`,
                subtitle: subtitle || '',
                media,
              };
            },
          },
        },
      ],
      initialValue: [
        {
          title: 'Finest Fresh Fish',
          description: 'Caught daily, packed hygienically, and delivered fresh to your doorstep.',
          active: true,
        },
        {
          title: 'Premium Cut Meats',
          description: 'Tender, juicy cuts of mutton and beef sourced from certified farms.',
          active: true,
        },
        {
          title: 'Farm Fresh Chicken',
          description: '100% natural, antibiotic-free chicken prepared fresh for every order.',
          active: true,
        },
        {
          title: 'Nutritious Farm Eggs',
          description: 'Freshly sourced organic and free-range eggs rich in high-quality protein.',
          active: true,
        },
      ],
    }),
  ],
  preview: {
    select: {
      slides: 'slides',
    },
    prepare({ slides }) {
      return {
        title: 'Hero Banner Carousel',
        subtitle: `${slides?.length ?? 0} slide(s) configured (ID: homeCarousel)`,
      };
    },
  },
});
