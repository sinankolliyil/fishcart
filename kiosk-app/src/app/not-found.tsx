'use client';

import Link from 'next/link';
import {
  Home,
  ArrowLeft,
  Fish,
  Beef,
  Drumstick,
  Egg,
  ChefHat,
  Phone,
  Compass,
} from 'lucide-react';

const CATEGORY_SHORTCUTS = [
  { href: '/fish', label: 'Fresh Fish', icon: Fish, color: 'text-[#0D55CF]', bg: 'bg-blue-50 hover:bg-blue-100/70 border-blue-100' },
  { href: '/meat', label: 'Prime Meat', icon: Beef, color: 'text-[#F0314A]', bg: 'bg-rose-50 hover:bg-rose-100/70 border-rose-100' },
  { href: '/chicken', label: 'Tender Chicken', icon: Drumstick, color: 'text-[#F59000]', bg: 'bg-amber-50 hover:bg-amber-100/70 border-amber-100' },
  { href: '/eggs', label: 'Farm Eggs', icon: Egg, color: 'text-[#10B981]', bg: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-100' },
  { href: '/cook', label: 'How to Cook', icon: ChefHat, color: 'text-[#0D55CF]', bg: 'bg-indigo-50 hover:indigo-100/70 border-indigo-100' },
  { href: '/contact', label: 'Contact Us', icon: Phone, color: 'text-[#0D55CF]', bg: 'bg-slate-50 hover:bg-slate-100 border-slate-200' },
];

export default function NotFound() {
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden rounded-[20px] border border-slate-100 bg-gradient-to-b from-[#F5F9FF] via-white to-[#F0F5FD] p-[clamp(20px,3.5vw,48px)] text-center shadow-[0_8px_32px_-6px_rgba(13,85,207,0.08)] select-none portrait:h-auto portrait:min-h-[85vh] portrait:py-12">
      {/* ── Ambient Background Lighting & Rings ── */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Decorative Wave lines */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full opacity-20"
        viewBox="0 0 1440 280"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 C320,260 480,80 720,180 C960,280 1200,100 1440,200 L1440,280 L0,280 Z"
          fill="url(#wave-gradient)"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0D55CF" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Central Graphic Illustration ── */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Floating Nautical Icon Circle */}
        <div
          className="relative mb-3 flex h-[clamp(80px,11svh,110px)] w-[clamp(80px,11svh,110px)] items-center justify-center rounded-full bg-gradient-to-tr from-[#0D55CF] to-[#1E6BFF] text-white shadow-xl shadow-blue-500/25"
          style={{ animation: 'floatBoat 4s ease-in-out infinite' }}
        >
          {/* Animated pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping opacity-25" />
          <Compass className="h-[clamp(38px,5.5svh,52px)] w-[clamp(38px,5.5svh,52px)] stroke-[1.75]" />

          {/* Floating Little Fish Badge */}
          <div className="absolute -bottom-1 -right-1 flex h-[clamp(30px,4svh,40px)] w-[clamp(30px,4svh,40px)] items-center justify-center rounded-full bg-white text-[#0D55CF] shadow-md border border-blue-100">
            <Fish className="h-[clamp(16px,2.2svh,22px)] w-[clamp(16px,2.2svh,22px)]" />
          </div>
        </div>

        {/* 404 Headline */}
        <div className="flex items-center gap-3">
          <span className="text-[clamp(56px,8.5svh,96px)] font-black tracking-tight leading-none bg-gradient-to-r from-[#0D55CF] via-[#1A63E0] to-[#0284C7] bg-clip-text text-transparent">
            404
          </span>
        </div>

        <h1 className="mt-2 text-[clamp(20px,2.6svh,30px)] font-extrabold text-[#102B7B] tracking-tight">
          Oops! This Catch Got Away
        </h1>

        <p className="mt-1.5 max-w-md text-[clamp(12px,1.4svh,15px)] text-slate-500 leading-relaxed">
          The page you are looking for has drifted off the coast, swam into deep waters, or no longer exists.
        </p>

        {/* ── Main Action Buttons ── */}
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-[12px] bg-[#0D55CF] px-[clamp(20px,2.2vw,32px)] py-[clamp(10px,1.4svh,14px)] text-[clamp(13px,1.35svh,15px)] font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-[#0A40A0] hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="h-[18px] w-[18px]" />
            <span>Return to Fresh Home</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = '/';
              }
            }}
            className="flex items-center gap-2 rounded-[12px] border border-slate-200 bg-white px-[clamp(18px,2vw,28px)] py-[clamp(10px,1.4svh,14px)] text-[clamp(13px,1.35svh,15px)] font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
            <span>Go Back</span>
          </button>
        </div>

        {/* ── Category Quick Links ── */}
        <div className="mt-8 flex flex-col items-center">
          <span className="text-[clamp(11px,1.2svh,13px)] font-semibold tracking-wide uppercase text-slate-400">
            Or explore our daily fresh aisles
          </span>

          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap max-w-xl">
            {CATEGORY_SHORTCUTS.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`flex items-center gap-2 rounded-[10px] border px-3.5 py-2 text-[clamp(12px,1.2svh,13px)] font-semibold text-slate-700 shadow-xs transition-all hover:-translate-y-0.5 ${cat.bg}`}
                >
                  <Icon className={`h-4 w-4 ${cat.color}`} />
                  <span>{cat.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style jsx global>{`
        @keyframes floatBoat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-2deg);
          }
        }
      `}</style>
    </div>
  );
}

