'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
import { Footer } from '@/components/layout/Footer';

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
    {
      icon: Dumbbell,
      title: 'High in Protein',
      description:
        'Essential building blocks for muscles, skin, and overall body repair.',
    },
    {
      icon: Droplets,
      title: 'Rich in Omega-3',
      description:
        'Healthy fatty acids that reduce inflammation and support heart health.',
    },
    {
      icon: Heart,
      title: 'Supports Heart Health',
      description:
        'Regular consumption helps maintain healthy cholesterol and blood pressure.',
    },
    {
      icon: Brain,
      title: 'Good for Brain Function',
      description:
        'DHA and EPA improve memory, focus, and cognitive performance.',
    },
    {
      icon: Sun,
      title: 'Rich in Vitamins D & B12',
      description:
        'Vital vitamins for bone health, energy, and immune function.',
    },
    {
      icon: Leaf,
      title: 'Low in Saturated Fat',
      description:
        'A lean protein choice that supports a balanced, heart-friendly diet.',
    },
  ],
  meat: [
    {
      icon: Dumbbell,
      title: 'High Quality Protein',
      description:
        'Complete amino acid profile for optimal muscle building and repair.',
    },
    {
      icon: Shield,
      title: 'Rich in Iron',
      description:
        'Heme iron for healthy red blood cells and oxygen transport.',
    },
    {
      icon: Zap,
      title: 'Excellent Source of Zinc',
      description: 'Supports immune function, wound healing, and cell growth.',
    },
    {
      icon: Dumbbell,
      title: 'Supports Muscle Growth',
      description:
        'Creatine and protein work together for strength and recovery.',
    },
    {
      icon: Sun,
      title: 'Rich in Vitamin B12',
      description:
        'Essential for nerve function, DNA synthesis, and energy production.',
    },
    {
      icon: Flame,
      title: 'Energy Boosting Nutrients',
      description:
        'B-vitamins and iron provide sustained energy throughout the day.',
    },
  ],
  chicken: [
    {
      icon: Dumbbell,
      title: 'Lean Protein',
      description:
        'High protein content with minimal fat, ideal for fitness goals.',
    },
    {
      icon: Leaf,
      title: 'Low Fat',
      description:
        'One of the leanest meat options for a healthy, balanced diet.',
    },
    {
      icon: Zap,
      title: 'Rich in Niacin',
      description:
        'Vitamin B3 supports metabolism, skin health, and nervous system.',
    },
    {
      icon: Dumbbell,
      title: 'Supports Muscle Recovery',
      description:
        'Fast-absorbing protein helps repair muscles after exercise.',
    },
    {
      icon: Shield,
      title: 'Rich in Selenium',
      description:
        'A powerful antioxidant that protects cells and boosts immunity.',
    },
    {
      icon: Apple,
      title: 'Easy to Digest',
      description:
        'Gentle on the stomach, making it suitable for all age groups.',
    },
  ],
  eggs: [
    {
      icon: Dumbbell,
      title: 'Complete Protein',
      description:
        'Contains all nine essential amino acids in perfect proportions.',
    },
    {
      icon: Brain,
      title: 'Rich in Choline',
      description:
        'Critical nutrient for brain health, liver function, and metabolism.',
    },
    {
      icon: Brain,
      title: 'Supports Brain Development',
      description:
        'Essential nutrients for cognitive growth in children and adults.',
    },
    {
      icon: Sun,
      title: 'Good Source of Vitamin D',
      description:
        'Supports bone strength, immune health, and calcium absorption.',
    },
    {
      icon: Droplets,
      title: 'Contains Healthy Fats',
      description:
        'Balanced fatty acids that support hormone production and cell health.',
    },
    {
      icon: Eye,
      title: 'Supports Eye Health',
      description:
        'Lutein and zeaxanthin protect against age-related vision decline.',
    },
  ],
};

