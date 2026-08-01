import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

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

  const waveColors = {
    fish: 'text-[#0D55CF]',
    meat: 'text-[#F0314A]',
    chicken: 'text-[#F59000]',
    eggs: 'text-[#10B981]',
  };

  const currentColor = textColors[category] || 'text-[#0D55CF]';
  const waveColor = waveColors[category] || currentColor;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${gradientClass} flex h-full min-h-0 w-full items-center justify-between border border-white/20 px-[clamp(8px,1.2vw,18px)] py-[clamp(6px,0.8vw,12px)] shadow-sm`}
    >
      {category === 'fish' && (
        <div className="pointer-events-none absolute inset-0 bg-[url('/assets/crushed_ice_bg.png')] bg-cover opacity-10 mix-blend-overlay" />
      )}

      {/* Left Content Area */}
      <div className="relative z-10 flex min-h-0 max-w-[65%] flex-1 flex-col justify-center">
        {/* Breadcrumbs */}
        <nav className="mb-[clamp(1px,0.2vw,4px)] flex items-center gap-1 select-none">
          {breadcrumb.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <ChevronRight className="text-text-muted h-2.5 w-2.5" />
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-text-muted hover:text-primary text-[clamp(10px,min(0.9vw,1.2svh),14px)] font-bold transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-text-muted text-[clamp(10px,min(0.9vw,1.2svh),14px)] font-black">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title */}
        <h2 className="text-[clamp(25px,min(2.1vw,3svh),38px)] leading-tight font-black tracking-tight text-[#1E293B]">
          {title}
        </h2>

        {/* Squeegly Wave SVG Line */}
        <svg
          width="36"
          height="6"
          viewBox="0 0 36 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`my-[clamp(2px,0.25vw,6px)] shrink-0 ${waveColor}`}
        >
          <path
            d="M1 3C5 3 7 1 11 1C15 1 17 5 21 5C25 5 27 1 31 1C35 1 37 3 35 3"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Description Subtitle */}
        <p className="max-w-[95%] truncate text-[clamp(16px,min(1vw,1.45svh),20px)] leading-normal font-medium text-[#475569]">
          {description}
        </p>
      </div>

      {/* Right Image Banner area */}
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 h-full w-[30%] select-none">
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="25vw"
            className="scale-[1.05] object-contain object-right-bottom"
            priority
          />
        </div>
      </div>
    </div>
  );
}
