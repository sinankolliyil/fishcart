'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  Medal,
  Thermometer,
  Headset,
  Truck,
} from 'lucide-react';

export interface HighlightItem {
  title?: string;
  description?: string;
  icon?: string;
}

export interface AboutUsData {
  heroSubtitle?: string;
  heroHeading?: string;
  heroDescription?: string;
  teamSignature?: string;
  selectionTagline?: string;
  selectionHeading?: string;
  selectionSubtitle?: string;
  whyChooseHeading?: string;
  highlight1?: HighlightItem;
  highlight2?: HighlightItem;
  highlight3?: HighlightItem;
  highlight4?: HighlightItem;
  highlights?: HighlightItem[];
}

const DEFAULT_SELECTION = [
  { title: 'Fish', img: '/assets/about_fish.png', href: '/fish' },
  { title: 'Meat', img: '/assets/about_meat.png', href: '/meat' },
  { title: 'Chicken', img: '/assets/about_chicken.png', href: '/chicken' },
  { title: 'Egg', img: '/assets/about_egg.png', href: '/eggs' },
];

const DEFAULT_HIGHLIGHTS = [
  {
    icon: 'medal',
    title: 'Premium Quality',
    description: 'We never compromise on quality.',
  },
  {
    icon: 'thermometer',
    title: 'Fresh & Hygienic',
    description: 'Maintained with the highest standards.',
  },
  {
    icon: 'heart',
    title: 'Trusted & Reliable',
    description: 'Thousands of families trust us every day.',
  },
  {
    icon: 'headset',
    title: 'Customer First',
    description: "We're here for you, always.",
  },
];

function getHighlightIcon(icon?: string) {
  const iconClass = 'h-[clamp(18px,2.2svh,26px)] w-[clamp(18px,2.2svh,26px)] text-[#0D55CF]';
  switch (icon?.toLowerCase()) {
    case 'medal':
      return <Medal className={iconClass} />;
    case 'thermometer':
      return <Thermometer className={iconClass} />;
    case 'heart':
      return <Heart className={iconClass} />;
    case 'headset':
      return <Headset className={iconClass} />;
    case 'truck':
      return <Truck className={iconClass} />;
    default:
      return <ShieldCheck className={iconClass} />;
  }
}

