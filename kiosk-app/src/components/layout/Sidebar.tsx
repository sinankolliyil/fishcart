'use client';
import { useState } from 'react';

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
  MessageSquareHeart,
  Users,
  Phone,
  ShieldCheck,
  X,
  QrCode,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home, color: 'text-[#0D55CF]' },
  { href: '/fish', label: 'Fish', icon: Fish, color: 'text-[#0D55CF]' },
  { href: '/meat', label: 'Meat', icon: Beef, color: 'text-[#F0314A]' },
  {
    href: '/chicken',
    label: 'Chicken',
    icon: Drumstick,
    color: 'text-[#F59000]',
  },
  { href: '/eggs', label: 'Eggs', icon: Egg, color: 'text-[#10B981]' },
  { href: '/cook', label: 'How to Cook', icon: ChefHat, color: 'text-[#0D55CF]' },
  { href: '/benefits', label: 'Benefits', icon: HeartPulse, color: 'text-[#0D55CF]' },
  {
    href: '/story',
    label: 'Our Stories',
    icon: BookOpen,
    color: 'text-[#0D55CF] ',
  },
  { href: '/testimonials', label: 'Testimonials', icon: MessageSquareHeart, color: 'text-[#0D55CF]' },
  { href: '/about', label: 'About Us', icon: Users, color: 'text-[#0D55CF]' },
  { href: '/contact', label: 'Contact Us', icon: Phone, color: 'text-[#0D55CF]' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  return (
    <aside className="z-50 flex h-full w-[var(--container-sidebar)] flex-shrink-0 flex-col overflow-hidden border-r border-gray-100 bg-[#F4F7FB]">
      {/* ── Logo ─────────────────────────────────────────────────────── */}
      <div className="p-[var(--sidebar-logo-padding)] pb-1">
        <Link
          href="/"
          className="flex items-center gap-[clamp(6px,min(0.63vw,0.9svh),10px)]"
        >
          <div className="text-primary flex -space-x-1.5">
            <svg
              width="40"
              height="40"
              className="h-[clamp(28px,min(2.5vw,3.8svh),46px)] w-[clamp(28px,min(2.5vw,3.8svh),46px)]"
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
          <div className="mt-0.5">
            <h1 className="text-primary text-[clamp(14px,min(1.2vw,1.75svh),22px)] leading-none font-black tracking-wide">
              FISHCART
            </h1>
            <p className="text-primary/70 mt-0.5 text-[clamp(9px,min(0.65vw,0.95svh),12px)] font-semibold tracking-wide">
              Daily Fresh Partner
            </p>
          </div>
        </Link>
      </div>

      {/* ── Navigation ───────────────────────────────────────────────── */}
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
                /*
                 * Each nav item is a self-contained button-like element.
                 *
                 * Key decisions:
                 * - `min-h-[var(--sidebar-item-min-h)]` guarantees every button
                 *   has a comfortable touch/click area across all viewport sizes.
                 * - `items-center` keeps icon + label perfectly vertically centred.
                 * - `py-[var(--sidebar-item-py)]` adds extra breathing room above
                 *   and below the content inside the button.
                 * - `flex-1` on the nav means all 10 buttons share equal height
                 *   distribution in the available space.
                 */
                'flex flex-1 items-center gap-[var(--sidebar-item-gap)]',
                'min-h-[var(--sidebar-item-min-h)]',
                'rounded-[clamp(10px,min(1vw,1.5svh),16px)] border',
                'px-[var(--sidebar-item-px)] py-[var(--sidebar-item-py)]',
                'font-bold transition-all',
                'text-[clamp(18px,min(0.82vw,1.2svh),14px)]',
                isActive
                  ? 'border-[#0D55CF] bg-[#0D55CF] text-white shadow-[0_4px_12px_rgba(13,85,207,0.2)]'
                  : 'border-gray-100 bg-white text-[#1E293B] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 hover:'
              )}
            >
              <item.icon
                strokeWidth={isActive ? 2.5 : 2}
                className={cn(
                  'h-[var(--sidebar-item-icon-size)] w-[var(--sidebar-item-icon-size)] shrink-0',
                  isActive ? 'text-white' : item.color
                )}
              />
              <span className="truncate tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Scan Now Card ───────────────────────────────────────── */}
      <div className="px-[var(--sidebar-nav-padding-x)] pb-[var(--sidebar-nav-padding-x)]">
        <div 
          onClick={() => setIsQRModalOpen(true)}
          className="cursor-pointer rounded-[clamp(10px,min(1vw,1.5svh),16px)] bg-[#0D55CF] p-[var(--sidebar-community-padding)] py-[clamp(12px,min(1.5vw,2svh),20px)]  transition-transform hover:-translate-y-0.5 hover: flex flex-col items-center justify-center"
        >
          <QrCode className="mb-[clamp(4px,min(0.5vw,0.7svh),8px)] h-[clamp(28px,min(3vw,4.5svh),42px)] w-[clamp(28px,min(3vw,4.5svh),42px)] text-white" />
          <h3 className="text-center text-[clamp(13px,min(1.2vw,1.6svh),18px)] font-bold text-white">
            Tap Here to Scan & Join
          </h3>
          <p className="mt-[clamp(2px,min(0.4vw,0.55svh),5px)] text-center text-[clamp(10px,min(0.75vw,1.1svh),13px)] text-white/90">
            Join Our Community
          </p>
        </div>
      </div>

      {/* ── QR Modal ───────────────────────────────────────────── */}
      {isQRModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsQRModalOpen(false)}
        >
        
          <div 
            className="relative flex flex-col items-center justify-center rounded-[24px] bg-white p-[clamp(24px,3vw,40px)]  animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            
          >
            
            <button 
              onClick={() => setIsQRModalOpen(false)}
              className="absolute right-[clamp(12px,1.5vw,20px)] top-[clamp(12px,1.5vw,20px)] rounded-full bg-gray-100 p-[clamp(6px,0.8vw,10px)] text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
            >
              <X className="h-[clamp(18px,2vw,24px)] w-[clamp(18px,2vw,24px)]" />
            </button>
            <h2 className="mb-2 text-[clamp(20px,2.5vw,32px)] font-bold text-[#0D55CF]">Scan to Join</h2>
            <p className="mb-[clamp(16px,2vw,24px)] text-center text-[clamp(13px,1.2vw,16px)] text-gray-500">
              Scan this QR code with your phone camera <br /> to join our WhatsApp community.
            </p>
            <div className="rounded-[8px] border-[4px] border-[#0D55CF]/10 p-[clamp(12px,1.5vw,20px)]  bg-white">
              <Image
                src="/assets/whatsapp_qr.png"
                alt="WhatsApp QR"
                width={250}
                height={250}
                className="h-[clamp(150px,18vw,250px)] w-[clamp(150px,18vw,250px)] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Contact Badge — currently hidden
      <div className="mt-auto px-3 pt-2 pb-3 lg:px-[clamp(12px,0.83vw,16px)] lg:pb-[clamp(10px,0.83vw,16px)]">
        <div className="relative flex items-center justify-between overflow-hidden rounded-[8px] bg-[#0D55CF] p-3 text-white  lg:p-[var(--sidebar-contact-padding)]">
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
      </div> */}
    </aside>
  );
}
