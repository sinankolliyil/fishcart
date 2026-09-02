'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Play,
  Clock,
  Fish,
  Beef,
  Egg,
  Target,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomeFooter } from '@/components/layout/HomeFooter';

import {
  Category,
  Difficulty,
  Video,
  MOCK_VIDEOS,
  getCategoryIcon,
} from './HowToCookPage';

export function AllVideosPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Fish');

  const filteredVideos = MOCK_VIDEOS.filter(
    (v) => v.category === activeCategory
  );

  return (
    <div className="flex h-full w-full scrollbar-thin scrollbar-thumb-slate-200 flex-col overflow-x-hidden overflow-y-auto bg-white select-none">
      <div className="flex w-full flex-1 flex-col px-[clamp(20px,4vw,60px)] py-6">
        {/* Header */}
        <div className="mb-8 flex flex-col">
          <Link
            href="/cook"
            className="mb-4 flex w-fit items-center gap-1 text-sm font-bold text-[#0D55CF] hover:underline"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Cook
          </Link>

          <h1 className="text-[clamp(24px,2vw,32px)] font-bold tracking-tight text-[#0E1A2B]">
            All Recipe Videos
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Browse our entire collection of step-by-step cooking videos
          </p>

          {/* Categories */}
          <div className="mt-6 flex gap-2">
            {(['Fish', 'Meat', 'Chicken', 'Egg'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'rounded-md border px-6 py-2 text-sm font-bold transition-colors',
                  activeCategory === cat
                    ? 'border-[#0D55CF] bg-[#0D55CF] text-white'
                    : 'border-gray-200 bg-white text-slate-600 hover:bg-gray-50'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of videos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredVideos.map((v) => (
            <Link
              href={`/cook?videoId=${v.id}`}
              key={v.id}
              className="group flex cursor-pointer flex-col"
            >
              <div className="relative mb-3 aspect-video w-full overflow-hidden rounded-xl bg-black">
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

              <div className="mt-1 mb-1.5 flex items-center">
                <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#0D55CF] uppercase">
                  {v.ingredients?.[0]?.name || 'Recipe'}
                </span>
              </div>
              <h4 className="mb-2 line-clamp-1 text-base leading-tight font-bold text-[#0B1F5B] transition-colors group-hover:text-[#0D55CF]">
                {v.title}
              </h4>

              <div className="flex items-center gap-4">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
