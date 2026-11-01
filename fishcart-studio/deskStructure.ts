import React from 'react';
import type { StructureResolver } from 'sanity/structure';

// Singletons with stable document IDs that must never be duplicated or deleted
export const SINGLETON_TYPES = new Set([
  'ourStory',
  'aboutUs',
  'benefitsContent',
  'storeContact',
  'homeRibbon',
  'topRightItemCount',
  'homeRecipes',
  'homeCarousel',
  'homeCustomerSays',
  'homeFooter',
  'homeSidebar',
  'orderSettings',
]);

const Emoji = (char: string) => () =>
  React.createElement(
    'span',
    { style: { fontSize: '1.25rem', lineHeight: '1', display: 'flex', alignItems: 'center' } },
    char
  );

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Fishcart Content')
    .items([
      S.divider(),

      // 1. Home
      S.listItem()
        .title('Home')
        .icon(Emoji('🏠'))
        .child(
          S.list()
            .title('Home Sections')
            .items([
              S.listItem()
                .title('Top Ribbon Announcements')
                .icon(Emoji('📢'))
                .id('homeRibbon')
                .child(
                  S.document()
                    .schemaType('homeRibbon')
                    .documentId('homeRibbon')
                    .title('Top Ribbon Announcements')
                ),

              S.listItem()
                .title('Hero Banner Carousel')
                .icon(Emoji('🖼️'))
                .id('homeCarousel')
                .child(
                  S.document()
                    .schemaType('homeCarousel')
                    .documentId('homeCarousel')
                    .title('Hero Banner Carousel')
                ),

              S.listItem()
                .title('Category Item Counts (Top Right)')
                .icon(Emoji('🔢'))
                .id('topRightItemCount')
                .child(
                  S.document()
                    .schemaType('topRightItemCount')
                    .documentId('topRightItemCount')
                    .title('Category Item Counts')
                ),

              S.listItem()
                .title('Featured Recipe Carousel')
                .icon(Emoji('🍲'))
                .id('homeRecipes')
                .child(
                  S.document()
                    .schemaType('homeRecipes')
                    .documentId('homeRecipes')
                    .title('Featured Recipe Carousel')
                ),

              S.listItem()
                .title('What Our Customers Say')
                .icon(Emoji('💬'))
                .id('homeCustomerSays')
                .child(
                  S.document()
                    .schemaType('homeCustomerSays')
                    .documentId('homeCustomerSays')
                    .title('What Our Customers Say')
                ),

              S.listItem()
                .title('Footer Address')
                .icon(Emoji('📍'))
                .id('homeFooter')
                .child(
                  S.document()
                    .schemaType('homeFooter')
                    .documentId('homeFooter')
                    .title('Footer Address')
                ),

              S.listItem()
                .title('Sidebar QR')
                .icon(Emoji('📱'))
                .id('homeSidebar')
                .child(
                  S.document()
                    .schemaType('homeSidebar')
                    .documentId('homeSidebar')
                    .title('Sidebar QR')
                ),
            ])
        ),

      // 2. Fish
      S.listItem()
        .title('Fish')
        .icon(Emoji('🐟'))
        .child(
          S.list()
            .title('Fish Products')
            .items([
              S.listItem()
                .title('Out of Stock Products')
                .icon(Emoji('🛑'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('Out of Stock Fish')
                    .filter('_type == "product" && (category->slug.current == "fish" || category == "fish") && (status == "disabled" || availabilityStatus == "disabled" || availabilityStatus == "unavailable" || availability == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-fish')])
                ),

              S.listItem()
                .title('Hidden Products (Hide)')
                .icon(Emoji('🚫'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('Hidden Fish')
                    .filter('_type == "product" && (category->slug.current == "fish" || category == "fish") && (visibility == "hide" || visibility == "hidden" || visibilityStatus == "hidden" || visibilityStatus == false || visibility == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-fish')])
                ),

              S.divider(),

              S.listItem()
                .title('All Fish Products')
                .icon(Emoji('🐟'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('All Fish Products')
                    .filter('_type == "product" && (category->slug.current == "fish" || category == "fish")')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-fish')])
                ),
            ])
        ),

      // 3. Meat
      S.listItem()
        .title('Meat')
        .icon(Emoji('🥩'))
        .child(
          S.list()
            .title('Meat Products')
            .items([
              S.listItem()
                .title('Out of Stock Products')
                .icon(Emoji('🛑'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('Out of Stock Meat')
                    .filter('_type == "product" && (category->slug.current == "meat" || category == "meat") && (status == "disabled" || availabilityStatus == "disabled" || availabilityStatus == "unavailable" || availability == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-meat')])
                ),

              S.listItem()
                .title('Hidden Products (Hide)')
                .icon(Emoji('🚫'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('Hidden Meat')
                    .filter('_type == "product" && (category->slug.current == "meat" || category == "meat") && (visibility == "hide" || visibility == "hidden" || visibilityStatus == "hidden" || visibilityStatus == false || visibility == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-meat')])
                ),

              S.divider(),

              S.listItem()
                .title('All Meat Products')
                .icon(Emoji('🥩'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('All Meat Products')
                    .filter('_type == "product" && (category->slug.current == "meat" || category == "meat")')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-meat')])
                ),
            ])
        ),

      // 4. Chicken
      S.listItem()
        .title('Chicken')
        .icon(Emoji('🍗'))
        .child(
          S.list()
            .title('Chicken Products')
            .items([
              S.listItem()
                .title('Out of Stock Products')
                .icon(Emoji('🛑'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('Out of Stock Chicken')
                    .filter('_type == "product" && (category->slug.current == "chicken" || category == "chicken") && (status == "disabled" || availabilityStatus == "disabled" || availabilityStatus == "unavailable" || availability == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-chicken')])
                ),

              S.listItem()
                .title('Hidden Products (Hide)')
                .icon(Emoji('🚫'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('Hidden Chicken')
                    .filter('_type == "product" && (category->slug.current == "chicken" || category == "chicken") && (visibility == "hide" || visibility == "hidden" || visibilityStatus == "hidden" || visibilityStatus == false || visibility == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-chicken')])
                ),

              S.divider(),

              S.listItem()
                .title('All Chicken Products')
                .icon(Emoji('🍗'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('All Chicken Products')
                    .filter('_type == "product" && (category->slug.current == "chicken" || category == "chicken")')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-chicken')])
                ),
            ])
        ),

      // 5. Eggs
      S.listItem()
        .title('Eggs')
        .icon(Emoji('🥚'))
        .child(
          S.list()
            .title('Eggs Products')
            .items([
              S.listItem()
                .title('Out of Stock Products')
                .icon(Emoji('🛑'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('Out of Stock Eggs')
                    .filter('_type == "product" && (category->slug.current == "eggs" || category == "eggs") && (status == "disabled" || availabilityStatus == "disabled" || availabilityStatus == "unavailable" || availability == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-eggs')])
                ),

              S.listItem()
                .title('Hidden Products (Hide)')
                .icon(Emoji('🚫'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('Hidden Eggs')
                    .filter('_type == "product" && (category->slug.current == "eggs" || category == "eggs") && (visibility == "hide" || visibility == "hidden" || visibilityStatus == "hidden" || visibilityStatus == false || visibility == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-eggs')])
                ),

              S.divider(),

              S.listItem()
                .title('All Eggs Products')
                .icon(Emoji('🥚'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('All Eggs Products')
                    .filter('_type == "product" && (category->slug.current == "eggs" || category == "eggs")')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-eggs')])
                ),
            ])
        ),

      // 6. How to Cook
      S.listItem()
        .title('How to Cook')
        .icon(Emoji('👨‍🍳'))
        .child(
          S.list()
            .title('How to Cook')
            .items([
              S.listItem()
                .title('All Recipes')
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .title('All Recipes')
                    .filter('_type == "recipe"')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                    .initialValueTemplates([
                      S.initialValueTemplateItem('recipe-fish'),
                      S.initialValueTemplateItem('recipe-meat'),
                      S.initialValueTemplateItem('recipe-chicken'),
                      S.initialValueTemplateItem('recipe-egg'),
                    ])
                ),

              S.listItem()
                .title('Fish Recipes')
                .icon(Emoji('🐟'))
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .title('Fish Recipes')
                    .filter('_type == "recipe" && category == "Fish"')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('recipe-fish')])
                ),

              S.listItem()
                .title('Meat Recipes')
                .icon(Emoji('🥩'))
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .title('Meat Recipes')
                    .filter('_type == "recipe" && category == "Meat"')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('recipe-meat')])
                ),

              S.listItem()
                .title('Chicken Recipes')
                .icon(Emoji('🍗'))
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .title('Chicken Recipes')
                    .filter('_type == "recipe" && category == "Chicken"')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('recipe-chicken')])
                ),

              S.listItem()
                .title('Egg Recipes')
                .icon(Emoji('🥚'))
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .title('Egg Recipes')
                    .filter('_type == "recipe" && category == "Egg"')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('recipe-egg')])
                ),

              S.divider(),

              S.listItem()
                .title('Visible Recipes (Show)')
                .icon(Emoji('👁️'))
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .title('Visible Recipes (Show)')
                    .filter('_type == "recipe" && visibility != false')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                ),

              S.listItem()
                .title('Hidden Recipes (Hide)')
                .icon(Emoji('🚫'))
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .title('Hidden Recipes (Hide)')
                    .filter('_type == "recipe" && visibility == false')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                ),
            ])
        ),

      // 7. Benefits
      S.listItem()
        .title('Benefits')
        .icon(Emoji('💙'))
        .id('benefitsContent')
        .child(
          S.document()
            .schemaType('benefitsContent')
            .documentId('benefitsContent')
            .title('Benefits & Nutrition')
        ),

      // 8. Our Stories
      S.listItem()
        .title('Our Stories')
        .icon(Emoji('📖'))
        .id('ourStory')
        .child(
          S.document()
            .schemaType('ourStory')
            .documentId('ourStory')
            .title('Our Stories')
        ),

      // 9. Testimonials
      S.listItem()
        .title('Testimonials')
        .icon(Emoji('💬'))
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Customer Testimonials')),

      // 10. About Us
      S.listItem()
        .title('About Us')
        .icon(Emoji('👥'))
        .id('aboutUs')
        .child(
          S.document()
            .schemaType('aboutUs')
            .documentId('aboutUs')
            .title('About Us')
        ),

      // 11. Contact Us
      S.listItem()
        .title('Contact Us')
        .icon(Emoji('📞'))
        .id('storeContact')
        .child(
          S.document()
            .schemaType('storeContact')
            .documentId('storeContact')
            .title('Contact Us')
        ),

      // 12. WhatsApp Orders & Pre-Order Checkout
      S.listItem()
        .title('WhatsApp Orders & Checkout')
        .icon(Emoji('💬'))
        .id('orderSettings')
        .child(
          S.document()
            .schemaType('orderSettings')
            .documentId('orderSettings')
            .title('WhatsApp Pre-Order & Checkout Settings')
        ),

      // All Products
      S.listItem()
        .title('All Products')
        .icon(Emoji('📦'))
        .child(
          S.list()
            .title('All Products')
            .items([
              S.listItem()
                .title('Out of Stock Products (All)')
                .icon(Emoji('🛑'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('Out of Stock Products')
                    .filter('_type == "product" && (status == "disabled" || availabilityStatus == "disabled" || availabilityStatus == "unavailable" || availability == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),

              S.listItem()
                .title('Hidden Products (All)')
                .icon(Emoji('🚫'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .title('Hidden Products')
                    .filter('_type == "product" && (visibility == "hide" || visibility == "hidden" || visibilityStatus == "hidden" || visibilityStatus == false || visibility == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                ),

              S.divider(),

              S.listItem()
                .title('All Products (Complete Catalog)')
                .icon(Emoji('📦'))
                .schemaType('product')
                .child(
                  S.documentTypeList('product')
                    .title('All Products')
                    .defaultOrdering([
                      { field: 'title', direction: 'asc' },
                      { field: '_createdAt', direction: 'desc' },
                    ])
                ),
            ])
        ),


    ]);
