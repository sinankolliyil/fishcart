import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'storeContact',
  title: 'Store Contact Information (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business / Store Name',
      type: 'string',
      initialValue: 'FishCart Store',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactPageHeading',
      title: 'Contact Page Heading',
      type: 'string',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'contactPageDescription',
      title: 'Contact Page Description',
      type: 'text',
      rows: 2,
      initialValue:
        'We\'re here to help! Get in touch with us for any queries, orders or support.',
    }),
    defineField({
      name: 'phone',
      title: 'Primary Phone Number',
      type: 'string',
      initialValue: '+44 1206 123456',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phoneNote',
      title: 'Phone Description / Note',
      type: 'string',
      initialValue: 'Have a question or need assistance? Call us anytime.',
    }),
    defineField({
      name: 'email',
      title: 'Primary Email Address',
      type: 'string',
      initialValue: 'hello@fishcart.co.uk',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emailNote',
      title: 'Email Description / Note',
      type: 'string',
      initialValue: 'Drop us an email and we\'ll get back to you.',
    }),
    defineField({
      name: 'headOfficeAddress',
      title: 'Head Office Address',
      type: 'text',
      rows: 2,
      initialValue: '123, Fresh Fish Street, T. Nagar,\nChennai, Tamil Nadu - 600017',
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'string',
      initialValue: 'Monday - Sunday: 8:00 AM - 10:00 PM',
    }),
    defineField({
      name: 'storeAddress',
      title: 'Store Address (Footer & Kiosk)',
      type: 'string',
      initialValue: 'Unit 5 Hythe Quay, England, CO2 8JB',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Map Embed URL',
      type: 'url',
      initialValue: 'https://www.openstreetmap.org/export/embed.html?bbox=80.19,13.04,80.25,13.08&layer=mapnik',
    }),
  ],
  preview: {
    select: {
      title: 'businessName',
      phone: 'phone',
      email: 'email',
    },
    prepare({ title, phone, email }) {
      return {
        title: title || 'Store Contact Info',
        subtitle: `${phone || ''} · ${email || ''}`,
      };
    },
  },
});
