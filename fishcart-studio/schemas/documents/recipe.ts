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
      name: 'videoSource',
      title: 'Cooking Video Source',
      type: 'string',
      description: 'Choose whether to attach a Cooking Video URL (e.g. YouTube) or Upload a Video file directly.',
      options: {
        list: [
          { title: 'Video URL (YouTube, Vimeo, MP4 link)', value: 'url' },
          { title: 'Upload Video File', value: 'upload' },
        ],
        layout: 'radio',
      },
      initialValue: 'url',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Cooking Video URL (YouTube, Vimeo, or MP4 link)',
      type: 'url',
      description: 'Paste any YouTube link (e.g. https://www.youtube.com/watch?v=..., https://youtu.be/..., shorts), Vimeo, or MP4 link.',
      hidden: ({ document }) => document?.videoSource === 'upload',
    }),
    defineField({
      name: 'videoFile',
      title: 'Upload Cooking Video File',
      type: 'file',
      description: 'Upload a video file (.mp4, .webm, .mov) directly.',
      options: {
        accept: 'video/*',
      },
      hidden: ({ document }) => document?.videoSource !== 'upload',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Highlight Image (Recipe Photo)',
      type: 'image',
      description: 'Upload a high-quality dish photo for this recipe. This is used as the highlight cover image on recipe cards and video posters.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageSrc',
      title: 'Default Local Image Path',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'mediaType',
      title: 'Legacy Media Type',
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
