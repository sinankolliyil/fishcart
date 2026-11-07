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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Optional contact number submitted by customer',
    }),
    defineField({
      name: 'title',
      title: 'Opinion Subject / Title',
      type: 'string',
      description: 'Brief topic or subject of opinion (optional)',
    }),
    defineField({
      name: 'opinionText',
      title: 'Opinion / Feedback Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
