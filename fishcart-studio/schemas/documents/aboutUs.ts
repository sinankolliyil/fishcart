import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutUs',
  title: 'About Us Page (Singleton)',
  type: 'document',
  initialValue: {
    heroSubtitle: 'About Us',
    heroHeading: 'Fresh. Hygienic. Trusted. Delivered.',
    heroDescription:
      'We are passionate about delivering the freshest non-veg products to your doorstep. Quality, hygiene and trust are at the heart of everything we do.',
    teamSignature: 'Team FishCart',
    selectionTagline: 'What We Offer',
    selectionHeading: 'Explore Our Fresh Selection',
    selectionSubtitle:
      'Handpicked non-veg products, cleaned with care and delivered fresh.',
    whyChooseHeading: 'Why Choose FishCart?',
    highlight1: {
      title: 'Premium Quality',
      description: 'We never compromise on quality.',
      icon: 'medal',
    },
    highlight2: {
      title: 'Fresh & Hygienic',
      description: 'Maintained with the highest standards.',
      icon: 'thermometer',
    },
    highlight3: {
      title: 'Trusted & Reliable',
      description: 'Thousands of families trust us every day.',
      icon: 'heart',
    },
    highlight4: {
      title: 'Customer First',
      description: "We're here for you, always.",
      icon: 'headset',
    },
    visibility: true,
  },
  fields: [
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      initialValue: 'Fresh. Hygienic. Trusted. Delivered.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      initialValue:
        'We are passionate about delivering the freshest non-veg products to your doorstep. Quality, hygiene and trust are at the heart of everything we do.',
    }),
    defineField({
      name: 'teamSignature',
      title: 'Team Signature / Note',
      type: 'string',
      initialValue: 'Team FishCart',
    }),
    defineField({
      name: 'selectionTagline',
      title: 'Selection Tagline',
      type: 'string',
      initialValue: 'What We Offer',
    }),
    defineField({
      name: 'selectionHeading',
      title: 'Selection Section Heading',
      type: 'string',
      initialValue: 'Explore Our Fresh Selection',
    }),
    defineField({
      name: 'selectionSubtitle',
      title: 'Selection Section Subtitle',
      type: 'string',
      initialValue: 'Handpicked non-veg products, cleaned with care and delivered fresh.',
    }),
    defineField({
      name: 'whyChooseHeading',
      title: 'Why Choose Section Heading',
      type: 'string',
      initialValue: 'Why Choose FishCart?',
    }),
    defineField({
      name: 'highlight1',
      title: 'Why Choose Card 1: Premium Quality',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'title', title: 'Card Title', type: 'string', initialValue: 'Premium Quality', validation: (r) => r.required() }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: 'We never compromise on quality.', validation: (r) => r.required() }),
        defineField({
          name: 'icon',
          title: 'Icon Type',
          type: 'string',
          options: {
            list: [
              { title: 'Medal (Premium Quality)', value: 'medal' },
              { title: 'Thermometer (Fresh & Hygienic)', value: 'thermometer' },
              { title: 'Heart (Trusted & Reliable)', value: 'heart' },
              { title: 'Headset (Customer First)', value: 'headset' },
            ],
          },
          initialValue: 'medal',
        }),
      ],
    }),
    defineField({
      name: 'highlight2',
      title: 'Why Choose Card 2: Fresh & Hygienic',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'title', title: 'Card Title', type: 'string', initialValue: 'Fresh & Hygienic', validation: (r) => r.required() }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: 'Maintained with the highest standards.', validation: (r) => r.required() }),
        defineField({
          name: 'icon',
          title: 'Icon Type',
          type: 'string',
          options: {
            list: [
              { title: 'Medal (Premium Quality)', value: 'medal' },
              { title: 'Thermometer (Fresh & Hygienic)', value: 'thermometer' },
              { title: 'Heart (Trusted & Reliable)', value: 'heart' },
              { title: 'Headset (Customer First)', value: 'headset' },
            ],
          },
          initialValue: 'thermometer',
        }),
      ],
    }),
    defineField({
      name: 'highlight3',
      title: 'Why Choose Card 3: Trusted & Reliable',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'title', title: 'Card Title', type: 'string', initialValue: 'Trusted & Reliable', validation: (r) => r.required() }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: 'Thousands of families trust us every day.', validation: (r) => r.required() }),
        defineField({
          name: 'icon',
          title: 'Icon Type',
          type: 'string',
          options: {
            list: [
              { title: 'Medal (Premium Quality)', value: 'medal' },
              { title: 'Thermometer (Fresh & Hygienic)', value: 'thermometer' },
              { title: 'Heart (Trusted & Reliable)', value: 'heart' },
              { title: 'Headset (Customer First)', value: 'headset' },
            ],
          },
          initialValue: 'heart',
        }),
      ],
    }),
    defineField({
      name: 'highlight4',
      title: 'Why Choose Card 4: Customer First',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({ name: 'title', title: 'Card Title', type: 'string', initialValue: 'Customer First', validation: (r) => r.required() }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: "We're here for you, always.", validation: (r) => r.required() }),
        defineField({
          name: 'icon',
          title: 'Icon Type',
          type: 'string',
          options: {
            list: [
              { title: 'Medal (Premium Quality)', value: 'medal' },
              { title: 'Thermometer (Fresh & Hygienic)', value: 'thermometer' },
              { title: 'Heart (Trusted & Reliable)', value: 'heart' },
              { title: 'Headset (Customer First)', value: 'headset' },
            ],
          },
          initialValue: 'headset',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroHeading',
    },
    prepare({ title }) {
      return {
        title: title || 'About Us Page',
        subtitle: 'Singleton Document (ID: aboutUs)',
      };
    },
  },
});
