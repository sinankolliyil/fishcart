import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      description: 'e.g. Grilled Sea Bass with Lemon Butter Sauce',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / URL ID',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Recipe Category',
      type: 'string',
      options: {
        list: [
          { title: 'Fish', value: 'Fish' },
          { title: 'Meat', value: 'Meat' },
          { title: 'Chicken', value: 'Chicken' },
          { title: 'Egg', value: 'Egg' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      initialValue: 'Fish',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Tagline (e.g. "Spicy & Delicious", "Herb & Lemon")',
      type: 'string',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'Easy' },
          { title: 'Medium', value: 'Medium' },
          { title: 'Hard', value: 'Hard' },
        ],
        layout: 'radio',
      },
      initialValue: 'Easy',
    }),
    defineField({
      name: 'videoDuration',
      title: 'Video Duration (e.g. "06:45")',
      type: 'string',
      initialValue: '06:00',
    }),
    defineField({
      name: 'cookingTime',
      title: 'Cooking Time (e.g. "30 mins")',
      type: 'string',
      initialValue: '30 mins',
    }),
    defineField({
      name: 'serves',
      title: 'Servings (e.g. 2, 4)',
      type: 'number',
      initialValue: 2,
    }),
    defineField({
      name: 'mediaType',
      title: 'Recipe Media Type (Choose ONE: Video Link OR Upload Image)',
      type: 'string',
      description: 'Choose whether this recipe features a Cooking Video Link (e.g. YouTube) OR an Uploaded Image. Only one is allowed.',
      options: {
        list: [
          { title: '🎬 Cooking Video Link (YouTube, Vimeo, MP4)', value: 'video' },
          { title: '🖼️ Upload Recipe Image (Photo)', value: 'image' },
        ],
        layout: 'radio',
      },
      initialValue: 'video',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Cooking Video URL (YouTube, Vimeo, or MP4 link)',
      type: 'url',
      description: 'Paste any YouTube link (e.g. https://www.youtube.com/watch?v=..., https://youtu.be/..., shorts), Vimeo, or MP4 link.',
      hidden: ({ document }) => document?.mediaType === 'image',
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as { mediaType?: string; thumbnail?: { asset?: unknown } } | undefined;
          const hasImage = Boolean(doc?.thumbnail?.asset);
          if (doc?.mediaType === 'image' && value) {
            return 'Cannot have both Cooking Video URL and Uploaded Image together. Please remove the URL or switch media type to Video Link.';
          }
          if (doc?.mediaType === 'video' && !value) {
            return 'Cooking Video URL is required when Video Link mode is selected.';
          }
          if (value && hasImage) {
            return 'Cannot have both Cooking Video URL and Uploaded Image together. Please remove one.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Upload Recipe Image',
      type: 'image',
      description: 'Upload a high-quality dish photo for this recipe. (Used when Upload Recipe Image is selected)',
      options: { hotspot: true },
      hidden: ({ document }) => document?.mediaType === 'video',
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as { mediaType?: string; videoUrl?: string } | undefined;
          const hasVideo = Boolean(doc?.videoUrl);
          if (doc?.mediaType === 'video' && value?.asset) {
            return 'Cannot have both Cooking Video URL and Uploaded Image together. Please remove this image or switch media type to Upload Image.';
          }
          if (doc?.mediaType === 'image' && !value?.asset) {
            return 'Please upload a recipe image when Upload Recipe Image mode is selected.';
          }
          if (value?.asset && hasVideo) {
            return 'Cannot have both Cooking Video URL and Uploaded Image together. Please remove one.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'imageSrc',
      title: 'Default Local Image Path',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Ingredient Name (e.g. Sea Bass, Lemon)', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'qty', title: 'Quantity (e.g. "2 (500g each)", "1 tbsp")', type: 'string' }),
            defineField({ name: 'icon', title: 'Emoji Icon (e.g. 🐟, 🍋, 🧄, 🧈)', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'qty', icon: 'icon' },
            prepare({ title, subtitle, icon }) {
              return {
                title: `${icon ? icon + ' ' : ''}${title}`,
                subtitle: subtitle || '',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'recipePdf',
      title: 'Recipe PDF File (Downloadable)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload a downloadable PDF recipe card for this dish.',
    }),
    defineField({
      name: 'visibility',
      title: 'Visible on Website',
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
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'thumbnail',
      visible: 'visibility',
    },
    prepare({ title, category, media, visible }) {
      const emojiMap: Record<string, string> = {
        Fish: '🐟',
        Meat: '🥩',
        Chicken: '🍗',
        Egg: '🥚',
      };
      return {
        title: `${title || 'Untitled Recipe'} ${visible === false ? '(Hidden)' : ''}`,
        subtitle: `${category || ''}`,
        media: media || (() => emojiMap[category] || '🍳'),
      };
    },
  },
});
