import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'customerReview',
  title: 'Website Customer Review',
  type: 'document',
  fields: [
    defineField({
      name: 'approved',
      title: 'Approved / Publish to Website',
      type: 'boolean',
      description:
        'When checked, this review will be displayed publicly on the website under "All Reviews". Keep unchecked to keep it pending.',
      initialValue: false,
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required(),
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
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'productImage',
      title: 'Product Image (Customer Upload)',
      type: 'image',
      description:
        'Photo of the seafood or product ordered, uploaded by the customer or admin.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description:
        'Customer contact phone number (either phone or email is required upon submission)',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description:
        'Customer contact email (either phone or email is required upon submission)',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'likes',
      title: 'Likes Count',
      type: 'number',
      initialValue: 0,
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
      name: 'customerName',
      rating: 'rating',
      approved: 'approved',
      media: 'productImage',
      text: 'reviewText',
    },
    prepare({ name, rating, approved, media, text }) {
      return {
        title: `${name || 'Customer'} (${rating || 5}★) ${approved ? '✅ Approved' : '⏳ Pending'}`,
        subtitle: text?.slice(0, 60) || '',
        media,
      };
    },
  },
});
