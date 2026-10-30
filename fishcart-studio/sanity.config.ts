import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { deskStructure, SINGLETON_TYPES } from './deskStructure';
import { CustomStudioLayout } from './components/CustomStudioLayout';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '4uuomk8a';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'FishCart CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool({
      defaultApiVersion: '2024-03-01',
      defaultDataset: 'production',
    }),
  ],

  studio: {
    components: {
      layout: CustomStudioLayout,
    },
  },

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'product-fish',
        title: 'Fish Product',
        schemaType: 'product',
        value: { category: 'fish' },
      },
      {
        id: 'product-meat',
        title: 'Meat Product',
        schemaType: 'product',
        value: { category: 'meat' },
      },
      {
        id: 'product-chicken',
        title: 'Chicken Product',
        schemaType: 'product',
        value: { category: 'chicken' },
      },
      {
        id: 'product-eggs',
        title: 'Eggs Product',
        schemaType: 'product',
        value: { category: 'eggs' },
      },
      {
        id: 'recipe-fish',
        title: 'Fish Recipe',
        schemaType: 'recipe',
        value: { category: 'Fish' },
      },
      {
        id: 'recipe-meat',
        title: 'Meat Recipe',
        schemaType: 'recipe',
        value: { category: 'Meat' },
      },
      {
        id: 'recipe-chicken',
        title: 'Chicken Recipe',
        schemaType: 'recipe',
        value: { category: 'Chicken' },
      },
      {
        id: 'recipe-egg',
        title: 'Egg Recipe',
        schemaType: 'recipe',
        value: { category: 'Egg' },
      },
    ],
  },

  document: {
    // Phase 10: Protect singleton documents against accidental deletion or duplication
    actions: (prev, context) => {
      if (SINGLETON_TYPES.has(context.schemaType)) {
        return prev.filter(({ action }) => action !== 'delete' && action !== 'duplicate');
      }
      return prev;
    },
    // Hide singletons from the global "+" New Document button
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !SINGLETON_TYPES.has(templateItem.templateId));
      }
      return prev;
    },
  },
});
