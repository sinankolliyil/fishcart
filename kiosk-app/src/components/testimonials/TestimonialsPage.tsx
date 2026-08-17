'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, ThumbsUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/layout/Footer';

// ─── Types ──────────────────────────────────────────────────────────────────

type Platform = 'facebook' | 'instagram' | 'google' | 'all';

interface Review {
  id: number;
  platform: 'facebook' | 'instagram' | 'google';
  name: string;
  avatar: string; // initials fallback
  timeAgo: string;
  rating: number;
  text: string;
  likes: number;
}

interface RatingSummary {
  average: number;
  total: number;
  distribution: { stars: number; pct: number }[];
}

// ─── Review Data ─────────────────────────────────────────────────────────────

const facebookReviews: Review[] = [
  {
    id: 1,
    platform: 'facebook',
    name: 'Rohan Mehta',
    avatar: 'RM',
    timeAgo: '2 days ago',
    rating: 5,
    text: 'Absolutely fresh and tasty fish! The salmon was amazing. Great quality and hygiene.',
    likes: 12,
  },
  {
    id: 2,
    platform: 'facebook',
    name: 'Suresh Kumar',
    avatar: 'SK',
    timeAgo: '1 week ago',
    rating: 5,
    text: 'Mutton quality is outstanding. Perfect for weekend biryani!',
    likes: 7,
  },
  {
    id: 3,
    platform: 'facebook',
    name: 'Amit Sharma',
    avatar: 'AS',
    timeAgo: '1 week ago',
    rating: 5,
    text: 'Best place for fresh seafood. The staff is friendly and well knowledgeable.',
    likes: 9,
  },
  {
    id: 4,
    platform: 'facebook',
    name: 'Priya Nair',
    avatar: 'PN',
    timeAgo: '2 weeks ago',
    rating: 4,
    text: 'Chicken is always fresh. Delivery was on time. Will definitely order again.',
    likes: 5,
  },
  {
    id: 5,
    platform: 'facebook',
    name: 'Kavya Reddy',
    avatar: 'KR',
    timeAgo: '3 weeks ago',
    rating: 5,
    text: 'Eggs are top quality. The packaging is excellent. No breakage at all!',
    likes: 11,
  },
  {
    id: 6,
    platform: 'facebook',
    name: 'Arjun Singh',
    avatar: 'AJ',
    timeAgo: '1 month ago',
    rating: 5,
    text: 'Sea bass was perfectly fresh. Cleaned and packed neatly. Highly recommended.',
    likes: 8,
  },
  {
    id: 7,
    platform: 'facebook',
    name: 'Deepa Menon',
    avatar: 'DM',
    timeAgo: '1 month ago',
    rating: 4,
    text: 'Good variety of fish. The tilapia fillets were great for curry.',
    likes: 4,
  },
  {
    id: 8,
    platform: 'facebook',
    name: 'Ravi Pillai',
    avatar: 'RP',
    timeAgo: '5 weeks ago',
    rating: 5,
    text: 'Consistently fresh produce. I order weekly and have never been disappointed.',
    likes: 15,
  },
  {
    id: 9,
    platform: 'facebook',
    name: 'Meena Thomas',
    avatar: 'MT',
    timeAgo: '6 weeks ago',
    rating: 5,
    text: 'Amazing customer service. They helped me pick the right cut for my recipe.',
    likes: 6,
  },
  {
    id: 10,
    platform: 'facebook',
    name: 'Kiran Bose',
    avatar: 'KB',
    timeAgo: '2 months ago',
    rating: 4,
    text: 'Fresh fish with great value for money. The mackerel was delicious.',
    likes: 3,
  },
  {
    id: 11,
    platform: 'facebook',
    name: 'Sita Iyer',
    avatar: 'SI',
    timeAgo: '2 months ago',
    rating: 5,
    text: 'Best seafood shop in town. Always well-stocked with premium varieties.',
    likes: 9,
  },
  {
    id: 12,
    platform: 'facebook',
    name: 'Anil Verma',
    avatar: 'AV',
    timeAgo: '3 months ago',
    rating: 5,
    text: 'Prawns were extra large and fresh. Perfect for my prawn masala recipe.',
    likes: 14,
  },
];

