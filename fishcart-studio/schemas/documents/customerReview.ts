import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'customerReview',
  title: 'Website Customer Review',
  type: 'document',
  fields: [
    defineField({
      name: 'approved',
      title: 'Approve & Publish to Website',
      type: 'boolean',
      description:
        'Switch ON to approve and publish this review live on the website. Switch OFF to keep it hidden.',
      initialValue: false,
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      readOnly: true,
      description: 'Submitted by customer on website (read-only)',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating (1 - 5)',
      type: 'number',
      readOnly: true,
      description: 'Submitted by customer on website (read-only)',
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      readOnly: true,
      description: 'Submitted by customer on website (read-only)',
    }),
    defineField({
      name: 'productImage',
      title: 'Product Image (Customer Upload)',
      type: 'image',
      description: 'Photo uploaded by the customer (read-only)',
      options: { hotspot: true },
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
      description: 'Customer contact phone (read-only)',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
      description: 'Customer contact email (read-only)',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submission Date',
      type: 'datetime',
      readOnly: true,
      description: 'Submission timestamp (read-only)',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      readOnly: true,
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
        title: `${name || 'Customer'} (${rating || 5}★) — ${
          approved
            ? '✅ Live on Website'
            : '🚫 Hidden — Not approved to be live on the website'
        }`,
        subtitle: text?.slice(0, 60) || '',
        media,
      };
    },
  },
});
