import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'banner',
  title: 'Banner & Offer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destinationUrl',
      title: 'Destination URL (e.g. /fish or /chicken)',
      type: 'string',
    }),
    defineField({
      name: 'bannerType',
      title: 'Banner Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Carousel Slide', value: 'hero' },
          { title: 'Promotional Showcase Card', value: 'promo' },
          { title: 'Category Banner', value: 'category' },
        ],
        layout: 'radio',
      },
      initialValue: 'hero',
    }),
    defineField({
      name: 'offerText',
      title: 'Offer Badge Text (e.g. "20% OFF", "Buy 2 Get 1 Free")',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      title: 'Campaign Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'Campaign End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'visibility',
      title: 'Active / Published',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'offerText',
      type: 'bannerType',
      media: 'image',
      visible: 'visibility',
    },
    prepare({ title, subtitle, type, media, visible }) {
      return {
        title: `${title} ${visible === false ? '(Hidden)' : ''}`,
        subtitle: `Type: ${type} ${subtitle ? `· ${subtitle}` : ''}`,
        media,
      };
    },
  },
});
