// Auto-generated 38 website catalog products for FishCart CMS (Fish, Meat, Chicken, Eggs)
export interface WebsiteProductSeed {
  id: string;
  title: string;
  slug: string;
  category: 'fish' | 'meat' | 'chicken' | 'eggs';
  format: string;
  origin: string;
  filterCountry: string;
  badgeLabel: string;
  price: number;
  unit: string;
  imageSrc: string;
  isFavorite: boolean;
  displayOrder: number;
  description: string;
  rating: number;
  reviewCount: number;
  serves: string;
  sizes: Array<{ id: string; label: string; subLabel: string; price: number; stock: number; availability: boolean }>;
  cutOptions: Array<{ id: string; label: string }>;
  catchFrom: { location: string; points: string[] };
  specialty: string[];
  famousOn: string[];
  nutritionInfo: { amount: string; protein: string; calories: string; omega3: string; fat: string };
  goodFor: string[];
  allergyInfo: { title: string; desc: string; warning: string };
  bestFor: Array<{ title: string; description: string }>;
  howToCook: Array<{ title: string; subtitle: string; time: string }>;
}

export const WEBSITE_PRODUCTS: WebsiteProductSeed[] = [
  {
    "id": "salmon",
    "title": "Salmon",
    "slug": "salmon",
    "category": "fish",
    "format": "Filet",
    "origin": "Country",
    "filterCountry": "Norway",
    "badgeLabel": "Rich in Omega-3",
    "price": 14.99,
    "unit": "kg",
    "imageSrc": "/assets/2_image.png",
    "isFavorite": false,
    "displayOrder": 1,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Rich in Omega-3 and loaded with nutrients, salmon is known for its incredible taste, tender flaky texture, and superior health benefits.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(500g - 1kg)",
        "price": 11.24,
        "stock": 12,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(1kg - 2kg)",
        "price": 14.99,
        "stock": 8,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(2kg - 3kg)",
        "price": 20.24,
        "stock": 5,
        "availability": true
      },
      {
        "id": "xl",
        "label": "Extra Large",
        "subLabel": "(3kg+)",
        "price": 26.23,
        "stock": 0,
        "availability": false
      }
    ],
    "cutOptions": [
      {
        "id": "fillet",
        "label": "Fillet"
      },
      {
        "id": "steak",
        "label": "Steak"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Norway, North Atlantic Ocean",
      "points": [
        "Sustainably wild-caught",
        "Cold, clean waters",
        "Premium grade quality"
      ]
    },
    "specialty": [
      "Rich, buttery flavor",
      "High in Omega-3 fatty acids",
      "Excellent source of protein & vitamins"
    ],
    "famousOn": [
      "Norwegian Cuisine",
      "Japanese Sushi & Sashimi",
      "Mediterranean Dishes"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "20.4g",
      "calories": "208 kcal",
      "omega3": "2.3g",
      "fat": "13.4g"
    },
    "goodFor": [
      "Heart Health",
      "Brain Function",
      "Eye Health"
    ],
    "allergyInfo": {
      "title": "Contains Fish",
      "desc": "People with fish or seafood allergies should avoid consuming this product.",
      "warning": "May contain small fish bones despite careful processing."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Perfect for creamy, rich fish curries."
      },
      {
        "title": "Grill",
        "description": "Great for grilling with herbs, lemon and olive oil."
      }
    ],
    "howToCook": [
      {
        "title": "Salmon Curry Recipe",
        "subtitle": "Spicy & Delicious",
        "time": "06:12"
      },
      {
        "title": "Grilled Salmon Recipe",
        "subtitle": "Herb & Lemon",
        "time": "06:48"
      }
    ]
  },
  {
    "id": "sea-bass",
    "title": "Sea Bass",
    "slug": "sea-bass",
    "category": "fish",
    "format": "Whole",
    "origin": "Country",
    "filterCountry": "UK",
    "badgeLabel": "High in Protein",
    "price": 12.5,
    "unit": "kg",
    "imageSrc": "/assets/3_image.png",
    "isFavorite": false,
    "displayOrder": 2,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Rich in Omega-3 and loaded with nutrients, sea bass is known for its incredible taste, tender flaky texture, and superior health benefits.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(500g - 1kg)",
        "price": 9.38,
        "stock": 12,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(1kg - 2kg)",
        "price": 12.5,
        "stock": 8,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(2kg - 3kg)",
        "price": 16.88,
        "stock": 5,
        "availability": true
      },
      {
        "id": "xl",
        "label": "Extra Large",
        "subLabel": "(3kg+)",
        "price": 21.88,
        "stock": 0,
        "availability": false
      }
    ],
    "cutOptions": [
      {
        "id": "fillet",
        "label": "Fillet"
      },
      {
        "id": "steak",
        "label": "Steak"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Norway, North Atlantic Ocean",
      "points": [
        "Sustainably wild-caught",
        "Cold, clean waters",
        "Premium grade quality"
      ]
    },
    "specialty": [
      "Rich, buttery flavor",
      "High in Omega-3 fatty acids",
      "Excellent source of protein & vitamins"
    ],
    "famousOn": [
      "Norwegian Cuisine",
      "Japanese Sushi & Sashimi",
      "Mediterranean Dishes"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "20.4g",
      "calories": "208 kcal",
      "omega3": "2.3g",
      "fat": "13.4g"
    },
    "goodFor": [
      "Heart Health",
      "Brain Function",
      "Eye Health"
    ],
    "allergyInfo": {
      "title": "Contains Fish",
      "desc": "People with fish or seafood allergies should avoid consuming this product.",
      "warning": "May contain small fish bones despite careful processing."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Perfect for creamy, rich fish curries."
      },
      {
        "title": "Grill",
        "description": "Great for grilling with herbs, lemon and olive oil."
      }
    ],
    "howToCook": [
      {
        "title": "Sea Bass Curry Recipe",
        "subtitle": "Spicy & Delicious",
        "time": "06:12"
      },
      {
        "title": "Grilled Sea Bass Recipe",
        "subtitle": "Herb & Lemon",
        "time": "06:48"
      }
    ]
  },
  {
    "id": "mackerel",
    "title": "Mackerel",
    "slug": "mackerel",
    "category": "fish",
    "format": "Whole",
    "origin": "Country",
    "filterCountry": "UK",
    "badgeLabel": "Rich in Omega-3",
    "price": 6.99,
    "unit": "kg",
    "imageSrc": "/assets/4_image.png",
    "isFavorite": false,
    "displayOrder": 3,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Rich in Omega-3 and loaded with nutrients, mackerel is known for its incredible taste, tender flaky texture, and superior health benefits.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(500g - 1kg)",
        "price": 5.24,
        "stock": 12,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(1kg - 2kg)",
        "price": 6.99,
        "stock": 8,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(2kg - 3kg)",
        "price": 9.44,
        "stock": 5,
        "availability": true
      },
      {
        "id": "xl",
        "label": "Extra Large",
        "subLabel": "(3kg+)",
        "price": 12.23,
        "stock": 0,
        "availability": false
      }
    ],
    "cutOptions": [
      {
        "id": "fillet",
        "label": "Fillet"
      },
      {
        "id": "steak",
        "label": "Steak"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Norway, North Atlantic Ocean",
      "points": [
        "Sustainably wild-caught",
        "Cold, clean waters",
        "Premium grade quality"
      ]
    },
    "specialty": [
      "Rich, buttery flavor",
      "High in Omega-3 fatty acids",
      "Excellent source of protein & vitamins"
    ],
    "famousOn": [
      "Norwegian Cuisine",
      "Japanese Sushi & Sashimi",
      "Mediterranean Dishes"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "20.4g",
      "calories": "208 kcal",
      "omega3": "2.3g",
      "fat": "13.4g"
    },
    "goodFor": [
      "Heart Health",
      "Brain Function",
      "Eye Health"
    ],
    "allergyInfo": {
      "title": "Contains Fish",
      "desc": "People with fish or seafood allergies should avoid consuming this product.",
      "warning": "May contain small fish bones despite careful processing."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Perfect for creamy, rich fish curries."
      },
      {
        "title": "Grill",
        "description": "Great for grilling with herbs, lemon and olive oil."
      }
    ],
    "howToCook": [
      {
        "title": "Mackerel Curry Recipe",
        "subtitle": "Spicy & Delicious",
        "time": "06:12"
      },
      {
        "title": "Grilled Mackerel Recipe",
        "subtitle": "Herb & Lemon",
        "time": "06:48"
      }
    ]
  },
  {
    "id": "cod-fillet",
    "title": "Cod Fillet",
    "slug": "cod-fillet",
    "category": "fish",
    "format": "Filet",
    "origin": "Country",
    "filterCountry": "Scotland",
    "badgeLabel": "Low Fat",
    "price": 11.99,
    "unit": "kg",
    "imageSrc": "/assets/5_image.png",
    "isFavorite": false,
    "displayOrder": 4,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Rich in Omega-3 and loaded with nutrients, cod fillet is known for its incredible taste, tender flaky texture, and superior health benefits.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(500g - 1kg)",
        "price": 8.99,
        "stock": 12,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(1kg - 2kg)",
        "price": 11.99,
        "stock": 8,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(2kg - 3kg)",
        "price": 16.19,
        "stock": 5,
        "availability": true
      },
      {
        "id": "xl",
        "label": "Extra Large",
        "subLabel": "(3kg+)",
        "price": 20.98,
        "stock": 0,
        "availability": false
      }
    ],
    "cutOptions": [
      {
        "id": "fillet",
        "label": "Fillet"
      },
      {
        "id": "steak",
        "label": "Steak"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Norway, North Atlantic Ocean",
      "points": [
        "Sustainably wild-caught",
        "Cold, clean waters",
        "Premium grade quality"
      ]
    },
    "specialty": [
      "Rich, buttery flavor",
      "High in Omega-3 fatty acids",
      "Excellent source of protein & vitamins"
    ],
    "famousOn": [
      "Norwegian Cuisine",
      "Japanese Sushi & Sashimi",
      "Mediterranean Dishes"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "20.4g",
      "calories": "208 kcal",
      "omega3": "2.3g",
      "fat": "13.4g"
    },
    "goodFor": [
      "Heart Health",
      "Brain Function",
      "Eye Health"
    ],
    "allergyInfo": {
      "title": "Contains Fish",
      "desc": "People with fish or seafood allergies should avoid consuming this product.",
      "warning": "May contain small fish bones despite careful processing."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Perfect for creamy, rich fish curries."
      },
      {
        "title": "Grill",
        "description": "Great for grilling with herbs, lemon and olive oil."
      }
    ],
    "howToCook": [
      {
        "title": "Cod Fillet Curry Recipe",
        "subtitle": "Spicy & Delicious",
        "time": "06:12"
      },
      {
        "title": "Grilled Cod Fillet Recipe",
        "subtitle": "Herb & Lemon",
        "time": "06:48"
      }
    ]
  },
  {
    "id": "tuna-steak",
    "title": "Tuna Steak",
    "slug": "tuna-steak",
    "category": "fish",
    "format": "Steak Cut",
    "origin": "Spain",
    "filterCountry": "Spain",
    "badgeLabel": "High in Protein",
    "price": 15.5,
    "unit": "kg",
    "imageSrc": "/assets/6_image.png",
    "isFavorite": false,
    "displayOrder": 5,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Rich in Omega-3 and loaded with nutrients, tuna steak is known for its incredible taste, tender flaky texture, and superior health benefits.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(500g - 1kg)",
        "price": 11.63,
        "stock": 12,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(1kg - 2kg)",
        "price": 15.5,
        "stock": 8,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(2kg - 3kg)",
        "price": 20.93,
        "stock": 5,
        "availability": true
      },
      {
        "id": "xl",
        "label": "Extra Large",
        "subLabel": "(3kg+)",
        "price": 27.13,
        "stock": 0,
        "availability": false
      }
    ],
    "cutOptions": [
      {
        "id": "fillet",
        "label": "Fillet"
      },
      {
        "id": "steak",
        "label": "Steak"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Norway, North Atlantic Ocean",
      "points": [
        "Sustainably wild-caught",
        "Cold, clean waters",
        "Premium grade quality"
      ]
    },
    "specialty": [
      "Rich, buttery flavor",
      "High in Omega-3 fatty acids",
      "Excellent source of protein & vitamins"
    ],
    "famousOn": [
      "Norwegian Cuisine",
      "Japanese Sushi & Sashimi",
      "Mediterranean Dishes"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "20.4g",
      "calories": "208 kcal",
      "omega3": "2.3g",
      "fat": "13.4g"
    },
    "goodFor": [
      "Heart Health",
      "Brain Function",
      "Eye Health"
    ],
    "allergyInfo": {
      "title": "Contains Fish",
      "desc": "People with fish or seafood allergies should avoid consuming this product.",
      "warning": "May contain small fish bones despite careful processing."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Perfect for creamy, rich fish curries."
      },
      {
        "title": "Grill",
        "description": "Great for grilling with herbs, lemon and olive oil."
      }
    ],
    "howToCook": [
      {
        "title": "Tuna Steak Curry Recipe",
        "subtitle": "Spicy & Delicious",
        "time": "06:12"
      },
      {
        "title": "Grilled Tuna Steak Recipe",
        "subtitle": "Herb & Lemon",
        "time": "06:48"
      }
    ]
  },
  {
    "id": "tilapia",
    "title": "Tilapia",
    "slug": "tilapia",
    "category": "fish",
    "format": "Whole",
    "origin": "Netherlands",
    "filterCountry": "Netherlands",
    "badgeLabel": "Good Source of Protein",
    "price": 5.99,
    "unit": "kg",
    "imageSrc": "/assets/7_image.png",
    "isFavorite": false,
    "displayOrder": 6,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Rich in Omega-3 and loaded with nutrients, tilapia is known for its incredible taste, tender flaky texture, and superior health benefits.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(500g - 1kg)",
        "price": 4.49,
        "stock": 12,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(1kg - 2kg)",
        "price": 5.99,
        "stock": 8,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(2kg - 3kg)",
        "price": 8.09,
        "stock": 5,
        "availability": true
      },
      {
        "id": "xl",
        "label": "Extra Large",
        "subLabel": "(3kg+)",
        "price": 10.48,
        "stock": 0,
        "availability": false
      }
    ],
    "cutOptions": [
      {
        "id": "fillet",
        "label": "Fillet"
      },
      {
        "id": "steak",
        "label": "Steak"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Norway, North Atlantic Ocean",
      "points": [
        "Sustainably wild-caught",
        "Cold, clean waters",
        "Premium grade quality"
      ]
    },
    "specialty": [
      "Rich, buttery flavor",
      "High in Omega-3 fatty acids",
      "Excellent source of protein & vitamins"
    ],
    "famousOn": [
      "Norwegian Cuisine",
      "Japanese Sushi & Sashimi",
      "Mediterranean Dishes"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "20.4g",
      "calories": "208 kcal",
      "omega3": "2.3g",
      "fat": "13.4g"
    },
    "goodFor": [
      "Heart Health",
      "Brain Function",
      "Eye Health"
    ],
    "allergyInfo": {
      "title": "Contains Fish",
      "desc": "People with fish or seafood allergies should avoid consuming this product.",
      "warning": "May contain small fish bones despite careful processing."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Perfect for creamy, rich fish curries."
      },
      {
        "title": "Grill",
        "description": "Great for grilling with herbs, lemon and olive oil."
      }
    ],
    "howToCook": [
      {
        "title": "Tilapia Curry Recipe",
        "subtitle": "Spicy & Delicious",
        "time": "06:12"
      },
      {
        "title": "Grilled Tilapia Recipe",
        "subtitle": "Herb & Lemon",
        "time": "06:48"
      }
    ]
  },
  {
    "id": "prawns",
    "title": "Prawns (King)",
    "slug": "prawns",
    "category": "fish",
    "format": "Shell-on",
    "origin": "Thailand",
    "filterCountry": "Thailand",
    "badgeLabel": "High in Protein",
    "price": 16.99,
    "unit": "kg",
    "imageSrc": "/assets/8_image.png",
    "isFavorite": false,
    "displayOrder": 7,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Rich in Omega-3 and loaded with nutrients, prawns (king) is known for its incredible taste, tender flaky texture, and superior health benefits.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(500g - 1kg)",
        "price": 12.74,
        "stock": 12,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(1kg - 2kg)",
        "price": 16.99,
        "stock": 8,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(2kg - 3kg)",
        "price": 22.94,
        "stock": 5,
        "availability": true
      },
      {
        "id": "xl",
        "label": "Extra Large",
        "subLabel": "(3kg+)",
        "price": 29.73,
        "stock": 0,
        "availability": false
      }
    ],
    "cutOptions": [
      {
        "id": "fillet",
        "label": "Fillet"
      },
      {
        "id": "steak",
        "label": "Steak"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Norway, North Atlantic Ocean",
      "points": [
        "Sustainably wild-caught",
        "Cold, clean waters",
        "Premium grade quality"
      ]
    },
    "specialty": [
      "Rich, buttery flavor",
      "High in Omega-3 fatty acids",
      "Excellent source of protein & vitamins"
    ],
    "famousOn": [
      "Norwegian Cuisine",
      "Japanese Sushi & Sashimi",
      "Mediterranean Dishes"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "20.4g",
      "calories": "208 kcal",
      "omega3": "2.3g",
      "fat": "13.4g"
    },
    "goodFor": [
      "Heart Health",
      "Brain Function",
      "Eye Health"
    ],
    "allergyInfo": {
      "title": "Contains Fish",
      "desc": "People with fish or seafood allergies should avoid consuming this product.",
      "warning": "May contain small fish bones despite careful processing."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Perfect for creamy, rich fish curries."
      },
      {
        "title": "Grill",
        "description": "Great for grilling with herbs, lemon and olive oil."
      }
    ],
    "howToCook": [
      {
        "title": "Prawns (King) Curry Recipe",
        "subtitle": "Spicy & Delicious",
        "time": "06:12"
      },
      {
        "title": "Grilled Prawns (King) Recipe",
        "subtitle": "Herb & Lemon",
        "time": "06:48"
      }
    ]
  },
  {
    "id": "trout",
    "title": "Trout",
    "slug": "trout",
    "category": "fish",
    "format": "Whole",
    "origin": "United Kingdom",
    "filterCountry": "United Kingdom",
    "badgeLabel": "Rich in Vitamins",
    "price": 7.99,
    "unit": "kg",
    "imageSrc": "/assets/1_image.png",
    "isFavorite": false,
    "displayOrder": 8,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Rich in Omega-3 and loaded with nutrients, trout is known for its incredible taste, tender flaky texture, and superior health benefits.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(500g - 1kg)",
        "price": 5.99,
        "stock": 12,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(1kg - 2kg)",
        "price": 7.99,
        "stock": 8,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(2kg - 3kg)",
        "price": 10.79,
        "stock": 5,
        "availability": true
      },
      {
        "id": "xl",
        "label": "Extra Large",
        "subLabel": "(3kg+)",
        "price": 13.98,
        "stock": 0,
        "availability": false
      }
    ],
    "cutOptions": [
      {
        "id": "fillet",
        "label": "Fillet"
      },
      {
        "id": "steak",
        "label": "Steak"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Norway, North Atlantic Ocean",
      "points": [
        "Sustainably wild-caught",
        "Cold, clean waters",
        "Premium grade quality"
      ]
    },
    "specialty": [
      "Rich, buttery flavor",
      "High in Omega-3 fatty acids",
      "Excellent source of protein & vitamins"
    ],
    "famousOn": [
      "Norwegian Cuisine",
      "Japanese Sushi & Sashimi",
      "Mediterranean Dishes"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "20.4g",
      "calories": "208 kcal",
      "omega3": "2.3g",
      "fat": "13.4g"
    },
    "goodFor": [
      "Heart Health",
      "Brain Function",
      "Eye Health"
    ],
    "allergyInfo": {
      "title": "Contains Fish",
      "desc": "People with fish or seafood allergies should avoid consuming this product.",
      "warning": "May contain small fish bones despite careful processing."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Perfect for creamy, rich fish curries."
      },
      {
        "title": "Grill",
        "description": "Great for grilling with herbs, lemon and olive oil."
      }
    ],
    "howToCook": [
      {
        "title": "Trout Curry Recipe",
        "subtitle": "Spicy & Delicious",
        "time": "06:12"
      },
      {
        "title": "Grilled Trout Recipe",
        "subtitle": "Herb & Lemon",
        "time": "06:48"
      }
    ]
  },
  {
    "id": "salmon-mock1",
    "title": "Salmon",
    "slug": "salmon-mock1",
    "category": "fish",
    "format": "Filet",
    "origin": "Country",
    "filterCountry": "Norway",
    "badgeLabel": "Rich in Omega-3",
    "price": 14.99,
    "unit": "kg",
    "imageSrc": "/assets/2_image.png",
    "isFavorite": false,
    "displayOrder": 9,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Rich in Omega-3 and loaded with nutrients, salmon is known for its incredible taste, tender flaky texture, and superior health benefits.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(500g - 1kg)",
        "price": 11.24,
        "stock": 12,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(1kg - 2kg)",
        "price": 14.99,
        "stock": 8,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(2kg - 3kg)",
        "price": 20.24,
        "stock": 5,
        "availability": true
      },
      {
        "id": "xl",
        "label": "Extra Large",
        "subLabel": "(3kg+)",
        "price": 26.23,
        "stock": 0,
        "availability": false
      }
    ],
    "cutOptions": [
      {
        "id": "fillet",
        "label": "Fillet"
      },
      {
        "id": "steak",
        "label": "Steak"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Norway, North Atlantic Ocean",
      "points": [
        "Sustainably wild-caught",
        "Cold, clean waters",
        "Premium grade quality"
      ]
    },
    "specialty": [
      "Rich, buttery flavor",
      "High in Omega-3 fatty acids",
      "Excellent source of protein & vitamins"
    ],
    "famousOn": [
      "Norwegian Cuisine",
      "Japanese Sushi & Sashimi",
      "Mediterranean Dishes"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "20.4g",
      "calories": "208 kcal",
      "omega3": "2.3g",
      "fat": "13.4g"
    },
    "goodFor": [
      "Heart Health",
      "Brain Function",
      "Eye Health"
    ],
    "allergyInfo": {
      "title": "Contains Fish",
      "desc": "People with fish or seafood allergies should avoid consuming this product.",
      "warning": "May contain small fish bones despite careful processing."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Perfect for creamy, rich fish curries."
      },
      {
        "title": "Grill",
        "description": "Great for grilling with herbs, lemon and olive oil."
      }
    ],
    "howToCook": [
      {
        "title": "Salmon Curry Recipe",
        "subtitle": "Spicy & Delicious",
        "time": "06:12"
      },
      {
        "title": "Grilled Salmon Recipe",
        "subtitle": "Herb & Lemon",
        "time": "06:48"
      }
    ]
  },
  {
    "id": "salmon-mock2",
    "title": "Salmon",
    "slug": "salmon-mock2",
    "category": "fish",
    "format": "Filet",
    "origin": "Country",
    "filterCountry": "Norway",
    "badgeLabel": "Rich in Omega-3",
    "price": 14.99,
    "unit": "kg",
    "imageSrc": "/assets/3_image.png",
    "isFavorite": false,
    "displayOrder": 10,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Rich in Omega-3 and loaded with nutrients, salmon is known for its incredible taste, tender flaky texture, and superior health benefits.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(500g - 1kg)",
        "price": 11.24,
        "stock": 12,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(1kg - 2kg)",
        "price": 14.99,
        "stock": 8,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(2kg - 3kg)",
        "price": 20.24,
        "stock": 5,
        "availability": true
      },
      {
        "id": "xl",
        "label": "Extra Large",
        "subLabel": "(3kg+)",
        "price": 26.23,
        "stock": 0,
        "availability": false
      }
    ],
    "cutOptions": [
      {
        "id": "fillet",
        "label": "Fillet"
      },
      {
        "id": "steak",
        "label": "Steak"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Norway, North Atlantic Ocean",
      "points": [
        "Sustainably wild-caught",
        "Cold, clean waters",
        "Premium grade quality"
      ]
    },
    "specialty": [
      "Rich, buttery flavor",
      "High in Omega-3 fatty acids",
      "Excellent source of protein & vitamins"
    ],
    "famousOn": [
      "Norwegian Cuisine",
      "Japanese Sushi & Sashimi",
      "Mediterranean Dishes"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "20.4g",
      "calories": "208 kcal",
      "omega3": "2.3g",
      "fat": "13.4g"
    },
    "goodFor": [
      "Heart Health",
      "Brain Function",
      "Eye Health"
    ],
    "allergyInfo": {
      "title": "Contains Fish",
      "desc": "People with fish or seafood allergies should avoid consuming this product.",
      "warning": "May contain small fish bones despite careful processing."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Perfect for creamy, rich fish curries."
      },
      {
        "title": "Grill",
        "description": "Great for grilling with herbs, lemon and olive oil."
      }
    ],
    "howToCook": [
      {
        "title": "Salmon Curry Recipe",
        "subtitle": "Spicy & Delicious",
        "time": "06:12"
      },
      {
        "title": "Grilled Salmon Recipe",
        "subtitle": "Herb & Lemon",
        "time": "06:48"
      }
    ]
  },
  {
    "id": "beef-chunks",
    "title": "Beef Chunks",
    "slug": "beef-chunks",
    "category": "meat",
    "format": "Boneless",
    "origin": "Spain",
    "filterCountry": "Spain",
    "badgeLabel": "Premium Cut",
    "price": 18.5,
    "unit": "kg",
    "imageSrc": "/assets/5_image.png",
    "isFavorite": false,
    "displayOrder": 1,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Tender, juicy cuts of beef chunks sourced from certified organic farms, expertly butchered for rich taste and optimal texture.",
    "serves": "3 - 5 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(0 - 500g)",
        "price": 10.18,
        "stock": 15,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(500g - 1kg)",
        "price": 18.5,
        "stock": 10,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(1kg+)",
        "price": 33.3,
        "stock": 4,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Cubes"
      },
      {
        "id": "bone-in",
        "label": "Bone-in Curry Cut"
      },
      {
        "id": "chops",
        "label": "Chops & Steaks"
      }
    ],
    "catchFrom": {
      "location": "Local Certified Farms, United Kingdom",
      "points": [
        "100% pasture-raised livestock",
        "Ethically sourced & grass-fed",
        "Freshly prepared daily"
      ]
    },
    "specialty": [
      "Tender, melt-in-mouth texture",
      "Rich in natural bio-available iron",
      "Aged for robust natural flavor"
    ],
    "famousOn": [
      "Traditional Sunday Roast",
      "Slow-cooked Stews & Biryani",
      "Charcoal BBQ Grills"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "26.1g",
      "calories": "215 kcal",
      "omega3": "0.4g",
      "fat": "11.8g"
    },
    "goodFor": [
      "Muscle Growth & Repair",
      "Energy & Vitality",
      "Healthy Immune Support"
    ],
    "allergyInfo": {
      "title": "Halal Certified Fresh Meat",
      "desc": "100% pure fresh meat with zero preservatives or chemical additives.",
      "warning": "Keep refrigerated below 4°C. Cook thoroughly before eating."
    },
    "bestFor": [
      {
        "title": "Slow Cook / Stew",
        "description": "Slow-simmered for deep flavor and tender fibers."
      },
      {
        "title": "Pan Sear / Grill",
        "description": "High-heat sear locks in succulent natural juices."
      }
    ],
    "howToCook": [
      {
        "title": "Slow Cooked Beef Chunks",
        "subtitle": "Tender & Flavorful",
        "time": "45 mins"
      },
      {
        "title": "Grilled Beef Chunks Chops",
        "subtitle": "Garlic & Rosemary",
        "time": "20 mins"
      }
    ]
  },
  {
    "id": "boar-boneless",
    "title": "Boar Meat",
    "slug": "boar-boneless",
    "category": "meat",
    "format": "Boneless",
    "origin": "Poland",
    "filterCountry": "Poland",
    "badgeLabel": "Exotic Meat",
    "price": 22.99,
    "unit": "kg",
    "imageSrc": "/assets/6_image.png",
    "isFavorite": false,
    "displayOrder": 2,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Tender, juicy cuts of boar meat sourced from certified organic farms, expertly butchered for rich taste and optimal texture.",
    "serves": "3 - 5 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(0 - 500g)",
        "price": 12.64,
        "stock": 15,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(500g - 1kg)",
        "price": 22.99,
        "stock": 10,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(1kg+)",
        "price": 41.38,
        "stock": 4,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Cubes"
      },
      {
        "id": "bone-in",
        "label": "Bone-in Curry Cut"
      },
      {
        "id": "chops",
        "label": "Chops & Steaks"
      }
    ],
    "catchFrom": {
      "location": "Local Certified Farms, United Kingdom",
      "points": [
        "100% pasture-raised livestock",
        "Ethically sourced & grass-fed",
        "Freshly prepared daily"
      ]
    },
    "specialty": [
      "Tender, melt-in-mouth texture",
      "Rich in natural bio-available iron",
      "Aged for robust natural flavor"
    ],
    "famousOn": [
      "Traditional Sunday Roast",
      "Slow-cooked Stews & Biryani",
      "Charcoal BBQ Grills"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "26.1g",
      "calories": "215 kcal",
      "omega3": "0.4g",
      "fat": "11.8g"
    },
    "goodFor": [
      "Muscle Growth & Repair",
      "Energy & Vitality",
      "Healthy Immune Support"
    ],
    "allergyInfo": {
      "title": "Halal Certified Fresh Meat",
      "desc": "100% pure fresh meat with zero preservatives or chemical additives.",
      "warning": "Keep refrigerated below 4°C. Cook thoroughly before eating."
    },
    "bestFor": [
      {
        "title": "Slow Cook / Stew",
        "description": "Slow-simmered for deep flavor and tender fibers."
      },
      {
        "title": "Pan Sear / Grill",
        "description": "High-heat sear locks in succulent natural juices."
      }
    ],
    "howToCook": [
      {
        "title": "Slow Cooked Boar Meat",
        "subtitle": "Tender & Flavorful",
        "time": "45 mins"
      },
      {
        "title": "Grilled Boar Meat Chops",
        "subtitle": "Garlic & Rosemary",
        "time": "20 mins"
      }
    ]
  },
  {
    "id": "boar-bone-in",
    "title": "Boar Ribs",
    "slug": "boar-bone-in",
    "category": "meat",
    "format": "With Bone",
    "origin": "Poland",
    "filterCountry": "Poland",
    "badgeLabel": "Rich Flavor",
    "price": 19.99,
    "unit": "kg",
    "imageSrc": "/assets/7_image.png",
    "isFavorite": false,
    "displayOrder": 3,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Tender, juicy cuts of boar ribs sourced from certified organic farms, expertly butchered for rich taste and optimal texture.",
    "serves": "3 - 5 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(0 - 500g)",
        "price": 10.99,
        "stock": 15,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(500g - 1kg)",
        "price": 19.99,
        "stock": 10,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(1kg+)",
        "price": 35.98,
        "stock": 4,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Cubes"
      },
      {
        "id": "bone-in",
        "label": "Bone-in Curry Cut"
      },
      {
        "id": "chops",
        "label": "Chops & Steaks"
      }
    ],
    "catchFrom": {
      "location": "Local Certified Farms, United Kingdom",
      "points": [
        "100% pasture-raised livestock",
        "Ethically sourced & grass-fed",
        "Freshly prepared daily"
      ]
    },
    "specialty": [
      "Tender, melt-in-mouth texture",
      "Rich in natural bio-available iron",
      "Aged for robust natural flavor"
    ],
    "famousOn": [
      "Traditional Sunday Roast",
      "Slow-cooked Stews & Biryani",
      "Charcoal BBQ Grills"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "26.1g",
      "calories": "215 kcal",
      "omega3": "0.4g",
      "fat": "11.8g"
    },
    "goodFor": [
      "Muscle Growth & Repair",
      "Energy & Vitality",
      "Healthy Immune Support"
    ],
    "allergyInfo": {
      "title": "Halal Certified Fresh Meat",
      "desc": "100% pure fresh meat with zero preservatives or chemical additives.",
      "warning": "Keep refrigerated below 4°C. Cook thoroughly before eating."
    },
    "bestFor": [
      {
        "title": "Slow Cook / Stew",
        "description": "Slow-simmered for deep flavor and tender fibers."
      },
      {
        "title": "Pan Sear / Grill",
        "description": "High-heat sear locks in succulent natural juices."
      }
    ],
    "howToCook": [
      {
        "title": "Slow Cooked Boar Ribs",
        "subtitle": "Tender & Flavorful",
        "time": "45 mins"
      },
      {
        "title": "Grilled Boar Ribs Chops",
        "subtitle": "Garlic & Rosemary",
        "time": "20 mins"
      }
    ]
  },
  {
    "id": "deer-meat",
    "title": "Deer Venison",
    "slug": "deer-meat",
    "category": "meat",
    "format": "Steak Cut",
    "origin": "Scotland",
    "filterCountry": "Scotland",
    "badgeLabel": "Lean & Healthy",
    "price": 28,
    "unit": "kg",
    "imageSrc": "/assets/8_image.png",
    "isFavorite": false,
    "displayOrder": 4,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Tender, juicy cuts of deer venison sourced from certified organic farms, expertly butchered for rich taste and optimal texture.",
    "serves": "3 - 5 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(0 - 500g)",
        "price": 15.4,
        "stock": 15,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(500g - 1kg)",
        "price": 28,
        "stock": 10,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(1kg+)",
        "price": 50.4,
        "stock": 4,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Cubes"
      },
      {
        "id": "bone-in",
        "label": "Bone-in Curry Cut"
      },
      {
        "id": "chops",
        "label": "Chops & Steaks"
      }
    ],
    "catchFrom": {
      "location": "Local Certified Farms, United Kingdom",
      "points": [
        "100% pasture-raised livestock",
        "Ethically sourced & grass-fed",
        "Freshly prepared daily"
      ]
    },
    "specialty": [
      "Tender, melt-in-mouth texture",
      "Rich in natural bio-available iron",
      "Aged for robust natural flavor"
    ],
    "famousOn": [
      "Traditional Sunday Roast",
      "Slow-cooked Stews & Biryani",
      "Charcoal BBQ Grills"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "26.1g",
      "calories": "215 kcal",
      "omega3": "0.4g",
      "fat": "11.8g"
    },
    "goodFor": [
      "Muscle Growth & Repair",
      "Energy & Vitality",
      "Healthy Immune Support"
    ],
    "allergyInfo": {
      "title": "Halal Certified Fresh Meat",
      "desc": "100% pure fresh meat with zero preservatives or chemical additives.",
      "warning": "Keep refrigerated below 4°C. Cook thoroughly before eating."
    },
    "bestFor": [
      {
        "title": "Slow Cook / Stew",
        "description": "Slow-simmered for deep flavor and tender fibers."
      },
      {
        "title": "Pan Sear / Grill",
        "description": "High-heat sear locks in succulent natural juices."
      }
    ],
    "howToCook": [
      {
        "title": "Slow Cooked Deer Venison",
        "subtitle": "Tender & Flavorful",
        "time": "45 mins"
      },
      {
        "title": "Grilled Deer Venison Chops",
        "subtitle": "Garlic & Rosemary",
        "time": "20 mins"
      }
    ]
  },
  {
    "id": "lamb-cutlets",
    "title": "Lamb Cutlets",
    "slug": "lamb-cutlets",
    "category": "meat",
    "format": "Chops",
    "origin": "New Zealand",
    "filterCountry": "New Zealand",
    "badgeLabel": "Tender Cut",
    "price": 24.5,
    "unit": "kg",
    "imageSrc": "/assets/1_image.png",
    "isFavorite": false,
    "displayOrder": 5,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Tender, juicy cuts of lamb cutlets sourced from certified organic farms, expertly butchered for rich taste and optimal texture.",
    "serves": "3 - 5 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(0 - 500g)",
        "price": 13.48,
        "stock": 15,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(500g - 1kg)",
        "price": 24.5,
        "stock": 10,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(1kg+)",
        "price": 44.1,
        "stock": 4,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Cubes"
      },
      {
        "id": "bone-in",
        "label": "Bone-in Curry Cut"
      },
      {
        "id": "chops",
        "label": "Chops & Steaks"
      }
    ],
    "catchFrom": {
      "location": "Local Certified Farms, United Kingdom",
      "points": [
        "100% pasture-raised livestock",
        "Ethically sourced & grass-fed",
        "Freshly prepared daily"
      ]
    },
    "specialty": [
      "Tender, melt-in-mouth texture",
      "Rich in natural bio-available iron",
      "Aged for robust natural flavor"
    ],
    "famousOn": [
      "Traditional Sunday Roast",
      "Slow-cooked Stews & Biryani",
      "Charcoal BBQ Grills"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "26.1g",
      "calories": "215 kcal",
      "omega3": "0.4g",
      "fat": "11.8g"
    },
    "goodFor": [
      "Muscle Growth & Repair",
      "Energy & Vitality",
      "Healthy Immune Support"
    ],
    "allergyInfo": {
      "title": "Halal Certified Fresh Meat",
      "desc": "100% pure fresh meat with zero preservatives or chemical additives.",
      "warning": "Keep refrigerated below 4°C. Cook thoroughly before eating."
    },
    "bestFor": [
      {
        "title": "Slow Cook / Stew",
        "description": "Slow-simmered for deep flavor and tender fibers."
      },
      {
        "title": "Pan Sear / Grill",
        "description": "High-heat sear locks in succulent natural juices."
      }
    ],
    "howToCook": [
      {
        "title": "Slow Cooked Lamb Cutlets",
        "subtitle": "Tender & Flavorful",
        "time": "45 mins"
      },
      {
        "title": "Grilled Lamb Cutlets Chops",
        "subtitle": "Garlic & Rosemary",
        "time": "20 mins"
      }
    ]
  },
  {
    "id": "mutton-leg",
    "title": "Mutton Leg",
    "slug": "mutton-leg",
    "category": "meat",
    "format": "Whole Leg",
    "origin": "United Kingdom",
    "filterCountry": "United Kingdom",
    "badgeLabel": "Great for Roast",
    "price": 16.5,
    "unit": "kg",
    "imageSrc": "/assets/2_image.png",
    "isFavorite": false,
    "displayOrder": 6,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Tender, juicy cuts of mutton leg sourced from certified organic farms, expertly butchered for rich taste and optimal texture.",
    "serves": "3 - 5 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(0 - 500g)",
        "price": 9.08,
        "stock": 15,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(500g - 1kg)",
        "price": 16.5,
        "stock": 10,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(1kg+)",
        "price": 29.7,
        "stock": 4,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Cubes"
      },
      {
        "id": "bone-in",
        "label": "Bone-in Curry Cut"
      },
      {
        "id": "chops",
        "label": "Chops & Steaks"
      }
    ],
    "catchFrom": {
      "location": "Local Certified Farms, United Kingdom",
      "points": [
        "100% pasture-raised livestock",
        "Ethically sourced & grass-fed",
        "Freshly prepared daily"
      ]
    },
    "specialty": [
      "Tender, melt-in-mouth texture",
      "Rich in natural bio-available iron",
      "Aged for robust natural flavor"
    ],
    "famousOn": [
      "Traditional Sunday Roast",
      "Slow-cooked Stews & Biryani",
      "Charcoal BBQ Grills"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "26.1g",
      "calories": "215 kcal",
      "omega3": "0.4g",
      "fat": "11.8g"
    },
    "goodFor": [
      "Muscle Growth & Repair",
      "Energy & Vitality",
      "Healthy Immune Support"
    ],
    "allergyInfo": {
      "title": "Halal Certified Fresh Meat",
      "desc": "100% pure fresh meat with zero preservatives or chemical additives.",
      "warning": "Keep refrigerated below 4°C. Cook thoroughly before eating."
    },
    "bestFor": [
      {
        "title": "Slow Cook / Stew",
        "description": "Slow-simmered for deep flavor and tender fibers."
      },
      {
        "title": "Pan Sear / Grill",
        "description": "High-heat sear locks in succulent natural juices."
      }
    ],
    "howToCook": [
      {
        "title": "Slow Cooked Mutton Leg",
        "subtitle": "Tender & Flavorful",
        "time": "45 mins"
      },
      {
        "title": "Grilled Mutton Leg Chops",
        "subtitle": "Garlic & Rosemary",
        "time": "20 mins"
      }
    ]
  },
  {
    "id": "beef-chunks-mock1",
    "title": "Beef Chunks",
    "slug": "beef-chunks-mock1",
    "category": "meat",
    "format": "Boneless",
    "origin": "Spain",
    "filterCountry": "Spain",
    "badgeLabel": "Premium Cut",
    "price": 18.5,
    "unit": "kg",
    "imageSrc": "/assets/3_image.png",
    "isFavorite": false,
    "displayOrder": 7,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Tender, juicy cuts of beef chunks sourced from certified organic farms, expertly butchered for rich taste and optimal texture.",
    "serves": "3 - 5 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(0 - 500g)",
        "price": 10.18,
        "stock": 15,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(500g - 1kg)",
        "price": 18.5,
        "stock": 10,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(1kg+)",
        "price": 33.3,
        "stock": 4,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Cubes"
      },
      {
        "id": "bone-in",
        "label": "Bone-in Curry Cut"
      },
      {
        "id": "chops",
        "label": "Chops & Steaks"
      }
    ],
    "catchFrom": {
      "location": "Local Certified Farms, United Kingdom",
      "points": [
        "100% pasture-raised livestock",
        "Ethically sourced & grass-fed",
        "Freshly prepared daily"
      ]
    },
    "specialty": [
      "Tender, melt-in-mouth texture",
      "Rich in natural bio-available iron",
      "Aged for robust natural flavor"
    ],
    "famousOn": [
      "Traditional Sunday Roast",
      "Slow-cooked Stews & Biryani",
      "Charcoal BBQ Grills"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "26.1g",
      "calories": "215 kcal",
      "omega3": "0.4g",
      "fat": "11.8g"
    },
    "goodFor": [
      "Muscle Growth & Repair",
      "Energy & Vitality",
      "Healthy Immune Support"
    ],
    "allergyInfo": {
      "title": "Halal Certified Fresh Meat",
      "desc": "100% pure fresh meat with zero preservatives or chemical additives.",
      "warning": "Keep refrigerated below 4°C. Cook thoroughly before eating."
    },
    "bestFor": [
      {
        "title": "Slow Cook / Stew",
        "description": "Slow-simmered for deep flavor and tender fibers."
      },
      {
        "title": "Pan Sear / Grill",
        "description": "High-heat sear locks in succulent natural juices."
      }
    ],
    "howToCook": [
      {
        "title": "Slow Cooked Beef Chunks",
        "subtitle": "Tender & Flavorful",
        "time": "45 mins"
      },
      {
        "title": "Grilled Beef Chunks Chops",
        "subtitle": "Garlic & Rosemary",
        "time": "20 mins"
      }
    ]
  },
  {
    "id": "beef-chunks-mock2",
    "title": "Beef Chunks",
    "slug": "beef-chunks-mock2",
    "category": "meat",
    "format": "Boneless",
    "origin": "Spain",
    "filterCountry": "Spain",
    "badgeLabel": "Premium Cut",
    "price": 18.5,
    "unit": "kg",
    "imageSrc": "/assets/4_image.png",
    "isFavorite": false,
    "displayOrder": 8,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Tender, juicy cuts of beef chunks sourced from certified organic farms, expertly butchered for rich taste and optimal texture.",
    "serves": "3 - 5 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(0 - 500g)",
        "price": 10.18,
        "stock": 15,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(500g - 1kg)",
        "price": 18.5,
        "stock": 10,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(1kg+)",
        "price": 33.3,
        "stock": 4,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Cubes"
      },
      {
        "id": "bone-in",
        "label": "Bone-in Curry Cut"
      },
      {
        "id": "chops",
        "label": "Chops & Steaks"
      }
    ],
    "catchFrom": {
      "location": "Local Certified Farms, United Kingdom",
      "points": [
        "100% pasture-raised livestock",
        "Ethically sourced & grass-fed",
        "Freshly prepared daily"
      ]
    },
    "specialty": [
      "Tender, melt-in-mouth texture",
      "Rich in natural bio-available iron",
      "Aged for robust natural flavor"
    ],
    "famousOn": [
      "Traditional Sunday Roast",
      "Slow-cooked Stews & Biryani",
      "Charcoal BBQ Grills"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "26.1g",
      "calories": "215 kcal",
      "omega3": "0.4g",
      "fat": "11.8g"
    },
    "goodFor": [
      "Muscle Growth & Repair",
      "Energy & Vitality",
      "Healthy Immune Support"
    ],
    "allergyInfo": {
      "title": "Halal Certified Fresh Meat",
      "desc": "100% pure fresh meat with zero preservatives or chemical additives.",
      "warning": "Keep refrigerated below 4°C. Cook thoroughly before eating."
    },
    "bestFor": [
      {
        "title": "Slow Cook / Stew",
        "description": "Slow-simmered for deep flavor and tender fibers."
      },
      {
        "title": "Pan Sear / Grill",
        "description": "High-heat sear locks in succulent natural juices."
      }
    ],
    "howToCook": [
      {
        "title": "Slow Cooked Beef Chunks",
        "subtitle": "Tender & Flavorful",
        "time": "45 mins"
      },
      {
        "title": "Grilled Beef Chunks Chops",
        "subtitle": "Garlic & Rosemary",
        "time": "20 mins"
      }
    ]
  },
  {
    "id": "beef-chunks-mock3",
    "title": "Beef Chunks",
    "slug": "beef-chunks-mock3",
    "category": "meat",
    "format": "Boneless",
    "origin": "Spain",
    "filterCountry": "Spain",
    "badgeLabel": "Premium Cut",
    "price": 18.5,
    "unit": "kg",
    "imageSrc": "/assets/5_image.png",
    "isFavorite": false,
    "displayOrder": 9,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Tender, juicy cuts of beef chunks sourced from certified organic farms, expertly butchered for rich taste and optimal texture.",
    "serves": "3 - 5 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(0 - 500g)",
        "price": 10.18,
        "stock": 15,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(500g - 1kg)",
        "price": 18.5,
        "stock": 10,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(1kg+)",
        "price": 33.3,
        "stock": 4,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Cubes"
      },
      {
        "id": "bone-in",
        "label": "Bone-in Curry Cut"
      },
      {
        "id": "chops",
        "label": "Chops & Steaks"
      }
    ],
    "catchFrom": {
      "location": "Local Certified Farms, United Kingdom",
      "points": [
        "100% pasture-raised livestock",
        "Ethically sourced & grass-fed",
        "Freshly prepared daily"
      ]
    },
    "specialty": [
      "Tender, melt-in-mouth texture",
      "Rich in natural bio-available iron",
      "Aged for robust natural flavor"
    ],
    "famousOn": [
      "Traditional Sunday Roast",
      "Slow-cooked Stews & Biryani",
      "Charcoal BBQ Grills"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "26.1g",
      "calories": "215 kcal",
      "omega3": "0.4g",
      "fat": "11.8g"
    },
    "goodFor": [
      "Muscle Growth & Repair",
      "Energy & Vitality",
      "Healthy Immune Support"
    ],
    "allergyInfo": {
      "title": "Halal Certified Fresh Meat",
      "desc": "100% pure fresh meat with zero preservatives or chemical additives.",
      "warning": "Keep refrigerated below 4°C. Cook thoroughly before eating."
    },
    "bestFor": [
      {
        "title": "Slow Cook / Stew",
        "description": "Slow-simmered for deep flavor and tender fibers."
      },
      {
        "title": "Pan Sear / Grill",
        "description": "High-heat sear locks in succulent natural juices."
      }
    ],
    "howToCook": [
      {
        "title": "Slow Cooked Beef Chunks",
        "subtitle": "Tender & Flavorful",
        "time": "45 mins"
      },
      {
        "title": "Grilled Beef Chunks Chops",
        "subtitle": "Garlic & Rosemary",
        "time": "20 mins"
      }
    ]
  },
  {
    "id": "beef-chunks-mock4",
    "title": "Beef Chunks",
    "slug": "beef-chunks-mock4",
    "category": "meat",
    "format": "Boneless",
    "origin": "Spain",
    "filterCountry": "Spain",
    "badgeLabel": "Premium Cut",
    "price": 18.5,
    "unit": "kg",
    "imageSrc": "/assets/6_image.png",
    "isFavorite": false,
    "displayOrder": 10,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Tender, juicy cuts of beef chunks sourced from certified organic farms, expertly butchered for rich taste and optimal texture.",
    "serves": "3 - 5 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small",
        "subLabel": "(0 - 500g)",
        "price": 10.18,
        "stock": 15,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Medium",
        "subLabel": "(500g - 1kg)",
        "price": 18.5,
        "stock": 10,
        "availability": true
      },
      {
        "id": "large",
        "label": "Large",
        "subLabel": "(1kg+)",
        "price": 33.3,
        "stock": 4,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Cubes"
      },
      {
        "id": "bone-in",
        "label": "Bone-in Curry Cut"
      },
      {
        "id": "chops",
        "label": "Chops & Steaks"
      }
    ],
    "catchFrom": {
      "location": "Local Certified Farms, United Kingdom",
      "points": [
        "100% pasture-raised livestock",
        "Ethically sourced & grass-fed",
        "Freshly prepared daily"
      ]
    },
    "specialty": [
      "Tender, melt-in-mouth texture",
      "Rich in natural bio-available iron",
      "Aged for robust natural flavor"
    ],
    "famousOn": [
      "Traditional Sunday Roast",
      "Slow-cooked Stews & Biryani",
      "Charcoal BBQ Grills"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "26.1g",
      "calories": "215 kcal",
      "omega3": "0.4g",
      "fat": "11.8g"
    },
    "goodFor": [
      "Muscle Growth & Repair",
      "Energy & Vitality",
      "Healthy Immune Support"
    ],
    "allergyInfo": {
      "title": "Halal Certified Fresh Meat",
      "desc": "100% pure fresh meat with zero preservatives or chemical additives.",
      "warning": "Keep refrigerated below 4°C. Cook thoroughly before eating."
    },
    "bestFor": [
      {
        "title": "Slow Cook / Stew",
        "description": "Slow-simmered for deep flavor and tender fibers."
      },
      {
        "title": "Pan Sear / Grill",
        "description": "High-heat sear locks in succulent natural juices."
      }
    ],
    "howToCook": [
      {
        "title": "Slow Cooked Beef Chunks",
        "subtitle": "Tender & Flavorful",
        "time": "45 mins"
      },
      {
        "title": "Grilled Beef Chunks Chops",
        "subtitle": "Garlic & Rosemary",
        "time": "20 mins"
      }
    ]
  },
  {
    "id": "boneless-chicken",
    "title": "Boneless Chicken",
    "slug": "boneless-chicken",
    "category": "chicken",
    "format": "Fillet",
    "origin": "Local Farms",
    "filterCountry": "Local Farms",
    "badgeLabel": "Antibiotic-Free",
    "price": 8.99,
    "unit": "kg",
    "imageSrc": "/assets/8_image.png",
    "isFavorite": false,
    "displayOrder": 1,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, tender boneless chicken raised on 100% natural feed with no antibiotics or hormone additions, delivered fresh daily.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small Pack",
        "subLabel": "(500g)",
        "price": 4.94,
        "stock": 20,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Standard Pack",
        "subLabel": "(1kg)",
        "price": 8.99,
        "stock": 15,
        "availability": true
      },
      {
        "id": "large",
        "label": "Family Pack",
        "subLabel": "(2kg)",
        "price": 16.63,
        "stock": 8,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Fillet"
      },
      {
        "id": "curry-cut",
        "label": "Curry Cut (Skinless)"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Local Free-Range Farms, United Kingdom",
      "points": [
        "Antibiotic & hormone-free",
        "Cage-free healthy environment",
        "Hygienically dressed and chilled"
      ]
    },
    "specialty": [
      "High quality lean protein",
      "Naturally juicy and tender",
      "Clean, fresh aroma and taste"
    ],
    "famousOn": [
      "Classic Butter Chicken",
      "Tandoori & Oven Roasts",
      "Healthy High-Protein Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "27.3g",
      "calories": "165 kcal",
      "omega3": "0.2g",
      "fat": "3.6g"
    },
    "goodFor": [
      "Lean Muscle Building",
      "Weight Management",
      "Daily Energy & Fitness"
    ],
    "allergyInfo": {
      "title": "Fresh Poultry",
      "desc": "100% natural fresh poultry with no artificial preservatives.",
      "warning": "Cook thoroughly until internal temperature reaches 75°C."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Simmers quickly and absorbs rich spice gravies."
      },
      {
        "title": "Roast / Bake",
        "description": "Crisp exterior with succulent tender meat inside."
      }
    ],
    "howToCook": [
      {
        "title": "Crispy Baked Boneless Chicken",
        "subtitle": "Golden & Juicy",
        "time": "30 mins"
      },
      {
        "title": "Homestyle Boneless Chicken Curry",
        "subtitle": "Spicy & Aromatic",
        "time": "25 mins"
      }
    ]
  },
  {
    "id": "chicken-full",
    "title": "Whole Chicken",
    "slug": "chicken-full",
    "category": "chicken",
    "format": "Whole",
    "origin": "Local Farms",
    "filterCountry": "Local Farms",
    "badgeLabel": "Free Range",
    "price": 7.5,
    "unit": "kg",
    "imageSrc": "/assets/1_image.png",
    "isFavorite": false,
    "displayOrder": 2,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, tender whole chicken raised on 100% natural feed with no antibiotics or hormone additions, delivered fresh daily.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small Pack",
        "subLabel": "(500g)",
        "price": 4.13,
        "stock": 20,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Standard Pack",
        "subLabel": "(1kg)",
        "price": 7.5,
        "stock": 15,
        "availability": true
      },
      {
        "id": "large",
        "label": "Family Pack",
        "subLabel": "(2kg)",
        "price": 13.88,
        "stock": 8,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Fillet"
      },
      {
        "id": "curry-cut",
        "label": "Curry Cut (Skinless)"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Local Free-Range Farms, United Kingdom",
      "points": [
        "Antibiotic & hormone-free",
        "Cage-free healthy environment",
        "Hygienically dressed and chilled"
      ]
    },
    "specialty": [
      "High quality lean protein",
      "Naturally juicy and tender",
      "Clean, fresh aroma and taste"
    ],
    "famousOn": [
      "Classic Butter Chicken",
      "Tandoori & Oven Roasts",
      "Healthy High-Protein Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "27.3g",
      "calories": "165 kcal",
      "omega3": "0.2g",
      "fat": "3.6g"
    },
    "goodFor": [
      "Lean Muscle Building",
      "Weight Management",
      "Daily Energy & Fitness"
    ],
    "allergyInfo": {
      "title": "Fresh Poultry",
      "desc": "100% natural fresh poultry with no artificial preservatives.",
      "warning": "Cook thoroughly until internal temperature reaches 75°C."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Simmers quickly and absorbs rich spice gravies."
      },
      {
        "title": "Roast / Bake",
        "description": "Crisp exterior with succulent tender meat inside."
      }
    ],
    "howToCook": [
      {
        "title": "Crispy Baked Whole Chicken",
        "subtitle": "Golden & Juicy",
        "time": "30 mins"
      },
      {
        "title": "Homestyle Whole Chicken Curry",
        "subtitle": "Spicy & Aromatic",
        "time": "25 mins"
      }
    ]
  },
  {
    "id": "chicken-liver",
    "title": "Chicken Liver",
    "slug": "chicken-liver",
    "category": "chicken",
    "format": "Fresh Cuts",
    "origin": "Local Farms",
    "filterCountry": "Local Farms",
    "badgeLabel": "Iron Rich",
    "price": 4.99,
    "unit": "kg",
    "imageSrc": "/assets/2_image.png",
    "isFavorite": false,
    "displayOrder": 3,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, tender chicken liver raised on 100% natural feed with no antibiotics or hormone additions, delivered fresh daily.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small Pack",
        "subLabel": "(500g)",
        "price": 2.74,
        "stock": 20,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Standard Pack",
        "subLabel": "(1kg)",
        "price": 4.99,
        "stock": 15,
        "availability": true
      },
      {
        "id": "large",
        "label": "Family Pack",
        "subLabel": "(2kg)",
        "price": 9.23,
        "stock": 8,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Fillet"
      },
      {
        "id": "curry-cut",
        "label": "Curry Cut (Skinless)"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Local Free-Range Farms, United Kingdom",
      "points": [
        "Antibiotic & hormone-free",
        "Cage-free healthy environment",
        "Hygienically dressed and chilled"
      ]
    },
    "specialty": [
      "High quality lean protein",
      "Naturally juicy and tender",
      "Clean, fresh aroma and taste"
    ],
    "famousOn": [
      "Classic Butter Chicken",
      "Tandoori & Oven Roasts",
      "Healthy High-Protein Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "27.3g",
      "calories": "165 kcal",
      "omega3": "0.2g",
      "fat": "3.6g"
    },
    "goodFor": [
      "Lean Muscle Building",
      "Weight Management",
      "Daily Energy & Fitness"
    ],
    "allergyInfo": {
      "title": "Fresh Poultry",
      "desc": "100% natural fresh poultry with no artificial preservatives.",
      "warning": "Cook thoroughly until internal temperature reaches 75°C."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Simmers quickly and absorbs rich spice gravies."
      },
      {
        "title": "Roast / Bake",
        "description": "Crisp exterior with succulent tender meat inside."
      }
    ],
    "howToCook": [
      {
        "title": "Crispy Baked Chicken Liver",
        "subtitle": "Golden & Juicy",
        "time": "30 mins"
      },
      {
        "title": "Homestyle Chicken Liver Curry",
        "subtitle": "Spicy & Aromatic",
        "time": "25 mins"
      }
    ]
  },
  {
    "id": "boneless-chicken-mock1",
    "title": "Boneless Chicken",
    "slug": "boneless-chicken-mock1",
    "category": "chicken",
    "format": "Fillet",
    "origin": "Local Farms",
    "filterCountry": "Local Farms",
    "badgeLabel": "Antibiotic-Free",
    "price": 8.99,
    "unit": "kg",
    "imageSrc": "/assets/3_image.png",
    "isFavorite": false,
    "displayOrder": 4,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, tender boneless chicken raised on 100% natural feed with no antibiotics or hormone additions, delivered fresh daily.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small Pack",
        "subLabel": "(500g)",
        "price": 4.94,
        "stock": 20,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Standard Pack",
        "subLabel": "(1kg)",
        "price": 8.99,
        "stock": 15,
        "availability": true
      },
      {
        "id": "large",
        "label": "Family Pack",
        "subLabel": "(2kg)",
        "price": 16.63,
        "stock": 8,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Fillet"
      },
      {
        "id": "curry-cut",
        "label": "Curry Cut (Skinless)"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Local Free-Range Farms, United Kingdom",
      "points": [
        "Antibiotic & hormone-free",
        "Cage-free healthy environment",
        "Hygienically dressed and chilled"
      ]
    },
    "specialty": [
      "High quality lean protein",
      "Naturally juicy and tender",
      "Clean, fresh aroma and taste"
    ],
    "famousOn": [
      "Classic Butter Chicken",
      "Tandoori & Oven Roasts",
      "Healthy High-Protein Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "27.3g",
      "calories": "165 kcal",
      "omega3": "0.2g",
      "fat": "3.6g"
    },
    "goodFor": [
      "Lean Muscle Building",
      "Weight Management",
      "Daily Energy & Fitness"
    ],
    "allergyInfo": {
      "title": "Fresh Poultry",
      "desc": "100% natural fresh poultry with no artificial preservatives.",
      "warning": "Cook thoroughly until internal temperature reaches 75°C."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Simmers quickly and absorbs rich spice gravies."
      },
      {
        "title": "Roast / Bake",
        "description": "Crisp exterior with succulent tender meat inside."
      }
    ],
    "howToCook": [
      {
        "title": "Crispy Baked Boneless Chicken",
        "subtitle": "Golden & Juicy",
        "time": "30 mins"
      },
      {
        "title": "Homestyle Boneless Chicken Curry",
        "subtitle": "Spicy & Aromatic",
        "time": "25 mins"
      }
    ]
  },
  {
    "id": "boneless-chicken-mock2",
    "title": "Boneless Chicken",
    "slug": "boneless-chicken-mock2",
    "category": "chicken",
    "format": "Fillet",
    "origin": "Local Farms",
    "filterCountry": "Local Farms",
    "badgeLabel": "Antibiotic-Free",
    "price": 8.99,
    "unit": "kg",
    "imageSrc": "/assets/4_image.png",
    "isFavorite": false,
    "displayOrder": 5,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, tender boneless chicken raised on 100% natural feed with no antibiotics or hormone additions, delivered fresh daily.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small Pack",
        "subLabel": "(500g)",
        "price": 4.94,
        "stock": 20,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Standard Pack",
        "subLabel": "(1kg)",
        "price": 8.99,
        "stock": 15,
        "availability": true
      },
      {
        "id": "large",
        "label": "Family Pack",
        "subLabel": "(2kg)",
        "price": 16.63,
        "stock": 8,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Fillet"
      },
      {
        "id": "curry-cut",
        "label": "Curry Cut (Skinless)"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Local Free-Range Farms, United Kingdom",
      "points": [
        "Antibiotic & hormone-free",
        "Cage-free healthy environment",
        "Hygienically dressed and chilled"
      ]
    },
    "specialty": [
      "High quality lean protein",
      "Naturally juicy and tender",
      "Clean, fresh aroma and taste"
    ],
    "famousOn": [
      "Classic Butter Chicken",
      "Tandoori & Oven Roasts",
      "Healthy High-Protein Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "27.3g",
      "calories": "165 kcal",
      "omega3": "0.2g",
      "fat": "3.6g"
    },
    "goodFor": [
      "Lean Muscle Building",
      "Weight Management",
      "Daily Energy & Fitness"
    ],
    "allergyInfo": {
      "title": "Fresh Poultry",
      "desc": "100% natural fresh poultry with no artificial preservatives.",
      "warning": "Cook thoroughly until internal temperature reaches 75°C."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Simmers quickly and absorbs rich spice gravies."
      },
      {
        "title": "Roast / Bake",
        "description": "Crisp exterior with succulent tender meat inside."
      }
    ],
    "howToCook": [
      {
        "title": "Crispy Baked Boneless Chicken",
        "subtitle": "Golden & Juicy",
        "time": "30 mins"
      },
      {
        "title": "Homestyle Boneless Chicken Curry",
        "subtitle": "Spicy & Aromatic",
        "time": "25 mins"
      }
    ]
  },
  {
    "id": "boneless-chicken-mock3",
    "title": "Boneless Chicken",
    "slug": "boneless-chicken-mock3",
    "category": "chicken",
    "format": "Fillet",
    "origin": "Local Farms",
    "filterCountry": "Local Farms",
    "badgeLabel": "Antibiotic-Free",
    "price": 8.99,
    "unit": "kg",
    "imageSrc": "/assets/5_image.png",
    "isFavorite": false,
    "displayOrder": 6,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, tender boneless chicken raised on 100% natural feed with no antibiotics or hormone additions, delivered fresh daily.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small Pack",
        "subLabel": "(500g)",
        "price": 4.94,
        "stock": 20,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Standard Pack",
        "subLabel": "(1kg)",
        "price": 8.99,
        "stock": 15,
        "availability": true
      },
      {
        "id": "large",
        "label": "Family Pack",
        "subLabel": "(2kg)",
        "price": 16.63,
        "stock": 8,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Fillet"
      },
      {
        "id": "curry-cut",
        "label": "Curry Cut (Skinless)"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Local Free-Range Farms, United Kingdom",
      "points": [
        "Antibiotic & hormone-free",
        "Cage-free healthy environment",
        "Hygienically dressed and chilled"
      ]
    },
    "specialty": [
      "High quality lean protein",
      "Naturally juicy and tender",
      "Clean, fresh aroma and taste"
    ],
    "famousOn": [
      "Classic Butter Chicken",
      "Tandoori & Oven Roasts",
      "Healthy High-Protein Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "27.3g",
      "calories": "165 kcal",
      "omega3": "0.2g",
      "fat": "3.6g"
    },
    "goodFor": [
      "Lean Muscle Building",
      "Weight Management",
      "Daily Energy & Fitness"
    ],
    "allergyInfo": {
      "title": "Fresh Poultry",
      "desc": "100% natural fresh poultry with no artificial preservatives.",
      "warning": "Cook thoroughly until internal temperature reaches 75°C."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Simmers quickly and absorbs rich spice gravies."
      },
      {
        "title": "Roast / Bake",
        "description": "Crisp exterior with succulent tender meat inside."
      }
    ],
    "howToCook": [
      {
        "title": "Crispy Baked Boneless Chicken",
        "subtitle": "Golden & Juicy",
        "time": "30 mins"
      },
      {
        "title": "Homestyle Boneless Chicken Curry",
        "subtitle": "Spicy & Aromatic",
        "time": "25 mins"
      }
    ]
  },
  {
    "id": "boneless-chicken-mock4",
    "title": "Boneless Chicken",
    "slug": "boneless-chicken-mock4",
    "category": "chicken",
    "format": "Fillet",
    "origin": "Local Farms",
    "filterCountry": "Local Farms",
    "badgeLabel": "Antibiotic-Free",
    "price": 8.99,
    "unit": "kg",
    "imageSrc": "/assets/6_image.png",
    "isFavorite": false,
    "displayOrder": 7,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, tender boneless chicken raised on 100% natural feed with no antibiotics or hormone additions, delivered fresh daily.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small Pack",
        "subLabel": "(500g)",
        "price": 4.94,
        "stock": 20,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Standard Pack",
        "subLabel": "(1kg)",
        "price": 8.99,
        "stock": 15,
        "availability": true
      },
      {
        "id": "large",
        "label": "Family Pack",
        "subLabel": "(2kg)",
        "price": 16.63,
        "stock": 8,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Fillet"
      },
      {
        "id": "curry-cut",
        "label": "Curry Cut (Skinless)"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Local Free-Range Farms, United Kingdom",
      "points": [
        "Antibiotic & hormone-free",
        "Cage-free healthy environment",
        "Hygienically dressed and chilled"
      ]
    },
    "specialty": [
      "High quality lean protein",
      "Naturally juicy and tender",
      "Clean, fresh aroma and taste"
    ],
    "famousOn": [
      "Classic Butter Chicken",
      "Tandoori & Oven Roasts",
      "Healthy High-Protein Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "27.3g",
      "calories": "165 kcal",
      "omega3": "0.2g",
      "fat": "3.6g"
    },
    "goodFor": [
      "Lean Muscle Building",
      "Weight Management",
      "Daily Energy & Fitness"
    ],
    "allergyInfo": {
      "title": "Fresh Poultry",
      "desc": "100% natural fresh poultry with no artificial preservatives.",
      "warning": "Cook thoroughly until internal temperature reaches 75°C."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Simmers quickly and absorbs rich spice gravies."
      },
      {
        "title": "Roast / Bake",
        "description": "Crisp exterior with succulent tender meat inside."
      }
    ],
    "howToCook": [
      {
        "title": "Crispy Baked Boneless Chicken",
        "subtitle": "Golden & Juicy",
        "time": "30 mins"
      },
      {
        "title": "Homestyle Boneless Chicken Curry",
        "subtitle": "Spicy & Aromatic",
        "time": "25 mins"
      }
    ]
  },
  {
    "id": "boneless-chicken-mock5",
    "title": "Boneless Chicken",
    "slug": "boneless-chicken-mock5",
    "category": "chicken",
    "format": "Fillet",
    "origin": "Local Farms",
    "filterCountry": "Local Farms",
    "badgeLabel": "Antibiotic-Free",
    "price": 8.99,
    "unit": "kg",
    "imageSrc": "/assets/7_image.png",
    "isFavorite": false,
    "displayOrder": 8,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, tender boneless chicken raised on 100% natural feed with no antibiotics or hormone additions, delivered fresh daily.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small Pack",
        "subLabel": "(500g)",
        "price": 4.94,
        "stock": 20,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Standard Pack",
        "subLabel": "(1kg)",
        "price": 8.99,
        "stock": 15,
        "availability": true
      },
      {
        "id": "large",
        "label": "Family Pack",
        "subLabel": "(2kg)",
        "price": 16.63,
        "stock": 8,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Fillet"
      },
      {
        "id": "curry-cut",
        "label": "Curry Cut (Skinless)"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Local Free-Range Farms, United Kingdom",
      "points": [
        "Antibiotic & hormone-free",
        "Cage-free healthy environment",
        "Hygienically dressed and chilled"
      ]
    },
    "specialty": [
      "High quality lean protein",
      "Naturally juicy and tender",
      "Clean, fresh aroma and taste"
    ],
    "famousOn": [
      "Classic Butter Chicken",
      "Tandoori & Oven Roasts",
      "Healthy High-Protein Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "27.3g",
      "calories": "165 kcal",
      "omega3": "0.2g",
      "fat": "3.6g"
    },
    "goodFor": [
      "Lean Muscle Building",
      "Weight Management",
      "Daily Energy & Fitness"
    ],
    "allergyInfo": {
      "title": "Fresh Poultry",
      "desc": "100% natural fresh poultry with no artificial preservatives.",
      "warning": "Cook thoroughly until internal temperature reaches 75°C."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Simmers quickly and absorbs rich spice gravies."
      },
      {
        "title": "Roast / Bake",
        "description": "Crisp exterior with succulent tender meat inside."
      }
    ],
    "howToCook": [
      {
        "title": "Crispy Baked Boneless Chicken",
        "subtitle": "Golden & Juicy",
        "time": "30 mins"
      },
      {
        "title": "Homestyle Boneless Chicken Curry",
        "subtitle": "Spicy & Aromatic",
        "time": "25 mins"
      }
    ]
  },
  {
    "id": "boneless-chicken-mock6",
    "title": "Boneless Chicken",
    "slug": "boneless-chicken-mock6",
    "category": "chicken",
    "format": "Fillet",
    "origin": "Local Farms",
    "filterCountry": "Local Farms",
    "badgeLabel": "Antibiotic-Free",
    "price": 8.99,
    "unit": "kg",
    "imageSrc": "/assets/8_image.png",
    "isFavorite": false,
    "displayOrder": 9,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, tender boneless chicken raised on 100% natural feed with no antibiotics or hormone additions, delivered fresh daily.",
    "serves": "2 - 4 People",
    "sizes": [
      {
        "id": "small",
        "label": "Small Pack",
        "subLabel": "(500g)",
        "price": 4.94,
        "stock": 20,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Standard Pack",
        "subLabel": "(1kg)",
        "price": 8.99,
        "stock": 15,
        "availability": true
      },
      {
        "id": "large",
        "label": "Family Pack",
        "subLabel": "(2kg)",
        "price": 16.63,
        "stock": 8,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "boneless",
        "label": "Boneless Fillet"
      },
      {
        "id": "curry-cut",
        "label": "Curry Cut (Skinless)"
      },
      {
        "id": "whole",
        "label": "Whole Cleaned"
      }
    ],
    "catchFrom": {
      "location": "Local Free-Range Farms, United Kingdom",
      "points": [
        "Antibiotic & hormone-free",
        "Cage-free healthy environment",
        "Hygienically dressed and chilled"
      ]
    },
    "specialty": [
      "High quality lean protein",
      "Naturally juicy and tender",
      "Clean, fresh aroma and taste"
    ],
    "famousOn": [
      "Classic Butter Chicken",
      "Tandoori & Oven Roasts",
      "Healthy High-Protein Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g",
      "protein": "27.3g",
      "calories": "165 kcal",
      "omega3": "0.2g",
      "fat": "3.6g"
    },
    "goodFor": [
      "Lean Muscle Building",
      "Weight Management",
      "Daily Energy & Fitness"
    ],
    "allergyInfo": {
      "title": "Fresh Poultry",
      "desc": "100% natural fresh poultry with no artificial preservatives.",
      "warning": "Cook thoroughly until internal temperature reaches 75°C."
    },
    "bestFor": [
      {
        "title": "Curry",
        "description": "Simmers quickly and absorbs rich spice gravies."
      },
      {
        "title": "Roast / Bake",
        "description": "Crisp exterior with succulent tender meat inside."
      }
    ],
    "howToCook": [
      {
        "title": "Crispy Baked Boneless Chicken",
        "subtitle": "Golden & Juicy",
        "time": "30 mins"
      },
      {
        "title": "Homestyle Boneless Chicken Curry",
        "subtitle": "Spicy & Aromatic",
        "time": "25 mins"
      }
    ]
  },
  {
    "id": "chicken-eggs",
    "title": "Chicken Eggs",
    "slug": "chicken-eggs",
    "category": "eggs",
    "format": "12 Pack",
    "origin": "Organic Farms",
    "filterCountry": "Organic Farms",
    "badgeLabel": "Free Range",
    "price": 3.8,
    "unit": "pack",
    "imageSrc": "/assets/2_image.png",
    "isFavorite": false,
    "displayOrder": 1,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, nutrient-dense chicken eggs from free-roaming hens fed a balanced wholesome grain diet, providing rich flavor and golden yolks.",
    "serves": "Family Pack",
    "sizes": [
      {
        "id": "small",
        "label": "Medium",
        "subLabel": "(53g - 63g)",
        "price": 3.23,
        "stock": 25,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Large",
        "subLabel": "(63g - 73g)",
        "price": 3.8,
        "stock": 30,
        "availability": true
      },
      {
        "id": "large",
        "label": "Extra Large",
        "subLabel": "(73g+)",
        "price": 4.75,
        "stock": 15,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "6-pack",
        "label": "6 Pack Box"
      },
      {
        "id": "12-pack",
        "label": "12 Pack Box"
      },
      {
        "id": "30-tray",
        "label": "30 Egg Tray"
      }
    ],
    "catchFrom": {
      "location": "Organic Free-Range Farms, England",
      "points": [
        "Free to forage outdoors daily",
        "Enriched omega-3 grain feed",
        "Graded and packed fresh every morning"
      ]
    },
    "specialty": [
      "Rich vibrant golden yolk",
      "Firm high-protein whites",
      "Clean natural shell texture"
    ],
    "famousOn": [
      "Fluffy Breakfast Omelettes",
      "Artisan Baking & Soufflés",
      "Soft Boiled Breakfast Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g (2 large eggs)",
      "protein": "13.0g",
      "calories": "143 kcal",
      "omega3": "0.7g",
      "fat": "9.5g"
    },
    "goodFor": [
      "Brain & Cognitive Health",
      "Vision & Eye Health",
      "High Bioavailability Protein"
    ],
    "allergyInfo": {
      "title": "Contains Eggs",
      "desc": "Contains poultry eggs. Individuals with egg allergies should avoid consumption.",
      "warning": "Store in a cool dry place or refrigerate after purchase."
    },
    "bestFor": [
      {
        "title": "Boil / Poach",
        "description": "Velvety runny yolk and tender delicate white."
      },
      {
        "title": "Scramble & Bake",
        "description": "Adds moisture, rise, and rich color to all dishes."
      }
    ],
    "howToCook": [
      {
        "title": "Perfect Soft Boiled Chicken Eggs",
        "subtitle": "6-Minute Classic",
        "time": "06:00"
      },
      {
        "title": "Fluffy Scrambled Chicken Eggs",
        "subtitle": "Creamy & Buttery",
        "time": "05:00"
      }
    ]
  },
  {
    "id": "duck-eggs",
    "title": "Duck Eggs",
    "slug": "duck-eggs",
    "category": "eggs",
    "format": "6 Pack",
    "origin": "Organic Farms",
    "filterCountry": "Organic Farms",
    "badgeLabel": "Rich & Creamy",
    "price": 4.5,
    "unit": "pack",
    "imageSrc": "/assets/3_image.png",
    "isFavorite": false,
    "displayOrder": 2,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, nutrient-dense duck eggs from free-roaming hens fed a balanced wholesome grain diet, providing rich flavor and golden yolks.",
    "serves": "Family Pack",
    "sizes": [
      {
        "id": "small",
        "label": "Medium",
        "subLabel": "(53g - 63g)",
        "price": 3.82,
        "stock": 25,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Large",
        "subLabel": "(63g - 73g)",
        "price": 4.5,
        "stock": 30,
        "availability": true
      },
      {
        "id": "large",
        "label": "Extra Large",
        "subLabel": "(73g+)",
        "price": 5.63,
        "stock": 15,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "6-pack",
        "label": "6 Pack Box"
      },
      {
        "id": "12-pack",
        "label": "12 Pack Box"
      },
      {
        "id": "30-tray",
        "label": "30 Egg Tray"
      }
    ],
    "catchFrom": {
      "location": "Organic Free-Range Farms, England",
      "points": [
        "Free to forage outdoors daily",
        "Enriched omega-3 grain feed",
        "Graded and packed fresh every morning"
      ]
    },
    "specialty": [
      "Rich vibrant golden yolk",
      "Firm high-protein whites",
      "Clean natural shell texture"
    ],
    "famousOn": [
      "Fluffy Breakfast Omelettes",
      "Artisan Baking & Soufflés",
      "Soft Boiled Breakfast Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g (2 large eggs)",
      "protein": "13.0g",
      "calories": "143 kcal",
      "omega3": "0.7g",
      "fat": "9.5g"
    },
    "goodFor": [
      "Brain & Cognitive Health",
      "Vision & Eye Health",
      "High Bioavailability Protein"
    ],
    "allergyInfo": {
      "title": "Contains Eggs",
      "desc": "Contains poultry eggs. Individuals with egg allergies should avoid consumption.",
      "warning": "Store in a cool dry place or refrigerate after purchase."
    },
    "bestFor": [
      {
        "title": "Boil / Poach",
        "description": "Velvety runny yolk and tender delicate white."
      },
      {
        "title": "Scramble & Bake",
        "description": "Adds moisture, rise, and rich color to all dishes."
      }
    ],
    "howToCook": [
      {
        "title": "Perfect Soft Boiled Duck Eggs",
        "subtitle": "6-Minute Classic",
        "time": "06:00"
      },
      {
        "title": "Fluffy Scrambled Duck Eggs",
        "subtitle": "Creamy & Buttery",
        "time": "05:00"
      }
    ]
  },
  {
    "id": "quail-eggs",
    "title": "Quail Eggs",
    "slug": "quail-eggs",
    "category": "eggs",
    "format": "12 Pack",
    "origin": "Local Farms",
    "filterCountry": "Local Farms",
    "badgeLabel": "Nutrient Dense",
    "price": 5.2,
    "unit": "pack",
    "imageSrc": "/assets/4_image.png",
    "isFavorite": false,
    "displayOrder": 3,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, nutrient-dense quail eggs from free-roaming hens fed a balanced wholesome grain diet, providing rich flavor and golden yolks.",
    "serves": "Family Pack",
    "sizes": [
      {
        "id": "small",
        "label": "Medium",
        "subLabel": "(53g - 63g)",
        "price": 4.42,
        "stock": 25,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Large",
        "subLabel": "(63g - 73g)",
        "price": 5.2,
        "stock": 30,
        "availability": true
      },
      {
        "id": "large",
        "label": "Extra Large",
        "subLabel": "(73g+)",
        "price": 6.5,
        "stock": 15,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "6-pack",
        "label": "6 Pack Box"
      },
      {
        "id": "12-pack",
        "label": "12 Pack Box"
      },
      {
        "id": "30-tray",
        "label": "30 Egg Tray"
      }
    ],
    "catchFrom": {
      "location": "Organic Free-Range Farms, England",
      "points": [
        "Free to forage outdoors daily",
        "Enriched omega-3 grain feed",
        "Graded and packed fresh every morning"
      ]
    },
    "specialty": [
      "Rich vibrant golden yolk",
      "Firm high-protein whites",
      "Clean natural shell texture"
    ],
    "famousOn": [
      "Fluffy Breakfast Omelettes",
      "Artisan Baking & Soufflés",
      "Soft Boiled Breakfast Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g (2 large eggs)",
      "protein": "13.0g",
      "calories": "143 kcal",
      "omega3": "0.7g",
      "fat": "9.5g"
    },
    "goodFor": [
      "Brain & Cognitive Health",
      "Vision & Eye Health",
      "High Bioavailability Protein"
    ],
    "allergyInfo": {
      "title": "Contains Eggs",
      "desc": "Contains poultry eggs. Individuals with egg allergies should avoid consumption.",
      "warning": "Store in a cool dry place or refrigerate after purchase."
    },
    "bestFor": [
      {
        "title": "Boil / Poach",
        "description": "Velvety runny yolk and tender delicate white."
      },
      {
        "title": "Scramble & Bake",
        "description": "Adds moisture, rise, and rich color to all dishes."
      }
    ],
    "howToCook": [
      {
        "title": "Perfect Soft Boiled Quail Eggs",
        "subtitle": "6-Minute Classic",
        "time": "06:00"
      },
      {
        "title": "Fluffy Scrambled Quail Eggs",
        "subtitle": "Creamy & Buttery",
        "time": "05:00"
      }
    ]
  },
  {
    "id": "chicken-eggs-mock1",
    "title": "Chicken Eggs",
    "slug": "chicken-eggs-mock1",
    "category": "eggs",
    "format": "12 Pack",
    "origin": "Organic Farms",
    "filterCountry": "Organic Farms",
    "badgeLabel": "Free Range",
    "price": 3.8,
    "unit": "pack",
    "imageSrc": "/assets/5_image.png",
    "isFavorite": false,
    "displayOrder": 4,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, nutrient-dense chicken eggs from free-roaming hens fed a balanced wholesome grain diet, providing rich flavor and golden yolks.",
    "serves": "Family Pack",
    "sizes": [
      {
        "id": "small",
        "label": "Medium",
        "subLabel": "(53g - 63g)",
        "price": 3.23,
        "stock": 25,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Large",
        "subLabel": "(63g - 73g)",
        "price": 3.8,
        "stock": 30,
        "availability": true
      },
      {
        "id": "large",
        "label": "Extra Large",
        "subLabel": "(73g+)",
        "price": 4.75,
        "stock": 15,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "6-pack",
        "label": "6 Pack Box"
      },
      {
        "id": "12-pack",
        "label": "12 Pack Box"
      },
      {
        "id": "30-tray",
        "label": "30 Egg Tray"
      }
    ],
    "catchFrom": {
      "location": "Organic Free-Range Farms, England",
      "points": [
        "Free to forage outdoors daily",
        "Enriched omega-3 grain feed",
        "Graded and packed fresh every morning"
      ]
    },
    "specialty": [
      "Rich vibrant golden yolk",
      "Firm high-protein whites",
      "Clean natural shell texture"
    ],
    "famousOn": [
      "Fluffy Breakfast Omelettes",
      "Artisan Baking & Soufflés",
      "Soft Boiled Breakfast Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g (2 large eggs)",
      "protein": "13.0g",
      "calories": "143 kcal",
      "omega3": "0.7g",
      "fat": "9.5g"
    },
    "goodFor": [
      "Brain & Cognitive Health",
      "Vision & Eye Health",
      "High Bioavailability Protein"
    ],
    "allergyInfo": {
      "title": "Contains Eggs",
      "desc": "Contains poultry eggs. Individuals with egg allergies should avoid consumption.",
      "warning": "Store in a cool dry place or refrigerate after purchase."
    },
    "bestFor": [
      {
        "title": "Boil / Poach",
        "description": "Velvety runny yolk and tender delicate white."
      },
      {
        "title": "Scramble & Bake",
        "description": "Adds moisture, rise, and rich color to all dishes."
      }
    ],
    "howToCook": [
      {
        "title": "Perfect Soft Boiled Chicken Eggs",
        "subtitle": "6-Minute Classic",
        "time": "06:00"
      },
      {
        "title": "Fluffy Scrambled Chicken Eggs",
        "subtitle": "Creamy & Buttery",
        "time": "05:00"
      }
    ]
  },
  {
    "id": "chicken-eggs-mock2",
    "title": "Chicken Eggs",
    "slug": "chicken-eggs-mock2",
    "category": "eggs",
    "format": "12 Pack",
    "origin": "Organic Farms",
    "filterCountry": "Organic Farms",
    "badgeLabel": "Free Range",
    "price": 3.8,
    "unit": "pack",
    "imageSrc": "/assets/6_image.png",
    "isFavorite": false,
    "displayOrder": 5,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, nutrient-dense chicken eggs from free-roaming hens fed a balanced wholesome grain diet, providing rich flavor and golden yolks.",
    "serves": "Family Pack",
    "sizes": [
      {
        "id": "small",
        "label": "Medium",
        "subLabel": "(53g - 63g)",
        "price": 3.23,
        "stock": 25,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Large",
        "subLabel": "(63g - 73g)",
        "price": 3.8,
        "stock": 30,
        "availability": true
      },
      {
        "id": "large",
        "label": "Extra Large",
        "subLabel": "(73g+)",
        "price": 4.75,
        "stock": 15,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "6-pack",
        "label": "6 Pack Box"
      },
      {
        "id": "12-pack",
        "label": "12 Pack Box"
      },
      {
        "id": "30-tray",
        "label": "30 Egg Tray"
      }
    ],
    "catchFrom": {
      "location": "Organic Free-Range Farms, England",
      "points": [
        "Free to forage outdoors daily",
        "Enriched omega-3 grain feed",
        "Graded and packed fresh every morning"
      ]
    },
    "specialty": [
      "Rich vibrant golden yolk",
      "Firm high-protein whites",
      "Clean natural shell texture"
    ],
    "famousOn": [
      "Fluffy Breakfast Omelettes",
      "Artisan Baking & Soufflés",
      "Soft Boiled Breakfast Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g (2 large eggs)",
      "protein": "13.0g",
      "calories": "143 kcal",
      "omega3": "0.7g",
      "fat": "9.5g"
    },
    "goodFor": [
      "Brain & Cognitive Health",
      "Vision & Eye Health",
      "High Bioavailability Protein"
    ],
    "allergyInfo": {
      "title": "Contains Eggs",
      "desc": "Contains poultry eggs. Individuals with egg allergies should avoid consumption.",
      "warning": "Store in a cool dry place or refrigerate after purchase."
    },
    "bestFor": [
      {
        "title": "Boil / Poach",
        "description": "Velvety runny yolk and tender delicate white."
      },
      {
        "title": "Scramble & Bake",
        "description": "Adds moisture, rise, and rich color to all dishes."
      }
    ],
    "howToCook": [
      {
        "title": "Perfect Soft Boiled Chicken Eggs",
        "subtitle": "6-Minute Classic",
        "time": "06:00"
      },
      {
        "title": "Fluffy Scrambled Chicken Eggs",
        "subtitle": "Creamy & Buttery",
        "time": "05:00"
      }
    ]
  },
  {
    "id": "chicken-eggs-mock3",
    "title": "Chicken Eggs",
    "slug": "chicken-eggs-mock3",
    "category": "eggs",
    "format": "12 Pack",
    "origin": "Organic Farms",
    "filterCountry": "Organic Farms",
    "badgeLabel": "Free Range",
    "price": 3.8,
    "unit": "pack",
    "imageSrc": "/assets/7_image.png",
    "isFavorite": false,
    "displayOrder": 6,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, nutrient-dense chicken eggs from free-roaming hens fed a balanced wholesome grain diet, providing rich flavor and golden yolks.",
    "serves": "Family Pack",
    "sizes": [
      {
        "id": "small",
        "label": "Medium",
        "subLabel": "(53g - 63g)",
        "price": 3.23,
        "stock": 25,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Large",
        "subLabel": "(63g - 73g)",
        "price": 3.8,
        "stock": 30,
        "availability": true
      },
      {
        "id": "large",
        "label": "Extra Large",
        "subLabel": "(73g+)",
        "price": 4.75,
        "stock": 15,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "6-pack",
        "label": "6 Pack Box"
      },
      {
        "id": "12-pack",
        "label": "12 Pack Box"
      },
      {
        "id": "30-tray",
        "label": "30 Egg Tray"
      }
    ],
    "catchFrom": {
      "location": "Organic Free-Range Farms, England",
      "points": [
        "Free to forage outdoors daily",
        "Enriched omega-3 grain feed",
        "Graded and packed fresh every morning"
      ]
    },
    "specialty": [
      "Rich vibrant golden yolk",
      "Firm high-protein whites",
      "Clean natural shell texture"
    ],
    "famousOn": [
      "Fluffy Breakfast Omelettes",
      "Artisan Baking & Soufflés",
      "Soft Boiled Breakfast Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g (2 large eggs)",
      "protein": "13.0g",
      "calories": "143 kcal",
      "omega3": "0.7g",
      "fat": "9.5g"
    },
    "goodFor": [
      "Brain & Cognitive Health",
      "Vision & Eye Health",
      "High Bioavailability Protein"
    ],
    "allergyInfo": {
      "title": "Contains Eggs",
      "desc": "Contains poultry eggs. Individuals with egg allergies should avoid consumption.",
      "warning": "Store in a cool dry place or refrigerate after purchase."
    },
    "bestFor": [
      {
        "title": "Boil / Poach",
        "description": "Velvety runny yolk and tender delicate white."
      },
      {
        "title": "Scramble & Bake",
        "description": "Adds moisture, rise, and rich color to all dishes."
      }
    ],
    "howToCook": [
      {
        "title": "Perfect Soft Boiled Chicken Eggs",
        "subtitle": "6-Minute Classic",
        "time": "06:00"
      },
      {
        "title": "Fluffy Scrambled Chicken Eggs",
        "subtitle": "Creamy & Buttery",
        "time": "05:00"
      }
    ]
  },
  {
    "id": "chicken-eggs-mock4",
    "title": "Chicken Eggs",
    "slug": "chicken-eggs-mock4",
    "category": "eggs",
    "format": "12 Pack",
    "origin": "Organic Farms",
    "filterCountry": "Organic Farms",
    "badgeLabel": "Free Range",
    "price": 3.8,
    "unit": "pack",
    "imageSrc": "/assets/8_image.png",
    "isFavorite": false,
    "displayOrder": 7,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, nutrient-dense chicken eggs from free-roaming hens fed a balanced wholesome grain diet, providing rich flavor and golden yolks.",
    "serves": "Family Pack",
    "sizes": [
      {
        "id": "small",
        "label": "Medium",
        "subLabel": "(53g - 63g)",
        "price": 3.23,
        "stock": 25,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Large",
        "subLabel": "(63g - 73g)",
        "price": 3.8,
        "stock": 30,
        "availability": true
      },
      {
        "id": "large",
        "label": "Extra Large",
        "subLabel": "(73g+)",
        "price": 4.75,
        "stock": 15,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "6-pack",
        "label": "6 Pack Box"
      },
      {
        "id": "12-pack",
        "label": "12 Pack Box"
      },
      {
        "id": "30-tray",
        "label": "30 Egg Tray"
      }
    ],
    "catchFrom": {
      "location": "Organic Free-Range Farms, England",
      "points": [
        "Free to forage outdoors daily",
        "Enriched omega-3 grain feed",
        "Graded and packed fresh every morning"
      ]
    },
    "specialty": [
      "Rich vibrant golden yolk",
      "Firm high-protein whites",
      "Clean natural shell texture"
    ],
    "famousOn": [
      "Fluffy Breakfast Omelettes",
      "Artisan Baking & Soufflés",
      "Soft Boiled Breakfast Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g (2 large eggs)",
      "protein": "13.0g",
      "calories": "143 kcal",
      "omega3": "0.7g",
      "fat": "9.5g"
    },
    "goodFor": [
      "Brain & Cognitive Health",
      "Vision & Eye Health",
      "High Bioavailability Protein"
    ],
    "allergyInfo": {
      "title": "Contains Eggs",
      "desc": "Contains poultry eggs. Individuals with egg allergies should avoid consumption.",
      "warning": "Store in a cool dry place or refrigerate after purchase."
    },
    "bestFor": [
      {
        "title": "Boil / Poach",
        "description": "Velvety runny yolk and tender delicate white."
      },
      {
        "title": "Scramble & Bake",
        "description": "Adds moisture, rise, and rich color to all dishes."
      }
    ],
    "howToCook": [
      {
        "title": "Perfect Soft Boiled Chicken Eggs",
        "subtitle": "6-Minute Classic",
        "time": "06:00"
      },
      {
        "title": "Fluffy Scrambled Chicken Eggs",
        "subtitle": "Creamy & Buttery",
        "time": "05:00"
      }
    ]
  },
  {
    "id": "chicken-eggs-mock5",
    "title": "Chicken Eggs",
    "slug": "chicken-eggs-mock5",
    "category": "eggs",
    "format": "12 Pack",
    "origin": "Organic Farms",
    "filterCountry": "Organic Farms",
    "badgeLabel": "Free Range",
    "price": 3.8,
    "unit": "pack",
    "imageSrc": "/assets/1_image.png",
    "isFavorite": false,
    "displayOrder": 8,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, nutrient-dense chicken eggs from free-roaming hens fed a balanced wholesome grain diet, providing rich flavor and golden yolks.",
    "serves": "Family Pack",
    "sizes": [
      {
        "id": "small",
        "label": "Medium",
        "subLabel": "(53g - 63g)",
        "price": 3.23,
        "stock": 25,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Large",
        "subLabel": "(63g - 73g)",
        "price": 3.8,
        "stock": 30,
        "availability": true
      },
      {
        "id": "large",
        "label": "Extra Large",
        "subLabel": "(73g+)",
        "price": 4.75,
        "stock": 15,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "6-pack",
        "label": "6 Pack Box"
      },
      {
        "id": "12-pack",
        "label": "12 Pack Box"
      },
      {
        "id": "30-tray",
        "label": "30 Egg Tray"
      }
    ],
    "catchFrom": {
      "location": "Organic Free-Range Farms, England",
      "points": [
        "Free to forage outdoors daily",
        "Enriched omega-3 grain feed",
        "Graded and packed fresh every morning"
      ]
    },
    "specialty": [
      "Rich vibrant golden yolk",
      "Firm high-protein whites",
      "Clean natural shell texture"
    ],
    "famousOn": [
      "Fluffy Breakfast Omelettes",
      "Artisan Baking & Soufflés",
      "Soft Boiled Breakfast Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g (2 large eggs)",
      "protein": "13.0g",
      "calories": "143 kcal",
      "omega3": "0.7g",
      "fat": "9.5g"
    },
    "goodFor": [
      "Brain & Cognitive Health",
      "Vision & Eye Health",
      "High Bioavailability Protein"
    ],
    "allergyInfo": {
      "title": "Contains Eggs",
      "desc": "Contains poultry eggs. Individuals with egg allergies should avoid consumption.",
      "warning": "Store in a cool dry place or refrigerate after purchase."
    },
    "bestFor": [
      {
        "title": "Boil / Poach",
        "description": "Velvety runny yolk and tender delicate white."
      },
      {
        "title": "Scramble & Bake",
        "description": "Adds moisture, rise, and rich color to all dishes."
      }
    ],
    "howToCook": [
      {
        "title": "Perfect Soft Boiled Chicken Eggs",
        "subtitle": "6-Minute Classic",
        "time": "06:00"
      },
      {
        "title": "Fluffy Scrambled Chicken Eggs",
        "subtitle": "Creamy & Buttery",
        "time": "05:00"
      }
    ]
  },
  {
    "id": "chicken-eggs-mock6",
    "title": "Chicken Eggs",
    "slug": "chicken-eggs-mock6",
    "category": "eggs",
    "format": "12 Pack",
    "origin": "Organic Farms",
    "filterCountry": "Organic Farms",
    "badgeLabel": "Free Range",
    "price": 3.8,
    "unit": "pack",
    "imageSrc": "/assets/2_image.png",
    "isFavorite": false,
    "displayOrder": 9,
    "rating": 4.8,
    "reviewCount": 128,
    "description": "Farm-fresh, nutrient-dense chicken eggs from free-roaming hens fed a balanced wholesome grain diet, providing rich flavor and golden yolks.",
    "serves": "Family Pack",
    "sizes": [
      {
        "id": "small",
        "label": "Medium",
        "subLabel": "(53g - 63g)",
        "price": 3.23,
        "stock": 25,
        "availability": true
      },
      {
        "id": "medium",
        "label": "Large",
        "subLabel": "(63g - 73g)",
        "price": 3.8,
        "stock": 30,
        "availability": true
      },
      {
        "id": "large",
        "label": "Extra Large",
        "subLabel": "(73g+)",
        "price": 4.75,
        "stock": 15,
        "availability": true
      }
    ],
    "cutOptions": [
      {
        "id": "6-pack",
        "label": "6 Pack Box"
      },
      {
        "id": "12-pack",
        "label": "12 Pack Box"
      },
      {
        "id": "30-tray",
        "label": "30 Egg Tray"
      }
    ],
    "catchFrom": {
      "location": "Organic Free-Range Farms, England",
      "points": [
        "Free to forage outdoors daily",
        "Enriched omega-3 grain feed",
        "Graded and packed fresh every morning"
      ]
    },
    "specialty": [
      "Rich vibrant golden yolk",
      "Firm high-protein whites",
      "Clean natural shell texture"
    ],
    "famousOn": [
      "Fluffy Breakfast Omelettes",
      "Artisan Baking & Soufflés",
      "Soft Boiled Breakfast Salads"
    ],
    "nutritionInfo": {
      "amount": "Per 100g (2 large eggs)",
      "protein": "13.0g",
      "calories": "143 kcal",
      "omega3": "0.7g",
      "fat": "9.5g"
    },
    "goodFor": [
      "Brain & Cognitive Health",
      "Vision & Eye Health",
      "High Bioavailability Protein"
    ],
    "allergyInfo": {
      "title": "Contains Eggs",
      "desc": "Contains poultry eggs. Individuals with egg allergies should avoid consumption.",
      "warning": "Store in a cool dry place or refrigerate after purchase."
    },
    "bestFor": [
      {
        "title": "Boil / Poach",
        "description": "Velvety runny yolk and tender delicate white."
      },
      {
        "title": "Scramble & Bake",
        "description": "Adds moisture, rise, and rich color to all dishes."
      }
    ],
    "howToCook": [
      {
        "title": "Perfect Soft Boiled Chicken Eggs",
        "subtitle": "6-Minute Classic",
        "time": "06:00"
      },
      {
        "title": "Fluffy Scrambled Chicken Eggs",
        "subtitle": "Creamy & Buttery",
        "time": "05:00"
      }
    ]
  }
];
