import { fishCatalogData, meatCatalogData, chickenCatalogData, eggsCatalogData } from '@/data/catalogData';
import { ProductDetails } from '@/types/catalog';

const catalogs = [fishCatalogData, meatCatalogData, chickenCatalogData, eggsCatalogData];

// Mock generic details to append to any product for the UI
const getMockDetails = (productTitle: string, category: "fish" | "meat" | "chicken" | "eggs", basePrice: number): Partial<ProductDetails> => {
  return {
    description: `Rich in Omega-3 and loaded with nutrients, ${productTitle.toLowerCase()} is known for its incredible taste and health benefits.`,
    rating: 4.8,
    reviewCount: 128,
    gallery: [
      "/assets/prod_1_salmon.jpg",
      "/assets/prod_2_seabass.jpg",
      "/assets/prod_3_mackerel.jpg",
      "/assets/prod_4_cod.jpg",
      "/assets/prod_5_tuna.jpg",
      "/assets/prod_6_tilapia.jpg"
    ],
    sizes: [
      { id: 'small', label: 'Small', subLabel: '(500g - 1kg)', price: Number((basePrice * 0.75).toFixed(2)), stock: 12, availability: true },
      { id: 'medium', label: 'Medium', subLabel: '(1kg - 2kg)', price: basePrice, stock: 8, availability: true },
      { id: 'large', label: 'Large', subLabel: '(2kg - 3kg)', price: Number((basePrice * 1.35).toFixed(2)), stock: 5, availability: true },
      { id: 'xl', label: 'Extra Large', subLabel: '(3kg+)', price: Number((basePrice * 1.75).toFixed(2)), stock: 0, availability: false }
    ],
    cutOptions: [
      { id: 'fillet', label: 'Fillet' },
      { id: 'steak', label: 'Steak' },
      { id: 'whole', label: 'Whole' }
    ],
    serves: '2 - 4 People',
    catchFrom: {
      location: 'Norway, North Atlantic Ocean',
      points: [
        'Sustainably wild-caught',
        'Cold, clean waters',
        'Premium quality'
      ]
    },
    bestFor: [
      { title: 'Curry', description: 'Perfect for creamy, spicy curries.', imageSrc: '/assets/prod_6_tilapia.jpg' },
      { title: 'Grill', description: 'Great for grilling with herbs, lemon and pepper.', imageSrc: '/assets/prod_5_tuna.jpg' }
    ],
    specialty: [
      'Rich, buttery flavor',
      'High in Omega-3 fatty acids',
      'Excellent source of protein & vitamins'
    ],
    famousOn: [
      'Norwegian Cuisine',
      'Japanese Sushi & Sashimi',
      'Mediterranean Dishes'
    ],
    nutritionInfo: {
      amount: 'Per 100g',
      unit: '100g',
      protein: '20.4g',
      calories: '208 kcal',
      omega3: '2.3g',
      fat: '13.4g'
    },
    goodFor: [
      'Heart Health',
      'Brain Function',
      'Eye Health'
    ],
    allergyInfo: {
      title: 'Contains Fish',
      desc: 'People with fish allergies should avoid consuming this product.',
      warning: 'Processed in a facility that also handles crustaceans.'
    },
    howToCook: [
      { title: `${productTitle} Curry Recipe`, subtitle: 'Spicy & Delicious', time: '06:12', imageSrc: '/assets/prod_8_trout.jpg' },
      { title: `Grilled ${productTitle} Recipe`, subtitle: 'Herb & Lemon', time: '06:48', imageSrc: '/assets/prod_7_prawns.jpg' }
    ]
  };
};

export const getProductById = (id: string): ProductDetails | null => {
  for (const catalog of catalogs) {
    const product = catalog.products.find(p => p.id === id);
    if (product) {
      return {
        ...product,
        category: catalog.category,
        ...getMockDetails(product.title, catalog.category, product.price)
      } as ProductDetails;
    }
  }
  return null;
};
