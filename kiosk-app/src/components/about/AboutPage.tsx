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
  CheckCircle2,
  Truck,
  Beef,
  Bird,
} from 'lucide-react';
import { HomeFooter } from '@/components/layout/HomeFooter';

export function AboutPage() {
  return (
    <div className="flex h-full w-full scrollbar-thin scrollbar-thumb-slate-200 flex-col overflow-x-hidden overflow-y-auto bg-[#F8F2EF] select-none">
      {/* ─── Main Content ─── */}
      <div className="flex w-full flex-1 flex-col gap-4 px-[clamp(20px,4vw,60px)] py-4">
        {/* ─── Hero & Features Wrapper ─── */}
        <div className="relative w-full">
          {/* Full Hero Image containing all elements */}
          <div className="pointer-events-none absolute inset-0 z-0 -mx-[clamp(20px,4vw,60px)] -mt-10 overflow-visible">
            <Image
              src="/assets/about_hero.png"
              alt="Fresh Meat and Fish Hero"
              fill
              className="origin-right -translate-x-16 -translate-y-6 scale-[1.1] object-contain object-right"
              priority
            />
          </div>

          {/* 1. Hero Section */}
          <div className="relative z-10 flex min-h-[400px] w-full items-center justify-start">
            <div className="-mt-45 flex w-1/2 flex-col pr-10">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-bold text-red-600 italic">
                  About Us
                </span>
                <div className="h-[2px] w-12 bg-red-100" />
              </div>
              <h1 className="text-[clamp(28px,2.5vw,48px)] leading-[1.1] font-bold tracking-tight text-slate-900">
                Fresh. Hygienic. <br />
                Trusted. <span className="text-red-600">Delivered.</span>
              </h1>
              <p className="mt-4 max-w-[85%] text-[clamp(13px,1vw,16px)] leading-relaxed font-medium text-slate-500">
                We are passionate about delivering the freshest non-veg products
                to your doorstep. Quality, hygiene and trust are at the heart of
                everything we do.
              </p>
              <div className="font-handwriting mt-6 text-2xl font-medium text-red-600 italic opacity-80">
                Team FishCart
              </div>
            </div>
          </div>
        </div>

        {/* 4. Explore Our Fresh Selection */}
        <div className="relative z-20 -mt-[160px] flex w-full flex-col">
          <div className="mb-4 flex flex-col items-center justify-center text-center">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-[1px] w-8 bg-red-200" />
              <span className="text-xs font-bold tracking-wider text-red-600 uppercase">
                What We Offer
              </span>
              <div className="h-[1px] w-8 bg-red-200" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Explore Our Fresh Selection
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Handpicked non-veg products, cleaned with care and delivered
              fresh.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-4 gap-4">
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

            {[
              { title: 'Fish', img: '/assets/about_fish.png', href: '/fish' },
              { title: 'Meat', img: '/assets/about_meat.png', href: '/meat' },
              {
                title: 'Chicken',
                img: '/assets/about_chicken.png',
                href: '/chicken',
              },
              { title: 'Egg', img: '/assets/about_egg.png', href: '/egg' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group relative flex h-[220px] w-full flex-col transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Unified Glassmorphism Base (Main + Small Card) */}
                <div className="absolute inset-0 drop-shadow-[0_6px_12px_rgba(0,0,0,0.08)] filter">
                  {/* Clipped Glass Background */}
                  <div
                    className="absolute inset-0 bg-rose-100/30 backdrop-blur-[16px]"
                    style={{ clipPath: 'url(#glass-shape)' }}
                  >
                    {/* 3D Inner Highlight & Shade (glare top-left, shadow bottom-right) */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-rose-100/20 to-rose-900/10" />
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
                <div className="relative z-10 mt-2 h-[125px] w-[85%] px-2">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="scale-[1.08] object-contain mix-blend-multiply drop-shadow-md transition-transform duration-500 group-hover:scale-115"
                  />
                </div>

                {/* Product Title */}
                <div className="absolute bottom-5 left-5 z-20 text-[22px] font-bold tracking-tight text-[#0E1A2B]">
                  <span className="text-[#EF1D23]">{cat.title.charAt(0)}</span>
                  {cat.title.slice(1)}
                </div>

                {/* Arrow Navigation Icon (Centered perfectly in the small card's bounding box) */}
                <div className="absolute top-[75%] left-[70%] z-20 flex h-[25%] w-[30%] items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight
                    className="h-5 w-5 text-[#EF1D23]"
                    strokeWidth={2.5}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 5. Why Choose FishCart */}
        <div className="mt-2 flex w-full flex-col justify-center">
          <h3 className="mb-4 text-center text-lg font-bold text-slate-800">
            Why Choose FishCart?
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                icon: <Medal className="h-7 w-7 text-red-500" />,
                title: 'Premium Quality',
                desc: 'We never compromise on quality.',
              },
              {
                icon: <Thermometer className="h-7 w-7 text-red-500" />,
                title: 'Fresh & Hygienic',
                desc: 'Maintained with the highest standards.',
              },
              {
                icon: <Heart className="h-7 w-7 text-red-500" />,
                title: 'Trusted & Reliable',
                desc: 'Thousands of families trust us every day.',
              },
              {
                icon: <Headset className="h-7 w-7 text-red-500" />,
                title: 'Customer First',
                desc: "We're here for you, always.",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex shrink-0 text-red-100">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-slate-800">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs leading-tight font-medium text-slate-500">
                    {item.desc}
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
