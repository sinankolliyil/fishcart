'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Fish,
  Beef,
  Drumstick,
  Egg,
  Heart,
  Brain,
  Zap,
  Shield,
  Dumbbell,
  Eye,
  Flame,
  Droplets,
  Leaf,
  Sun,
  Apple,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomeFooter } from '@/components/layout/HomeFooter';

// ─── Types ───
type Category = 'fish' | 'meat' | 'chicken' | 'eggs';

interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

// ─── Benefits Data ───
const benefitsData: Record<Category, BenefitItem[]> = {
  fish: [
    { icon: Dumbbell, title: 'High in Protein', description: 'Essential building blocks for muscles, skin, and overall body repair.' },
    { icon: Droplets, title: 'Rich in Omega-3', description: 'Healthy fatty acids that reduce inflammation and support heart health.' },
    { icon: Heart, title: 'Supports Heart Health', description: 'Regular consumption helps maintain healthy cholesterol and blood pressure.' },
    { icon: Brain, title: 'Good for Brain Function', description: 'DHA and EPA improve memory, focus, and cognitive performance.' },
    { icon: Sun, title: 'Rich in Vitamins D & B12', description: 'Vital vitamins for bone health, energy, and immune function.' },
    { icon: Leaf, title: 'Low in Saturated Fat', description: 'A lean protein choice that supports a balanced, heart-friendly diet.' },
  ],
  meat: [
    { icon: Dumbbell, title: 'High Quality Protein', description: 'Complete amino acid profile for optimal muscle building and repair.' },
    { icon: Shield, title: 'Rich in Iron', description: 'Heme iron for healthy red blood cells and oxygen transport.' },
    { icon: Zap, title: 'Excellent Source of Zinc', description: 'Supports immune function, wound healing, and cell growth.' },
    { icon: Dumbbell, title: 'Supports Muscle Growth', description: 'Creatine and protein work together for strength and recovery.' },
    { icon: Sun, title: 'Rich in Vitamin B12', description: 'Essential for nerve function, DNA synthesis, and energy production.' },
    { icon: Flame, title: 'Energy Boosting Nutrients', description: 'B-vitamins and iron provide sustained energy throughout the day.' },
  ],
  chicken: [
    { icon: Dumbbell, title: 'Lean Protein', description: 'High protein content with minimal fat, ideal for fitness goals.' },
    { icon: Leaf, title: 'Low Fat', description: 'One of the leanest meat options for a healthy, balanced diet.' },
    { icon: Zap, title: 'Rich in Niacin', description: 'Vitamin B3 supports metabolism, skin health, and nervous system.' },
    { icon: Dumbbell, title: 'Supports Muscle Recovery', description: 'Fast-absorbing protein helps repair muscles after exercise.' },
    { icon: Shield, title: 'Rich in Selenium', description: 'A powerful antioxidant that protects cells and boosts immunity.' },
    { icon: Apple, title: 'Easy to Digest', description: 'Gentle on the stomach, making it suitable for all age groups.' },
  ],
  eggs: [
    { icon: Dumbbell, title: 'Complete Protein', description: 'Contains all nine essential amino acids in perfect proportions.' },
    { icon: Brain, title: 'Rich in Choline', description: 'Critical nutrient for brain health, liver function, and metabolism.' },
    { icon: Brain, title: 'Supports Brain Development', description: 'Essential nutrients for cognitive growth in children and adults.' },
    { icon: Sun, title: 'Good Source of Vitamin D', description: 'Supports bone strength, immune health, and calcium absorption.' },
    { icon: Droplets, title: 'Contains Healthy Fats', description: 'Balanced fatty acids that support hormone production and cell health.' },
    { icon: Eye, title: 'Supports Eye Health', description: 'Lutein and zeaxanthin protect against age-related vision decline.' },
  ],
};

// ─── Category Config ───
const categoryConfig: {
  id: Category;
  label: string;
  icon: React.ElementType;
  textColor: string;
  gradient: string;
  lightBg: string;
  glow: string;
}[] = [
  {
    id: 'fish',
    label: 'Fish',
    icon: Fish,
    textColor: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-400',
    lightBg: 'bg-blue-50',
    glow: 'shadow-blue-500/20',
  },
  {
    id: 'meat',
    label: 'Meat',
    icon: Beef,
    textColor: 'text-red-600',
    gradient: 'from-red-500 to-rose-400',
    lightBg: 'bg-red-50',
    glow: 'shadow-red-500/20',
  },
  {
    id: 'chicken',
    label: 'Chicken',
    icon: Drumstick,
    textColor: 'text-orange-600',
    gradient: 'from-orange-500 to-amber-400',
    lightBg: 'bg-orange-50',
    glow: 'shadow-orange-500/20',
  },
  {
    id: 'eggs',
    label: 'Eggs',
    icon: Egg,
    textColor: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-400',
    lightBg: 'bg-emerald-50',
    glow: 'shadow-emerald-500/20',
  },
];

