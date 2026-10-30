import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ourStory',
  title: 'Our Story Page (Singleton)',
  type: 'document',
  fieldsets: [
    { name: 'intro', title: '1. Introduction Header', options: { collapsible: true, collapsed: false } },
    { name: 'stats', title: '2. Key Statistics (4 Stats)', options: { collapsible: true, collapsed: false } },
    { name: 'journey', title: '3. Journey Cards (2 Story Cards)', options: { collapsible: true, collapsed: false } },
    { name: 'promise', title: '4. Our Promise Section', options: { collapsible: true, collapsed: false } },
    { name: 'timeline', title: '5. Ocean To Shop Process Timeline', options: { collapsible: true, collapsed: false } },
    { name: 'footer', title: '6. Thank You & Closing Footer', options: { collapsible: true, collapsed: false } },
  ],
  initialValue: {
    heroHeading: 'Our Story',
    heroDescription:
      'From a small online initiative to your trusted fresh partner. Our journey is built on hard work, honesty, and the love of our customers.',
    stat1: {
      value: '1+',
      label: 'Years of Trust',
      description: 'Serving you with freshness & care.',
    },
    stat2: {
      value: '10,000+',
      label: 'Happy Customers',
      description: 'Your support is our strength.',
    },
    stat3: {
      value: '15,000+',
      label: 'Orders Delivered',
      description: 'Pre-orders delivered with smile',
    },
    stat4: {
      value: '100%',
      label: 'Quality Promise',
      description: 'Freshness & hygiene guaranteed',
    },
    journey1: {
      title: 'How It All Started',
      description:
        'One year ago, we started our journey with a simple idea – to deliver fresh fish and meat to our community. We began with online pre-orders and doorstep delivery.',
      point1: 'Took pre-orders through WhatsApp & calls',
      point2: 'Carefully sourced and packed every order',
      point3: 'Delivered to your doorstep with on-time promise',
    },
    journey2: {
      title: 'Growing With You',
      description:
        'Your trust and support motivated us to take the next big step – our own shop!',
      point1: 'Better variety, better quality',
      point2: 'More control on freshness',
      point3: 'Stronger supply network',
    },
    promiseHeading: 'Our Promise\nTo You',
    promiseSubtitle: 'We promise to deliver the freshest.',
    promisesList: {
      promise1: 'Never compromise on quality',
      promise2: 'Hygienically cleaned & packed',
      promise3: 'Sourced from trusted suppliers',
      promise4: 'Delivered with care & on time',
      promise5: '100% satisfaction or we make it right',
      promise6: 'Sustainable Sourcing',
    },
    processHeading: "From Ocean To Our Shop – Here's How It Happens",
    processStepsList: {
      step1: 'Daily Catch',
      step2: 'Sorting & Cleaning',
      step3: 'Ice Packing',
      step4: 'Air Freight',
      step5: 'Import & Inspection',
      step6: 'Cold Storage & Transport',
      step7: 'Final Check at Our Shop',
      step8: 'Delivered to You',
    },
    thankYouHeading: 'Thank You!',
    thankYouText:
      'Every order, every feedback, and every smile pushes us to do better every day.',
    closingQuote:
      "We don't just sell fish & meat,\nwe deliver trust, health and happiness.",
    visibility: true,
  },
  fields: [
    // ─── 1. Introduction Header ───
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      fieldset: 'intro',
      initialValue: 'Our Story',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      fieldset: 'intro',
      initialValue:
        'From a small online initiative to your trusted fresh partner. Our journey is built on hard work, honesty, and the love of our customers.',
    }),

    // ─── 2. Key Statistics (4 Stats) ───
    defineField({
      name: 'stat1',
      title: 'Stat 1: Years of Trust',
      type: 'object',
      fieldset: 'stats',
      fields: [
        defineField({ name: 'value', title: 'Value', type: 'string', initialValue: '1+' }),
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'Years of Trust' }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: 'Serving you with freshness & care.' }),
      ],
    }),
    defineField({
      name: 'stat2',
      title: 'Stat 2: Happy Customers',
      type: 'object',
      fieldset: 'stats',
      fields: [
        defineField({ name: 'value', title: 'Value', type: 'string', initialValue: '10,000+' }),
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'Happy Customers' }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: 'Your support is our strength.' }),
      ],
    }),
    defineField({
      name: 'stat3',
      title: 'Stat 3: Orders Delivered',
      type: 'object',
      fieldset: 'stats',
      fields: [
        defineField({ name: 'value', title: 'Value', type: 'string', initialValue: '15,000+' }),
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'Orders Delivered' }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: 'Pre-orders delivered with smile' }),
      ],
    }),
    defineField({
      name: 'stat4',
      title: 'Stat 4: Quality Promise',
      type: 'object',
      fieldset: 'stats',
      fields: [
        defineField({ name: 'value', title: 'Value', type: 'string', initialValue: '100%' }),
        defineField({ name: 'label', title: 'Label', type: 'string', initialValue: 'Quality Promise' }),
        defineField({ name: 'description', title: 'Description', type: 'string', initialValue: 'Freshness & hygiene guaranteed' }),
      ],
    }),

    // ─── 3. Journey Cards (2 Story Cards) ───
    defineField({
      name: 'journey1',
      title: 'Journey Card 1 (How It All Started)',
      type: 'object',
      fieldset: 'journey',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'How It All Started' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue:
            'One year ago, we started our journey with a simple idea – to deliver fresh fish and meat to our community. We began with online pre-orders and doorstep delivery.',
        }),
        defineField({ name: 'point1', title: 'Bullet Point 1', type: 'string', initialValue: 'Took pre-orders through WhatsApp & calls' }),
        defineField({ name: 'point2', title: 'Bullet Point 2', type: 'string', initialValue: 'Carefully sourced and packed every order' }),
        defineField({ name: 'point3', title: 'Bullet Point 3', type: 'string', initialValue: 'Delivered to your doorstep with on-time promise' }),
      ],
    }),
    defineField({
      name: 'journey2',
      title: 'Journey Card 2 (Growing With You)',
      type: 'object',
      fieldset: 'journey',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Growing With You' }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue:
            'Your trust and support motivated us to take the next big step – our own shop!',
        }),
        defineField({ name: 'point1', title: 'Bullet Point 1', type: 'string', initialValue: 'Better variety, better quality' }),
        defineField({ name: 'point2', title: 'Bullet Point 2', type: 'string', initialValue: 'More control on freshness' }),
        defineField({ name: 'point3', title: 'Bullet Point 3', type: 'string', initialValue: 'Stronger supply network' }),
      ],
    }),

    // ─── 4. Our Promise Section ───
    defineField({
      name: 'promiseHeading',
      title: 'Promise Section Heading',
      type: 'string',
      fieldset: 'promise',
      initialValue: 'Our Promise\nTo You',
    }),
    defineField({
      name: 'promiseSubtitle',
      title: 'Promise Subtitle',
      type: 'string',
      fieldset: 'promise',
      initialValue: 'We promise to deliver the freshest.',
    }),
    defineField({
      name: 'promisesList',
      title: 'The 6 Promises',
      type: 'object',
      fieldset: 'promise',
      fields: [
        defineField({ name: 'promise1', title: 'Promise 1', type: 'string', initialValue: 'Never compromise on quality' }),
        defineField({ name: 'promise2', title: 'Promise 2', type: 'string', initialValue: 'Hygienically cleaned & packed' }),
        defineField({ name: 'promise3', title: 'Promise 3', type: 'string', initialValue: 'Sourced from trusted suppliers' }),
        defineField({ name: 'promise4', title: 'Promise 4', type: 'string', initialValue: 'Delivered with care & on time' }),
        defineField({ name: 'promise5', title: 'Promise 5', type: 'string', initialValue: '100% satisfaction or we make it right' }),
        defineField({ name: 'promise6', title: 'Promise 6', type: 'string', initialValue: 'Sustainable Sourcing' }),
      ],
    }),

    // ─── 5. Process Timeline ───
    defineField({
      name: 'processHeading',
      title: 'Timeline Section Heading',
      type: 'string',
      fieldset: 'timeline',
      initialValue: "From Ocean To Our Shop – Here's How It Happens",
    }),
    defineField({
      name: 'processStepsList',
      title: 'Process Timeline Step Titles (8 Steps)',
      type: 'object',
      fieldset: 'timeline',
      fields: [
        defineField({ name: 'step1', title: 'Step 1 Title', type: 'string', initialValue: 'Daily Catch' }),
        defineField({ name: 'step2', title: 'Step 2 Title', type: 'string', initialValue: 'Sorting & Cleaning' }),
        defineField({ name: 'step3', title: 'Step 3 Title', type: 'string', initialValue: 'Ice Packing' }),
        defineField({ name: 'step4', title: 'Step 4 Title', type: 'string', initialValue: 'Air Freight' }),
        defineField({ name: 'step5', title: 'Step 5 Title', type: 'string', initialValue: 'Import & Inspection' }),
        defineField({ name: 'step6', title: 'Step 6 Title', type: 'string', initialValue: 'Cold Storage & Transport' }),
        defineField({ name: 'step7', title: 'Step 7 Title', type: 'string', initialValue: 'Final Check at Our Shop' }),
        defineField({ name: 'step8', title: 'Step 8 Title', type: 'string', initialValue: 'Delivered to You' }),
      ],
    }),

    // ─── 6. Thank You & Closing Footer ───
    defineField({
      name: 'thankYouHeading',
      title: 'Thank You Heading',
      type: 'string',
      fieldset: 'footer',
      initialValue: 'Thank You!',
    }),
    defineField({
      name: 'thankYouText',
      title: 'Thank You Message',
      type: 'text',
      rows: 2,
      fieldset: 'footer',
      initialValue:
        'Every order, every feedback, and every smile pushes us to do better every day.',
    }),
    defineField({
      name: 'closingQuote',
      title: 'Closing Quote',
      type: 'text',
      rows: 2,
      fieldset: 'footer',
      initialValue:
        "We don't just sell fish & meat,\nwe deliver trust, health and happiness.",
    }),
    defineField({
      name: 'visibility',
      title: 'Page Active Status',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'heroHeading',
    },
    prepare({ title }) {
      return {
        title: title || 'Our Story Page',
        subtitle: 'Singleton Document (ID: ourStory)',
      };
    },
  },
});
