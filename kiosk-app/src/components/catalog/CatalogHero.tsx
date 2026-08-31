import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CatalogHeroProps {
  breadcrumb: BreadcrumbItem[];
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  gradientClass: string;
  category: 'fish' | 'meat' | 'chicken' | 'eggs';
}

export function CatalogHero({
  breadcrumb,
  title,
  description,
  imageSrc,
  imageAlt,
  gradientClass,
  category,
}: CatalogHeroProps) {
  const textColors = {
    fish: 'text-[#0D55CF]',
    meat: 'text-[#F0314A]',
    chicken: 'text-[#F59000]',
    eggs: 'text-[#F5A623]',
  };

  const darkTextColors = {
    fish: 'text-[#102B7B]',
    meat: 'text-[#5C1422]',
    chicken: 'text-[#663500]',
    eggs: 'text-[#09402B]',
  };

  const waveColors = {
    fish: 'text-[#0D55CF]',
    meat: 'text-[#F0314A]',
    chicken: 'text-[#F59000]',
    eggs: 'text-[#10B981]',
  };

  const currentColor = textColors[category] || 'text-[#0D55CF]';
  const currentDarkTextColor = darkTextColors[category] || 'text-[#0A1835]';
  const waveColor = waveColors[category] || currentColor;

  return (
    <div
      className={`relative overflow-hidden rounded-[8px] bg-gradient-to-r ${gradientClass} flex h-full min-h-0 w-full items-center justify-between border border-white/20 px-[clamp(8px,1.2vw,18px)] py-[clamp(6px,0.8vw,12px)] `}
    >
      {category === 'fish' && (
        <div className="pointer-events-none absolute inset-0 bg-[url('/assets/crushed_ice_bg.png')] bg-cover opacity-10 mix-blend-overlay" />
      )}

      {/* Left Content Area */}
      <div className="relative z-10 flex min-h-0 max-w-[65%] flex-1 flex-col justify-center">


        {/* Title */}
        <h2 className={cn("text-[clamp(32px,min(3vw,4svh),44px)] leading-tight font-bold tracking-tight", currentDarkTextColor)}>
          {title}
        </h2>

        {/* Squeegly Wave SVG Line */}
        <svg
          viewBox="0 0 80 12"
          className={`my-[clamp(2px,0.25vw,6px)] h-[clamp(8px,1vw,12px)] w-[clamp(50px,6vw,70px)] shrink-0 ${waveColor}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 6 Q10 0 20 6 T40 6 T60 6 T80 6"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Description Subtitle */}
        <p className={cn("max-w-[95%] truncate text-[clamp(17px,min(1.2vw,1.6svh),22px)] leading-normal font-normal", currentDarkTextColor, "opacity-80")}>
          {description}
        </p>
      </div>


    </div>
  );
}
