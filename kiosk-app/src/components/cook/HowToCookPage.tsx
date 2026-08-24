import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChefHat, Play, Clock, Bookmark, ArrowRight, Fish, Drumstick, Egg, Beef } from 'lucide-react';
import { HomeFooter } from '@/components/layout/HomeFooter';

const RECIPES = [
  { id: 1, title: 'Fish Curry', subtitle: 'Spicy & Tangy', time: '15 min', img: '/assets/fish2.jpg' },
  { id: 2, title: 'Chicken Roast', subtitle: 'Kerala Style', time: '25 min', img: '/assets/chicken_showcase.png' },
  { id: 3, title: 'Egg Curry', subtitle: 'Easy & Delicious', time: '12 min', img: '/assets/eggs_showcase.png' },
  { id: 4, title: 'Fish Fry', subtitle: 'Crispy & Flavorful', time: '18 min', img: '/assets/prod_1_salmon.jpg' },
  { id: 5, title: 'Chicken Biryani', subtitle: 'Aromatic & Spiced', time: '30 min', img: '/assets/chicken_showcase.png' },
  { id: 6, title: 'Egg Omelette', subtitle: 'Quick & Healthy', time: '10 min', img: '/assets/eggs_showcase.png' },
];

export function HowToCookPage() {
  return (
    <div className="grid h-full min-h-0 w-full grid-rows-[minmax(0,15fr)_minmax(0,74fr)_minmax(0,10fr)] gap-[var(--main-gap)] select-none">
      
      {/* ─── 1. Hero Banner ─── */}
      <div className="relative flex h-full w-full items-center overflow-hidden rounded-[10px] bg-[#FEF4E6] px-[clamp(16px,2vw,32px)]">
        {/* Left Content */}
        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center">
          {/* Breadcrumbs */}
          <nav className="mb-[clamp(4px,0.5vw,8px)] flex items-center gap-1 select-none">
            <Link
              href="/"
              className="text-[#64748B] hover:text-[#0D55CF] text-[clamp(11px,min(1vw,1.4svh),14px)] font-bold transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="text-[#64748B] h-3 w-3" />
            <span className="text-[#334155] text-[clamp(11px,min(1vw,1.4svh),14px)] font-bold">
              How to Cook
            </span>
          </nav>

          {/* Title */}
          <h2 className="text-[clamp(28px,min(2.5vw,3.5svh),44px)] leading-tight font-black tracking-tight text-[#0F172A] mb-1">
            How to Cook
          </h2>

          {/* Decorative Wave */}
          <svg
            width="36"
            height="6"
            viewBox="0 0 36 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-[clamp(4px,0.5vw,8px)] shrink-0 text-[#F59000]"
          >
            <path
              d="M1 3C5 3 7 1 11 1C15 1 17 5 21 5C25 5 27 1 31 1C35 1 37 3 35 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Description */}
          <p className="max-w-[95%] truncate text-[clamp(14px,min(1.1vw,1.6svh),18px)] leading-normal font-medium text-[#475569]">
            Discover delicious recipes and easy cooking guides.
          </p>
        </div>

        {/* Right decorative chef hat illustration */}
        <div className="absolute right-[clamp(16px,4vw,64px)] top-1/2 -translate-y-1/2">
          <div className="flex h-[clamp(60px,min(7vw,9svh),100px)] w-[clamp(60px,min(7vw,9svh),100px)] items-center justify-center rounded-full bg-white shadow-sm">
            <ChefHat className="h-[55%] w-[55%] stroke-[1.5] text-[#F59000]" />
          </div>
        </div>
      </div>

      {/* ─── 2. Main Content (Recipes & Filters) ─── */}
      <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[10px] bg-white p-[clamp(12px,1.2vw,20px)] pt-[clamp(12px,1.5vw,24px)] border border-slate-100">
        
        {/* Header */}
        <div className="mb-[clamp(12px,1.5vw,20px)] flex shrink-0 items-center justify-between px-1">
          <h3 className="text-[clamp(18px,min(1.6vw,2.2svh),24px)] font-black text-[#0F172A]">
            Popular Recipes
          </h3>
          <Link href="#" className="group flex items-center gap-1.5 text-[clamp(13px,min(1vw,1.4svh),16px)] font-bold text-[#0D55CF]">
            View All Recipes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Recipe Grid (3 cols, 2 rows) */}
        <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-[clamp(12px,1.5vw,24px)]">
          {RECIPES.map((recipe) => (
            <div key={recipe.id} className="group relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[10px] border border-slate-200 bg-white">
              {/* Image Section (approx 65-70% height) */}
              <div className="relative flex-1 overflow-hidden bg-slate-100">
                <img src={recipe.img} alt={recipe.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                
                {/* Dark Overlay for better contrast */}
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />

                {/* Time Pill */}
                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-sm">
                  <Clock className="h-3 w-3 stroke-[2.5] text-[#0F172A]" />
                  <span className="text-[11px] font-bold text-[#0F172A]">{recipe.time}</span>
                </div>

                {/* Play Button */}
                <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-110">
                  <Play className="h-4 w-4 ml-0.5 fill-[#0D55CF] text-[#0D55CF]" />
                </div>
              </div>

              {/* Bottom Info Section */}
              <div className="flex shrink-0 items-center justify-between p-[clamp(8px,1vw,14px)] bg-white">
                <div className="flex flex-col min-w-0">
                  <h4 className="truncate text-[clamp(14px,min(1.1vw,1.5svh),16px)] font-bold text-[#0F172A]">
                    {recipe.title}
                  </h4>
                  <p className="truncate text-[clamp(11px,min(0.85vw,1.2svh),13px)] font-medium text-[#64748B]">
                    {recipe.subtitle}
                  </p>
                </div>
                <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-slate-50">
                  <Bookmark className="h-4 w-4 stroke-[2] text-[#0D55CF]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Filter Pills */}
        <div className="mt-[clamp(12px,1.2vw,20px)] flex shrink-0 items-center justify-center gap-4">
          <button className="flex items-center gap-2 rounded-full bg-[#EEF2FF] px-6 py-2.5 transition-colors hover:bg-blue-100">
            <Fish className="h-4 w-4 stroke-[2.5] text-[#0D55CF]" />
            <span className="text-sm font-bold text-[#0D55CF]">Fish</span>
          </button>
          
          <button className="flex items-center gap-2 rounded-full bg-[#FFF1F2] px-6 py-2.5 transition-colors hover:bg-rose-100">
            <Beef className="h-4 w-4 stroke-[2.5] text-[#E11D48]" />
            <span className="text-sm font-bold text-[#E11D48]">Meat</span>
          </button>
          
          <button className="flex items-center gap-2 rounded-full bg-[#FFF7ED] px-6 py-2.5 transition-colors hover:bg-orange-100">
            <Drumstick className="h-4 w-4 stroke-[2.5] text-[#EA580C]" />
            <span className="text-sm font-bold text-[#EA580C]">Chicken</span>
          </button>
          
          <button className="flex items-center gap-2 rounded-full bg-[#F0FDF4] px-6 py-2.5 transition-colors hover:bg-green-100">
            <Egg className="h-4 w-4 stroke-[2.5] text-[#16A34A]" />
            <span className="text-sm font-bold text-[#16A34A]">Eggs</span>
          </button>
        </div>
      </div>

      {/* ─── 3. Footer ─── */}
      <div className="h-full w-full shrink-0 overflow-hidden">
        <HomeFooter />
      </div>
      
    </div>
  );
}
