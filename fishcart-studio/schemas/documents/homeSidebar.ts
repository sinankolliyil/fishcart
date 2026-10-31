import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeSidebar',
  title: 'Sidebar (WhatsApp Community & QR Code)',
  type: 'document',
  fields: [
    defineField({
      name: 'sidebarBadgeTitle',
      title: 'Sidebar Button Title',
      type: 'string',
      description: 'The main text on the sidebar button (e.g. "Tap Here to Scan & Join")',
      initialValue: 'Tap Here to Scan & Join',
    }),
    defineField({
      name: 'sidebarBadgeSubtitle',
      title: 'Sidebar Button Subtitle',
      type: 'string',
      description: 'Subtitle under the button title (e.g. "Join Our Community")',
      initialValue: 'Join Our Community',
    }),
    defineField({
      name: 'modalHeading',
      title: 'Modal Heading',
      type: 'string',
      description: 'Heading at the top of the QR code modal (e.g. "Scan to Join")',
      initialValue: 'Scan to Join',
    }),
    defineField({
      name: 'modalDescription',
      title: 'Modal Description',
      type: 'text',
      rows: 2,
      description: 'Instruction text displayed above the QR code',
      initialValue: 'Scan this QR code with your phone camera to join our WhatsApp community.',
    }),
    defineField({
      name: 'qrCodeImage',
      title: 'WhatsApp Community QR Code Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Upload your official WhatsApp community QR code image here to replace the dummy QR code.',
    }),
    defineField({
      name: 'communityLink',
      title: 'WhatsApp Community Invite Link',
      type: 'url',
      description: 'Direct WhatsApp link to join the community (e.g. https://chat.whatsapp.com/...). This will show as a direct clickable button right under the QR code in the modal.',
    }),
    defineField({
      name: 'linkButtonText',
      title: 'Direct Link Button Text',
      type: 'string',
      description: 'Button text shown right under the QR code in the modal',
      initialValue: 'Or Click Here to Join WhatsApp Community ➔',
    }),
    defineField({
      name: 'visibility',
      title: 'Show QR Code in Sidebar',
      type: 'boolean',
      description: 'Toggle whether to display the QR code button in the sidebar',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'modalHeading',
      media: 'qrCodeImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Sidebar & WhatsApp Community',
        subtitle: 'Sidebar settings, QR Code & WhatsApp link',
        media,
      };
    },
  },
});