// ─── Category Config ───
const categoryConfig: {
  id: Category;
  label: string;
  icon: React.ElementType;
  color: string;
  activeBg: string;
  cardBorder: string;
  iconBg: string;
  badgeBg: string;
}[] = [
  {
    id: 'fish',
    label: 'Fish',
    icon: Fish,
    color: 'text-[#0D55CF]',
    activeBg:
      'bg-[#0D55CF] border-[#0D55CF] shadow-[0_3px_8px_rgba(13,85,207,0.15)]',
    cardBorder: 'border-blue-100',
    iconBg: 'bg-blue-50 text-[#0D55CF]',
    badgeBg: 'bg-blue-50/50',
  },
  {
    id: 'meat',
    label: 'Meat',
    icon: Beef,
    color: 'text-[#F0314A]',
    activeBg:
      'bg-[#F0314A] border-[#F0314A] shadow-[0_3px_8px_rgba(240,49,74,0.15)]',
    cardBorder: 'border-red-100',
    iconBg: 'bg-red-50 text-[#F0314A]',
    badgeBg: 'bg-red-50/50',
  },
  {
    id: 'chicken',
    label: 'Chicken',
    icon: Drumstick,
    color: 'text-[#F59000]',
    activeBg:
      'bg-[#F59000] border-[#F59000] shadow-[0_3px_8px_rgba(245,144,0,0.15)]',
    cardBorder: 'border-orange-100',
    iconBg: 'bg-orange-50 text-[#F59000]',
    badgeBg: 'bg-orange-50/50',
  },
  {
    id: 'eggs',
    label: 'Eggs',
    icon: Egg,
    color: 'text-[#10B981]',
    activeBg:
      'bg-[#10B981] border-[#10B981] shadow-[0_3px_8px_rgba(16,185,129,0.15)]',
    cardBorder: 'border-emerald-100',
    iconBg: 'bg-emerald-50 text-[#10B981]',
    badgeBg: 'bg-emerald-50/50',
  },
];

