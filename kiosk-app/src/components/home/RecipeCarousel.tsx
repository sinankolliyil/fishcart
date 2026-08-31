"use client";

import React, { useState, TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const RECIPES = [
  { img: '/assets/fish2.jpg', title: 'Fish Curry', sub: 'Spicy & Tangy' },
  { img: '/assets/prod_1_salmon.jpg', title: 'Grilled Fish', sub: 'Healthy & Tasty' },
  { img: '/assets/prod_7_prawns.jpg', title: 'Prawns', sub: 'Crispy & Juicy' },
  { img: '/assets/chicken_showcase.png', title: 'Chicken Roast', sub: 'Oven Baked' },
];

export function RecipeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const totalItems = RECIPES.length + 1; // +1 for "View All" link

  const handleNext = () => {
    if (currentIndex < totalItems - 2) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePointerDown = (clientX: number) => {
    setDragStart(clientX);
  };

  const handlePointerUp = (clientX: number) => {
    if (dragStart === null) return;
    const distance = dragStart - clientX;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
    setDragStart(null);
  };

  return (
    <div
      className="relative mt-1 flex min-h-0 flex-1 w-full overflow-hidden"
      onTouchStart={(e) => handlePointerDown(e.targetTouches[0].clientX)}
      onTouchEnd={(e) => handlePointerUp(e.changedTouches[0].clientX)}
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onMouseUp={(e) => handlePointerUp(e.clientX)}
      onMouseLeave={(e) => {
        if (dragStart !== null) handlePointerUp(e.clientX);
      }}
    >
      {[...RECIPES, 'VIEW_ALL'].map((item, i) => {
        // Calculate dynamic smooth widths
        let widthStyle: React.CSSProperties = {
          width: '0%',
          opacity: 0,
          margin: 0,
          padding: 0,
          border: 'none',
          pointerEvents: 'none',
        };
        let isBig = false;
        let isSmall = false;

        if (i === currentIndex) {
          widthStyle = { width: '66.666%', opacity: 1 };
          isBig = true;
        } else if (i === currentIndex + 1) {
          widthStyle = { width: 'calc(33.333% - 8px)', marginLeft: '8px', opacity: 1 };
          isSmall = true;
        }

        if (item === 'VIEW_ALL') {
          return (
            <div
              key="view_all"
              className="relative h-full shrink-0 overflow-hidden transition-all duration-500 ease-in-out"
              style={widthStyle}
            >
              <Link
                href="/cook"
                className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[12px] border border-white/10 bg-[#0D55CF] transition-all duration-300 hover:bg-[#0c4dbd]"
              >
                <div className="flex h-[clamp(24px,min(2vw,3svh),40px)] w-[clamp(24px,min(2vw,3svh),40px)] items-center justify-center rounded-full bg-white text-[#0D55CF]  transition-transform group-hover:scale-110">
                  <ArrowRight className="h-[clamp(12px,min(1vw,1.5svh),20px)] w-[clamp(12px,min(1vw,1.5svh),20px)]" />
                </div>
                <span className="text-center text-[clamp(10px,min(0.8vw,1.2svh),14px)] font-bold text-white">
                  View All<br />Recipes
                </span>
              </Link>
            </div>
          );
        }

        const recipe = item as typeof RECIPES[0];

        return (
          <div
            key={i}
            onClick={isSmall ? handleNext : undefined}
            className={`group relative h-full shrink-0 overflow-hidden rounded-[12px] border border-white/10 transition-all duration-500 ease-in-out ${
              isSmall ? 'cursor-pointer hover:ring-2 hover:ring-white/50' : ''
            }`}
            style={widthStyle}
          >
            <Image
              src={recipe.img}
              alt={recipe.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
            {!isSmall && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            )}

            {/* Content for Big Item */}
            <div
              className={`absolute inset-0 z-10 flex flex-col justify-between p-2 transition-opacity duration-500 ${
                isBig ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex flex-1 items-center justify-center">
                <div className="flex h-[clamp(24px,min(2vw,3svh),40px)] w-[clamp(24px,min(2vw,3svh),40px)] items-center justify-center rounded-full bg-white text-[#0D55CF]  transition-transform hover:scale-110 cursor-pointer">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="ml-0.5 h-[clamp(10px,min(0.9vw,1.3svh),16px)] w-[clamp(10px,min(0.9vw,1.3svh),16px)]"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-[clamp(16px,min(1.2vw,1.8svh),20px)] leading-tight font-bold text-white">
                  {recipe.title}
                </p>
                <p className="mt-0.5 text-[clamp(13px,min(0.9vw,1.3svh),14px)] leading-tight text-white/90">
                  {recipe.sub}
                </p>
              </div>
            </div>

            {/* Content for Small Item (Swipe Indicator) */}
            <div
              className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-500 ${
                isSmall ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="flex items-center justify-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[#0D55CF]  backdrop-blur">
                  <span className="text-[clamp(10px,min(0.8vw,1.2svh),12px)] font-bold">Swipe</span>
                  <ChevronRight className="h-[clamp(10px,min(1vw,1.5svh),14px)] w-[clamp(10px,min(1vw,1.5svh),14px)]" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="truncate text-center text-[clamp(11px,min(0.8vw,1.2svh),13px)] leading-tight font-bold text-white ">
                  {recipe.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev Navigation Button */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 z-20 flex h-[clamp(32px,min(2.5vw,3.5svh),44px)] w-[clamp(32px,min(2.5vw,3.5svh),44px)] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#0D55CF] shadow-[0_2px_10px_rgba(0,0,0,0.15)] backdrop-blur transition-transform hover:scale-110"
        >
          <ChevronLeft className="h-[60%] w-[60%] stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
