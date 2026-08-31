'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Star,
  ShoppingBag,
  Fish,
  Beef,
  Drumstick,
  Egg,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type Category = 'Fish' | 'Meat' | 'Chicken' | 'Egg';

interface Recipe {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  img: string;
  category: Category;
  rating: string;
  reviews: number;
  likes: number;
  description: string;
  overviewShort: string;
  overviewFull: string;
  ingredients: string[];
}

// --- Data ---
const ALL_RECIPES: Recipe[] = [
  {
    id: 1,
    title: 'GRILLED LEMON BUTTER FISH',
    subtitle: '#3 Most loved dish',
    time: '06:45',
    img: '/assets/prod_1_salmon.jpg',
    category: 'Fish',
    rating: '4.6',
    reviews: 124,
    likes: 86,
    description:
      'Light, healthy and packed with flavor. Grilled to perfection with lemon butter sauce.',
    overviewShort: 'Most loved dish',
    overviewFull: 'Fresh fish grilled with lemon butter sauce and herbs.',
    ingredients: [
      '500g Fish Fillets',
      '2 tbsp Butter',
      '1 Lemon (juiced)',
      '3 cloves Garlic (minced)',
      'Fresh herbs to garnish',
    ],
  },
  {
    id: 2,
    title: 'PAN SEARED SALMON',
    subtitle: 'Classic & elegant',
    time: '05:30',
    img: '/assets/fish2.jpg',
    category: 'Fish',
    rating: '4.8',
    reviews: 210,
    likes: 145,
    description:
      'Perfectly seared salmon with a crispy skin and tender, flaky inside.',
    overviewShort: 'Classic & elegant',
    overviewFull:
      'Perfectly seared salmon with a crispy skin and tender, flaky inside, served with a side of asparagus.',
    ingredients: [
      '2 Salmon Fillets',
      '1 tbsp Olive Oil',
      'Salt and Pepper',
      'Lemon wedges',
      'Fresh Dill',
    ],
  },
  {
    id: 3,
    title: 'CRISPY FISH FRY',
    subtitle: 'Spicy & crunchy',
    time: '04:20',
    img: '/assets/prod_2_seabass.jpg',
    category: 'Fish',
    rating: '4.5',
    reviews: 95,
    likes: 62,
    description:
      'Deep-fried fish coated with a flavorful blend of aromatic spices.',
    overviewShort: 'Spicy & crunchy',
    overviewFull:
      'A classic coastal favorite: fresh fish marinated in spices and shallow fried until golden and crispy.',
    ingredients: [
      '4 Fish slices',
      '2 tbsp Kashmiri Chili Powder',
      '1/2 tsp Turmeric',
      'Rice flour for coating',
      'Oil for frying',
    ],
  },
  {
    id: 4,
    title: 'FISH CURRY',
    subtitle: 'Rich & traditional',
    time: '07:10',
    img: '/assets/prod_3_tuna.jpg',
    category: 'Fish',
    rating: '4.7',
    reviews: 180,
    likes: 110,
    description:
      'Traditional coastal fish curry made with coconut and tangy tamarind.',
    overviewShort: 'Rich & traditional',
    overviewFull:
      'A deeply flavorful curry made with coconut milk, tamarind, and aromatic spices.',
    ingredients: [
      '500g Fish cuts',
      '1 cup Coconut Milk',
      'Tamarind extract',
      'Curry leaves',
      'Mustard seeds',
    ],
  },
  {
    id: 5,
    title: 'GARLIC BUTTER FISH',
    subtitle: 'Quick & delicious',
    time: '05:15',
    img: '/assets/prod_4_cod.jpg',
    category: 'Fish',
    rating: '4.4',
    reviews: 75,
    likes: 45,
    description:
      'A quick garlic butter glazed fish fillet that melts in your mouth.',
    overviewShort: 'Quick & delicious',
    overviewFull:
      'Tender white fish pan-roasted with a rich garlic butter sauce.',
    ingredients: [
      '400g White Fish',
      '3 tbsp Butter',
      '4 cloves Garlic',
      'Parsley',
      'Lemon juice',
    ],
  },
  {
    id: 9,
    title: 'SPICY FISH TACOS',
    subtitle: 'Fresh & zesty',
    time: '15:00',
    img: '/assets/aa_fish.png',
    category: 'Fish',
    rating: '4.9',
    reviews: 312,
    likes: 215,
    description: 'Crispy fried fish wrapped in soft tortillas with a zesty slaw.',
    overviewShort: 'Fresh & zesty',
    overviewFull: 'A colorful mix of crispy fried fish, crunchy cabbage slaw, and a spicy crema wrapped in soft corn tortillas.',
    ingredients: [
      '500g White Fish',
      '8 Corn Tortillas',
      '1 cup Shredded Cabbage',
      'Spicy Crema',
      'Lime wedges',
    ],
  },
  {
    id: 6,
    title: 'GRILLED STEAK',
    subtitle: 'Juicy & tender',
    time: '12:00',
    img: '/assets/meat.png',
    category: 'Meat',
    rating: '4.9',
    reviews: 320,
    likes: 250,
    description: 'Premium cut steak grilled perfectly to your liking.',
    overviewShort: 'Juicy & tender',
    overviewFull:
      'A thick, juicy steak cooked to perfection with a seared crust and tender center.',
    ingredients: [
      '1 Ribeye Steak',
      'Coarse Salt',
      'Black Pepper',
      'Garlic Butter',
      'Rosemary sprigs',
    ],
  },
  {
    id: 7,
    title: 'CHICKEN ROAST',
    subtitle: 'Spicy & aromatic',
    time: '45:00',
    img: '/assets/chicken.png',
    category: 'Chicken',
    rating: '4.7',
    reviews: 190,
    likes: 120,
    description:
      'Slow-roasted chicken infused with traditional spices and herbs.',
    overviewShort: 'Spicy & aromatic',
    overviewFull:
      'A whole chicken slow-roasted with a blend of aromatic spices and caramelized onions.',
    ingredients: [
      '1 Whole Chicken',
      'Onions',
      'Ginger Garlic Paste',
      'Garam Masala',
      'Yogurt',
    ],
  },
  {
    id: 8,
    title: 'EGG BENEDICT',
    subtitle: 'Classic breakfast',
    time: '15:00',
    img: '/assets/egg.png',
    category: 'Egg',
    rating: '4.6',
    reviews: 150,
    likes: 90,
    description: 'Poached eggs on toasted muffins with rich hollandaise sauce.',
    overviewShort: 'Classic breakfast',
    overviewFull:
      'Perfectly poached eggs served over toasted English muffins and ham, topped with creamy hollandaise.',
    ingredients: [
      '2 Eggs',
      'English Muffin',
      'Hollandaise Sauce',
      'Ham slices',
      'Chives',
    ],
  },
];

