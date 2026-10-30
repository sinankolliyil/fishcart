import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homeFooter',
  title: 'Footer Address & Info (Singleton)',
  type: 'document',
  fields: [
    defineField({
      name: 'storeAddress',
      title: 'Store Address (Right Bottom of Homepage)',
      type: 'string',
      description: 'Physical address displayed on the right bottom footer card',
      initialValue: 'Unit 5 Hythe Quay, England, CO2 8JB',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone Number',
      type: 'string',
      description: 'Customer contact phone displayed on footer card',
      initialValue: '+44 1206 123456',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Contact Email Address',
      type: 'string',
      description: 'Customer support email displayed on footer card',
      initialValue: 'hello@fishcart.co.uk',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutUsText',
      title: 'About Us Card Tagline (Optional)',
      type: 'string',
      initialValue: 'Delivering fresh & healthy food to your family.',
    }),
    defineField({
      name: 'ourStoriesText',
      title: 'Our Stories Card Tagline (Optional)',
      type: 'string',
      initialValue: 'From ocean to your kitchen, Journey of freshness.',
    }),
    defineField({
      name: 'contactUsText',
      title: 'Contact Us Card Tagline (Optional)',
      type: 'string',
      initialValue: 'We are here to help you. Reach out anytime.',
    }),
  ],
  preview: {
    select: {
      address: 'storeAddress',
      phone: 'phone',
    },
    prepare({ address, phone }) {
      return {
        title: address || 'Footer Address',
        subtitle: phone ? `Phone: ${phone}` : 'Homepage Footer Card',
      };
    },
  },
});