// ─── Animations ───
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// ─── Component ───
export function BenefitsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('fish');

  const activeCfg = categoryConfig.find((c) => c.id === activeCategory)!;
  const benefits = benefitsData[activeCategory];

  return (
    <div className="grid h-full w-full grid-rows-[minmax(0,90fr)_minmax(0,10fr)] gap-[clamp(5px,1vw,15px)] bg-transparent select-none overflow-hidden">
      <div className="grid h-full w-full grid-rows-[minmax(0,19fr)_minmax(0,8fr)_minmax(0,50fr)_minmax(0,13fr)] gap-[clamp(5px,1vw,15px)] bg-white rounded-[12px] p-[clamp(10px,1.5vw,20px)]">
      {/* ─── 1. Animated Hero Banner ─── */}
      <motion.div
        layout
        className="relative flex h-full w-full items-center overflow-hidden rounded-[12px] bg-slate-50 px-10 shadow-inner border border-slate-100"
      >
        {/* Floating Background Orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-black/5 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-black/5 blur-2xl"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center text-slate-900">
          <nav className="mb-2 flex items-center gap-1 text-slate-500 select-none">
            <Link href="/" className="text-[13px] font-bold hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[13px] font-black text-slate-900">Benefits</span>
          </nav>
          
          <h2 className="text-[42px] font-black tracking-tight leading-none drop-shadow-sm">
            Nutritional Value
          </h2>
          <p className="mt-2 text-[18px] font-medium text-slate-600">
            Discover the powerful health benefits of our fresh products.
          </p>
        </div>

        {/* Decorative Sparkle */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-12 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100"
        >
          <Sparkles className="h-10 w-10 text-slate-300" />
        </motion.div>
      </motion.div>

      {/* ─── 2. Fluid Category Selector ─── */}
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-full w-full max-w-[800px] items-center rounded-full bg-white p-2 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-100">
          {categoryConfig.map((cat) => {
            const isActive = cat.id === activeCategory;
            const IconComp = cat.icon;
            
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="group relative flex h-full flex-1 items-center justify-center gap-2 rounded-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="benefitsCategoryPill"
                    className="absolute inset-0 rounded-full bg-slate-100"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-2">
                  <IconComp
                    className={cn(
                      'h-5 w-5 stroke-[2]',
                      isActive ? cat.textColor : 'text-slate-400 group-hover:text-slate-600 transition-colors'
                    )}
                  />
                  <span
                    className={cn(
                      'text-[15px] font-bold transition-colors',
                      isActive ? cat.textColor : 'text-slate-400 group-hover:text-slate-600'
                    )}
                  >
                    {cat.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 3. Staggered Glassmorphic Cards ─── */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-6 py-4"
          >
            {benefits.map((benefit, idx) => {
              const IconComp = benefit.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="group relative flex flex-col justify-center gap-4 rounded-[12px] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 transition-all"
                >
                  {/* Soft Background Blob on Hover */}
                  <div className={cn("absolute inset-0 rounded-[12px] opacity-0 transition-opacity duration-300 group-hover:opacity-100", activeCfg.lightBg)} />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className={cn(
                        'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3',
                        activeCfg.lightBg,
                        activeCfg.textColor
                      )}
                    >
                      <IconComp className="h-7 w-7 stroke-[2]" />
                    </div>
                    <div className="flex flex-col pt-1">
                      <h4 className="text-[18px] font-bold text-slate-800 leading-tight">
                        {benefit.title}
                      </h4>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── 4. Glowing Educational Strip ─── */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={cn(
          'flex h-full w-full items-center rounded-[12px] px-8 shadow-sm transition-colors border',
          activeCfg.lightBg,
          'border-white/50'
        )}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className={cn(
            'mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm',
            activeCfg.textColor
          )}
        >
          <Leaf className="h-6 w-6 stroke-[2]" />
        </motion.div>
        <div className="flex flex-col">
          <h4 className={cn("text-[18px] font-bold", activeCfg.textColor)}>
            Why Fresh Matters
          </h4>
          <p className="mt-0.5 text-[15px] font-medium text-slate-600">
            Fresh, responsibly sourced food helps preserve nutrients, improves taste, and supports a healthier lifestyle.
          </p>
        </div>
      </motion.div>
      </div>

      {/* ─── 5. Footer ─── */}
      <div className="h-full w-full overflow-hidden">
        <HomeFooter />
      </div>
    </div>
  );
}