const instagramReviews: Review[] = [
  {
    id: 13,
    platform: 'instagram',
    name: 'Divya Kapoor',
    avatar: 'DK',
    timeAgo: '1 day ago',
    rating: 5,
    text: 'Ordered salmon fillets and they were absolutely stunning! Pure freshness in every bite. 🐟✨',
    likes: 34,
  },
  {
    id: 14,
    platform: 'instagram',
    name: 'Neha Joshi',
    avatar: 'NJ',
    timeAgo: '3 days ago',
    rating: 5,
    text: 'FishCart never disappoints! The prawns I got were massive and so fresh. 🍤💯',
    likes: 27,
  },
  {
    id: 15,
    platform: 'instagram',
    name: 'Pooja Shah',
    avatar: 'PS',
    timeAgo: '5 days ago',
    rating: 4,
    text: 'Super fast delivery and perfectly packed! Chicken was fresh and clean. ❤️',
    likes: 19,
  },
  {
    id: 16,
    platform: 'instagram',
    name: 'Ria Gupta',
    avatar: 'RG',
    timeAgo: '1 week ago',
    rating: 5,
    text: 'The sea bass recipe I made was a hit! All thanks to the amazing quality here. 🎉',
    likes: 41,
  },
  {
    id: 17,
    platform: 'instagram',
    name: 'Tanya Bhatia',
    avatar: 'TB',
    timeAgo: '2 weeks ago',
    rating: 5,
    text: 'Love the variety! Got tilapia, prawns and chicken in one order. All top-notch! 🛒',
    likes: 22,
  },
  {
    id: 18,
    platform: 'instagram',
    name: 'Ananya Misra',
    avatar: 'AM',
    timeAgo: '2 weeks ago',
    rating: 4,
    text: 'Packaging is eco-friendly and the fish stays super fresh. Impressed! 🌿',
    likes: 18,
  },
  {
    id: 19,
    platform: 'instagram',
    name: 'Simran Kaur',
    avatar: 'SK',
    timeAgo: '3 weeks ago',
    rating: 5,
    text: 'My go-to for weekly fresh fish supply. Quality has never dropped! ⭐⭐⭐⭐⭐',
    likes: 31,
  },
  {
    id: 20,
    platform: 'instagram',
    name: 'Nisha Rawat',
    avatar: 'NR',
    timeAgo: '1 month ago',
    rating: 5,
    text: 'Tried the mutton for the first time. Tender and fresh. Will order again! 🍖',
    likes: 16,
  },
];

const googleReviews: Review[] = [
  {
    id: 21,
    platform: 'google',
    name: 'Vikram Nair',
    avatar: 'VN',
    timeAgo: '1 day ago',
    rating: 5,
    text: 'Outstanding freshness. The cod I purchased was restaurant-quality. Highly recommend to everyone.',
    likes: 8,
  },
  {
    id: 22,
    platform: 'google',
    name: 'Shreya Patel',
    avatar: 'SP',
    timeAgo: '4 days ago',
    rating: 5,
    text: 'Excellent service and top-grade products. The trout was perfectly cleaned and ready to cook.',
    likes: 12,
  },
  {
    id: 23,
    platform: 'google',
    name: 'Manish Tiwari',
    avatar: 'MT',
    timeAgo: '1 week ago',
    rating: 4,
    text: 'Great range of seafood. Prices are fair and quality is consistently high. Very satisfied.',
    likes: 6,
  },
  {
    id: 24,
    platform: 'google',
    name: 'Lakshmi Raj',
    avatar: 'LR',
    timeAgo: '10 days ago',
    rating: 5,
    text: 'Ordered tuna steaks and they were perfect. No fishy smell, just pure freshness.',
    likes: 9,
  },
  {
    id: 25,
    platform: 'google',
    name: 'Rahul Yadav',
    avatar: 'RY',
    timeAgo: '2 weeks ago',
    rating: 5,
    text: 'The delivery was right on time and the fish was packed in ice. Excellent service overall.',
    likes: 11,
  },
  {
    id: 26,
    platform: 'google',
    name: 'Sunita Devi',
    avatar: 'SD',
    timeAgo: '3 weeks ago',
    rating: 5,
    text: 'Best fish market experience online. The haddock fillets were superb quality.',
    likes: 7,
  },
  {
    id: 27,
    platform: 'google',
    name: 'Arun Krishnan',
    avatar: 'AK',
    timeAgo: '1 month ago',
    rating: 4,
    text: 'Good freshness guarantee. Fish arrived well-packaged and within the delivery window.',
    likes: 5,
  },
  {
    id: 28,
    platform: 'google',
    name: 'Preethi Soman',
    avatar: 'PR',
    timeAgo: '5 weeks ago',
    rating: 5,
    text: 'I was skeptical about online seafood but FishCart changed my mind completely. Fantastic!',
    likes: 13,
  },
  {
    id: 29,
    platform: 'google',
    name: 'Vijay Rajan',
    avatar: 'VR',
    timeAgo: '6 weeks ago',
    rating: 5,
    text: 'Fresh mackerel every week. The quality is consistent and the service is impeccable.',
    likes: 10,
  },
];

