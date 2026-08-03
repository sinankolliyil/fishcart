'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Heart,
  Star,
  ChevronLeft,
  Mail,
  ArrowRight,
  ShieldCheck,
  Droplet,
  Activity,
  Info,
  AlertTriangle,
  PlayCircle,
  Anchor,
} from 'lucide-react';
import { ProductDetails } from '@/types/catalog';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Footer } from '@/components/layout/Footer';

export function ProductDetailsLayout({ data }: { data: ProductDetails }) {
  const [activeTab, setActiveTab] = useState('overview');

  const themeColors = {
    fish: 'text-[#0D55CF] bg-[#0D55CF]',
    meat: 'text-[#F0314A] bg-[#F0314A]',
    chicken: 'text-[#F59000] bg-[#F59000]',
    eggs: 'text-[#10B981] bg-[#10B981]',
  };

  const textColors = {
    fish: 'text-[#0D55CF]',
    meat: 'text-[#F0314A]',
    chicken: 'text-[#F59000]',
    eggs: 'text-[#10B981]',
  };

  const bgColors = {
    fish: 'bg-[#0D55CF]',
    meat: 'bg-[#F0314A]',
    chicken: 'bg-[#F59000]',
    eggs: 'bg-[#10B981]',
  };

  const themeText = textColors[data.category] || textColors.fish;
  const themeBg = bgColors[data.category] || bgColors.fish;

  return (
    /*
     * CSS Grid matching Home page architecture (Total 94fr).
     * Content area (without footer) = 84fr.
     * Hero Section = 40% of 84 = ~34fr.
     * Overview Section = 60% of 84 = ~50fr.
     * Footer = 10fr.
     */
    <div className="grid h-full w-full grid-rows-[minmax(0,37fr)_minmax(0,35fr)_minmax(0,10fr)] gap-[var(--main-gap)] overflow-hidden">
      {/* ═══════════════════════════════════════════════════
          ROW 1 — Hero Section (40% of content)
          Includes Hero Info, Pricing, etc.
          ═══════════════════════════════════════════════════ */}
      <div className="flex min-h-0 w-full flex-col gap-[clamp(4px,0.5vw,8px)] overflow-hidden">
        {/* Hero & Pricing Split */}
        <div className="grid min-h-0 w-full flex-1 grid-cols-12 gap-[var(--main-gap)] overflow-hidden">
          {/* Left Column - Product Info & Image (8 cols) */}
          <div className="col-span-8 flex min-h-0 min-w-0 gap-[clamp(8px,1vw,16px)] overflow-hidden rounded-[16px] bg-white p-[clamp(8px,1vw,16px)] shadow-sm">
            {/* Info text column */}
            <div className="flex w-1/3 min-w-0 flex-col justify-between overflow-hidden">
              <div className="flex min-h-0 flex-col overflow-hidden">
                <div className="mb-[clamp(4px,0.6vw,8px)] flex items-center gap-1.5 text-[clamp(10px,0.8vw,12px)] font-bold text-slate-500">
                  <Link
                    href="/"
                    className={cn(
                      'transition-colors hover:underline',
                      themeText
                    )}
                  >
                    Home
                  </Link>
                  <ChevronRight className="h-[clamp(8px,0.7vw,12px)] w-[clamp(8px,0.7vw,12px)]" />
                  <Link
                    href={`/catalog/${data.category}`}
                    className={cn(
                      'transition-colors hover:underline',
                      themeText
                    )}
                  >
                    {data.category.charAt(0).toUpperCase() +
                      data.category.slice(1)}
                  </Link>
                  <ChevronRight className="h-[clamp(8px,0.7vw,12px)] w-[clamp(8px,0.7vw,12px)]" />
                  <span className="truncate text-slate-800">{data.title}</span>
                </div>
                <Badge
                  className={cn(
                    'mb-[clamp(2px,0.4vw,6px)] w-fit rounded-full border border-blue-100 bg-blue-50 px-[clamp(4px,0.6vw,8px)] py-[clamp(1px,0.2vw,3px)] text-[clamp(8px,0.6vw,10px)] font-bold',
                    themeText
                  )}
                >
                  Premium Choice
                </Badge>
                <div className="flex items-center gap-1.5">
                  <h1 className="truncate text-[clamp(16px,1.8vw,28px)] leading-none font-black text-slate-800">
                    {data.title}
                  </h1>
                  <button className="flex h-[clamp(20px,1.5vw,28px)] w-[clamp(20px,1.5vw,28px)] shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-red-200 hover:text-red-500">
                    <Heart className="h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]" />
                  </button>
                </div>
                <p className="mt-[clamp(2px,0.4vw,8px)] line-clamp-3 text-[clamp(9px,0.7vw,12px)] leading-[1.3] font-medium text-slate-500">
                  {data.description}
                </p>
                <div className="mt-[clamp(4px,0.5vw,10px)] flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-[clamp(8px,0.7vw,12px)] w-[clamp(8px,0.7vw,12px)] fill-current"
                      />
                    ))}
                  </div>
                  <span className="ml-0.5 text-[clamp(9px,0.7vw,11px)] font-bold text-slate-800">
                    {data.rating}
                  </span>
                  <span className="text-[clamp(8px,0.6vw,10px)] text-slate-500">
                    ({data.reviewCount} Reviews)
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex shrink-0 justify-between gap-1 border-t border-slate-100 pt-[clamp(4px,0.5vw,8px)]">
                <div className="flex flex-1 flex-col items-center text-center">
                  <div
                    className={cn(
                      'mb-0.5 flex h-[clamp(20px,1.5vw,30px)] w-[clamp(20px,1.5vw,30px)] items-center justify-center rounded-full bg-blue-50',
                      themeText
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"
                      />
                    </svg>
                  </div>
                  <span className="text-[clamp(11px,0.5vw,9px)] leading-tight font-bold text-slate-600">
                    100% Fresh
                    <br />
                    Never Frozen
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-center text-center">
                  <div
                    className={cn(
                      'mb-0.5 flex h-[clamp(20px,1.5vw,30px)] w-[clamp(20px,1.5vw,30px)] items-center justify-center rounded-full bg-blue-50',
                      themeText
                    )}
                  >
                    <ShieldCheck className="h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]" />
                  </div>
                  <span className="text-[clamp(11px,0.5vw,9px)] leading-tight font-bold text-slate-600">
                    Hygienically
                    <br />
                    Handled
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-center text-center">
                  <div
                    className={cn(
                      'mb-0.5 flex h-[clamp(20px,1.5vw,30px)] w-[clamp(20px,1.5vw,30px)] items-center justify-center rounded-full bg-blue-50',
                      themeText
                    )}
                  >
                    <Anchor className="h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]" />
                  </div>
                  <span className="text-[clamp(11px,0.5vw,9px)] leading-tight font-bold text-slate-600">
                    Sourced
                    <br />
                    Responsibly
                  </span>
                </div>
              </div>
            </div>

            {/* Image column */}
            <div className="flex min-w-0 flex-1 flex-col justify-between overflow-hidden">
              <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-[10px] bg-slate-50">
                <Image
                  src={data.imageSrc}
                  alt={data.title}
                  fill
                  className="object-cover"
                  sizes="30vw"
                  priority
                />
              </div>

              {/* Thumbnails */}
              <div className="mt-[clamp(4px,0.6vw,10px)] flex h-[clamp(30px,3vw,44px)] shrink-0 items-center justify-between gap-[clamp(3px,0.4vw,6px)] overflow-hidden">
                <button className="flex h-[clamp(16px,1.5vw,22px)] w-[clamp(16px,1.5vw,22px)] shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm">
                  <ChevronLeft className="h-[clamp(8px,0.7vw,12px)] w-[clamp(8px,0.7vw,12px)]" />
                </button>
                <div className="flex h-full flex-1 justify-center gap-[clamp(3px,0.4vw,8px)] overflow-hidden px-1">
                  {data.gallery?.map((src, i) => (
                    <div
                      key={i}
                      className={cn(
                        'relative aspect-square h-full shrink-0 cursor-pointer overflow-hidden rounded-[6px] border-[1.5px] transition-all',
                        i === 0 ? 'border-blue-600' : 'border-transparent'
                      )}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="5vw"
                      />
                    </div>
                  ))}
                </div>
                <button className="flex h-[clamp(16px,1.5vw,22px)] w-[clamp(16px,1.5vw,22px)] shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm">
                  <ChevronRight className="h-[clamp(8px,0.7vw,12px)] w-[clamp(8px,0.7vw,12px)]" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Selection & Pricing (4 cols) */}
          <div className="col-span-4 flex min-h-0 min-w-0 flex-col justify-between gap-[clamp(4px,0.6vw,8px)] overflow-hidden rounded-[16px] bg-white p-[clamp(8px,1vw,16px)] shadow-sm">
            {/* Price & Back */}
            <div className="flex shrink-0 items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span
                  className={cn(
                    'text-[clamp(18px,2vw,28px)] leading-none font-black',
                    themeText
                  )}
                >
                  £{data.price.toFixed(2)}
                </span>
                <span className="text-[clamp(10px,0.8vw,14px)] font-bold text-slate-500">
                  / {data.unit}
                </span>
              </div>
              <Link
                href={`/catalog/${data.category}`}
                className={cn(
                  'flex items-center gap-1 rounded-full border border-slate-200 bg-white px-[clamp(6px,0.8vw,10px)] py-[clamp(2px,0.3vw,4px)] text-[clamp(9px,0.7vw,11px)] font-bold shadow-sm transition-colors hover:bg-slate-50',
                  themeText
                )}
              >
                <ChevronLeft className="h-[clamp(8px,0.7vw,10px)] w-[clamp(8px,0.7vw,10px)]" />
                Back
              </Link>
            </div>

            {/* Sizes */}
            <div className="shrink-0">
              <h3 className="mb-[clamp(2px,0.4vw,6px)] text-[clamp(14px,0.8vw,12px)] font-bold text-slate-800">
                Select Size
              </h3>
              <div className="grid grid-cols-4 gap-[clamp(3px,0.4vw,6px)]">
                {data.sizes?.map((size, i) => (
                  <button
                    key={size.id}
                    className={cn(
                      'flex flex-col items-center justify-center rounded-[6px] border p-0.5 transition-colors',
                      i === 1
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:border-blue-300'
                    )}
                  >
                    <span className="line-clamp-1 text-[clamp(8px,0.6vw,10px)] leading-tight font-bold">
                      {size.label}
                    </span>
                    <span className="line-clamp-1 text-[clamp(6px,0.4vw,8px)]">
                      {size.subLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cuts */}
            <div className="flex shrink-0 gap-[clamp(4px,0.6vw,12px)] border-t border-slate-100 pt-[clamp(4px,0.6vw,8px)]">
              <div className="flex-1 overflow-hidden">
                <div className="mb-[clamp(1px,0.2vw,4px)] flex items-center gap-1 text-[clamp(11px,0.6vw,11px)] text-slate-500">
                  <Droplet className="h-[clamp(8px,0.7vw,12px)] w-[clamp(8px,0.7vw,12px)]" />
                  <span className="truncate font-bold">Cut Options</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {data.cutOptions?.map((cut) => (
                    <span
                      key={cut.id}
                      className="text-[clamp(11px,0.6vw,10px)] font-bold text-slate-700"
                    >
                      {cut.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-px shrink-0 bg-slate-100"></div>
              <div className="shrink-0">
                <div className="mb-[clamp(1px,0.2vw,4px)] flex items-center gap-1 text-[clamp(8px,0.6vw,10px)] text-slate-500">
                  <Activity className="h-[clamp(8px,0.7vw,12px)] w-[clamp(8px,0.7vw,12px)]" />
                  <span className="truncate font-bold">Serves</span>
                </div>
                <span className="block truncate text-[clamp(8px,0.6vw,10px)] font-bold text-slate-700">
                  {data.serves}
                </span>
              </div>
            </div>

            {/* Freshness Box */}
            <div className="flex shrink-0 items-start gap-1.5 rounded-[10px] border border-blue-100 bg-blue-50/50 p-[clamp(4px,0.6vw,8px)]">
              <div className={cn('mt-[1px] shrink-0', themeText)}>
                <ShieldCheck className="h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]" />
              </div>
              <div className="min-w-0">
                <h4
                  className={cn(
                    'truncate text-[clamp(9px,0.7vw,11px)] font-black',
                    themeText
                  )}
                >
                  Freshness Guaranteed
                </h4>
                <p className="line-clamp-2 text-[clamp(7px,0.5vw,9px)] leading-[1.2] font-medium text-slate-600">
                  Delivered fresh and ready to cook for the best taste and
                  nutrition.
                </p>
              </div>
            </div>

            {/* Share / Save */}
            <div className="flex shrink-0 gap-[clamp(4px,0.6vw,8px)]">
              <button
                className={cn(
                  'flex flex-1 items-center justify-center gap-1 rounded-[8px] py-[clamp(4px,0.6vw,8px)] text-[clamp(9px,0.7vw,11px)] font-bold text-white shadow-sm transition-opacity hover:opacity-90',
                  themeBg
                )}
              >
                <Mail className="h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]" />{' '}
                Share
              </button>
              <button className="flex flex-1 items-center justify-center gap-1 rounded-[8px] border border-slate-200 bg-white py-[clamp(4px,0.6vw,8px)] text-[clamp(9px,0.7vw,11px)] font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                <Heart className="h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]" />{' '}
                Save
              </button>
            </div>

            {/* Got Questions */}
            <div
              className={cn(
                'flex shrink-0 items-center justify-between overflow-hidden rounded-[10px] p-[clamp(6px,0.8vw,10px)] shadow-sm',
                themeBg
              )}
            >
              <div className="min-w-0 pr-1">
                <h4 className="truncate text-[clamp(9px,0.7vw,12px)] font-black text-white">
                  Got Questions?
                </h4>
                <p className="line-clamp-1 text-[clamp(7px,0.5vw,9px)] text-white/90">
                  Our team is here to help.
                </p>
              </div>
              <button className="flex shrink-0 items-center gap-1 rounded-[6px] bg-white px-[clamp(6px,0.8vw,10px)] py-[clamp(3px,0.4vw,6px)] text-[clamp(8px,0.6vw,10px)] font-bold text-blue-700 shadow-sm hover:bg-slate-50">
                Contact{' '}
                <ArrowRight className="h-[clamp(8px,0.7vw,10px)] w-[clamp(8px,0.7vw,10px)]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          ROW 2 — Overview Section (60% of content)
          Includes Tabs and Info Cards
          ═══════════════════════════════════════════════════ */}
      <div className="flex min-h-0 w-full flex-col overflow-hidden rounded-[16px] bg-white p-[clamp(8px,1vw,16px)] shadow-sm">
        {/* Tabs */}
        <div className="flex w-full shrink-0 items-center justify-between border-b border-slate-100 px-[clamp(4px,0.5vw,8px)] pb-[clamp(4px,0.6vw,8px)]">
          {[
            { id: 'overview', label: 'Overview', icon: Info },
            { id: 'nutrition', label: 'Nutrition', icon: Activity },
            { id: 'cooking', label: 'Cooking', icon: PlayCircle },
            { id: 'details', label: 'Details', icon: Info },
            { id: 'sizes', label: 'Sizes & Cuts', icon: Droplet },
            { id: 'allergy', label: 'Allergy Info', icon: AlertTriangle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'relative flex flex-1 items-center justify-center gap-1 text-[clamp(14px,0.7vw,12px)] font-bold transition-colors',
                  isActive ? themeText : 'text-slate-500 hover:text-slate-800'
                )}
              >
                <Icon className="h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]" />
                {tab.label}
                {isActive && (
                  <div
                    className={cn(
                      'absolute right-0 -bottom-[calc(clamp(4px,0.6vw,8px)+1px)] left-0 h-[2px] rounded-t-full',
                      themeBg
                    )}
                  ></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex min-h-0 flex-1 flex-col pt-[clamp(6px,0.8vw,12px)]">
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid min-h-0 flex-1 grid-cols-4 grid-rows-2 gap-[clamp(6px,0.8vw,12px)]">
              {/* Catch From */}
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(6px,0.8vw,12px)]">
                <div className="mb-[clamp(3px,0.4vw,6px)] flex shrink-0 items-center gap-1.5">
                  <Anchor
                    className={cn(
                      'h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(14px,0.8vw,12px)] font-black text-slate-800">
                    Catch From
                  </h4>
                </div>
                <div className="custom-scrollbar min-h-0 overflow-y-auto pr-1">
                  <p
                    className={cn(
                      'mb-0.5 text-[clamp(12px,0.7vw,11px)] leading-tight font-bold',
                      themeText
                    )}
                  >
                    {data.catchFrom?.location}
                  </p>
                  <ul className="gap-0.1 flex list-disc flex-col pl-3 text-[clamp(11px,0.6vw,10px)] font-medium text-slate-600">
                    {data.catchFrom?.points.map((p, i) => (
                      <li key={i} className="line-clamp-1">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Best For */}
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(6px,0.8vw,12px)]">
                <div className="mb-[clamp(3px,0.4vw,6px)] flex shrink-0 items-center gap-1.5">
                  <Droplet
                    className={cn(
                      'h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(14px,0.8vw,12px)] font-black text-slate-800">
                    Best For
                  </h4>
                </div>
                <div className="custom-scrollbar flex min-h-0 flex-col gap-1.5 overflow-y-auto pr-1">
                  {data.bestFor?.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="min-w-0 flex-1">
                        <h5 className="truncate text-[clamp(12px,0.7vw,11px)] font-bold text-slate-800">
                          {item.title}
                        </h5>
                        <p className="line-clamp-2 text-[clamp(10px,0.5vw,9px)] leading-tight text-slate-500">
                          {item.description}
                        </p>
                      </div>
                      <div className="relative h-[clamp(20px,1.5vw,28px)] w-[clamp(20px,1.5vw,28px)] shrink-0 overflow-hidden rounded-full border border-slate-100">
                        <Image
                          src={item.imageSrc}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="5vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialty */}
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(6px,0.8vw,12px)]">
                <div className="mb-[clamp(3px,0.4vw,6px)] flex shrink-0 items-center gap-1.5">
                  <Star
                    className={cn(
                      'h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(14px,0.8vw,12px)] font-black text-slate-800">
                    Specialty
                  </h4>
                </div>
                <div className="custom-scrollbar min-h-0 overflow-y-auto pr-1">
                  <ul className="flex list-disc flex-col gap-0.5 pl-3 text-[clamp(12px,0.6vw,10px)] font-medium text-slate-600">
                    {data.specialty?.map((s, i) => (
                      <li key={i} className="line-clamp-2 leading-tight">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Famous On */}
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(6px,0.8vw,12px)]">
                <div className="mb-[clamp(3px,0.4vw,6px)] flex shrink-0 items-center gap-1.5">
                  <ShieldCheck
                    className={cn(
                      'h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(14px,0.8vw,12px)] font-black text-slate-800">
                    Famous On
                  </h4>
                </div>
                <div className="custom-scrollbar min-h-0 overflow-y-auto pr-1">
                  <ul className="flex list-disc flex-col gap-0.5 pl-3 text-[clamp(12px,0.6vw,10px)] font-medium text-slate-600">
                    {data.famousOn?.map((s, i) => (
                      <li key={i} className="line-clamp-2 leading-tight">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Nutrition */}
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(6px,0.8vw,12px)]">
                <div className="mb-[clamp(3px,0.4vw,6px)] flex shrink-0 items-center gap-1.5">
                  <Activity
                    className={cn(
                      'h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(14px,0.8vw,12px)] font-black text-slate-800">
                    Nutrition{' '}
                    <span className="font-medium text-slate-400">
                      ({data.nutritionInfo?.amount})
                    </span>
                  </h4>
                </div>
                <div className="custom-scrollbar min-h-0 overflow-y-auto pr-1">
                  <div className="mb-[clamp(3px,0.4vw,6px)] grid grid-cols-4 gap-1">
                    <div className="flex flex-col items-center rounded bg-white p-0.5 text-center shadow-sm">
                      <span className="text-[clamp(10px,0.4vw,8px)] font-bold text-slate-500">
                        Protein
                      </span>
                      <span className="text-[clamp(12px,0.6vw,10px)] font-black text-slate-800">
                        {data.nutritionInfo?.protein}
                      </span>
                    </div>
                    <div className="flex flex-col items-center rounded bg-white p-0.5 text-center shadow-sm">
                      <span className="text-[clamp(10px,0.4vw,8px)] font-bold text-slate-500">
                        Calories
                      </span>
                      <span className="text-[clamp(12px,0.6vw,10px)] font-black text-slate-800">
                        {data.nutritionInfo?.calories}
                      </span>
                    </div>
                    <div className="flex flex-col items-center rounded bg-white p-0.5 text-center shadow-sm">
                      <span className="text-[clamp(10px,0.4vw,8px)] font-bold text-slate-500">
                        Omega-3
                      </span>
                      <span className="text-[clamp(12px,0.6vw,10px)] font-black text-slate-800">
                        {data.nutritionInfo?.omega3}
                      </span>
                    </div>
                    <div className="flex flex-col items-center rounded bg-white p-0.5 text-center shadow-sm">
                      <span className="text-[clamp(10px,0.4vw,8px)] font-bold text-slate-500">
                        Fat
                      </span>
                      <span className="text-[clamp(12px,0.6vw,10px)] font-black text-slate-800">
                        {data.nutritionInfo?.fat}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Good For */}
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(6px,0.8vw,12px)]">
                <div className="mb-[clamp(3px,0.4vw,6px)] flex shrink-0 items-center gap-1.5">
                  <Heart
                    className={cn(
                      'h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(14px,0.8vw,12px)] font-black text-slate-800">
                    Good For
                  </h4>
                </div>
                <div className="custom-scrollbar flex min-h-0 flex-1 items-start justify-between overflow-y-auto pr-1">
                  <ul className="flex list-disc flex-col gap-0.5 pl-3 text-[clamp(12px,0.6vw,10px)] font-medium text-slate-600">
                    {data.goodFor?.map((s, i) => (
                      <li key={i} className="line-clamp-1">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div
                    className={cn(
                      'flex h-[clamp(24px,2vw,36px)] w-[clamp(24px,2vw,36px)] shrink-0 items-center justify-center rounded-full bg-blue-50',
                      themeText
                    )}
                  >
                    <Activity className="h-[clamp(12px,1vw,18px)] w-[clamp(12px,1vw,18px)]" />
                  </div>
                </div>
              </div>

              {/* Allergy Info */}
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(6px,0.8vw,12px)]">
                <div className="mb-[clamp(3px,0.4vw,6px)] flex shrink-0 items-center gap-1.5">
                  <AlertTriangle className="h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)] text-red-500" />
                  <h4 className="truncate text-[clamp(14px,0.8vw,12px)] font-black text-slate-800">
                    Allergy Info
                  </h4>
                </div>
                <div className="custom-scrollbar min-h-0 overflow-y-auto pr-1">
                  <h5 className="truncate text-[clamp(12px,0.7vw,11px)] font-bold text-slate-800">
                    {data.allergyInfo?.title}
                  </h5>
                  <p className="mb-0.5 line-clamp-2 text-[clamp(11px,0.6vw,9px)] leading-tight text-slate-500">
                    {data.allergyInfo?.desc}
                  </p>
                  <p className="line-clamp-2 text-[clamp(11px,0.6vw,9px)] leading-tight text-slate-500">
                    {data.allergyInfo?.warning}
                  </p>
                </div>
              </div>

              {/* How to Cook */}
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(6px,0.8vw,12px)]">
                <div className="mb-[clamp(3px,0.4vw,6px)] flex shrink-0 items-center justify-between">
                  <h4 className="truncate text-[clamp(14px,0.8vw,12px)] font-black text-slate-800">
                    How to Cook
                  </h4>
                  <Link
                    href="#"
                    className={cn(
                      'text-[clamp(10px,0.6vw,10px)] font-bold hover:underline',
                      themeText
                    )}
                  >
                    View All
                  </Link>
                </div>
                <div className="flex min-h-0 flex-1 gap-1.5 overflow-hidden">
                  {data.howToCook?.map((recipe, i) => (
                    <div
                      key={i}
                      className="group relative flex min-h-0 flex-1 cursor-pointer overflow-hidden rounded-[6px] bg-black/80"
                    >
                      <Image
                        src={recipe.imageSrc}
                        alt=""
                        fill
                        className="object-cover opacity-60 transition-transform group-hover:scale-110"
                        sizes="10vw"
                      />
                      <div className="absolute inset-0 flex flex-col justify-between p-1.5 text-white">
                        <PlayCircle className="my-auto h-[clamp(12px,1vw,18px)] w-[clamp(12px,1vw,18px)] self-center drop-shadow-md" />
                        <div>
                          <p className="line-clamp-1 text-[clamp(12px,0.5vw,8px)] leading-tight font-bold">
                            {recipe.title}
                          </p>
                          <div className="mt-[1px] flex items-center justify-between text-[clamp(9px,0.4vw,7px)] text-white/80">
                            <span className="line-clamp-1 flex-1">
                              {recipe.subtitle}
                            </span>
                            <span className="shrink-0 pl-0.5">
                              {recipe.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: NUTRITION */}
          {activeTab === 'nutrition' && (
            <div className="grid min-h-0 flex-1 grid-cols-2 gap-[clamp(6px,0.8vw,12px)]">
              {/* Nutrition Details */}
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(8px,1vw,16px)]">
                <div className="mb-[clamp(4px,0.6vw,8px)] flex shrink-0 items-center gap-2">
                  <Activity
                    className={cn(
                      'h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(16px,0.9vw,14px)] font-black text-slate-800">
                    Nutritional Facts{' '}
                    <span className="font-medium text-slate-400">
                      ({data.nutritionInfo?.amount})
                    </span>
                  </h4>
                </div>
                <div className="custom-scrollbar flex min-h-0 flex-col gap-2 overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col items-center justify-center rounded-[8px] bg-white p-[clamp(6px,0.8vw,10px)] shadow-sm">
                      <span className="text-[clamp(14px,0.7vw,11px)] font-bold text-slate-500">
                        Protein
                      </span>
                      <span className="text-[clamp(12px,1vw,16px)] font-black text-slate-800">
                        {data.nutritionInfo?.protein}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-[8px] bg-white p-[clamp(6px,0.8vw,10px)] shadow-sm">
                      <span className="text-[clamp(14px,0.7vw,11px)] font-bold text-slate-500">
                        Calories
                      </span>
                      <span className="text-[clamp(12px,1vw,16px)] font-black text-slate-800">
                        {data.nutritionInfo?.calories}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-[8px] bg-white p-[clamp(6px,0.8vw,10px)] shadow-sm">
                      <span className="text-[clamp(14px,0.7vw,11px)] font-bold text-slate-500">
                        Omega-3
                      </span>
                      <span className="text-[clamp(12px,1vw,16px)] font-black text-slate-800">
                        {data.nutritionInfo?.omega3}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-[8px] bg-white p-[clamp(6px,0.8vw,10px)] shadow-sm">
                      <span className="text-[clamp(14px,0.7vw,11px)] font-bold text-slate-500">
                        Total Fat
                      </span>
                      <span className="text-[clamp(12px,1vw,16px)] font-black text-slate-800">
                        {data.nutritionInfo?.fat}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Health Benefits */}
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(8px,1vw,16px)]">
                <div className="mb-[clamp(4px,0.6vw,8px)] flex shrink-0 items-center gap-2">
                  <Heart
                    className={cn(
                      'h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(16px,0.9vw,14px)] font-black text-slate-800">
                    Health Benefits
                  </h4>
                </div>
                <div className="custom-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
                  <ul className="flex list-disc flex-col gap-1.5 pl-4 text-[clamp(14px,0.8vw,12px)] font-medium text-slate-600">
                    {data.goodFor?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                  <div className="mt-4 mt-auto flex items-center gap-2 rounded-[8px] border border-blue-100 bg-blue-50 p-2">
                    <Info
                      className={cn(
                        'h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)] shrink-0',
                        themeText
                      )}
                    />
                    <p className="text-[clamp(12px,0.6vw,10px)] font-bold text-slate-700">
                      Nutritional values are approximate and may vary based on
                      specific catch and preparation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COOKING */}
          {activeTab === 'cooking' && (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(8px,1vw,16px)]">
              <div className="mb-[clamp(4px,0.6vw,8px)] flex shrink-0 items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlayCircle
                    className={cn(
                      'h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(16px,0.9vw,14px)] font-black text-slate-800">
                    How to Cook {data.title}
                  </h4>
                </div>
                <Link
                  href="#"
                  className={cn(
                    'text-[clamp(16px,0.8vw,12px)] font-bold hover:underline',
                    themeText
                  )}
                >
                  View All Recipes
                </Link>
              </div>
              <div className="flex min-h-0 flex-1 gap-2 overflow-hidden">
                {data.howToCook?.map((recipe, i) => (
                  <div
                    key={i}
                    className="group relative flex min-h-0 flex-1 cursor-pointer overflow-hidden rounded-[8px] bg-black/80"
                  >
                    <Image
                      src={recipe.imageSrc}
                      alt=""
                      fill
                      className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
                      sizes="20vw"
                    />
                    <div className="absolute inset-0 flex flex-col justify-between p-3 text-white">
                      <PlayCircle className="my-auto h-[clamp(24px,2vw,32px)] w-[clamp(24px,2vw,32px)] self-center drop-shadow-md transition-transform group-hover:scale-110" />
                      <div>
                        <p className="line-clamp-2 text-[clamp(16px,0.8vw,14px)] leading-tight font-black drop-shadow-md">
                          {recipe.title}
                        </p>
                        <div className="mt-1 flex items-center justify-between text-[clamp(16px,0.6vw,10px)] font-medium text-white/90">
                          <span className="line-clamp-1 flex-1">
                            {recipe.subtitle}
                          </span>
                          <span className="shrink-0 rounded-full bg-black/40 px-1.5 py-0.5 backdrop-blur-sm">
                            {recipe.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: DETAILS */}
          {activeTab === 'details' && (
            <div className="grid min-h-0 flex-1 grid-cols-2 gap-[clamp(6px,0.8vw,12px)]">
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(8px,1vw,16px)]">
                <div className="mb-[clamp(4px,0.6vw,8px)] flex shrink-0 items-center gap-2">
                  <Info
                    className={cn(
                      'h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(16px,0.9vw,14px)] font-black text-slate-800">
                    Product Information
                  </h4>
                </div>
                <div className="custom-scrollbar min-h-0 overflow-y-auto pr-1">
                  <p className="mb-3 text-[clamp(14px,0.8vw,12px)] leading-relaxed font-medium text-slate-600">
                    {data.description}
                  </p>
                  <p
                    className={cn(
                      'text-[clamp(16px,0.8vw,12px)] leading-relaxed font-bold',
                      themeText
                    )}
                  >
                    Origin: {data.catchFrom?.location || data.origin}
                  </p>
                  <ul className="mt-2 flex list-disc flex-col gap-1 pl-4 text-[clamp(13px,0.7vw,11px)] font-medium text-slate-500">
                    {data.catchFrom?.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(8px,1vw,16px)]">
                <div className="mb-[clamp(4px,0.6vw,8px)] flex shrink-0 items-center gap-2">
                  <Star
                    className={cn(
                      'h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(16px,0.9vw,14px)] font-black text-slate-800">
                    Quality & Highlights
                  </h4>
                </div>
                <div className="custom-scrollbar min-h-0 overflow-y-auto pr-1">
                  <ul className="flex list-disc flex-col gap-1.5 pl-4 text-[clamp(14px,0.8vw,12px)] font-medium text-slate-600">
                    {data.specialty?.map((s, i) => (
                      <li key={`s-${i}`}>{s}</li>
                    ))}
                    {data.famousOn?.map((s, i) => (
                      <li key={`f-${i}`}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SIZES & CUTS */}
          {activeTab === 'sizes' && (
            <div className="grid min-h-0 flex-1 grid-cols-2 gap-[clamp(6px,0.8vw,12px)]">
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(8px,1vw,16px)]">
                <div className="mb-[clamp(4px,0.6vw,8px)] flex shrink-0 items-center gap-2">
                  <Activity
                    className={cn(
                      'h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(16px,0.9vw,14px)] font-black text-slate-800">
                    Available Sizes
                  </h4>
                </div>
                <div className="custom-scrollbar min-h-0 overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 gap-2">
                    {data.sizes?.map((size, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-[8px] border border-slate-100 bg-white p-2 shadow-sm"
                      >
                        <span className="text-[clamp(14px,0.8vw,12px)] font-black text-slate-800">
                          {size.label}
                        </span>
                        <span className="text-[clamp(12px,0.7vw,11px)] font-bold text-slate-500">
                          {size.subLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[12px] border border-slate-100 bg-slate-50/50 p-[clamp(8px,1vw,16px)]">
                <div className="mb-[clamp(4px,0.6vw,8px)] flex shrink-0 items-center gap-2">
                  <Droplet
                    className={cn(
                      'h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]',
                      themeText
                    )}
                  />
                  <h4 className="truncate text-[clamp(16px,0.9vw,14px)] font-black text-slate-800">
                    Cut Options
                  </h4>
                </div>
                <div className="custom-scrollbar min-h-0 overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 gap-2">
                    {data.cutOptions?.map((cut, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-[8px] border border-slate-100 bg-white p-2 shadow-sm"
                      >
                        <div
                          className={cn('h-1.5 w-1.5 rounded-full', themeBg)}
                        ></div>
                        <span className="text-[clamp(14px,0.8vw,12px)] font-bold text-slate-700">
                          {cut.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ALLERGY INFO */}
          {activeTab === 'allergy' && (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden rounded-[12px] border border-red-100 bg-red-50/50 p-[clamp(16px,2vw,32px)]">
              <div className="mb-[clamp(6px,0.8vw,12px)] flex h-[clamp(36px,3vw,48px)] w-[clamp(36px,3vw,48px)] shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                <AlertTriangle className="h-[clamp(18px,1.5vw,24px)] w-[clamp(18px,1.5vw,24px)]" />
              </div>
              <h4 className="mb-1 truncate text-center text-[clamp(18px,1.2vw,18px)] font-black text-red-600">
                {data.allergyInfo?.title}
              </h4>
              <p className="mb-3 max-w-[80%] text-center text-[clamp(14px,0.8vw,12px)] leading-relaxed font-medium text-slate-600">
                {data.allergyInfo?.desc}
              </p>
              <div className="rounded-[8px] border border-red-200 bg-white px-[clamp(12px,1.5vw,24px)] py-[clamp(8px,1vw,12px)] text-center shadow-sm">
                <p className="text-[clamp(12px,0.8vw,12px)] font-bold text-red-600">
                  ⚠️ {data.allergyInfo?.warning}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          ROW 3 — Footer (10%)
          Gets exactly the remaining space like the Home page.
          ═══════════════════════════════════════════════════ */}
      <div className="overflow-hidden">
        <Footer />
      </div>
    </div>
  );
}