// ─── Component ───
export function BenefitsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('fish');

  const activeCfg = categoryConfig.find((c) => c.id === activeCategory)!;
  const benefits = benefitsData[activeCategory];

  return (
    <div className="grid h-full min-h-[950px] w-full grid-rows-[minmax(0,13fr)_minmax(0,9fr)_minmax(0,52fr)_minmax(0,10fr)_80px] gap-[var(--main-gap)] select-none">
      {/* ─── 1. Hero Banner ─── */}
      <div className="relative flex h-full w-full items-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-[#EFF6FF] via-[#E8F3FA] to-[#DBEAFE] px-[clamp(12px,1.5vw,24px)] shadow-sm">
        {/* Decorative dot pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="benefits-dots"
                x="0"
                y="0"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="16" cy="16" r="1.2" fill="#0D55CF" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#benefits-dots)" />
          </svg>
        </div>

        {/* Left Content */}
        <div className="relative z-10 flex min-h-0 max-w-[65%] flex-1 flex-col justify-center">
          <nav className="mb-[clamp(2px,0.3vw,6px)] flex items-center gap-1 select-none">
            <Link
              href="/"
              className="text-text-muted hover:text-primary text-[clamp(10px,min(0.9vw,1.2svh),14px)] font-bold transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="text-text-muted h-2.5 w-2.5" />
            <span className="text-text-muted text-[clamp(10px,min(0.9vw,1.2svh),14px)] font-black">
              Benefits
            </span>
          </nav>

          <h2 className="text-[clamp(25px,min(2.1vw,3svh),38px)] leading-tight font-black tracking-tight text-[#1E293B]">
            Benefits
          </h2>

          <svg
            width="36"
            height="6"
            viewBox="0 0 36 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-[clamp(2px,0.25vw,6px)] shrink-0 text-[#0D55CF]"
          >
            <path
              d="M1 3C5 3 7 1 11 1C15 1 17 5 21 5C25 5 27 1 31 1C35 1 37 3 35 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <p className="max-w-[95%] truncate text-[clamp(16px,min(1vw,1.45svh),20px)] leading-normal font-medium text-[#475569]">
            Discover the nutritional value and health benefits of our fresh
            products.
          </p>
        </div>

        {/* Right decorative icon */}
        <div className="pointer-events-none absolute top-1/2 right-[clamp(16px,3vw,48px)] z-10 -translate-y-1/2 select-none">
          <div className="flex h-[clamp(50px,min(5vw,7svh),80px)] w-[clamp(50px,min(5vw,7svh),80px)] items-center justify-center rounded-full bg-white/60 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-[60%] w-[60%] stroke-[1.5] text-[#0D55CF]" />
          </div>
        </div>
      </div>

      {/* ─── 2. Category Selector Tabs ─── */}
      <div className="grid h-full min-h-0 w-full grid-cols-4 gap-[var(--main-gap)] overflow-hidden select-none">
        {categoryConfig.map((cat) => {
          const isActive = cat.id === activeCategory;
          const IconComp = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'flex h-full min-h-0 cursor-pointer items-center gap-[clamp(6px,0.6vw,12px)] overflow-hidden rounded-xl border px-[clamp(8px,1vw,16px)] transition-all duration-200',
                isActive
                  ? cn('text-white', cat.activeBg)
                  : 'border-gray-100 bg-white text-[#1E293B] shadow-[0_1px_4px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:shadow-sm'
              )}
            >
              <div
                className={cn(
                  'flex h-[clamp(22px,1.8vw,32px)] w-[clamp(22px,1.8vw,32px)] shrink-0 items-center justify-center rounded-full transition-colors',
                  isActive
                    ? 'bg-white/15 text-white'
                    : cn('bg-[#F4F7FB]', cat.color)
                )}
              >
                <IconComp className="h-[clamp(12px,1vw,18px)] w-[clamp(12px,1vw,18px)] stroke-[2]" />
              </div>
              <span className="truncate text-[clamp(14px,min(1vw,1.4svh),18px)] leading-none font-extrabold">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── 3. Benefits Cards — 3×2 grid ─── */}
      <div className="grid h-full min-h-0 w-full grid-cols-3 grid-rows-2 gap-[var(--main-gap)] overflow-hidden">
        {benefits.map((benefit, idx) => {
          const IconComp = benefit.icon;
          return (
            <div
              key={`${activeCategory}-${idx}`}
              className={cn(
                'flex h-full min-h-0 items-center gap-[clamp(8px,0.8vw,14px)] overflow-hidden rounded-2xl border bg-white p-[clamp(10px,1vw,18px)] shadow-sm transition-all duration-200 hover:shadow-md',
                activeCfg.cardBorder
              )}
            >
              {/* Icon Circle */}
              <div
                className={cn(
                  'flex h-[clamp(32px,min(2.8vw,4svh),48px)] w-[clamp(32px,min(2.8vw,4svh),48px)] shrink-0 items-center justify-center rounded-xl',
                  activeCfg.iconBg
                )}
              >
                <IconComp className="h-[50%] w-[50%] stroke-[2]" />
              </div>

              {/* Text */}
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h4 className="text-text-heading truncate text-[clamp(14px,min(1vw,1.4svh),18px)] leading-tight font-bold">
                  {benefit.title}
                </h4>
                <p className="mt-0.5 line-clamp-2 text-[clamp(11px,min(0.75vw,1.05svh),14px)] leading-[1.35] text-[#475569]">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── 4. Why Fresh Matters — educational strip ─── */}
      <div
        className={cn(
          'flex h-full min-h-0 w-full items-center overflow-hidden rounded-2xl border px-[clamp(14px,1.5vw,24px)] shadow-sm',
          activeCfg.cardBorder,
          activeCfg.badgeBg
        )}
      >
        <div
          className={cn(
            'mr-[clamp(10px,0.8vw,14px)] flex h-[clamp(26px,min(2.2vw,3svh),36px)] w-[clamp(26px,min(2.2vw,3svh),36px)] shrink-0 items-center justify-center rounded-full',
            activeCfg.iconBg
          )}
        >
          <Leaf className="h-[50%] w-[50%] stroke-[2]" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h4 className="text-text-heading text-[clamp(18px,min(1vw,1.4svh),18px)] leading-tight font-bold">
            Why Fresh Matters
          </h4>
          <p className="mt-0.5 truncate text-[clamp(18px,min(0.75vw,1.05svh),14px)] leading-[1.35] text-[#475569]">
            Fresh, responsibly sourced food helps preserve nutrients, improves
            taste, and supports a healthier lifestyle.
          </p>
        </div>
      </div>

      {/* ─── 4. Footer ─── */}
      <div className="overflow-hidden">
        <Footer />
      </div>
    </div>
  );
}