// ─── Rating summaries per platform ───────────────────────────────────────────

const ratingSummaries: Record<Platform, RatingSummary> = {
  facebook: {
    average: 4.8,
    total: 126,
    distribution: [
      { stars: 5, pct: 85 },
      { stars: 4, pct: 10 },
      { stars: 3, pct: 3 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 1 },
    ],
  },
  instagram: {
    average: 4.7,
    total: 98,
    distribution: [
      { stars: 5, pct: 78 },
      { stars: 4, pct: 15 },
      { stars: 3, pct: 5 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 1 },
    ],
  },
  google: {
    average: 4.9,
    total: 245,
    distribution: [
      { stars: 5, pct: 90 },
      { stars: 4, pct: 7 },
      { stars: 3, pct: 2 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 0 },
    ],
  },
  all: {
    average: 4.8,
    total: 469,
    distribution: [
      { stars: 5, pct: 85 },
      { stars: 4, pct: 10 },
      { stars: 3, pct: 3 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 1 },
    ],
  },
};

// ─── Platform config ─────────────────────────────────────────────────────────

const PLATFORMS: {
  id: Platform;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  activeClass: string;
  inactiveClass: string;
}[] = [
  {
    id: 'facebook',
    label: 'Facebook Reviews',
    sublabel: '4.8 (126 reviews)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[clamp(14px,1.2vw,20px)] w-[clamp(14px,1.2vw,20px)]"
        fill="currentColor"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    activeClass: 'bg-[#1877F2] text-white shadow-lg shadow-blue-200',
    inactiveClass:
      'bg-white text-slate-700 border border-slate-200 hover:border-[#1877F2]/40',
  },
  {
    id: 'instagram',
    label: 'Instagram Reviews',
    sublabel: '4.7 (98 reviews)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[clamp(14px,1.2vw,20px)] w-[clamp(14px,1.2vw,20px)]"
        fill="currentColor"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    activeClass:
      'bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white shadow-lg shadow-pink-200',
    inactiveClass:
      'bg-white text-slate-700 border border-slate-200 hover:border-pink-400/40',
  },
  {
    id: 'google',
    label: 'Google Reviews',
    sublabel: '4.9 (245 reviews)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[clamp(14px,1.2vw,20px)] w-[clamp(14px,1.2vw,20px)]"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
    activeClass:
      'bg-white text-slate-800 border-2 border-[#4285F4] shadow-lg shadow-blue-100',
    inactiveClass:
      'bg-white text-slate-700 border border-slate-200 hover:border-[#4285F4]/40',
  },
  {
    id: 'all',
    label: 'All Reviews',
    sublabel: '4.8 (469 reviews)',
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-[clamp(14px,1.2vw,20px)] w-[clamp(14px,1.2vw,20px)]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    activeClass:
      'bg-white text-[#0D55CF] border-2 border-[#0D55CF] shadow-lg shadow-blue-100',
    inactiveClass:
      'bg-white text-slate-700 border border-slate-200 hover:border-[#0D55CF]/40',
  },
];

// ─── Platform icon (small, for use inside review cards) ──────────────────────

function PlatformIcon({
  platform,
  size = 'sm',
}: {
  platform: Review['platform'];
  size?: 'sm' | 'lg';
}) {
  const cls =
    size === 'lg'
      ? 'h-[clamp(20px,1.8vw,28px)] w-[clamp(20px,1.8vw,28px)]'
      : 'h-[clamp(14px,1.1vw,18px)] w-[clamp(14px,1.1vw,18px)]';

  if (platform === 'facebook') {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-white',
          size === 'lg'
            ? 'h-[clamp(26px,2vw,36px)] w-[clamp(26px,2vw,36px)]'
            : 'h-[clamp(20px,1.6vw,26px)] w-[clamp(20px,1.6vw,26px)]'
        )}
      >
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </div>
    );
  }
  if (platform === 'instagram') {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white',
          size === 'lg'
            ? 'h-[clamp(26px,2vw,36px)] w-[clamp(26px,2vw,36px)]'
            : 'h-[clamp(20px,1.6vw,26px)] w-[clamp(20px,1.6vw,26px)]'
        )}
      >
        <svg viewBox="0 0 24 24" className={cls} fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </div>
    );
  }
  // google
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm',
        size === 'lg'
          ? 'h-[clamp(26px,2vw,36px)] w-[clamp(26px,2vw,36px)]'
          : 'h-[clamp(20px,1.6vw,26px)] w-[clamp(20px,1.6vw,26px)]'
      )}
    >
      <svg viewBox="0 0 24 24" className={cls}>
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    </div>
  );
}

