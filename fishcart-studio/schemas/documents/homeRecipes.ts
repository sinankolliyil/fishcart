import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeRecipes',
  title: 'Homepage Featured Recipe Carousel (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'How to Make Delicious',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'string',
      initialValue: 'Step by step cooking videos for every taste',
    }),
    defineField({
      name: 'video1',
      title: 'Featured Video 1 (From How to Cook)',
      type: 'reference',
      to: [{ type: 'recipe' }],
      description: 'Select the 1st video recipe to feature in the homepage carousel (from How to Cook page)',
    }),
    defineField({
      name: 'video2',
      title: 'Featured Video 2 (From How to Cook)',
      type: 'reference',
      to: [{ type: 'recipe' }],
      description: 'Select the 2nd video recipe to feature in the homepage carousel (from How to Cook page)',
    }),
    defineField({
      name: 'video3',
      title: 'Featured Video 3 (From How to Cook)',
      type: 'reference',
      to: [{ type: 'recipe' }],
      description: 'Select the 3rd video recipe to feature in the homepage carousel (from How to Cook page)',
    }),
    defineField({
      name: 'video4',
      title: 'Featured Video 4 (From How to Cook)',
      type: 'reference',
      to: [{ type: 'recipe' }],
      description: 'Select the 4th video recipe to feature in the homepage carousel (from How to Cook page)',
    }),
    defineField({
      name: 'featuredRecipes',
      title: 'Or Pick Multiple Videos from How to Cook (Max 4)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'recipe' }] }],
      validation: (rule) => rule.max(4),
      description: 'Alternative: Select up to 4 video recipes from How to Cook page',
    }),
    defineField({
      name: 'viewAllUrl',
      title: 'View All Recipes Button Link',
      type: 'string',
      initialValue: '/cook',
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'sectionSubtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Featured Recipe Carousel',
        subtitle: subtitle || 'Takes 4 videos from How to Cook page',
      };
    },
  },
});
