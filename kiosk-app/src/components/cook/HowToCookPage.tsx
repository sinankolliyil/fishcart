import React from 'react';
import Link from 'next/link';
import { ChevronRight, ChefHat, Utensils, Flame, BookOpen } from 'lucide-react';
import { HomeFooter } from '@/components/layout/HomeFooter';

export function HowToCookPage() {
  return (
    <div className="grid h-full min-h-[950px] w-full grid-rows-[minmax(0,15fr)_minmax(0,74fr)_minmax(0,10fr)] gap-[var(--main-gap)] select-none">
      {/* ─── 1. Hero Banner ─── */}
      <div className="relative flex h-full w-full items-center overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-r from-[#FFF7ED] via-[#FFF1E0] to-[#FFECD2] px-[clamp(12px,1.5vw,24px)] ">
        {/* Decorative background pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="cook-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1.5" fill="#F59000" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cook-pattern)" />
          </svg>
        </div>

        {/* Left Content */}
        <div className="relative z-10 flex min-h-0 max-w-[65%] flex-1 flex-col justify-center">
          {/* Breadcrumbs */}
          <nav className="mb-[clamp(2px,0.3vw,6px)] flex items-center gap-1 select-none">
            <Link
              href="/"
              className="text-text-muted hover:text-primary text-[clamp(10px,min(0.9vw,1.2svh),14px)] font-bold transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="text-text-muted h-2.5 w-2.5" />
            <span className="text-text-muted text-[clamp(10px,min(0.9vw,1.2svh),14px)] font-black">
              How to Cook
            </span>
          </nav>

          {/* Title */}
          <h2 className="text-[clamp(25px,min(2.1vw,3svh),38px)] leading-tight font-black tracking-tight text-[#1E293B]">
            How to Cook
          </h2>

          {/* Decorative Wave */}
          <svg
            width="36"
            height="6"
            viewBox="0 0 36 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-[clamp(2px,0.25vw,6px)] shrink-0 text-[#F59000]"
          >
            <path
              d="M1 3C5 3 7 1 11 1C15 1 17 5 21 5C25 5 27 1 31 1C35 1 37 3 35 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Description */}
          <p className="max-w-[95%] truncate text-[clamp(16px,min(1vw,1.45svh),20px)] leading-normal font-medium text-[#475569]">
            Discover delicious recipes and easy cooking guides.
          </p>
        </div>

        {/* Right decorative chef hat illustration */}
        <div className="pointer-events-none absolute top-1/2 right-[clamp(16px,3vw,48px)] z-10 -translate-y-1/2 select-none">
          <div className="flex h-[clamp(50px,min(5vw,7svh),80px)] w-[clamp(50px,min(5vw,7svh),80px)] items-center justify-center rounded-full bg-white/60  backdrop-blur-sm">
            <ChefHat className="h-[60%] w-[60%] stroke-[1.5] text-[#F59000]" />
          </div>
        </div>
      </div>

      {/* ─── 2. Main Content: Coming Soon Card ─── */}
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-[clamp(12px,1.5vw,24px)] ">
        <div className="flex max-w-[clamp(320px,40vw,560px)] flex-col items-center justify-center text-center">
          {/* Chef Hat Illustration Circle */}
          <div className="relative mb-[clamp(12px,1.5vw,24px)]">
            {/* Outer glow ring */}
            <div className="absolute inset-0 scale-[1.4] rounded-full bg-[#F59000]/5" />
            <div className="relative flex h-[clamp(70px,min(8vw,10svh),120px)] w-[clamp(70px,min(8vw,10svh),120px)] items-center justify-center rounded-full border border-[#F59000]/10 bg-gradient-to-br from-[#FFF7ED] to-[#FFECD2] ">
              <ChefHat className="h-[50%] w-[50%] stroke-[1.5] text-[#F59000]" />
            </div>

            {/* Floating decorative icons */}
            <div className="absolute -top-2 -right-3 flex h-[clamp(22px,min(2.2vw,3svh),32px)] w-[clamp(22px,min(2.2vw,3svh),32px)] items-center justify-center rounded-full bg-white ">
              <Utensils className="h-[55%] w-[55%] stroke-[2] text-[#0D55CF]" />
            </div>
            <div className="absolute -bottom-1 -left-3 flex h-[clamp(22px,min(2.2vw,3svh),32px)] w-[clamp(22px,min(2.2vw,3svh),32px)] items-center justify-center rounded-full bg-white ">
              <Flame className="h-[55%] w-[55%] stroke-[2] text-[#F0314A]" />
            </div>
            <div className="absolute top-1/2 -right-6 flex h-[clamp(20px,min(2vw,2.8svh),28px)] w-[clamp(20px,min(2vw,2.8svh),28px)] -translate-y-1/2 items-center justify-center rounded-full bg-white ">
              <BookOpen className="h-[55%] w-[55%] stroke-[2] text-[#10B981]" />
            </div>
          </div>

          {/* Heading */}
          <h3 className="mb-[clamp(6px,0.6vw,12px)] text-[clamp(20px,min(1.8vw,2.6svh),30px)] leading-tight font-black text-[#1E293B]">
            How to Cook
          </h3>

          {/* Supporting Text */}
          <p className="mb-[clamp(12px,1.2vw,20px)] text-[clamp(13px,min(0.95vw,1.4svh),17px)] leading-[1.5] font-medium text-[#475569]">
            We&apos;re preparing a collection of step-by-step recipes, cooking
            tips, and serving ideas for Fish, Meat, Chicken, and Eggs.
          </p>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F59000]/20 bg-gradient-to-r from-[#FFF7ED] to-[#FFECD2] px-[clamp(14px,1.2vw,22px)] py-[clamp(6px,0.5vw,10px)] ">
            <div className="h-[clamp(6px,0.5vw,8px)] w-[clamp(6px,0.5vw,8px)] animate-pulse rounded-full bg-[#F59000]" />
            <span className="text-[clamp(11px,min(0.85vw,1.2svh),14px)] font-bold tracking-wide text-[#F59000]">
              Coming Soon
            </span>
          </div>

          {/* Subtle category pills */}
          <div className="mt-[clamp(14px,1.4vw,22px)] flex flex-wrap items-center justify-center gap-[clamp(6px,0.5vw,10px)]">
            {[
              {
                label: 'Fish',
                color: 'bg-blue-50 text-[#0D55CF] border-blue-100',
              },
              {
                label: 'Meat',
                color: 'bg-red-50 text-[#F0314A] border-red-100',
              },
              {
                label: 'Chicken',
                color: 'bg-orange-50 text-[#F59000] border-orange-100',
              },
              {
                label: 'Eggs',
                color: 'bg-emerald-50 text-[#10B981] border-emerald-100',
              },
            ].map((cat) => (
              <span
                key={cat.label}
                className={`inline-flex items-center rounded-lg border px-[clamp(8px,0.7vw,14px)] py-[clamp(3px,0.3vw,6px)] text-[clamp(10px,min(0.8vw,1.1svh),13px)] font-bold ${cat.color}`}
              >
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── 3. Footer ─── */}
      <div className="h-full w-full shrink-0 overflow-hidden">
        <HomeFooter />
      </div>
    </div>
  );
}