export function AboutPage({ data }: { data?: AboutUsData | null }) {
  const heroSubtitle = data?.heroSubtitle || 'About Us';
  const heroHeading =
    data?.heroHeading || 'Fresh. Hygienic. \nTrusted. Delivered.';
  const heroDescription =
    data?.heroDescription ||
    'We are passionate about delivering the freshest non-veg products to your doorstep. Quality, hygiene and trust are at the heart of everything we do.';
  const teamSignature = data?.teamSignature || 'Team FishCart';
  const heroImage = '/assets/new_aboutus.png';

  const selectionTagline = data?.selectionTagline || 'What We Offer';
  const selectionHeading =
    data?.selectionHeading || 'Explore Our Fresh Selection';
  const selectionSubtitle =
    data?.selectionSubtitle ||
    'Handpicked non-veg products, cleaned with care and delivered fresh.';

  const selectionCards = DEFAULT_SELECTION;

  const whyChooseHeading = data?.whyChooseHeading || 'Why Choose FishCart?';
  const highlights = [
    {
      title:
        data?.highlight1?.title ||
        data?.highlights?.[0]?.title ||
        DEFAULT_HIGHLIGHTS[0].title,
      description:
        data?.highlight1?.description ||
        data?.highlights?.[0]?.description ||
        DEFAULT_HIGHLIGHTS[0].description,
      icon:
        data?.highlight1?.icon ||
        data?.highlights?.[0]?.icon ||
        DEFAULT_HIGHLIGHTS[0].icon,
    },
    {
      title:
        data?.highlight2?.title ||
        data?.highlights?.[1]?.title ||
        DEFAULT_HIGHLIGHTS[1].title,
      description:
        data?.highlight2?.description ||
        data?.highlights?.[1]?.description ||
        DEFAULT_HIGHLIGHTS[1].description,
      icon:
        data?.highlight2?.icon ||
        data?.highlights?.[1]?.icon ||
        DEFAULT_HIGHLIGHTS[1].icon,
    },
    {
      title:
        data?.highlight3?.title ||
        data?.highlights?.[2]?.title ||
        DEFAULT_HIGHLIGHTS[2].title,
      description:
        data?.highlight3?.description ||
        data?.highlights?.[2]?.description ||
        DEFAULT_HIGHLIGHTS[2].description,
      icon:
        data?.highlight3?.icon ||
        data?.highlights?.[2]?.icon ||
        DEFAULT_HIGHLIGHTS[2].icon,
    },
    {
      title:
        data?.highlight4?.title ||
        data?.highlights?.[3]?.title ||
        DEFAULT_HIGHLIGHTS[3].title,
      description:
        data?.highlight4?.description ||
        data?.highlights?.[3]?.description ||
        DEFAULT_HIGHLIGHTS[3].description,
      icon:
        data?.highlight4?.icon ||
        data?.highlights?.[3]?.icon ||
        DEFAULT_HIGHLIGHTS[3].icon,
    },
  ];

  return (
    <div className="h-full w-full overflow-hidden bg-[#EFF2FA] select-none portrait:h-auto portrait:overflow-visible">
      {/* ─── Main Content Grid (100% viewport height in landscape, no scroll) ─── */}
      <div className="grid h-full w-full grid-rows-[minmax(0,34fr)_minmax(0,48fr)_minmax(0,18fr)] gap-[clamp(6px,1.2svh,18px)] px-[clamp(16px,3vw,48px)] py-[clamp(6px,1.2svh,18px)] portrait:flex portrait:flex-col portrait:h-auto portrait:gap-4 portrait:px-3 portrait:pb-8">
        
        {/* ─── 1. Hero Section ─── */}
        <div className="relative min-h-0 w-full overflow-hidden rounded-[10px] portrait:overflow-visible">
          {/* Full Hero Image containing background elements */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden portrait:hidden">
            <Image
              src={heroImage}
              alt="Fresh Meat and Fish Hero"
              fill
              className="origin-right scale-[1.05] object-contain object-right"
              priority
            />
          </div>

          <div className="relative z-10 flex h-full w-full items-center justify-start portrait:py-2">
            <div className="flex w-1/2 flex-col justify-center pr-6 portrait:w-full portrait:pr-0">
              <div className="mb-[clamp(4px,0.8svh,10px)] flex items-center gap-2">
                <span className="text-[clamp(12px,1.3svh,16px)] font-bold text-[#0D55CF] italic">
                  {heroSubtitle}
                </span>
                <div className="h-[2px] w-10 bg-blue-200" />
              </div>
              <h1 className="whitespace-pre-line text-[clamp(22px,min(2.6vw,3.8svh),42px)] leading-tight font-bold tracking-tight text-slate-900 portrait:text-[24px]">
                {heroHeading}
              </h1>
              <p className="mt-[clamp(6px,1svh,14px)] max-w-[90%] text-[clamp(11px,min(1vw,1.35svh),17px)] leading-snug font-medium text-slate-500 portrait:mt-2 portrait:max-w-full portrait:text-[13px]">
                {heroDescription}
              </p>
              <div className="font-handwriting mt-[clamp(8px,1.2svh,16px)] text-[clamp(15px,min(1.4vw,1.8svh),22px)] font-medium text-[#0D55CF] italic opacity-85 portrait:mt-2 portrait:text-base">
                {teamSignature}
              </div>
            </div>
          </div>
        </div>

        {/* ─── 2. Explore Our Fresh Selection ─── */}
        <div className="relative z-20 flex min-h-0 w-full flex-col justify-between gap-[clamp(6px,1.2svh,16px)] portrait:mt-2 portrait:gap-3">
          <div className="flex shrink-0 flex-col items-center justify-center text-center">
            <div className="mb-0.5 flex items-center gap-2">
              <div className="h-[1px] w-6 bg-blue-200" />
              <span className="text-[clamp(10px,1.1svh,14px)] font-bold tracking-wider text-[#0D55CF] uppercase">
                {selectionTagline}
              </span>
              <div className="h-[1px] w-6 bg-blue-200" />
            </div>
            <h2 className="text-[clamp(16px,min(1.6vw,2.1svh),28px)] font-bold text-slate-900 leading-tight portrait:text-xl">
              {selectionHeading}
            </h2>
            <p className="mt-0.5 text-[clamp(10px,min(0.95vw,1.25svh),15px)] font-medium text-slate-500">
              {selectionSubtitle}
            </p>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-4 items-center gap-[clamp(10px,1.2vw,20px)] portrait:grid-cols-2 portrait:gap-2.5">
            {/* Define the SVG clip path for the custom organic glass card */}
            <svg width="0" height="0" className="pointer-events-none absolute">
              <defs>
                <clipPath id="glass-shape" clipPathUnits="objectBoundingBox">
                  {/* Main Card */}
                  <path d="M 0.08 0 H 0.92 Q 1 0 1 0.08 V 0.42 Q 1 0.5 0.93 0.57 L 0.57 0.93 Q 0.5 1 0.42 1 H 0.08 Q 0 1 0 0.92 V 0.08 Q 0 0 0.08 0 Z" />
                  {/* Small Card */}
                  <path d="M 0.88 0.75 H 0.92 Q 1 0.75 1 0.83 V 0.92 Q 1 1 0.92 1 H 0.65 Q 0.60 1 0.63 0.97 L 0.82 0.78 Q 0.85 0.75 0.88 0.75 Z" />
                </clipPath>
              </defs>
            </svg>

            {selectionCards.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group relative flex h-full max-h-[clamp(185px,34svh,380px)] min-h-[110px] w-full flex-col transition-transform duration-300 hover:-translate-y-0.5 portrait:h-[180px] portrait:max-h-[180px]"
              >
                {/* Unified Glassmorphism Base (Main + Small Card) */}
                <div className="absolute inset-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.06)] filter">
                  {/* Clipped Glass Background */}
                  <div
                    className="absolute inset-0 bg-blue-100/30 backdrop-blur-[16px]"
                    style={{ clipPath: 'url(#glass-shape)' }}
                  >
                    {/* 3D Inner Highlight & Shade */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-blue-100/20 to-blue-900/10" />
                  </div>

                  {/* Illuminated SVG Border Overlay */}
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 1 1"
                    preserveAspectRatio="none"
                  >
                    {/* Main Card Stroke */}
                    <path
                      d="M 0.08 0 H 0.92 Q 1 0 1 0.08 V 0.42 Q 1 0.5 0.93 0.57 L 0.57 0.93 Q 0.5 1 0.42 1 H 0.08 Q 0 1 0 0.92 V 0.08 Q 0 0 0.08 0 Z"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.8)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* Small Card Stroke */}
                    <path
                      d="M 0.88 0.75 H 0.92 Q 1 0.75 1 0.83 V 0.92 Q 1 1 0.92 1 H 0.65 Q 0.60 1 0.63 0.97 L 0.82 0.78 Q 0.85 0.75 0.88 0.75 Z"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.8)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                {/* Product Image Container */}
                <div className="relative z-10 mx-auto mt-1 h-[65%] w-[85%] px-2">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="scale-[1.05] object-contain mix-blend-multiply drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Product Title */}
                <div className="absolute bottom-[clamp(10px,1.4svh,18px)] left-[clamp(14px,1.4vw,22px)] z-20 text-[clamp(15px,min(1.4vw,1.9svh),24px)] font-bold tracking-tight text-[#0E1A2B]">
                  <span className="text-[#0D55CF]">{cat.title.charAt(0)}</span>
                  {cat.title.slice(1)}
                </div>

                {/* Arrow Navigation Icon */}
                <div className="absolute top-[75%] left-[72%] z-20 flex h-[25%] w-[28%] items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight
                    className="h-[clamp(16px,1.7svh,22px)] w-[clamp(16px,1.7svh,22px)] text-[#0D55CF]"
                    strokeWidth={2.5}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ─── 3. Why Choose FishCart ─── */}
        <div className="flex min-h-0 w-full flex-col justify-evenly rounded-[10px] border border-slate-200/80 bg-white/70 py-[clamp(6px,1.4svh,20px)] px-[clamp(12px,1.8vw,28px)] shadow-2xs portrait:gap-3 portrait:p-4">
          <h3 className="mb-[clamp(4px,1svh,12px)] text-center text-[clamp(12px,1.4svh,18px)] font-bold text-slate-800 portrait:mb-1 portrait:text-[15px]">
            {whyChooseHeading}
          </h3>
          <div className="grid grid-cols-4 gap-[clamp(10px,1.2vw,20px)] portrait:grid-cols-2 portrait:gap-3">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-[clamp(8px,1vw,14px)]">
                <div className="flex shrink-0 text-[#0D55CF]">
                  <div className="relative flex h-[clamp(32px,4svh,48px)] w-[clamp(32px,4svh,48px)] items-center justify-center rounded-full bg-blue-50 portrait:h-9 portrait:w-9">
                    {getHighlightIcon(item.icon)}
                  </div>
                </div>
                <div className="flex min-w-0 flex-col">
                  <h4 className="truncate text-[clamp(11px,1.25svh,16px)] font-bold text-slate-800 portrait:text-[13px]">
                    {item.title}
                  </h4>
                  <p className="line-clamp-2 text-[clamp(9.5px,1.05svh,13px)] leading-tight font-medium text-slate-500 portrait:line-clamp-none portrait:text-[11px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
