import { defineField, defineType } from 'sanity';

function getRecipeFilter(currentSlot: 'video1' | 'video2' | 'video3' | 'video4') {
  return ({ document }: { document: any }) => {
    const allSlots: ('video1' | 'video2' | 'video3' | 'video4')[] = [
      'video1',
      'video2',
      'video3',
      'video4',
    ];
    const otherKeys = allSlots.filter((k) => k !== currentSlot);
    const otherIds = otherKeys
      .map((k) => document?.[k]?._ref)
      .filter(Boolean);

    if (otherIds.length === 0) {
      return { filter: '' };
    }

    const allExcluded = Array.from(
      new Set([
        ...otherIds,
        ...otherIds.map((id: string) => `drafts.${id}`),
        ...otherIds.map((id: string) => id.replace('drafts.', '')),
      ])
    );

    return {
      filter: '!(_id in $allExcluded)',
      params: { allExcluded },
    };
  };
}

function getRecipeValidation(currentSlot: 'video1' | 'video2' | 'video3' | 'video4') {
  return (rule: any) =>
    rule.custom((val: any, context: any) => {
      if (!val?._ref) return true;
      const doc = context.document as any;
      const cleanRef = val._ref.replace('drafts.', '');

      const allSlots: ('video1' | 'video2' | 'video3' | 'video4')[] = [
        'video1',
        'video2',
        'video3',
        'video4',
      ];
      const otherKeys = allSlots.filter((k) => k !== currentSlot);

      for (const k of otherKeys) {
        const otherRef = doc?.[k]?._ref?.replace('drafts.', '');
        if (otherRef && otherRef === cleanRef) {
          return `This recipe has already been selected for another video slot. Each video slot must have a unique recipe.`;
        }
      }

      return true;
    });
}

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
      options: {
        filter: getRecipeFilter('video1'),
      },
      validation: getRecipeValidation('video1'),
    }),
    defineField({
      name: 'video2',
      title: 'Featured Video 2 (From How to Cook)',
      type: 'reference',
      to: [{ type: 'recipe' }],
      description: 'Select the 2nd video recipe to feature in the homepage carousel (from How to Cook page)',
      options: {
        filter: getRecipeFilter('video2'),
      },
      validation: getRecipeValidation('video2'),
    }),
    defineField({
      name: 'video3',
      title: 'Featured Video 3 (From How to Cook)',
      type: 'reference',
      to: [{ type: 'recipe' }],
      description: 'Select the 3rd video recipe to feature in the homepage carousel (from How to Cook page)',
      options: {
        filter: getRecipeFilter('video3'),
      },
      validation: getRecipeValidation('video3'),
    }),
    defineField({
      name: 'video4',
      title: 'Featured Video 4 (From How to Cook)',
      type: 'reference',
      to: [{ type: 'recipe' }],
      description: 'Select the 4th video recipe to feature in the homepage carousel (from How to Cook page)',
      options: {
        filter: getRecipeFilter('video4'),
      },
      validation: getRecipeValidation('video4'),
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

