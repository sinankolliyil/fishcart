'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Play,
  Volume2,
  Settings,
  Maximize,
  Share2,
  Heart,
  Download,
  Clock,
  Fish,
  Beef,
  Egg,
  Drumstick,
  SkipForward,
  SkipBack,
  Target,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomeFooter } from '@/components/layout/HomeFooter';
import { motion } from 'framer-motion';

// --- Types ---
type Category = 'Fish' | 'Meat' | 'Chicken' | 'Egg';
type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Ingredient {
  name: string;
  qty: string;
  icon: string;
}

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  category: Category;
  difficulty: Difficulty;
  time: string;
  serves: number;
  ingredients: Ingredient[];
}

// --- Mock Data ---
const MOCK_VIDEOS: Video[] = [
  {
    id: 1,
    title: 'Grilled Sea Bass with Lemon Butter Sauce',
    description:
      'A healthy and delicious grilled sea bass recipe with a rich lemon butter sauce.',
    duration: '06:45',
    thumbnail: '/assets/prod_2_seabass.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '30 mins',
    serves: 2,
    ingredients: [
      { name: 'Sea Bass', qty: '2 (500g each)', icon: '🐟' },
      { name: 'Lemon', qty: '1', icon: '🍋' },
      { name: 'Garlic', qty: '4 cloves', icon: '🧄' },
      { name: 'Butter', qty: '3 tbsp', icon: '🧈' },
      { name: 'Olive Oil', qty: '2 tbsp', icon: '🫒' },
      { name: 'Fresh Parsley', qty: '2 tbsp', icon: '🌿' },
      { name: 'Salt', qty: 'To taste', icon: '🧂' },
      { name: 'Black Pepper', qty: 'To taste', icon: '🌶️' },
    ],
  },
  {
    id: 2,
    title: 'Crispy Fish Fry',
    description:
      'Deep-fried fish coated with a flavorful blend of aromatic spices.',
    duration: '12:45',
    thumbnail: '/assets/prod_1_salmon.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '20 mins',
    serves: 4,
    ingredients: [
      { name: 'Salmon', qty: '4 slices', icon: '🐟' },
      { name: 'Spices', qty: '2 tbsp', icon: '🌶️' },
      { name: 'Oil', qty: 'for frying', icon: '🫒' },
    ],
  },
  {
    id: 3,
    title: 'Prawn Masala Curry',
    description: 'A rich and spicy prawn curry made with coconut and tomatoes.',
    duration: '18:20',
    thumbnail: '/assets/prod_7_prawns.jpg',
    category: 'Fish',
    difficulty: 'Medium',
    time: '35 mins',
    serves: 3,
    ingredients: [
      { name: 'Prawns', qty: '500g', icon: '🍤' },
      { name: 'Tomato', qty: '2', icon: '🍅' },
      { name: 'Coconut Milk', qty: '1 cup', icon: '🥥' },
    ],
  },
  {
    id: 9,
    title: 'Seared Tuna Steaks',
    description: 'Perfectly seared tuna steaks with a soy ginger glaze.',
    duration: '08:45',
    thumbnail: '/assets/prod_5_tuna.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '15 mins',
    serves: 2,
    ingredients: [
      { name: 'Tuna', qty: '2 steaks', icon: '🐟' },
      { name: 'Soy Sauce', qty: '2 tbsp', icon: '🍶' },
      { name: 'Ginger', qty: '1 tbsp', icon: '🧄' },
    ],
  },
  {
    id: 4,
    title: 'Steamed Fish with Veg',
    description: 'A light and healthy steamed fish dish with fresh vegetables.',
    duration: '15:10',
    thumbnail: '/assets/prod_4_cod.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '25 mins',
    serves: 2,
    ingredients: [
      { name: 'White Fish', qty: '2 fillets', icon: '🐟' },
      { name: 'Vegetables', qty: '2 cups', icon: '🥦' },
      { name: 'Soy Sauce', qty: '1 tbsp', icon: '🍶' },
    ],
  },
  {
    id: 5,
    title: 'Fish Biryani',
    description: 'A fragrant rice dish layered with spiced fish.',
    duration: '25:30',
    thumbnail: '/assets/fish2.jpg',
    category: 'Fish',
    difficulty: 'Medium',
    time: '45 mins',
    serves: 6,
    ingredients: [
      { name: 'Salmon', qty: '500g', icon: '🐟' },
      { name: 'Basmati Rice', qty: '2 cups', icon: '🍚' },
      { name: 'Biryani Masala', qty: '2 tbsp', icon: '🌶️' },
    ],
  },
  {
    id: 6,
    title: 'Spicy Egg Curry',
    description: 'A comforting and spicy egg curry perfect with rice.',
    duration: '14:30',
    thumbnail: '/assets/egg.png',
    category: 'Egg',
    difficulty: 'Easy',
    time: '20 mins',
    serves: 2,
    ingredients: [
      { name: 'Eggs', qty: '4', icon: '🥚' },
      { name: 'Onions', qty: '2', icon: '🧅' },
      { name: 'Tomatoes', qty: '2', icon: '🍅' },
    ],
  },
  {
    id: 7,
    title: 'Pan-Seared Sea Bass with Herbs',
    description: 'Crispy skin pan-seared sea bass with a fresh herb salad.',
    duration: '10:15',
    thumbnail: '/assets/prod_2_seabass.jpg',
    category: 'Fish',
    difficulty: 'Medium',
    time: '20 mins',
    serves: 2,
    ingredients: [
      { name: 'Sea Bass', qty: '2 fillets', icon: '🐟' },
      { name: 'Olive Oil', qty: '1 tbsp', icon: '🫒' },
      { name: 'Mixed Herbs', qty: '1 cup', icon: '🌿' },
    ],
  },
  {
    id: 8,
    title: 'Baked Sea Bass with Tomato',
    description:
      'Oven baked sea bass with blistered cherry tomatoes and garlic.',
    duration: '22:00',
    thumbnail: '/assets/prod_2_seabass.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '35 mins',
    serves: 4,
    ingredients: [
      { name: 'Sea Bass', qty: '1 large', icon: '🐟' },
      { name: 'Cherry Tomatoes', qty: '2 cups', icon: '🍅' },
      { name: 'Garlic', qty: '6 cloves', icon: '🧄' },
    ],
  },
  {
    id: 10,
    title: 'Sea Bass Ceviche',
    description: 'Fresh sea bass ceviche cured in citrus juice.',
    duration: '10:00',
    thumbnail: '/assets/prod_2_seabass.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '15 mins',
    serves: 2,
    ingredients: [
      { name: 'Sea Bass', qty: '300g', icon: '🐟' },
      { name: 'Limes', qty: '3', icon: '🍋' },
    ],
  },
  {
    id: 11,
    title: 'Grilled Salmon Steaks',
    description: 'Perfectly grilled salmon steaks with asparagus.',
    duration: '14:20',
    thumbnail: '/assets/prod_1_salmon.jpg',
    category: 'Fish',
    difficulty: 'Medium',
    time: '25 mins',
    serves: 2,
    ingredients: [
      { name: 'Salmon', qty: '2 steaks', icon: '🐟' },
      { name: 'Asparagus', qty: '1 bunch', icon: '🥦' },
    ],
  },
  {
    id: 12,
    title: 'Salmon Sushi Roll',
    description: 'Homemade fresh salmon sushi rolls.',
    duration: '22:15',
    thumbnail: '/assets/prod_1_salmon.jpg',
    category: 'Fish',
    difficulty: 'Hard',
    time: '45 mins',
    serves: 2,
    ingredients: [
      { name: 'Salmon', qty: '200g', icon: '🐟' },
      { name: 'Sushi Rice', qty: '1 cup', icon: '🍚' },
    ],
  },
  {
    id: 13,
    title: 'Prawn Fried Rice',
    description: 'Classic wok-tossed prawn fried rice.',
    duration: '12:10',
    thumbnail: '/assets/prod_7_prawns.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '20 mins',
    serves: 3,
    ingredients: [
      { name: 'Prawns', qty: '300g', icon: '🍤' },
      { name: 'Rice', qty: '3 cups', icon: '🍚' },
    ],
  },
  {
    id: 14,
    title: 'Coconut Prawn Fry',
    description: 'Crispy fried prawns coated in coconut.',
    duration: '09:30',
    thumbnail: '/assets/prod_7_prawns.jpg',
    category: 'Fish',
    difficulty: 'Medium',
    time: '15 mins',
    serves: 2,
    ingredients: [
      { name: 'Prawns', qty: '250g', icon: '🍤' },
      { name: 'Coconut', qty: '1/2 cup', icon: '🥥' },
    ],
  },
  {
    id: 15,
    title: 'White Fish Tacos',
    description: 'Baja style white fish tacos with slaw.',
    duration: '16:45',
    thumbnail: '/assets/prod_4_cod.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '25 mins',
    serves: 4,
    ingredients: [
      { name: 'White Fish', qty: '400g', icon: '🐟' },
      { name: 'Tortillas', qty: '8', icon: '🌮' },
    ],
  },
  {
    id: 16,
    title: 'Baked White Fish',
    description: 'Simple and healthy baked white fish.',
    duration: '25:00',
    thumbnail: '/assets/prod_4_cod.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '35 mins',
    serves: 2,
    ingredients: [
      { name: 'White Fish', qty: '2 fillets', icon: '🐟' },
      { name: 'Lemon', qty: '1', icon: '🍋' },
    ],
  },
  {
    id: 17,
    title: 'White Fish Curry',
    description: 'Mild coconut curry with chunks of white fish.',
    duration: '19:30',
    thumbnail: '/assets/prod_4_cod.jpg',
    category: 'Fish',
    difficulty: 'Medium',
    time: '30 mins',
    serves: 4,
    ingredients: [
      { name: 'White Fish', qty: '500g', icon: '🐟' },
      { name: 'Curry Paste', qty: '2 tbsp', icon: '🌶️' },
    ],
  },
  {
    id: 18,
    title: 'Tuna Poke Bowl',
    description: 'Fresh tuna poke bowl with rice and avocado.',
    duration: '12:00',
    thumbnail: '/assets/prod_3_tuna.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '20 mins',
    serves: 2,
    ingredients: [
      { name: 'Tuna', qty: '300g sashimi grade', icon: '🐟' },
      { name: 'Avocado', qty: '1', icon: '🥑' },
    ],
  },
  {
    id: 19,
    title: 'Grilled Tuna Salad',
    description: 'Light and healthy grilled tuna salad.',
    duration: '15:30',
    thumbnail: '/assets/prod_5_tuna.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '25 mins',
    serves: 2,
    ingredients: [
      { name: 'Tuna', qty: '2 steaks', icon: '🐟' },
      { name: 'Mixed Greens', qty: '4 cups', icon: '🥗' },
    ],
  },
  {
    id: 20,
    title: 'Spicy Tuna Tartare',
    description: 'Elegant spicy tuna tartare appetizer.',
    duration: '10:45',
    thumbnail: '/assets/prod_3_tuna.jpg',
    category: 'Fish',
    difficulty: 'Medium',
    time: '15 mins',
    serves: 4,
    ingredients: [
      { name: 'Tuna', qty: '250g', icon: '🐟' },
      { name: 'Sriracha', qty: '1 tbsp', icon: '🌶️' },
    ],
  },
  {
    id: 21,
    title: 'Garlic Butter Prawns',
    description: 'Quick and easy garlic butter prawns.',
    duration: '08:45',
    thumbnail: '/assets/prod_7_prawns.jpg',
    category: 'Fish',
    difficulty: 'Easy',
    time: '15 mins',
    serves: 2,
    ingredients: [
      { name: 'Prawns', qty: '400g', icon: '🍤' },
      { name: 'Butter', qty: '3 tbsp', icon: '🧈' },
    ],
  },
  {
    id: 22,
    title: 'Beef Steak with Garlic Butter',
    description: 'Juicy beef steak cooked to perfection.',
    duration: '15:00',
    thumbnail: '/assets/meat.png',
    category: 'Meat',
    difficulty: 'Medium',
    time: '20 mins',
    serves: 2,
    ingredients: [
      { name: 'Beef', qty: '2 steaks', icon: '🥩' },
      { name: 'Butter', qty: '2 tbsp', icon: '🧈' },
    ],
  },
  {
    id: 23,
    title: 'Beef Stew',
    description: 'Slow-cooked hearty beef stew.',
    duration: '45:00',
    thumbnail: '/assets/meat.png',
    category: 'Meat',
    difficulty: 'Hard',
    time: '2 hrs',
    serves: 6,
    ingredients: [
      { name: 'Beef', qty: '500g cubes', icon: '🥩' },
      { name: 'Carrots', qty: '2', icon: '🥕' },
    ],
  },
  {
    id: 24,
    title: 'Beef Stir Fry',
    description: 'Quick and easy beef stir fry with veggies.',
    duration: '12:30',
    thumbnail: '/assets/meat.png',
    category: 'Meat',
    difficulty: 'Easy',
    time: '15 mins',
    serves: 3,
    ingredients: [
      { name: 'Beef', qty: '300g strips', icon: '🥩' },
      { name: 'Broccoli', qty: '1 head', icon: '🥦' },
    ],
  },
  {
    id: 25,
    title: 'Beef Burgers',
    description: 'Homemade juicy beef burgers.',
    duration: '20:00',
    thumbnail: '/assets/meat.png',
    category: 'Meat',
    difficulty: 'Medium',
    time: '30 mins',
    serves: 4,
    ingredients: [
      { name: 'Beef', qty: '400g minced', icon: '🥩' },
      { name: 'Buns', qty: '4', icon: '🍔' },
    ],
  },
  {
    id: 26,
    title: 'Mutton Curry',
    description: 'Spicy and rich mutton curry.',
    duration: '35:00',
    thumbnail: '/assets/meat.png',
    category: 'Meat',
    difficulty: 'Hard',
    time: '1.5 hrs',
    serves: 4,
    ingredients: [
      { name: 'Mutton', qty: '500g', icon: '🥩' },
      { name: 'Onions', qty: '3', icon: '🧅' },
    ],
  },
  {
    id: 27,
    title: 'Mutton Biryani',
    description: 'Aromatic mutton biryani.',
    duration: '40:00',
    thumbnail: '/assets/meat.png',
    category: 'Meat',
    difficulty: 'Hard',
    time: '2 hrs',
    serves: 6,
    ingredients: [
      { name: 'Mutton', qty: '500g', icon: '🥩' },
      { name: 'Rice', qty: '3 cups', icon: '🍚' },
    ],
  },
  {
    id: 28,
    title: 'Grilled Mutton Chops',
    description: 'Tender grilled mutton chops.',
    duration: '25:00',
    thumbnail: '/assets/meat.png',
    category: 'Meat',
    difficulty: 'Medium',
    time: '45 mins',
    serves: 3,
    ingredients: [
      { name: 'Mutton', qty: '6 chops', icon: '🥩' },
      { name: 'Spices', qty: '2 tbsp', icon: '🌶️' },
    ],
  },
  {
    id: 29,
    title: 'Mutton Korma',
    description: 'Creamy and mild mutton korma.',
    duration: '30:00',
    thumbnail: '/assets/meat.png',
    category: 'Meat',
    difficulty: 'Medium',
    time: '1 hr',
    serves: 4,
    ingredients: [
      { name: 'Mutton', qty: '500g', icon: '🥩' },
      { name: 'Yogurt', qty: '1 cup', icon: '🥛' },
    ],
  },
  {
    id: 30,
    title: 'Grilled Chicken Breast',
    description: 'Healthy grilled chicken breast.',
    duration: '15:00',
    thumbnail: '/assets/chicken.png',
    category: 'Chicken',
    difficulty: 'Easy',
    time: '20 mins',
    serves: 2,
    ingredients: [
      { name: 'Chicken Breast', qty: '2 pieces', icon: '🍗' },
      { name: 'Olive Oil', qty: '1 tbsp', icon: '🫒' },
    ],
  },
  {
    id: 31,
    title: 'Chicken Breast Salad',
    description: 'Fresh salad with sliced chicken breast.',
    duration: '10:00',
    thumbnail: '/assets/chicken.png',
    category: 'Chicken',
    difficulty: 'Easy',
    time: '15 mins',
    serves: 2,
    ingredients: [
      { name: 'Chicken Breast', qty: '1 piece', icon: '🍗' },
      { name: 'Lettuce', qty: '1 head', icon: '🥗' },
    ],
  },
  {
    id: 32,
    title: 'Stuffed Chicken Breast',
    description: 'Chicken breast stuffed with spinach and cheese.',
    duration: '25:00',
    thumbnail: '/assets/chicken.png',
    category: 'Chicken',
    difficulty: 'Medium',
    time: '40 mins',
    serves: 2,
    ingredients: [
      { name: 'Chicken Breast', qty: '2 pieces', icon: '🍗' },
      { name: 'Cheese', qty: '1/2 cup', icon: '🧀' },
    ],
  },
  {
    id: 33,
    title: 'Chicken Breast Stir Fry',
    description: 'Quick chicken breast stir fry.',
    duration: '12:00',
    thumbnail: '/assets/chicken.png',
    category: 'Chicken',
    difficulty: 'Easy',
    time: '15 mins',
    serves: 2,
    ingredients: [
      { name: 'Chicken Breast', qty: '300g strips', icon: '🍗' },
      { name: 'Bell Peppers', qty: '2', icon: '🫑' },
    ],
  },
  {
    id: 34,
    title: 'Roast Whole Chicken',
    description: 'Classic oven-roasted whole chicken.',
    duration: '45:00',
    thumbnail: '/assets/chicken.png',
    category: 'Chicken',
    difficulty: 'Hard',
    time: '1.5 hrs',
    serves: 6,
    ingredients: [
      { name: 'Whole Chicken', qty: '1', icon: '🍗' },
      { name: 'Herbs', qty: '2 tbsp', icon: '🌿' },
    ],
  },
  {
    id: 35,
    title: 'Tandoori Whole Chicken',
    description: 'Spicy tandoori-style whole chicken.',
    duration: '50:00',
    thumbnail: '/assets/chicken.png',
    category: 'Chicken',
    difficulty: 'Hard',
    time: '2 hrs',
    serves: 6,
    ingredients: [
      { name: 'Whole Chicken', qty: '1', icon: '🍗' },
      { name: 'Tandoori Masala', qty: '3 tbsp', icon: '🌶️' },
    ],
  },
  {
    id: 36,
    title: 'Whole Chicken Soup',
    description: 'Comforting soup made with a whole chicken.',
    duration: '40:00',
    thumbnail: '/assets/chicken.png',
    category: 'Chicken',
    difficulty: 'Medium',
    time: '1.5 hrs',
    serves: 6,
    ingredients: [
      { name: 'Whole Chicken', qty: '1', icon: '🍗' },
      { name: 'Carrots', qty: '3', icon: '🥕' },
    ],
  },
  {
    id: 37,
    title: 'Smoked Whole Chicken',
    description: 'Slow-smoked whole chicken.',
    duration: '60:00',
    thumbnail: '/assets/chicken.png',
    category: 'Chicken',
    difficulty: 'Hard',
    time: '3 hrs',
    serves: 6,
    ingredients: [
      { name: 'Whole Chicken', qty: '1', icon: '🍗' },
      { name: 'BBQ Rub', qty: '1/4 cup', icon: '🧂' },
    ],
  },
  {
    id: 38,
    title: 'Scrambled Eggs',
    description: 'Fluffy and soft scrambled eggs.',
    duration: '05:00',
    thumbnail: '/assets/egg.png',
    category: 'Egg',
    difficulty: 'Easy',
    time: '5 mins',
    serves: 1,
    ingredients: [
      { name: 'Eggs', qty: '3', icon: '🥚' },
      { name: 'Milk', qty: '2 tbsp', icon: '🥛' },
    ],
  },
  {
    id: 39,
    title: 'Boiled Eggs',
    description: 'Perfectly soft or hard boiled eggs.',
    duration: '08:00',
    thumbnail: '/assets/egg.png',
    category: 'Egg',
    difficulty: 'Easy',
    time: '10 mins',
    serves: 2,
    ingredients: [
      { name: 'Eggs', qty: '4', icon: '🥚' },
      { name: 'Water', qty: '2 cups', icon: '💧' },
    ],
  },
  {
    id: 40,
    title: 'Egg Omelette',
    description: 'Classic cheese and herb omelette.',
    duration: '06:30',
    thumbnail: '/assets/egg.png',
    category: 'Egg',
    difficulty: 'Easy',
    time: '10 mins',
    serves: 1,
    ingredients: [
      { name: 'Eggs', qty: '3', icon: '🥚' },
      { name: 'Cheese', qty: '1/4 cup', icon: '🧀' },
    ],
  },
  {
    id: 41,
    title: 'Salted Duck Eggs',
    description: 'Traditional salted duck eggs.',
    duration: '15:00',
    thumbnail: '/assets/egg.png',
    category: 'Egg',
    difficulty: 'Medium',
    time: '20 days',
    serves: 6,
    ingredients: [
      { name: 'Duck Eggs', qty: '6', icon: '🥚' },
      { name: 'Salt', qty: '1 cup', icon: '🧂' },
    ],
  },
  {
    id: 42,
    title: 'Fried Duck Eggs',
    description: 'Rich and creamy fried duck eggs.',
    duration: '05:00',
    thumbnail: '/assets/egg.png',
    category: 'Egg',
    difficulty: 'Easy',
    time: '5 mins',
    serves: 1,
    ingredients: [
      { name: 'Duck Eggs', qty: '2', icon: '🥚' },
      { name: 'Oil', qty: '1 tbsp', icon: '🫒' },
    ],
  },
  {
    id: 43,
    title: 'Duck Egg Custard',
    description: 'Decadent duck egg sweet custard.',
    duration: '25:00',
    thumbnail: '/assets/egg.png',
    category: 'Egg',
    difficulty: 'Medium',
    time: '40 mins',
    serves: 4,
    ingredients: [
      { name: 'Duck Eggs', qty: '4', icon: '🥚' },
      { name: 'Sugar', qty: '1/2 cup', icon: '🍬' },
    ],
  },
  {
    id: 44,
    title: 'Duck Egg Salad',
    description: 'Boiled duck eggs tossed with greens.',
    duration: '12:00',
    thumbnail: '/assets/egg.png',
    category: 'Egg',
    difficulty: 'Easy',
    time: '15 mins',
    serves: 2,
    ingredients: [
      { name: 'Duck Eggs', qty: '3', icon: '🥚' },
      { name: 'Lettuce', qty: '2 cups', icon: '🥗' },
    ],
  },
];

