'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Fish, Beef, Drumstick, Egg } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
    },
    {
      label: 'Fish',
      icon: Fish,
      href: '/fish',
    },
    {
      label: 'Meat',
      icon: Beef,
      href: '/meat',
    },
    {
      label: 'Chicken',
      icon: Drumstick,
      href: '/chicken',
    },
    {
      label: 'Eggs',
      icon: Egg,
      href: '/eggs',
    },
  ];

  return (
    <div className="hidden portrait:flex fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 w-[calc(100%-24px)] max-w-[600px] -translate-x-1/2 shrink-0 h-[72px] sm:h-[80px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 z-50 rounded-full justify-between items-center px-2 sm:px-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;
        
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-row items-center justify-center gap-1 sm:gap-2 px-2.5 py-2 sm:px-4 sm:py-3 rounded-full transition-colors",
              isActive ? "bg-[#F0F6FF]" : "bg-transparent"
            )}
          >
            <Icon 
               className={cn(
                 "h-5 w-5 sm:h-7 sm:w-7 shrink-0",
                 isActive ? "stroke-[2.5] text-[#0D55CF]" : "stroke-[2] text-slate-400"
               )} 
            />
            {/* Show text only for active item or if there's enough space, but let's show for all as per image if it fits, or hide text for inactive? In the image all have text. */}
            <span className={cn(
              "text-[12px] sm:text-[16px] font-bold whitespace-nowrap",
              isActive ? "text-[#0D55CF]" : "text-slate-400"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
