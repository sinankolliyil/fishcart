import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Customer Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Review Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Google Reviews', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
        ],
        layout: 'radio',
      },
      initialValue: 'google',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1 - 5)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'testimonialText',
      title: 'Testimonial / Review Text',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'customerImage',
      title: 'Customer Avatar Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'timeAgo',
      title: 'Time Ago (e.g. "2 days ago", "1 week ago")',
      type: 'string',
      initialValue: 'Recent',
    }),
    defineField({
      name: 'likes',
      title: 'Thumbs Up / Likes Count',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'visibility',
      title: 'Visible on Website',
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
      title: 'customerName',
      rating: 'rating',
      platform: 'platform',
      media: 'customerImage',
      visible: 'visibility',
    },
    prepare({ title, rating, platform, media, visible }) {
      return {
        title: `${title} (${rating || 5}★) ${visible === false ? '[Hidden]' : ''}`,
        subtitle: `Platform: ${platform || 'Google'}`,
        media,
      };
    },
  },
});
