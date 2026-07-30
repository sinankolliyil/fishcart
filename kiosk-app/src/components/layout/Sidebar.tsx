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
    <aside className="z-50 flex h-auto w-[220px] flex-shrink-0 flex-col overflow-hidden border-r border-gray-100 bg-[#F4F7FB] lg:h-full lg:w-[clamp(220px,14.6vw,295px)] lg:overflow-hidden">
      {/* Logo */}
      <div className="p-4 pb-1 lg:p-[var(--sidebar-logo-padding)] lg:pb-1">
        <Link
          href="/"
          className="flex items-center gap-2 lg:gap-[clamp(8px,0.63vw,12px)]"
        >
          <div className="text-primary flex -space-x-1.5">
            <svg
              width="40"
              height="40"
              className="h-10 w-10 lg:h-[clamp(38px,2.7vw,52px)] lg:w-[clamp(38px,2.7vw,52px)]"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 8L8 21L18 34"
                stroke="#0D55CF"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="18.5" cy="21" r="2.8" fill="#0D55CF" />
              <path
                d="M33 13L26 21L33 28"
                stroke="#0D55CF"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mt-1">
            <h1 className="text-primary text-[18px] leading-none font-black tracking-wide lg:text-[clamp(18px,1.25vw,24px)]">
              FISHCART
            </h1>
            <p className="text-primary/70 mt-1 text-[11px] font-semibold tracking-wide lg:text-[clamp(11px,0.677vw,13px)]">
              Daily Fresh Partner
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-[var(--sidebar-nav-gap)] overflow-hidden px-[var(--sidebar-nav-padding-x)] py-[var(--sidebar-nav-padding-y)]">
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
                'flex items-center gap-3 rounded-[16px] border px-3 py-2.5 text-[13px] font-bold transition-all lg:gap-[var(--sidebar-item-gap)] lg:px-[var(--sidebar-item-px)] lg:py-[var(--sidebar-item-py)] lg:text-[clamp(13px,0.78vw,15px)]',
                isActive
                  ? 'border-[#0D55CF] bg-[#0D55CF] text-white shadow-[0_4px_12px_rgba(13,85,207,0.2)]'
                  : 'border-gray-100 bg-white text-[#1E293B] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 hover:shadow-md'
              )}
            >
              <item.icon
                strokeWidth={isActive ? 2.5 : 2}
                className={cn(
                  'h-[18px] w-[18px] shrink-0 lg:h-[var(--sidebar-item-icon-size)] lg:w-[var(--sidebar-item-icon-size)]',
                  isActive ? 'text-white' : item.color
                )}
              />
              <span className="truncate tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Join Community Card */}
      <div className="px-3 pb-3 lg:px-[clamp(12px,0.83vw,16px)] lg:pb-[clamp(10px,0.83vw,16px)]">
        <div className="rounded-[16px] bg-[#EAF3FF] p-2 shadow-sm lg:p-[var(--sidebar-community-padding)]">
          <h3 className="text-center text-[15px] font-bold text-[#0D55CF] lg:text-[clamp(15px,1.04vw,20px)]">
            Join Our Community
          </h3>

          <p className="mt-1 text-center text-[11px] leading-[1.5] text-[#475569] lg:mt-[clamp(4px,0.42vw,8px)] lg:text-[clamp(11px,0.677vw,13px)]">
            Be a part of our journey for
            <br />
            healthy and delicious living.
          </p>

          <div className="mt-3 flex justify-center lg:mt-[clamp(10px,0.83vw,16px)]">
            <Image
              src="/assets/whatsapp_qr.png"
              alt="WhatsApp QR"
              width={80}
              height={80}
              className="rounded-lg bg-white p-1.5 lg:h-[var(--sidebar-community-qr-size)] lg:w-[var(--sidebar-community-qr-size)] lg:p-1.5"
            />
          </div>

          <button className="mt-3 flex h-[38px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#0D55CF] text-[13px] font-bold text-white lg:mt-2.5 lg:h-[var(--sidebar-community-btn-h)] lg:text-[clamp(13px,0.78vw,15px)]">
            Join Us
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bottom Contact Badge 
      <div className="mt-auto px-3 pt-2 pb-3 lg:px-[clamp(12px,0.83vw,16px)] lg:pb-[clamp(10px,0.83vw,16px)]">
        <div className="relative flex items-center justify-between overflow-hidden rounded-[16px] bg-[#0D55CF] p-3 text-white shadow-sm lg:p-[var(--sidebar-contact-padding)]">
          <div className="relative z-10 w-[75%]">
            <h4 className="text-[13px] leading-snug font-bold text-white lg:text-[clamp(13px,0.83vw,16px)]">
              Contact Us
            </h4>
            <p className="pr-2 text-[11px] leading-relaxed text-white/90 lg:text-[clamp(11px,0.73vw,14px)]">
              Unit 5 Hythe Quay,
              <br />
              Colchester,England,CO2 hello@fishcart.co.uk
              <br />
              +44 1206 123456
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <ShieldCheck className="h-[28px] w-[28px] stroke-[1] text-white lg:h-[var(--sidebar-contact-icon-size)] lg:w-[var(--sidebar-contact-icon-size)]" />
          </div>
        </div>
      </div>   */}
    </aside>
  );
}
