import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'orderSettings',
  title: 'WhatsApp Pre-Order & Checkout Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Phone Number for Orders & Pre-Orders',
      type: 'string',
      description:
        'The WhatsApp phone number where checkout orders and pre-orders will be received. Include country code (e.g. +44 7123 456789 or +44 1206 123456).',
      initialValue: '+44 1206 123456',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'orderButtonText',
      title: 'Checkout Button Text',
      type: 'string',
      description: 'Text shown on the primary order button in the cart page (e.g. "Order via WhatsApp")',
      initialValue: 'Order via WhatsApp',
    }),
    defineField({
      name: 'preorderButtonText',
      title: 'Secondary Pre-Order Button Text',
      type: 'string',
      description: 'Text shown on the contact / pre-order button (e.g. "Contact Store for Pre-orders")',
      initialValue: 'Contact Store for Pre-orders',
    }),
    defineField({
      name: 'orderMessagePrefix',
      title: 'WhatsApp Message Greeting / Header',
      type: 'text',
      rows: 2,
      description: 'Text placed at the beginning of the WhatsApp message when a customer places an order.',
      initialValue: 'Hello FishCart! I would like to place a pre-order from your website:',
    }),
    defineField({
      name: 'cartNoticeHeading',
      title: 'Cart Notice Heading',
      type: 'string',
      description: 'Heading inside the info box on the cart order summary.',
      initialValue: 'Store Pickup / WhatsApp Pre-Order',
    }),
    defineField({
      name: 'cartNoticeDescription',
      title: 'Cart Notice Description',
      type: 'text',
      rows: 2,
      description: 'Description text inside the info box on the cart order summary.',
      initialValue:
        'Orders are placed directly via WhatsApp with our store team for fresh cutting and speedy preparation.',
    }),
    defineField({
      name: 'enabled',
      title: 'Enable WhatsApp Checkout Button',
      type: 'boolean',
      description: 'Turn ON to allow customers to send their cart orders via WhatsApp.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      number: 'whatsappNumber',
      enabled: 'enabled',
    },
    prepare({ number, enabled }) {
      return {
        title: 'WhatsApp Orders & Checkout',
        subtitle: `${number || 'No number set'} • ${enabled !== false ? 'Active' : 'Disabled'}`,
      };
    },
  },
});
