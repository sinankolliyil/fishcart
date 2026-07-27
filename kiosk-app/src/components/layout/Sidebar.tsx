'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  Home,
  Fish,
  Beef,
  Drumstick,
  Egg,
  ChefHat,
  HeartPulse,
  BookOpen,
  Info,
  Phone,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home, color: 'text-surface' },
  { href: '/fish', label: 'Fish', icon: Fish, color: 'text-[#0D55CF]' },
  { href: '/meat', label: 'Meat', icon: Beef, color: 'text-[#F0314A]' },
  {
    href: '/chicken',
    label: 'Chicken',
    icon: Drumstick,
    color: 'text-[#F59000]',
  },
  { href: '/eggs', label: 'Eggs', icon: Egg, color: 'text-[#F5A623]' },
  { href: '#', label: 'How to Cook', icon: ChefHat, color: 'text-[#0D55CF]' },
  { href: '#', label: 'Benefits', icon: HeartPulse, color: 'text-[#0D55CF]' },
  {
    href: '/story',
    label: 'Our Stories',
    icon: BookOpen,
    color: 'text-[#0D55CF]',
  },
  { href: '#', label: 'About Us', icon: Info, color: 'text-[#0D55CF]' },
  { href: '#', label: 'Contact Us', icon: Phone, color: 'text-[#0D55CF]' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="z-50 flex h-full w-[280px] flex-shrink-0 flex-col overflow-hidden border-r border-gray-100 bg-[#F4F7FB]">
      {/* Logo */}
      <div className="p-6 pb-2">
        <Link href="/" className="flex items-center gap-3">
          <div className="text-primary flex -space-x-1.5">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              viewBox="0 0 24 24"
              className="h-8 w-8"
            >
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              viewBox="0 0 24 24"
              className="h-8 w-8"
            >
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </div>
          <div className="mt-1">
            <h1 className="text-primary text-[22px] leading-none font-black tracking-wide">
              FISHCART
            </h1>
            <p className="text-primary/70 mt-1 text-[11px] font-semibold tracking-wide">
              Daily Fresh Partner
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
        {NAV_ITEMS.map((item) => {
          // Exact match for home, startsWith for others to keep active state on sub-pages
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href) && item.href !== '#';

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-4 rounded-[16px] border px-4 py-3.5 text-[15px] font-bold transition-all',
                isActive
                  ? 'border-[#0D55CF] bg-[#0D55CF] text-white shadow-[0_4px_12px_rgba(13,85,207,0.2)]'
                  : 'border-gray-100 bg-white text-[#1E293B] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 hover:shadow-md'
              )}
            >
              <item.icon
                strokeWidth={isActive ? 2.5 : 2}
                className={cn(
                  'h-[22px] w-[22px]',
                  isActive ? 'text-white' : item.color
                )}
              />
              <span className="truncate tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {/* Join Community Card */}
      <div className="px-4 pb-4">
        <div className="rounded-[16px] bg-[#EAF3FF] p-4 shadow-sm">
          <h3 className="text-center text-[20px] font-bold text-[#0D55CF]">
            Join Our Community
          </h3>

          <p className="mt-2 text-center text-[13px] leading-[1.5] text-[#475569]">
            Be a part of our journey for
            <br />
            healthy and delicious living.
          </p>

          <div className="mt-4 flex justify-center">
            <Image
              src="/assets/whatsapp_qr.png"
              alt="WhatsApp QR"
              width={120}
              height={120}
              className="rounded-lg bg-white p-2"
            />
          </div>

          <button className="mt-5 flex h-[44px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#0D55CF] text-[15px] font-bold text-white">
            Join Us
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* Bottom Promo Badge */}
      <div className="mt-auto p-4">
        <div className="relative flex items-center justify-between overflow-hidden rounded-[16px] bg-[#0D55CF] p-5 text-white shadow-sm">
          <div className="relative z-10 w-[75%]">
            <h4 className="mb-1 text-[14px] leading-snug font-bold text-white">
              Freshness
              <br />
              You Can Trust
            </h4>
            <p className="pr-2 text-[10px] leading-relaxed text-white/90">
              We ensure premium quality and freshness in every product we
              deliver.
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <ShieldCheck className="h-[36px] w-[36px] stroke-[1] text-white" />
          </div>
        </div>
      </div>
    </aside>
  );
}
