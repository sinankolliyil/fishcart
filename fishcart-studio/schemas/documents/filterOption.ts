import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'filterOption',
  title: 'Filter Option',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Filter Label',
      type: 'string',
      description: 'Display text in the filter sidebar (e.g. "Norway", "Grill Fishes", "Small (0 - 500g)")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Filter Value / ID',
      type: 'slug',
      description: 'Internal value matched against products (e.g. "norway", "grill", "small")',
      options: {
        source: 'label',
        maxLength: 50,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'filterType',
      title: 'Filter Type',
      type: 'string',
      options: {
        list: [
          { title: 'By Country', value: 'country' },
          { title: 'By Type', value: 'type' },
          { title: 'By Size', value: 'size' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'country',
    }),
    defineField({
      name: 'applicableCategories',
      title: 'Applicable Product Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Fish', value: 'fish' },
          { title: 'Meat', value: 'meat' },
          { title: 'Chicken', value: 'chicken' },
          { title: 'Eggs', value: 'eggs' },
        ],
      },
      initialValue: ['fish'],
    }),
    defineField({
      name: 'flag',
      title: 'Country Flag SVG Type',
      type: 'string',
      description: 'Used for Country filters to render the appropriate flag',
      options: {
        list: [
          { title: 'United Kingdom', value: 'UK' },
          { title: 'Norway', value: 'Norway' },
          { title: 'Scotland', value: 'Scotland' },
          { title: 'Iceland', value: 'Iceland' },
          { title: 'Netherlands', value: 'Netherlands' },
        ],
      },
      hidden: ({ parent }) => parent?.filterType !== 'country',
    }),
    defineField({
      name: 'count',
      title: 'Item Count Display',
      type: 'number',
      description: 'Display count for UI badge (e.g. 45 items)',
      initialValue: 10,
    }),
    defineField({
      name: 'visibility',
      title: 'Visible in Filter Sidebar',
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
  orderings: [
    {
      title: 'Filter Type & Order',
      name: 'typeAndOrder',
      by: [
        { field: 'filterType', direction: 'asc' },
        { field: 'displayOrder', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'label',
      type: 'filterType',
      count: 'count',
      visible: 'visibility',
    },
    prepare({ title, type, count, visible }) {
      return {
        title: `${title} ${visible === false ? '(Hidden)' : ''}`,
        subtitle: `Type: ${type || 'unspecified'} | Count: ${count ?? 0}`,
      };
    },
  },
});
