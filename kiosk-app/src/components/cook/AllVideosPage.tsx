'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Clock, Fish, Beef, Egg, Target, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomeFooter } from '@/components/layout/HomeFooter';

import { Category, Difficulty, Video, MOCK_VIDEOS, getCategoryIcon } from './HowToCookPage';

export function AllVideosPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Fish');

  const filteredVideos = MOCK_VIDEOS.filter((v) => v.category === activeCategory);

  return (
    <div className="flex h-full w-full flex-col overflow-x-hidden overflow-y-auto bg-white select-none scrollbar-thin scrollbar-thumb-slate-200">
      <div className="flex w-full flex-1 flex-col px-[clamp(20px,4vw,60px)] py-6">
        
        {/* Header */}
        <div className="flex flex-col mb-8">
          <Link href="/cook" className="flex items-center gap-1 text-[#0D55CF] font-bold text-sm mb-4 hover:underline w-fit">
            <ChevronLeft className="w-4 h-4" /> Back to Cook
          </Link>

          <h1 className="text-[clamp(24px,2vw,32px)] font-bold text-[#0E1A2B] tracking-tight">All Recipe Videos</h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Browse our entire collection of step-by-step cooking videos
          </p>
          
          {/* Categories */}
          <div className="flex gap-2 mt-6">
            {(['Fish', 'Meat', 'Chicken', 'Egg'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-bold transition-colors border",
                  activeCategory === cat 
                    ? "bg-[#0D55CF] text-white border-[#0D55CF]" 
                    : "bg-white text-slate-600 border-gray-200 hover:bg-gray-50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredVideos.map((v) => (
            <Link 
              href={`/cook?videoId=${v.id}`} 
              key={v.id} 
              className="flex flex-col cursor-pointer group"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-black">
                <Image src={v.thumbnail} alt={v.title} fill className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-[#0D55CF] group-hover:border-[#0D55CF] transition-all">
                     <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                   </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  {v.duration}
                </div>
              </div>
              
              <div className="mb-1.5 flex items-center mt-1">
                <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0D55CF]">
                  {v.ingredients?.[0]?.name || 'Recipe'}
                </span>
              </div>
              <h4 className="text-base font-bold text-[#0B1F5B] group-hover:text-[#0D55CF] transition-colors leading-tight mb-2 line-clamp-1">
                {v.title}
              </h4>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  {getCategoryIcon(v.category)}
                  <span className="text-xs font-semibold text-slate-500">{v.category}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500">{v.difficulty}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-500">{v.time}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
