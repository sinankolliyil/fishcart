import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeCustomerSays',
  title: 'What Our Customers Say (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionHeading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'What Our Customers Say',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'selectedReviews',
      title: 'Choose Reviews from Testimonials & Reviews',
      description:
        'Pick one or more reviews from the Testimonials & Reviews section (Website Reviews, Google Reviews, or Customer Testimonials) to display on this homepage card. Each review can only be chosen once.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'customerReview' },
            { type: 'googleReview' },
            { type: 'testimonial' },
          ],
          options: {
            filter: ({ document }) => {
              const selected = (document?.selectedReviews as any[]) || [];
              const selectedIds = selected
                .map((item) => item?._ref)
                .filter(Boolean);

              if (selectedIds.length === 0) {
                return { filter: '' };
              }

              const allExcluded = Array.from(
                new Set([
                  ...selectedIds,
                  ...selectedIds.map((id: string) => `drafts.${id}`),
                  ...selectedIds.map((id: string) => id.replace('drafts.', '')),
                ])
              );

              return {
                filter: '!(_id in $allExcluded)',
                params: { allExcluded },
              };
            },
          },
        },
      ],
      validation: (rule) =>
        rule.custom((items: any) => {
          if (!items || !Array.isArray(items)) return true;
          const refs = items
            .map((item: any) => item?._ref?.replace('drafts.', ''))
            .filter(Boolean);
          const duplicates = refs.filter(
            (id: string, index: number) => refs.indexOf(id) !== index
          );
          if (duplicates.length > 0) {
            return 'Each review can only be chosen once. Please remove duplicate review selections.';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: 'sectionHeading',
    },
    prepare({ title }) {
      return {
        title: title || 'What Our Customers Say',
        subtitle: 'Homepage Customer Review Card',
      };
    },
  },
});