// Helper to get Category Icon
function getCategoryIcon(cat: Category) {
  switch (cat) {
    case 'Fish':
      return <Fish className="h-4 w-4 text-blue-500" />;
    case 'Meat':
      return <Beef className="h-4 w-4 text-red-500" />;
    case 'Chicken':
      return <Drumstick className="h-4 w-4 text-orange-500" />;
    case 'Egg':
      return <Egg className="h-4 w-4 text-yellow-500" />;
    default:
      return <Fish className="h-4 w-4 text-blue-500" />;
  }
}

export function HowToCookPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Fish');
  const [activeVideo, setActiveVideo] = useState<Video>(MOCK_VIDEOS[0]);

  const filteredVideos = MOCK_VIDEOS.filter(
    (v) => v.category === activeCategory
  );

  const uniqueCategoryVideos: Video[] = [];
  const seenIngredients = new Set<string>();

  for (const v of filteredVideos) {
    const mainIngredient = v.ingredients[0]?.name;
    if (mainIngredient && !seenIngredients.has(mainIngredient)) {
      seenIngredients.add(mainIngredient);
      uniqueCategoryVideos.push(v);
    }
  }

  let otherVideos = MOCK_VIDEOS.filter(
    (v) =>
      v.id !== activeVideo.id &&
      v.ingredients[0]?.name === activeVideo.ingredients[0]?.name
  ).slice(0, 3);

  // Fallback to category if no other videos share the exact same ingredient
  if (otherVideos.length === 0) {
    otherVideos = MOCK_VIDEOS.filter(
      (v) => v.id !== activeVideo.id && v.category === activeVideo.category
    ).slice(0, 3);
  }

  return (
    <div className="grid h-full min-h-[750px] w-full grid-rows-[auto_minmax(0,42fr)_minmax(0,20fr)] gap-[clamp(12px,2svh,24px)] overflow-hidden bg-white select-none">
      {/* 1. Header (Title + Categories) */}
      <div className="flex min-h-0 shrink-0 flex-col justify-start px-[clamp(8px,1vw,16px)]">
        <h1 className="text-[clamp(24px,2vw,32px)] font-bold tracking-tight text-[#0B1F5B]">
          How to Cook
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Learn, cook and enjoy delicious recipes with step by step videos
        </p>
      </div>

      {/* 2. 3-Column Main Grid */}
      <div className="grid min-h-0 grid-cols-12 gap-6 px-[clamp(8px,1vw,16px)]">
        {/* A. Main Video Player (Left, spanning 6 cols) */}
        <div className="col-span-12 flex min-h-0 flex-col xl:col-span-6">
          {/* Categories */}
          <div className="mb-3 flex h-10 w-fit shrink-0 items-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
            {(['Fish', 'Meat', 'Chicken', 'Egg'] as Category[]).map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="group relative flex h-full flex-1 items-center justify-center gap-2 rounded-md px-5 outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="cookCategoryPill"
                      className="absolute inset-0 rounded-md bg-slate-100"
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2">
                    <span
                      className={cn(
                        'text-[13px] font-bold',
                        isActive
                          ? 'text-[#0D55CF]'
                          : 'text-slate-500 transition-colors group-hover:text-slate-700'
                      )}
                    >
                      {cat}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="group relative min-h-0 w-full flex-1 overflow-hidden rounded-lg bg-black">
            <Image
              src={activeVideo.thumbnail}
              alt={activeVideo.title}
              fill
              className="object-cover opacity-80"
            />

            {/* Giant Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110 active:scale-95">
                <Play className="ml-1 h-8 w-8 fill-black text-black" />
              </button>
            </div>

            {/* Mock Video Controls Bar */}
            <div className="absolute right-0 bottom-0 left-0 flex h-14 flex-col justify-end bg-gradient-to-t from-black/80 to-transparent px-4 pb-2 opacity-0 transition-opacity group-hover:opacity-100">
              {/* Progress bar */}
              <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-white/30">
                <div className="h-full w-1/3 bg-[#0D55CF]"></div>
              </div>
              {/* Controls */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button>
                    <Play className="h-4 w-4 fill-white" />
                  </button>
                  <button>
                    <SkipBack className="h-4 w-4 fill-white" />
                  </button>
                  <button>
                    <SkipForward className="h-4 w-4 fill-white" />
                  </button>
                  <button>
                    <Volume2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <span>02:15 / {activeVideo.duration}</span>
                  <button>
                    <Settings className="h-4 w-4" />
                  </button>
                  <button>
                    <Maximize className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Details Below Player */}
          <div className="mt-2.5 flex shrink-0 flex-col">
            <h2 className="line-clamp-1 text-[clamp(18px,1.5vw,22px)] font-bold text-[#0B1F5B]">
              {activeVideo.title}
            </h2>

            <div className="mt-1.5 flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Meta Items */}
                <div className="flex items-center gap-1.5">
                  {getCategoryIcon(activeVideo.category)}
                  <span className="text-sm font-semibold text-slate-600">
                    {activeVideo.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-600">
                    {activeVideo.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-600">
                    {activeVideo.time}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 rounded-lg bg-[#0D55CF] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700">
                  Save Recipe <Heart className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-gray-50">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>
            <p className="mt-1.5 line-clamp-1 max-w-[90%] text-sm leading-relaxed font-medium text-slate-500">
              {activeVideo.description}
            </p>
          </div>
        </div>

        {/* B. Ingredients Overview (Middle, spanning 3 cols) */}
        <div className="col-span-12 flex min-h-0 flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm md:col-span-6 xl:col-span-3">
          <div className="mb-4 flex shrink-0 items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="text-lg font-bold text-[#0B1F5B]">
              Ingredients Overview
            </h3>
            <span className="rounded bg-blue-50 px-2 py-1 text-xs font-bold text-[#0D55CF]">
              Serves {activeVideo.serves}
            </span>
          </div>

          <div className="scrollbar-minimal -mr-4 flex flex-1 flex-col gap-4 overflow-y-auto pr-4">
            {activeVideo.ingredients.map((ing, idx) => {
              if (idx === 0) {
                // The first ingredient is the main product
                return (
                  <Link
                    href={`/product/${ing.name.toLowerCase().replace(/\s+/g, '-')}`}
                    key={idx}
                    className="group flex shrink-0 cursor-pointer items-center justify-between rounded-lg border border-blue-100 bg-blue-50/50 p-2 transition-colors hover:bg-blue-50"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white text-lg shadow-sm sm:h-10 sm:w-10 sm:text-xl">
                        {ing.icon}
                      </div>
                      <div className="flex min-w-0 flex-col justify-center">
                        <span className="truncate text-sm font-bold leading-tight text-[#0D55CF]">
                          {ing.name}
                        </span>
                        <span className="mt-0.5 truncate text-[10px] font-semibold text-blue-500/80 group-hover:underline">
                          Order ingredient
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5 pl-2 sm:gap-2">
                      <span className="text-sm font-bold text-slate-600">
                        {ing.qty}
                      </span>
                      <ChevronRight className="h-4 w-4 text-blue-500" />
                    </div>
                  </Link>
                );
              }

              // Other ingredients
              return (
                <div
                  key={idx}
                  className="flex shrink-0 items-center justify-between px-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-slate-50 text-lg shadow-sm">
                      {ing.icon}
                    </div>
                    <span className="text-sm font-semibold text-[#0E1A2B]">
                      {ing.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-500">
                    {ing.qty}
                  </span>
                </div>
              );
            })}
          </div>

          <a 
            href={activeVideo.id === 1 ? '/assets/grilled_sea_bass_recipe.pdf' : '#'}
            download={activeVideo.id === 1 ? 'Grilled_Sea_Bass_Recipe.pdf' : undefined}
            target={activeVideo.id === 1 ? '_blank' : undefined}
            rel="noreferrer"
            onClick={(e) => {
              if (activeVideo.id !== 1) {
                e.preventDefault();
                // Real implementation would fetch PDF from backend for other recipes
              }
            }}
            className="group mt-4 flex w-full shrink-0 items-center justify-between rounded-lg bg-[#F4F7FB] px-4 py-3 transition-colors hover:bg-[#E5EEFF] cursor-pointer"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-[#0D55CF]">
              <Download className="h-4 w-4" /> Download Recipe
            </div>
            <span className="text-xs font-bold text-slate-400 transition-colors group-hover:text-[#0D55CF]">
              PDF
            </span>
          </a>
        </div>

        {/* C. Follow Other Videos (Right, spanning 3 cols) */}
        <div className="col-span-12 flex min-h-0 flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm md:col-span-6 xl:col-span-3">
          <h3 className="mb-4 shrink-0 text-lg font-bold text-[#0B1F5B]">
            Follow Other Videos
          </h3>
          <div className="scrollbar-minimal -mr-4 flex flex-1 flex-col gap-4 overflow-y-auto pr-4">
            {otherVideos.slice(0, 5).map((v) => (
              <div
                key={v.id}
                className="group flex shrink-0 cursor-pointer gap-3"
                onClick={() => setActiveVideo(v)}
              >
                <div className="relative h-[60px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-black">
                  <Image
                    src={v.thumbnail}
                    alt={v.title}
                    fill
                    className="object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </div>
                  <div className="absolute right-1 bottom-1 rounded bg-black/80 px-1 text-[10px] font-bold text-white">
                    {v.duration}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="line-clamp-2 text-sm leading-tight font-bold text-[#0B1F5B] transition-colors group-hover:text-[#0D55CF]">
                    {v.title}
                  </h4>
                  <span className="mt-0.5 text-xs font-medium text-slate-400">
                    {v.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. All Videos Section */}
      <div className="flex min-h-0 shrink-0 flex-col gap-4 px-[clamp(8px,1vw,16px)] pb-2">
        <div className="flex shrink-0 items-center justify-between">
          <h3 className="text-xl font-bold text-[#0B1F5B]">All Videos</h3>
          <Link
            href="/cook/videos"
            className="flex items-center gap-1 text-sm font-bold text-[#0D55CF] hover:underline"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid of 5 videos max */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {uniqueCategoryVideos.slice(0, 5).map((v) => (
            <div
              key={v.id}
              className="group flex h-full min-h-0 cursor-pointer flex-col"
              onClick={() => setActiveVideo(v)}
            >
              <div className="relative mb-3 min-h-0 w-full flex-1 overflow-hidden rounded-lg bg-black">
                <Image
                  src={v.thumbnail}
                  alt={v.title}
                  fill
                  className="object-cover opacity-85 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm transition-all group-hover:border-[#0D55CF] group-hover:bg-[#0D55CF]">
                    <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                  </div>
                </div>
                <div className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-bold text-white">
                  {v.duration}
                </div>
              </div>

              <h4 className="mb-2 line-clamp-1 shrink-0 text-base leading-tight font-bold text-[#0B1F5B] transition-colors group-hover:text-[#0D55CF]">
                {v.title}
              </h4>

              <div className="flex shrink-0 items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {getCategoryIcon(v.category)}
                  <span className="text-xs font-semibold text-slate-500">
                    {v.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500">
                    {v.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500">
                    {v.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
