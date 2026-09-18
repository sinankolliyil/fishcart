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
  Menu,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <aside className="z-50 flex h-full w-[var(--container-sidebar)] flex-shrink-0 flex-col overflow-hidden border-r border-gray-100 bg-[#F4F7FB] portrait:h-auto portrait:w-full portrait:border-b portrait:border-r-0 portrait:shadow-sm portrait:relative portrait:overflow-visible">
      {/* ── Logo ─────────────────────────────────────────────────────── */}
      <div className="relative p-[var(--sidebar-logo-padding)] pb-1 portrait:py-[clamp(16px,2.5vh,24px)] portrait:flex portrait:items-center portrait:justify-center">
        {/* Hamburger (Portrait only) */}
        <button
          className="hidden portrait:block absolute left-[var(--sidebar-logo-padding)] top-1/2 -translate-y-1/2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6 text-[#0D55CF]" /> : <Menu className="h-6 w-6 text-[#0D55CF]" />}
        </button>
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
            <h1 className="text-primary text-[clamp(14px,min(1.2vw,1.75svh),22px)] leading-none font-bold tracking-wide">
              FISHCART
            </h1>
            <p className="text-primary/70 mt-0.5 text-[clamp(9px,min(0.65vw,0.95svh),12px)] font-semibold tracking-wide">
              Daily Fresh Partner
            </p>
          </div>
        </Link>
      </div>

      {/* ── Promotional Ribbon (Portrait Only) ───────────────────────── */}
      <div className="hidden portrait:flex h-[36px] items-center overflow-hidden bg-[#0B1F5B] select-none shrink-0 border-b-2 border-white/10">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-marquee-custom {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
        `,
          }}
        />
        <div className="animate-marquee-custom flex items-center whitespace-nowrap">
          {/* List of Offers */}
          <div className="flex items-center space-x-6 px-4">
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.591 0l7.22-7.22a1.125 1.125 0 000-1.591L11.16 3.659A2.25 2.25 0 009.568 3z"
                />
              </svg>
              ON FRESH FISH
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5H3M21 12H3m18 4.5H3M12 3v18M7.5 7.5a3 3 0 100-6 3 3 0 000 6zM16.5 7.5a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
              Buy 2 Get 1 Free
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                />
              </svg>
              Weekend Chicken Deals
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125a1.125 1.125 0 001.125-1.125V9.75M8.25 18.75V14.25m0 0H12m.75 1.5h2.25M9 8.25h3m-3 3h3m7.5-3h1.125V12h-3.75z"
                />
              </svg>
              Free Delivery Above ₹999
            </span>
          </div>
          {/* Duplicate list for seamless looping */}
          <div className="flex items-center space-x-6 px-4">
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.591 0l7.22-7.22a1.125 1.125 0 000-1.591L11.16 3.659A2.25 2.25 0 009.568 3z"
                />
              </svg>
              ON FRESH FISH
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5H3M21 12H3m18 4.5H3M12 3v18M7.5 7.5a3 3 0 100-6 3 3 0 000 6zM16.5 7.5a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
              Buy 2 Get 1 Free
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                />
              </svg>
              Weekend Chicken Deals
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125a1.125 1.125 0 001.125-1.125V9.75M8.25 18.75V14.25m0 0H12m.75 1.5h2.25M9 8.25h3m-3 3h3m7.5-3h1.125V12h-3.75z"
                />
              </svg>
              Free Delivery Above ₹999
            </span>
          </div>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <nav className={cn(
        "flex flex-1 flex-col gap-[var(--sidebar-nav-gap)] overflow-hidden px-[var(--sidebar-nav-padding-x)] py-[var(--sidebar-nav-padding-y)]",
        "portrait:absolute portrait:top-full portrait:left-0 portrait:w-full portrait:bg-[#F4F7FB] portrait:shadow-lg portrait:z-50 portrait:py-4 portrait:h-[calc(100dvh-70px)] portrait:overflow-y-auto portrait:border-t portrait:border-gray-100",
        isMobileMenuOpen ? "portrait:flex" : "portrait:hidden"
      )}>
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
      <div className="px-[var(--sidebar-nav-padding-x)] pb-[var(--sidebar-nav-padding-x)] portrait:hidden">
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
