import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'topRightItemCount',
  title: 'Homepage Category Cards & Counts (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'fishSubtitle',
      title: 'Fish Card Subtitle',
      type: 'string',
      initialValue: '100+ Items',
      description: 'Text shown under "Fish" card on homepage (e.g. "100+ Items")',
    }),
    defineField({
      name: 'meatSubtitle',
      title: 'Meat Card Subtitle',
      type: 'string',
      initialValue: '50+ Items',
      description: 'Text shown under "Meat" card on homepage (e.g. "50+ Items")',
    }),
    defineField({
      name: 'chickenSubtitle',
      title: 'Chicken Card Subtitle',
      type: 'string',
      initialValue: '30+ Items',
      description: 'Text shown under "Chicken" card on homepage (e.g. "30+ Items")',
    }),
    defineField({
      name: 'eggsSubtitle',
      title: 'Eggs Card Subtitle',
      type: 'string',
      initialValue: 'Farm Fresh',
      description: 'Text shown under "Eggs" card on homepage (e.g. "Farm Fresh")',
    }),
  ],
  preview: {
    select: {
      fish: 'fishSubtitle',
      meat: 'meatSubtitle',
      chicken: 'chickenSubtitle',
      eggs: 'eggsSubtitle',
    },
    prepare({ fish, meat, chicken, eggs }) {
      return {
        title: 'Top Right Category Item Counts',
        subtitle: `Fish: ${fish || ''} | Meat: ${meat || ''} | Chicken: ${chicken || ''} | Eggs: ${eggs || ''}`,
      };
    },
  },
});
