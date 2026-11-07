import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'googleReview',
  title: 'Google Review',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Reviewer Name (as on Google)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorAvatar',
      title: 'Reviewer Profile Picture / Avatar',
      type: 'image',
      description: 'Optional reviewer avatar photo from Google profile',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1 - 5)',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'reviewText',
      title: 'Google Review Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reviewDate',
      title: 'Time Posted (e.g. "1 day ago", "2 weeks ago", "1 month ago")',
      type: 'string',
      initialValue: '1 week ago',
    }),
    defineField({
      name: 'googleReviewScreenshot',
      title: 'Google Review Screenshot / Attached Images',
      type: 'image',
      description:
        'Upload a screenshot of the actual review on Google or photos attached to this Google review.',
      options: { hotspot: true },
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
      author: 'authorName',
      rating: 'rating',
      date: 'reviewDate',
      media: 'googleReviewScreenshot',
      avatar: 'authorAvatar',
      visible: 'visibility',
    },
    prepare({ author, rating, date, media, avatar, visible }) {
      return {
        title: `${author || 'Google User'} (${rating || 5}★) ${visible === false ? '[Hidden]' : ''}`,
        subtitle: `${date || 'Google Review'}`,
        media: media || avatar,
      };
    },
  },
});
