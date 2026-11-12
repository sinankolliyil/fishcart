import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeLogo',
  title: 'Site Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'logoImage',
      title: 'Sidebar Logo Image',
      type: 'image',
      options: {
        hotspot: true,
        accept:
          'image/png,image/jpeg,image/webp,image/svg+xml,image/gif,image/avif,.png,.jpg,.jpeg,.webp,.svg,.gif,.avif',
      },
      description:
        'Upload a custom logo for the sidebar & mobile header. Supports PNG, JPG/JPEG, WebP, SVG, GIF, and AVIF formats.',
    }),
    defineField({
      name: 'brandTitle',
      title: 'Brand Name',
      type: 'string',
      description: 'Main brand title displayed next to the logo (default: FISHCART)',
      initialValue: 'FISHCART',
    }),
    defineField({
      name: 'brandTagline',
      title: 'Brand Tagline',
      type: 'string',
      description: 'Subtitle displayed below the brand name (default: Daily Fresh Partner)',
      initialValue: 'Daily Fresh Partner',
    }),
  ],
  preview: {
    select: {
      title: 'brandTitle',
      subtitle: 'brandTagline',
      media: 'logoImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Site Logo',
        subtitle: subtitle || 'Sidebar & Header Logo Settings',
        media,
      };
    },
  },
});