// ─── Star row ────────────────────────────────────────────────────────────────

function Stars({
  rating,
  size = 'sm',
}: {
  rating: number;
  size?: 'sm' | 'lg';
}) {
  const cls =
    size === 'lg'
      ? 'h-[clamp(12px,1vw,16px)] w-[clamp(12px,1vw,16px)]'
      : 'h-[clamp(10px,0.8vw,13px)] w-[clamp(10px,0.8vw,13px)]';
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            cls,
            i < rating
              ? 'fill-[#F59E0B] text-[#F59E0B]'
              : 'fill-slate-200 text-slate-200'
          )}
        />
      ))}
    </div>
  );
}

// ─── Review Card ─────────────────────────────────────────────────────────────

function ReviewCard({
  review,
  compact = false,
}: {
  review: Review;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-col justify-between overflow-hidden rounded-[clamp(10px,0.8vw,14px)] bg-white shadow-sm',
        compact ? 'p-[clamp(8px,0.7vw,12px)]' : 'p-[clamp(10px,0.9vw,16px)]'
      )}
    >
      <div>
        {/* Header */}
        <div className="mb-[clamp(4px,0.4vw,8px)] flex items-start justify-between gap-2">
          <div className="flex items-center gap-[clamp(6px,0.6vw,10px)]">
            <div
              className={cn(
                'flex shrink-0 items-center justify-center rounded-full font-bold text-white',
                compact
                  ? 'h-[clamp(22px,1.8vw,30px)] w-[clamp(22px,1.8vw,30px)] text-[clamp(9px,0.6vw,11px)]'
                  : 'h-[clamp(26px,2vw,36px)] w-[clamp(26px,2vw,36px)] text-[clamp(10px,0.7vw,12px)]',
                review.platform === 'facebook'
                  ? 'bg-[#1877F2]'
                  : review.platform === 'instagram'
                    ? 'bg-gradient-to-br from-[#f09433] to-[#bc1888]'
                    : 'bg-slate-700'
              )}
            >
              {review.avatar}
            </div>
            <div>
              <p
                className={cn(
                  'leading-tight font-bold text-slate-800',
                  compact
                    ? 'text-[clamp(10px,0.7vw,12px)]'
                    : 'text-[clamp(11px,0.8vw,14px)]'
                )}
              >
                {review.name}
              </p>
              <p
                className={cn(
                  'text-slate-400',
                  compact
                    ? 'text-[clamp(9px,0.55vw,10px)]'
                    : 'text-[clamp(10px,0.6vw,11px)]'
                )}
              >
                {review.timeAgo}
              </p>
            </div>
          </div>
          <PlatformIcon platform={review.platform} size="sm" />
        </div>

        {/* Stars */}
        <div className="mb-[clamp(4px,0.4vw,7px)]">
          <Stars rating={review.rating} />
        </div>

        {/* Text */}
        <p
          className={cn(
            'leading-snug text-slate-600',
            compact
              ? 'line-clamp-2 text-[clamp(9px,0.6vw,11px)]'
              : 'line-clamp-3 text-[clamp(10px,0.7vw,12px)]'
          )}
        >
          {review.text}
        </p>
      </div>

      {/* Footer */}
      <div
        className={cn(
          'flex items-center gap-3',
          compact ? 'mt-[clamp(4px,0.3vw,6px)]' : 'mt-[clamp(6px,0.5vw,10px)]'
        )}
      >
        <button className="flex items-center gap-1 text-slate-400 transition-colors hover:text-[#0D55CF]">
          <ThumbsUp
            className={cn(
              compact
                ? 'h-[8px] w-[8px]'
                : 'h-[clamp(10px,0.7vw,12px)] w-[clamp(10px,0.7vw,12px)]'
            )}
          />
          <span
            className={cn(
              'font-medium',
              compact
                ? 'text-[clamp(8px,0.5vw,10px)]'
                : 'text-[clamp(9px,0.6vw,11px)]'
            )}
          >
            {review.likes}
          </span>
        </button>
        <button
          className={cn(
            'font-medium text-slate-400 transition-colors hover:text-slate-600',
            compact
              ? 'text-[clamp(8px,0.5vw,10px)]'
              : 'text-[clamp(9px,0.6vw,11px)]'
          )}
        >
          Reply
        </button>
      </div>
    </div>
  );
}

