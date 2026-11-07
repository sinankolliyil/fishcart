import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'customerOpinion',
  title: 'Customer Opinion',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      readOnly: true,
      description: 'Submitted by customer on website (read-only)',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      readOnly: true,
      description: 'Contact phone number submitted by customer (read-only)',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      readOnly: true,
      description: 'Contact email submitted by customer (read-only)',
    }),
    defineField({
      name: 'title',
      title: 'Opinion Subject / Title',
      type: 'string',
      readOnly: true,
      description: 'Topic or subject of opinion (read-only)',
    }),
    defineField({
      name: 'opinionText',
      title: 'Opinion / Feedback Text',
      type: 'text',
      rows: 4,
      readOnly: true,
      description: 'Customer opinion text (read-only)',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      description: 'Submission timestamp (read-only)',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Reviewed', value: 'reviewed' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
  ],
  preview: {
    select: {
      name: 'customerName',
      title: 'title',
      opinion: 'opinionText',
      status: 'status',
      date: 'submittedAt',
    },
    prepare({ name, title, opinion, status, date }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : '';
      return {
        title: `${name || 'Anonymous'} [${status?.toUpperCase() || 'NEW'}]`,
        subtitle: `${title ? `"${title}" - ` : ''}${opinion?.slice(0, 50) || ''} (${formattedDate})`,
      };
    },
  },
});
