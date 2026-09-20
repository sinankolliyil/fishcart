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
    <div className="hidden portrait:flex fixed bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 w-[calc(100%-24px)] max-w-[600px] -translate-x-1/2 shrink-0 h-[72px] sm:h-[80px] bg-white/85 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-white/60 z-50 rounded-full justify-between items-center px-2 sm:px-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        const Icon = item.icon;
        
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full rounded-2xl py-1 transition-colors",
              isActive ? "text-[#0D55CF]" : "text-slate-400"
            )}
          >
            <Icon 
               className={cn(
                 "h-5 w-5 sm:h-6 sm:w-6 shrink-0",
                 isActive ? "stroke-[2.5]" : "stroke-[2]"
               )} 
            />
            <span className="text-[10px] sm:text-[12px] font-bold whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