export function HowToCookPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Fish');

  // Track direction: 1 for right, -1 for left
  const [[recipeIndex, direction], setRecipeState] = useState([0, 1]);

  // Filter recipes by category
  const filteredRecipes = ALL_RECIPES.filter(
    (r) => r.category === activeCategory
  );
  const activeRecipe = filteredRecipes[recipeIndex] || filteredRecipes[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients'>(
    'overview'
  );

  const router = useRouter();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [userLikes, setUserLikes] = useState<
    Record<number, 'like' | 'dislike' | null>
  >({});

  const handleLike = () => {
    setUserLikes((prev) => ({
      ...prev,
      [activeRecipe.id]: prev[activeRecipe.id] === 'like' ? null : 'like',
    }));
  };

  const handleDislike = () => {
    setUserLikes((prev) => ({
      ...prev,
      [activeRecipe.id]: prev[activeRecipe.id] === 'dislike' ? null : 'dislike',
    }));
  };

  const displayLikes =
    activeRecipe.likes + (userLikes[activeRecipe.id] === 'like' ? 1 : 0);

  const handleCategoryChange = (cat: Category) => {
    if (cat === activeCategory) return;
    setActiveCategory(cat);
    // When changing category, always slide from the right
    setRecipeState([0, 1]);
  };

  const handleRecipeSelect = (recipe: Recipe) => {
    if (recipe.category !== activeCategory) {
      setActiveCategory(recipe.category);
      const categoryRecipes = ALL_RECIPES.filter((r) => r.category === recipe.category);
      const targetIndex = categoryRecipes.findIndex((r) => r.id === recipe.id);
      setRecipeState([targetIndex, 1]);
    } else {
      const targetIndex = filteredRecipes.findIndex((r) => r.id === recipe.id);
      if (targetIndex === recipeIndex) return;
      const targetDirection = targetIndex > recipeIndex ? 1 : -1;
      setRecipeState([targetIndex, targetDirection]);
    }
  };

  // --- Animation Variants ---

  // Outer container rotates to create the arc path
  const arcVariants = {
    initial: (dir: number) => ({
      rotate: dir === 1 ? 90 : -90,
      opacity: 0,
      scale: 0.6,
    }),
    animate: {
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: 'easeOut' as const,
      },
    },
    exit: (dir: number) => ({
      rotate: dir === 1 ? -90 : 90,
      opacity: 0,
      scale: 0.6,
      transition: {
        duration: 0.9,
        ease: 'easeOut' as const,
      },
    }),
  };

  // Inner container counter-rotates to keep the image upright
  const counterRotateVariants = {
    initial: (dir: number) => ({
      rotate: dir === 1 ? -90 : 90,
    }),
    animate: {
      rotate: 0,
      transition: {
        duration: 0.9,
        ease: 'easeOut' as const,
      },
    },
    exit: (dir: number) => ({
      rotate: dir === 1 ? 90 : -90,
      transition: {
        duration: 0.9,
        ease: 'easeOut' as const,
      },
    }),
  };

  // Text crossfade variants
  const textVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-white font-sans select-none">
      {/* ─── Top Breadcrumbs ─── */}
      <nav className="z-30 flex shrink-0 items-center gap-1 px-[40px] pt-[24px] select-none">
        <Link
          href="/"
          className="text-[clamp(11px,min(1vw,1.4svh),14px)] font-bold text-[#64748B] transition-colors hover:text-[#0D55CF]"
        >
          Home
        </Link>
        <ChevronRight className="h-3 w-3 text-[#64748B]" />
        <span className="text-[clamp(11px,min(1vw,1.4svh),14px)] font-bold text-[#334155]">
          How to Cook
        </span>
      </nav>

      {/* ─── Top Hero Section ─── */}
      <div className="flex min-h-[350px] shrink-0 pt-[16px] pr-[40px] pb-[10px] pl-[40px]">
        {/* Left: Main Image (Animated Arc) */}
        <div className="relative flex h-full w-[40%] shrink-0 items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeRecipe.id}
              custom={direction}
              variants={arcVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              // Set origin far above to create an upward circular arc path
              style={{ transformOrigin: 'center -150%' }}
              className="absolute flex h-[90%] w-[95%] items-center justify-center"
            >
              {/* Inner counter-rotating container */}
              <motion.div
                custom={direction}
                variants={counterRotateVariants}
                className="relative h-full w-full overflow-hidden rounded-[24px] bg-white shadow-2xl"
              >
                <Image
                  src={activeRecipe.img}
                  alt={activeRecipe.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Title & Actions (Animated Crossfade) */}
        <div className="relative flex flex-1 flex-col justify-center px-[30px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRecipe.id}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col"
            >
              <p className="mb-2 text-[16px] font-bold text-slate-500">
                {activeRecipe.subtitle}
              </p>

              <h1 className="max-w-[420px] text-[clamp(28px,3vw,40px)] leading-[1.15] font-black tracking-tight text-[#1A1A1A] uppercase">
                {activeRecipe.title}
              </h1>

              <div className="mt-[24px] flex items-center gap-[30px]">
                <button
                  className="group flex items-center gap-2 font-bold text-[#1A1A1A] transition-colors hover:text-[#0D55CF]"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 group-hover:bg-[#0D55CF]/10">
                    <Play className="ml-0.5 h-4 w-4 fill-current" />
                  </div>
                  Play video
                </button>
                <div className="h-[20px] w-px bg-slate-300"></div>
                <button
                  className="flex items-center gap-2 font-bold text-[#1A1A1A] transition-colors hover:text-[#0D55CF]"
                  onClick={() =>
                    router.push(`/${activeCategory.toLowerCase()}`)
                  }
                >
                  <ShoppingBag className="h-5 w-5" />
                  Order ingredients
                </button>
              </div>

              <p className="mt-[24px] max-w-[340px] line-clamp-3 text-[16px] leading-[1.6] font-medium text-slate-600">
                {activeRecipe.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Floating Info Card */}
        <div className="z-10 flex w-[280px] shrink-0 items-center justify-center py-4">
          <div className="flex h-full w-full flex-col rounded-[24px] border border-slate-200 bg-white p-[16px] shadow-xl">
            {/* Tabs */}
            <div className="mb-[16px] flex gap-[20px] border-b border-slate-100">
              <button
                onClick={() => setActiveTab('overview')}
                className={cn(
                  'relative pb-3 text-[14px] font-bold transition-colors',
                  activeTab === 'overview'
                    ? 'text-[#0D55CF]'
                    : 'text-slate-400 hover:text-slate-600'
                )}
              >
                Overview
                {activeTab === 'overview' && (
                  <div className="absolute bottom-[-1px] left-0 h-[2px] w-full rounded-t-full bg-[#0D55CF]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={cn(
                  'relative pb-3 text-[14px] font-bold transition-colors',
                  activeTab === 'ingredients'
                    ? 'text-[#0D55CF]'
                    : 'text-slate-400 hover:text-slate-600'
                )}
              >
                Ingredients
                {activeTab === 'ingredients' && (
                  <div className="absolute bottom-[-1px] left-0 h-[2px] w-full rounded-t-full bg-[#0D55CF]"></div>
                )}
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRecipe.id + activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-y-auto pr-2"
                style={{ scrollbarWidth: 'none' }}
              >
                {activeTab === 'overview' ? (
                  <div className="flex flex-col">
                    <div className="mb-[8px] flex items-center gap-2">
                      <div className="flex w-fit items-center gap-1.5 rounded-md bg-[#C1DF97] px-3 py-1">
                        <span className="text-[16px] font-black text-[#1A1A1A]">
                          {activeRecipe.rating}
                        </span>
                        <Star className="h-3.5 w-3.5 fill-current text-[#1A1A1A]" />
                      </div>
                    </div>

                    <h3 className="mb-1 line-clamp-1 text-[16px] font-bold text-[#1A1A1A]">
                      {activeRecipe.overviewShort}
                    </h3>

                    <p className="mb-[16px] text-[13px] leading-relaxed text-slate-600">
                      {activeRecipe.overviewFull}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col text-[13px] text-slate-600">
                    <ul className="list-disc space-y-1.5 pl-4">
                      {activeRecipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Fixed Action Buttons */}
            <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={handleLike}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold transition-colors',
                  userLikes[activeRecipe.id] === 'like'
                    ? 'bg-[#0D55CF] text-white hover:bg-blue-700'
                    : 'bg-slate-100 text-[#1A1A1A] hover:bg-slate-200'
                )}
              >
                <ThumbsUp className="h-3.5 w-3.5 fill-current" />
                {displayLikes} likes
              </button>
              <button
                onClick={handleDislike}
                className={cn(
                  'flex items-center justify-center rounded-full p-2 transition-colors',
                  userLikes[activeRecipe.id] === 'dislike'
                    ? 'bg-[#F0314A] text-white hover:bg-red-600'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                )}
              >
                <ThumbsDown className="h-3.5 w-3.5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Category Filter ─── */}
      <div className="relative z-20 mt-[16px] flex h-[60px] shrink-0 items-center justify-center px-[40px] pb-[16px]">
        <div className="flex h-full w-full max-w-[800px] items-center rounded-full bg-slate-100 p-1.5 shadow-inner">
          {(['Fish', 'Meat', 'Chicken', 'Egg'] as Category[]).map((cat) => {
            const Icon =
              cat === 'Fish'
                ? Fish
                : cat === 'Meat'
                ? Beef
                : cat === 'Chicken'
                ? Drumstick
                : Egg;
            const isActive = activeCategory === cat;
            
            const activeColorClass = 
              cat === 'Fish' ? 'text-[#0D55CF]' :
              cat === 'Meat' ? 'text-[#F0314A]' :
              cat === 'Chicken' ? 'text-[#F59000]' :
              'text-[#10B981]'; // Egg
            
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className="group relative flex h-full flex-1 items-center justify-center gap-2 rounded-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPillCook"
                    className="absolute inset-0 rounded-full bg-white shadow-md"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-2">
                  <Icon
                    className={cn(
                      'h-5 w-5 stroke-[2]',
                      isActive
                        ? activeColorClass
                        : 'text-slate-400 group-hover:text-slate-600'
                    )}
                  />
                  <span
                    className={cn(
                      'text-[15px] font-bold transition-colors',
                      isActive
                        ? activeColorClass
                        : 'text-slate-500 group-hover:text-slate-700'
                    )}
                  >
                    {cat}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Recipe Library Grid Section ─── */}
      <div className="flex-1 overflow-y-auto snap-y snap-mandatory">
        {Array.from({ length: Math.ceil(filteredRecipes.length / 5) }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="mx-auto grid h-full w-full max-w-[1400px] shrink-0 snap-start grid-cols-5 gap-6 px-[40px] pt-[20px] pb-[40px]"
          >
            {filteredRecipes.slice(rowIndex * 5, rowIndex * 5 + 5).map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handleRecipeSelect(recipe)}
                className="group relative flex flex-col h-full w-full cursor-pointer overflow-hidden transition-transform hover:-translate-y-1"
              >
                {/* Smaller image container */}
                <div className="relative w-full aspect-square overflow-hidden rounded-[16px] bg-slate-100 shadow-md">
                  <Image
                    src={recipe.img}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay on hover for selection effect */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                  
                  {/* Optional: Show active state */}
                  {activeRecipe.id === recipe.id && (
                    <div className="absolute inset-0 border-4 border-red-500 rounded-[16px]" />
                  )}
                </div>

                {/* Title outside */}
                <div className="mt-3 flex w-full flex-col px-1">
                  <h4 className="line-clamp-2 text-[14px] font-bold text-[#1A1A1A] leading-tight group-hover:text-red-500 transition-colors">
                    {recipe.title}
                  </h4>
                  <p className="mt-1 text-[12px] font-medium text-slate-500">
                    {recipe.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ─── Video Modal ─── */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg bg-black shadow-2xl">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              >
                <X className="h-6 w-6" />
              </button>
              <video
                src="/assets/dummy_video.mp4"
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