// ─── Rating Bar ──────────────────────────────────────────────────────────────

function RatingBar({
  stars,
  pct,
  platform,
}: {
  stars: number;
  pct: number;
  platform: Platform;
}) {
  const barColor =
    platform === 'facebook'
      ? 'bg-[#1877F2]'
      : platform === 'instagram'
        ? 'bg-gradient-to-r from-[#f09433] to-[#bc1888]'
        : platform === 'google'
          ? 'bg-[#4285F4]'
          : 'bg-[#0D55CF]';

  return (
    <div className="flex items-center gap-[clamp(4px,0.4vw,8px)]">
      <span className="w-3 shrink-0 text-right text-[clamp(9px,0.65vw,11px)] font-medium text-slate-500">
        {stars}
      </span>
      <Star className="h-[clamp(8px,0.6vw,10px)] w-[clamp(8px,0.6vw,10px)] shrink-0 fill-[#F59E0B] text-[#F59E0B]" />
      <div className="h-[clamp(4px,0.35vw,6px)] flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            barColor
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-7 shrink-0 text-right text-[clamp(9px,0.65vw,11px)] font-medium text-slate-500">
        {pct}%
      </span>
    </div>
  );
}

// ─── Happy Customer photos ────────────────────────────────────────────────────

const CUSTOMER_PHOTOS = [
  { src: '/assets/prod_1_salmon.jpg', rating: 4.5 },
  { src: '/assets/prod_6_tilapia.jpg', rating: 5 },
  { src: '/assets/prod_7_prawns.jpg', rating: 4.5 },
  { src: '/assets/prod_8_trout.jpg', rating: 5 },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export function TestimonialsPage() {
  const [activePlatform, setActivePlatform] = useState<Platform>('all');
  const [page, setPage] = useState(0);

  // Compute displayed reviews
  const allReviews = [
    ...facebookReviews,
    ...instagramReviews,
    ...googleReviews,
  ];
  const sourceReviews =
    activePlatform === 'facebook'
      ? facebookReviews
      : activePlatform === 'instagram'
        ? instagramReviews
        : activePlatform === 'google'
          ? googleReviews
          : allReviews;

  const PAGE_SIZE = activePlatform === 'all' ? 8 : 3;
  const totalPages = Math.ceil(sourceReviews.length / PAGE_SIZE);
  const displayedReviews = sourceReviews.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  const summary = ratingSummaries[activePlatform];

  // Reset page when platform changes
  const handlePlatformChange = (p: Platform) => {
    setActivePlatform(p);
    setPage(0);
  };

  const handleViewMore = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <div className="grid h-full min-h-[850px] w-full grid-rows-[minmax(0,70fr)_80px] gap-[var(--main-gap)]">
      {/* ── Main Content ── */}
      <div className="flex min-h-0 flex-col gap-[clamp(6px,0.6vw,12px)] overflow-hidden">
        {/* Breadcrumb */}
        <nav className="flex shrink-0 items-center gap-1.5 text-[clamp(10px,0.75vw,12px)] font-semibold">
          <Link href="/" className="text-[#0D55CF] hover:underline">
            Home
          </Link>
          <ChevronRight className="h-[10px] w-[10px] text-slate-400" />
          <span className="text-slate-500">Testimonials</span>
        </nav>

        {/* ── ROW A: Hero + Platform tabs ── */}
        <div className="grid shrink-0 grid-cols-[1fr_auto] gap-[clamp(10px,1vw,18px)]">
          {/* Left: heading + tabs */}
          <div className="flex min-w-0 flex-col gap-[clamp(6px,0.6vw,12px)]">
            <div>
              <h1 className="text-[clamp(18px,2vw,32px)] leading-tight font-black text-slate-900">
                What Our Customers Say
              </h1>
              {/* Decorative wave */}
              <svg
                viewBox="0 0 80 12"
                className="mt-0.5 h-[clamp(6px,0.5vw,10px)] w-[clamp(40px,3vw,70px)]"
                fill="none"
              >
                <path
                  d="M0 6 Q10 0 20 6 T40 6 T60 6 T80 6"
                  stroke="#0D55CF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="mt-[clamp(3px,0.3vw,6px)] text-[clamp(10px,0.75vw,13px)] leading-snug text-slate-500">
                We value every feedback. Here's what our amazing customers have
                to say about
                <br />
                Fishcart's fresh products and service.
              </p>
            </div>

            {/* Platform tabs */}
            <div className="grid grid-cols-4 gap-[clamp(5px,0.5vw,10px)]">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePlatformChange(p.id)}
                  className={cn(
                    'flex items-center gap-[clamp(5px,0.5vw,9px)] rounded-[clamp(8px,0.7vw,12px)] px-[clamp(8px,0.8vw,14px)] py-[clamp(7px,0.65vw,12px)] transition-all duration-200',
                    activePlatform === p.id ? p.activeClass : p.inactiveClass
                  )}
                >
                  <span className="shrink-0">{p.icon}</span>
                  <span className="flex min-w-0 flex-col items-start">
                    <span className="truncate text-[clamp(10px,0.75vw,13px)] leading-tight font-bold">
                      {p.label}
                    </span>
                    <span
                      className={cn(
                        'text-[clamp(9px,0.6vw,11px)] leading-tight',
                        activePlatform === p.id
                          ? 'opacity-80'
                          : 'text-slate-400'
                      )}
                    >
                      {p.sublabel}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: hero fish image */}
          <div className="relative h-[clamp(80px,8vw,130px)] w-[clamp(120px,12vw,200px)] shrink-0 overflow-hidden rounded-[clamp(10px,0.8vw,16px)]">
            <Image
              src="/assets/prod_1_salmon.jpg"
              alt="Fresh fish"
              fill
              className="object-cover object-center"
              sizes="200px"
            />
          </div>
        </div>

        {/* ── ROW B: Reviews section + Right panel ── */}
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_minmax(0,clamp(180px,18vw,280px))] gap-[clamp(8px,0.8vw,14px)] overflow-hidden">
          {/* Left: Rating summary + Review cards */}
          <div className="flex min-h-0 flex-col gap-[clamp(6px,0.6vw,10px)] overflow-hidden">
            {/* Rating summary + cards row */}
            <div
              className={cn(
                'grid min-h-0 flex-1 gap-[clamp(8px,0.8vw,14px)] overflow-hidden',
                activePlatform === 'all'
                  ? 'grid-cols-[minmax(0,160px)_1fr]'
                  : 'grid-cols-[minmax(0,160px)_1fr_1fr_1fr]'
              )}
            >
              {/* Rating summary */}
              <div className="flex min-h-0 flex-col justify-center gap-[clamp(3px,0.3vw,6px)]">
                <div
                  className={cn(
                    'leading-none font-black text-[#0D55CF]',
                    'text-[clamp(28px,3vw,52px)]'
                  )}
                >
                  {summary.average}
                </div>
                <Stars rating={5} size="lg" />
                <p className="text-[clamp(9px,0.65vw,11px)] text-slate-500">
                  Based on {summary.total} reviews
                </p>
                <div className="mt-[clamp(4px,0.4vw,8px)] flex flex-col gap-[clamp(2px,0.2vw,4px)]">
                  {summary.distribution.map((d) => (
                    <RatingBar
                      key={d.stars}
                      stars={d.stars}
                      pct={d.pct}
                      platform={activePlatform}
                    />
                  ))}
                </div>
              </div>

              {/* Review cards */}
              {activePlatform === 'all' ? (
                <div className="grid min-h-0 grid-cols-4 grid-rows-2 gap-[clamp(5px,0.5vw,8px)] overflow-hidden">
                  {displayedReviews.map((r) => (
                    <ReviewCard key={r.id} review={r} compact />
                  ))}
                </div>
              ) : (
                displayedReviews.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))
              )}
            </div>

            {/* View More button */}
            {totalPages > 1 && (
              <div className="flex shrink-0 justify-center">
                <button
                  onClick={handleViewMore}
                  className="flex items-center gap-2 rounded-full border border-[#0D55CF] px-[clamp(14px,1.2vw,22px)] py-[clamp(6px,0.5vw,10px)] text-[clamp(10px,0.75vw,13px)] font-bold text-[#0D55CF] transition-all hover:bg-[#0D55CF] hover:text-white"
                >
                  View More Reviews{' '}
                  <ArrowRight className="h-[clamp(10px,0.7vw,14px)] w-[clamp(10px,0.7vw,14px)]" />
                </button>
              </div>
            )}

            {/* ── Happy Customers row ── */}
            <div className="shrink-0">
              <h3 className="mb-[clamp(4px,0.4vw,8px)] text-[clamp(11px,0.85vw,14px)] font-bold text-slate-800">
                Happy Customers
              </h3>
              <div className="grid grid-cols-4 gap-[clamp(5px,0.5vw,8px)]">
                {CUSTOMER_PHOTOS.map((c, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-[clamp(8px,0.6vw,12px)] bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={c.src}
                        alt="Happy customer"
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    </div>
                    <div className="flex justify-center py-[clamp(3px,0.3vw,5px)]">
                      <Stars rating={Math.floor(c.rating)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: We're Everywhere + Feedback form + Hygiene rating */}
          <div className="flex min-h-0 flex-col gap-[clamp(6px,0.6vw,10px)] overflow-x-hidden overflow-y-auto">
            {/* Share Your Opinion */}
            <div className="shrink-0 rounded-[clamp(10px,0.8vw,14px)] bg-white p-[clamp(10px,0.9vw,16px)] shadow-sm">
              <div className="mb-[clamp(5px,0.5vw,9px)] flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[clamp(12px,0.9vw,16px)] w-[clamp(12px,0.9vw,16px)] text-[#0D55CF]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <h3 className="text-[clamp(11px,0.85vw,14px)] font-bold text-slate-800">
                  Share Your Opinion
                </h3>
              </div>
              <p className="mb-[clamp(6px,0.6vw,10px)] text-[clamp(9px,0.65vw,11px)] leading-snug text-slate-500">
                We'd love to hear your suggestions and feedback to serve you
                better.
              </p>

              <div className="flex flex-col gap-[clamp(5px,0.45vw,8px)]">
                <div>
                  <label className="mb-0.5 block text-[clamp(9px,0.6vw,11px)] font-semibold text-slate-700">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-[6px] border border-slate-200 px-[clamp(6px,0.5vw,10px)] py-[clamp(4px,0.35vw,7px)] text-[clamp(9px,0.6vw,11px)] transition-colors outline-none focus:border-[#0D55CF]"
                  />
                </div>
                <div>
                  <label className="mb-0.5 block text-[clamp(9px,0.6vw,11px)] font-semibold text-slate-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Great Service, Excellent Quality"
                    className="w-full rounded-[6px] border border-slate-200 px-[clamp(6px,0.5vw,10px)] py-[clamp(4px,0.35vw,7px)] text-[clamp(9px,0.6vw,11px)] transition-colors outline-none focus:border-[#0D55CF]"
                  />
                </div>
                <div>
                  <label className="mb-0.5 block text-[clamp(9px,0.6vw,11px)] font-semibold text-slate-700">
                    Your Suggestion / Feedback{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write your suggestions or feedback here..."
                    className="w-full resize-none rounded-[6px] border border-slate-200 px-[clamp(6px,0.5vw,10px)] py-[clamp(4px,0.35vw,7px)] text-[clamp(9px,0.6vw,11px)] transition-colors outline-none focus:border-[#0D55CF]"
                  />
                </div>
                <div>
                  <label className="mb-0.5 block text-[clamp(9px,0.6vw,11px)] font-semibold text-slate-700">
                    Phone Number{' '}
                    <span className="text-[clamp(8px,0.55vw,10px)] font-normal text-slate-400">
                      (Optional)
                    </span>
                  </label>
                  <div className="flex gap-1">
                    <select className="rounded-[6px] border border-slate-200 px-1 py-[clamp(4px,0.35vw,7px)] text-[clamp(9px,0.6vw,11px)] outline-none focus:border-[#0D55CF]">
                      <option>+44</option>
                      <option>+91</option>
                      <option>+1</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="flex-1 rounded-[6px] border border-slate-200 px-[clamp(6px,0.5vw,10px)] py-[clamp(4px,0.35vw,7px)] text-[clamp(9px,0.6vw,11px)] transition-colors outline-none focus:border-[#0D55CF]"
                    />
                  </div>
                </div>

                <button className="mt-1 w-full rounded-[clamp(6px,0.5vw,10px)] bg-[#0D55CF] py-[clamp(6px,0.55vw,10px)] text-[clamp(10px,0.7vw,13px)] font-bold text-white transition-colors hover:bg-[#0A40A0]">
                  Submit Feedback
                </button>
              </div>
            </div>

            {/* We're Everywhere */}
            <div className="shrink-0 rounded-[clamp(10px,0.8vw,14px)] bg-white p-[clamp(10px,0.9vw,16px)] shadow-sm">
              <h3 className="mb-[clamp(3px,0.3vw,5px)] text-[clamp(11px,0.85vw,14px)] font-bold text-[#0D55CF]">
                We're Everywhere!
              </h3>
              <p className="mb-[clamp(5px,0.5vw,9px)] text-[clamp(9px,0.6vw,11px)] leading-snug text-slate-500">
                Follow us on social media to stay updated with fresh arrivals,
                recipes &amp; more.
              </p>
              <div className="mb-[clamp(5px,0.5vw,8px)] flex gap-[clamp(6px,0.6vw,10px)]">
                {/* Facebook */}
                <a
                  href="#"
                  className="flex h-[clamp(26px,2.2vw,38px)] w-[clamp(26px,2.2vw,38px)] items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[clamp(12px,1vw,18px)] w-[clamp(12px,1vw,18px)]"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className="flex h-[clamp(26px,2.2vw,38px)] w-[clamp(26px,2.2vw,38px)] items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white transition-opacity hover:opacity-90"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[clamp(12px,1vw,18px)] w-[clamp(12px,1vw,18px)]"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="#"
                  className="flex h-[clamp(26px,2.2vw,38px)] w-[clamp(26px,2.2vw,38px)] items-center justify-center rounded-full bg-[#FF0000] text-white transition-opacity hover:opacity-90"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[clamp(12px,1vw,18px)] w-[clamp(12px,1vw,18px)]"
                    fill="currentColor"
                  >
                    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                  </svg>
                </a>
              </div>
              <p className="text-[clamp(9px,0.6vw,11px)] font-semibold text-slate-600">
                @fishcart.dailyfresh
              </p>
              <a
                href="#"
                className="mt-1 flex items-center gap-1 text-[clamp(9px,0.6vw,11px)] font-bold text-[#0D55CF] hover:underline"
              >
                View All Posts{' '}
                <ArrowRight className="h-[clamp(8px,0.6vw,10px)] w-[clamp(8px,0.6vw,10px)]" />
              </a>
            </div>

            {/* Food Hygiene Rating */}
            <div className="shrink-0 rounded-[clamp(10px,0.8vw,14px)] bg-white p-[clamp(10px,0.9vw,16px)] shadow-sm">
              <h3 className="mb-[clamp(3px,0.3vw,5px)] text-[clamp(11px,0.85vw,14px)] font-bold text-[#0D55CF]">
                Food Hygiene Rating
              </h3>
              <p className="mb-[clamp(5px,0.5vw,8px)] text-[clamp(9px,0.6vw,11px)] leading-snug text-slate-500">
                We are committed to the highest standards of hygiene and food
                safety.
              </p>
              <div className="flex items-center justify-between">
                {/* Rating circles 0–5 */}
                <div className="flex items-center gap-[clamp(3px,0.3vw,5px)]">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="flex h-[clamp(20px,1.7vw,28px)] w-[clamp(20px,1.7vw,28px)] items-center justify-center rounded-full border-2 border-slate-300 text-[clamp(8px,0.6vw,11px)] font-bold text-slate-500"
                    >
                      {n}
                    </div>
                  ))}
                  <div className="flex h-[clamp(24px,2vw,34px)] w-[clamp(24px,2vw,34px)] items-center justify-center rounded-full bg-[#2E7D32] text-[clamp(9px,0.7vw,13px)] font-bold text-white shadow-md">
                    5
                  </div>
                </div>
                {/* Badge */}
                <div className="flex flex-col items-end">
                  <div className="flex h-[clamp(28px,2.5vw,42px)] w-[clamp(28px,2.5vw,42px)] items-center justify-center rounded-full bg-[#2E7D32] shadow-md">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[clamp(14px,1.2vw,22px)] w-[clamp(14px,1.2vw,22px)] text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="mt-0.5 text-right text-[clamp(7px,0.5vw,9px)] leading-tight font-semibold text-slate-400">
                    Rated by
                    <br />
                    Food Standards
                    <br />
                    Agency
                  </p>
                </div>
              </div>
              <p className="mt-[clamp(3px,0.3vw,5px)] text-[clamp(8px,0.55vw,10px)] font-bold tracking-widest text-[#2E7D32] uppercase">
                Very Good
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer row — same 10fr fraction as homepage row 5 ── */}
      <div className="overflow-hidden">
        <Footer />
      </div>
    </div>
  );
}
