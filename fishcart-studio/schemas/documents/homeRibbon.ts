import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeRibbon',
  title: 'Homepage Top Ribbon Announcements (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'announcements',
      title: 'Marquee Announcements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Announcement Text', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'icon',
              title: 'Icon Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Discount Tag (Blue)', value: 'tag' },
                  { title: 'Gift / Offer (Emerald)', value: 'gift' },
                  { title: 'Fire / Hot Deal (Orange)', value: 'fire' },
                  { title: 'Truck / Free Delivery (Cyan)', value: 'truck' },
                ],
              },
              initialValue: 'tag',
            }),
            defineField({
              name: 'color',
              title: 'Icon Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Blue', value: 'text-blue-400' },
                  { title: 'Emerald / Green', value: 'text-emerald-400' },
                  { title: 'Orange', value: 'text-orange-400' },
                  { title: 'Cyan', value: 'text-cyan-400' },
                ],
              },
              initialValue: 'text-blue-400',
            }),
          ],
          preview: {
            select: { title: 'text', subtitle: 'icon' },
          },
        },
      ],
      initialValue: [
        { text: '20% OFF on Fresh Fish', icon: 'tag', color: 'text-blue-400' },
        { text: 'Buy 2 Get 1 Free', icon: 'gift', color: 'text-emerald-400' },
        { text: 'Weekend Chicken Deals', icon: 'fire', color: 'text-orange-400' },
        { text: 'Free Delivery on Orders Over £25', icon: 'truck', color: 'text-cyan-400' },
      ],
    }),
    defineField({
      name: 'visibility',
      title: 'Show Ribbon on Homepage',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      items: 'announcements',
    },
    prepare({ items }) {
      return {
        title: 'Homepage Ribbon Announcements',
        subtitle: `${items?.length ?? 0} active announcement(s)`,
      };
    },
  },
});
