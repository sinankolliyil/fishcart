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
  'homeLogo',
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

              S.listItem()
                .title('Site Logo')
                .icon(Emoji('🏷️'))
                .id('homeLogo')
                .child(
                  S.document()
                    .schemaType('homeLogo')
                    .documentId('homeLogo')
                    .title('Site Logo')
                ),
            ])
        ),

      // 2. Fish
      S.listItem()
        .title('Fish')
        .id('fishCategory')
        .icon(Emoji('🐟'))
        .child(
          S.list()
            .id('fishProductsMenu')
            .title('Fish Products')
            .items([
              S.listItem()
                .title('Out of Stock Products')
                .id('outOfStockFish')
                .icon(Emoji('🛑'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('outOfStockFishList')
                    .title('Out of Stock Fish')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "fish" || category == "fish") && (status == "disabled" || availabilityStatus == "disabled" || availabilityStatus == "unavailable" || availability == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-fish')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),

              S.listItem()
                .title('Hidden Products (Hide)')
                .id('hiddenFish')
                .icon(Emoji('🚫'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('hiddenFishList')
                    .title('Hidden Fish')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "fish" || category == "fish") && (visibility == "hide" || visibility == "hidden" || visibilityStatus == "hidden" || visibilityStatus == false || visibility == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-fish')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),

              S.divider(),

              S.listItem()
                .title('All Fish Products')
                .id('allFishProducts')
                .icon(Emoji('🐟'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('allFishProductsList')
                    .title('All Fish Products')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "fish" || category == "fish")')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-fish')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                    .canHandleIntent((intentName, params) => {
                      return Boolean(
                        (intentName === 'edit' && params.id) ||
                        (intentName === 'create' && (params.template === 'product-fish' || (params.type === 'product' && (!params.template || params.template === 'product'))))
                      );
                    })
                ),
            ])
        ),

      // 3. Meat
      S.listItem()
        .title('Meat')
        .id('meatCategory')
        .icon(Emoji('🥩'))
        .child(
          S.list()
            .id('meatProductsMenu')
            .title('Meat Products')
            .items([
              S.listItem()
                .title('Out of Stock Products')
                .id('outOfStockMeat')
                .icon(Emoji('🛑'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('outOfStockMeatList')
                    .title('Out of Stock Meat')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "meat" || category == "meat") && (status == "disabled" || availabilityStatus == "disabled" || availabilityStatus == "unavailable" || availability == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-meat')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),

              S.listItem()
                .title('Hidden Products (Hide)')
                .id('hiddenMeat')
                .icon(Emoji('🚫'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('hiddenMeatList')
                    .title('Hidden Meat')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "meat" || category == "meat") && (visibility == "hide" || visibility == "hidden" || visibilityStatus == "hidden" || visibilityStatus == false || visibility == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-meat')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),

              S.divider(),

              S.listItem()
                .title('All Meat Products')
                .id('allMeatProducts')
                .icon(Emoji('🥩'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('allMeatProductsList')
                    .title('All Meat Products')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "meat" || category == "meat")')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-meat')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                    .canHandleIntent((intentName, params) => {
                      return Boolean(
                        (intentName === 'edit' && params.id) ||
                        (intentName === 'create' && (params.template === 'product-meat' || (params.type === 'product' && (!params.template || params.template === 'product'))))
                      );
                    })
                ),
            ])
        ),

      // 4. Chicken
      S.listItem()
        .title('Chicken')
        .id('chickenCategory')
        .icon(Emoji('🍗'))
        .child(
          S.list()
            .id('chickenProductsMenu')
            .title('Chicken Products')
            .items([
              S.listItem()
                .title('Out of Stock Products')
                .id('outOfStockChicken')
                .icon(Emoji('🛑'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('outOfStockChickenList')
                    .title('Out of Stock Chicken')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "chicken" || category == "chicken") && (status == "disabled" || availabilityStatus == "disabled" || availabilityStatus == "unavailable" || availability == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-chicken')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),

              S.listItem()
                .title('Hidden Products (Hide)')
                .id('hiddenChicken')
                .icon(Emoji('🚫'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('hiddenChickenList')
                    .title('Hidden Chicken')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "chicken" || category == "chicken") && (visibility == "hide" || visibility == "hidden" || visibilityStatus == "hidden" || visibilityStatus == false || visibility == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-chicken')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),

              S.divider(),

              S.listItem()
                .title('All Chicken Products')
                .id('allChickenProducts')
                .icon(Emoji('🍗'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('allChickenProductsList')
                    .title('All Chicken Products')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "chicken" || category == "chicken")')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-chicken')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                    .canHandleIntent((intentName, params) => {
                      return Boolean(
                        (intentName === 'edit' && params.id) ||
                        (intentName === 'create' && (params.template === 'product-chicken' || (params.type === 'product' && (!params.template || params.template === 'product'))))
                      );
                    })
                ),
            ])
        ),

      // 5. Eggs
      S.listItem()
        .title('Eggs')
        .id('eggsCategory')
        .icon(Emoji('🥚'))
        .child(
          S.list()
            .id('eggsProductsMenu')
            .title('Eggs Products')
            .items([
              S.listItem()
                .title('Out of Stock Products')
                .id('outOfStockEggs')
                .icon(Emoji('🛑'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('outOfStockEggsList')
                    .title('Out of Stock Eggs')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "eggs" || category == "eggs") && (status == "disabled" || availabilityStatus == "disabled" || availabilityStatus == "unavailable" || availability == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-eggs')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),

              S.listItem()
                .title('Hidden Products (Hide)')
                .id('hiddenEggs')
                .icon(Emoji('🚫'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('hiddenEggsList')
                    .title('Hidden Eggs')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "eggs" || category == "eggs") && (visibility == "hide" || visibility == "hidden" || visibilityStatus == "hidden" || visibilityStatus == false || visibility == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-eggs')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),

              S.divider(),

              S.listItem()
                .title('All Eggs Products')
                .id('allEggsProducts')
                .icon(Emoji('🥚'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('allEggsProductsList')
                    .title('All Eggs Products')
                    .schemaType('product')
                    .filter('_type == "product" && (category->slug.current == "eggs" || category == "eggs")')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('product-eggs')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                    .canHandleIntent((intentName, params) => {
                      return Boolean(
                        (intentName === 'edit' && params.id) ||
                        (intentName === 'create' && (params.template === 'product-eggs' || (params.type === 'product' && (!params.template || params.template === 'product'))))
                      );
                    })
                ),
            ])
        ),

      // 6. How to Cook
      S.listItem()
        .title('How to Cook')
        .id('howToCook')
        .icon(Emoji('👨‍🍳'))
        .child(
          S.list()
            .id('howToCookMenu')
            .title('How to Cook')
            .items([
              S.listItem()
                .title('All Recipes')
                .id('allRecipes')
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .id('allRecipesList')
                    .title('All Recipes')
                    .schemaType('recipe')
                    .filter('_type == "recipe"')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                    .initialValueTemplates([
                      S.initialValueTemplateItem('recipe-fish'),
                      S.initialValueTemplateItem('recipe-meat'),
                      S.initialValueTemplateItem('recipe-chicken'),
                      S.initialValueTemplateItem('recipe-egg'),
                    ])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('recipe')
                    )
                    .canHandleIntent((intentName, params) => {
                      return Boolean(
                        (intentName === 'edit' && params.id) ||
                        (intentName === 'create' && params.type === 'recipe')
                      );
                    })
                ),

              S.listItem()
                .title('Fish Recipes')
                .id('fishRecipes')
                .icon(Emoji('🐟'))
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .id('fishRecipesList')
                    .title('Fish Recipes')
                    .schemaType('recipe')
                    .filter('_type == "recipe" && category == "Fish"')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('recipe-fish')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('recipe')
                    )
                    .canHandleIntent((intentName, params) => {
                      return Boolean(
                        (intentName === 'edit' && params.id) ||
                        (intentName === 'create' && (params.template === 'recipe-fish' || (params.type === 'recipe' && (!params.template || params.template === 'recipe'))))
                      );
                    })
                ),

              S.listItem()
                .title('Meat Recipes')
                .id('meatRecipes')
                .icon(Emoji('🥩'))
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .id('meatRecipesList')
                    .title('Meat Recipes')
                    .schemaType('recipe')
                    .filter('_type == "recipe" && category == "Meat"')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('recipe-meat')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('recipe')
                    )
                    .canHandleIntent((intentName, params) => {
                      return Boolean(
                        (intentName === 'edit' && params.id) ||
                        (intentName === 'create' && (params.template === 'recipe-meat' || (params.type === 'recipe' && (!params.template || params.template === 'recipe'))))
                      );
                    })
                ),

              S.listItem()
                .title('Chicken Recipes')
                .id('chickenRecipes')
                .icon(Emoji('🍗'))
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .id('chickenRecipesList')
                    .title('Chicken Recipes')
                    .schemaType('recipe')
                    .filter('_type == "recipe" && category == "Chicken"')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('recipe-chicken')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('recipe')
                    )
                    .canHandleIntent((intentName, params) => {
                      return Boolean(
                        (intentName === 'edit' && params.id) ||
                        (intentName === 'create' && (params.template === 'recipe-chicken' || (params.type === 'recipe' && (!params.template || params.template === 'recipe'))))
                      );
                    })
                ),

              S.listItem()
                .title('Egg Recipes')
                .id('eggRecipes')
                .icon(Emoji('🥚'))
                .schemaType('recipe')
                .child(
                  S.documentList()
                    .id('eggRecipesList')
                    .title('Egg Recipes')
                    .schemaType('recipe')
                    .filter('_type == "recipe" && category == "Egg"')
                    .defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
                    .initialValueTemplates([S.initialValueTemplateItem('recipe-egg')])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('recipe')
                    )
                    .canHandleIntent((intentName, params) => {
                      return Boolean(
                        (intentName === 'edit' && params.id) ||
                        (intentName === 'create' && (params.template === 'recipe-egg' || (params.type === 'recipe' && (!params.template || params.template === 'recipe'))))
                      );
                    })
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

      // 9. Testimonials & Reviews
      S.listItem()
        .title('Testimonials & Reviews')
        .icon(Emoji('⭐'))
        .child(
          S.list()
            .title('Testimonials & Reviews')
            .items([
              // Customer Opinions (from website "Your Suggestions" form)
              S.listItem()
                .title('Customer Opinions')
                .id('customerOpinions')
                .icon(Emoji('💭'))
                .schemaType('customerOpinion')
                .child(
                  S.documentList()
                    .id('customerOpinionsList')
                    .title('Customer Opinions')
                    .schemaType('customerOpinion')
                    .filter('_type == "customerOpinion"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                    .initialValueTemplates([])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('customerOpinion')
                    )
                    .canHandleIntent((intentName) => intentName !== 'create')
                ),

              S.divider(),

              // Website Customer Reviews
              S.listItem()
                .title('Website Reviews Pending for Approval')
                .id('pendingReviews')
                .icon(Emoji('⏳'))
                .schemaType('customerReview')
                .child(
                  S.documentList()
                    .id('pendingReviewsList')
                    .title('Website Reviews Pending for Approval')
                    .schemaType('customerReview')
                    .filter('_type == "customerReview" && approved != true')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                    .initialValueTemplates([])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('customerReview')
                    )
                    .canHandleIntent((intentName) => intentName !== 'create')
                ),

              S.listItem()
                .title('Website Reviews (Approved & Live)')
                .id('approvedReviews')
                .icon(Emoji('✅'))
                .schemaType('customerReview')
                .child(
                  S.documentList()
                    .id('approvedReviewsList')
                    .title('Approved Live Reviews')
                    .schemaType('customerReview')
                    .filter('_type == "customerReview" && approved == true')
                    .defaultOrdering([
                      { field: 'displayOrder', direction: 'asc' },
                      { field: 'submittedAt', direction: 'desc' },
                    ])
                    .initialValueTemplates([])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('customerReview')
                    )
                    .canHandleIntent((intentName) => intentName !== 'create')
                ),

              S.listItem()
                .title('All Website Reviews')
                .id('allCustomerReviews')
                .icon(Emoji('📋'))
                .schemaType('customerReview')
                .child(
                  S.documentList()
                    .id('allCustomerReviewsList')
                    .title('All Customer Reviews')
                    .schemaType('customerReview')
                    .filter('_type == "customerReview"')
                    .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
                    .initialValueTemplates([])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('customerReview')
                    )
                    .canHandleIntent((intentName) => intentName !== 'create')
                ),

              S.divider(),

              // Google Reviews
              S.listItem()
                .title('Google Reviews')
                .icon(Emoji('🌐'))
                .schemaType('googleReview')
                .id('googleReviews')
                .child(
                  S.documentTypeList('googleReview')
                    .id('googleReviews')
                    .title('Google Reviews')
                    .defaultOrdering([
                      { field: 'displayOrder', direction: 'asc' },
                      { field: '_createdAt', direction: 'desc' },
                    ])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('googleReview')
                    )
                    .canHandleIntent((intentName, params) => {
                      return Boolean(
                        (intentName === 'edit' && params.id) ||
                        (intentName === 'create' && params.type === 'googleReview')
                      );
                    })
                ),
            ])
        ),

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
        .id('allProductsCategory')
        .icon(Emoji('📦'))
        .child(
          S.list()
            .id('allProductsMenu')
            .title('All Products')
            .items([
              S.listItem()
                .title('Out of Stock Products (All)')
                .id('outOfStockProductsAll')
                .icon(Emoji('🛑'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('outOfStockProductsAllList')
                    .title('Out of Stock Products')
                    .schemaType('product')
                    .filter('_type == "product" && (status == "disabled" || availabilityStatus == "disabled" || availabilityStatus == "unavailable" || availability == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),

              S.listItem()
                .title('Hidden Products (All)')
                .id('hiddenProductsAll')
                .icon(Emoji('🚫'))
                .schemaType('product')
                .child(
                  S.documentList()
                    .id('hiddenProductsAllList')
                    .title('Hidden Products')
                    .schemaType('product')
                    .filter('_type == "product" && (visibility == "hide" || visibility == "hidden" || visibilityStatus == "hidden" || visibilityStatus == false || visibility == false)')
                    .defaultOrdering([{ field: 'title', direction: 'asc' }])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),

              S.divider(),

              S.listItem()
                .title('All Products (Complete Catalog)')
                .id('allProductsCatalog')
                .icon(Emoji('📦'))
                .schemaType('product')
                .child(
                  S.documentTypeList('product')
                    .id('allProductsCatalogList')
                    .title('All Products')
                    .defaultOrdering([
                      { field: 'title', direction: 'asc' },
                      { field: '_createdAt', direction: 'desc' },
                    ])
                    .child((documentId) =>
                      S.document()
                        .documentId(documentId)
                        .schemaType('product')
                    )
                ),
            ])
        ),


    ]);
