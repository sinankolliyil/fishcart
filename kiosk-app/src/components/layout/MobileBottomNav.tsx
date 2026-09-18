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
      activeColor: 'text-[#0D55CF]',
      inactiveColor: 'text-slate-500',
    },
    {
      label: 'Fish',
      icon: Fish,
      href: '/fish',
      activeColor: 'text-[#0D55CF]',
      inactiveColor: 'text-slate-500',
    },
    {
      label: 'Meat',
      icon: Beef,
      href: '/meat',
      activeColor: 'text-[#FF4A5C]',
      inactiveColor: 'text-[#FF4A5C]', // Red for Meat even inactive based on reference image? Wait, reference image shows inactive Meat as red outline, Chicken as orange outline. Home is blue. Fish and Eggs are gray.
    },
    {
      label: 'Chicken',
      icon: Drumstick,
      href: '/chicken',
      activeColor: 'text-[#F59000]',
      inactiveColor: 'text-[#F59000]',
    },
    {
      label: 'Eggs',
      icon: Egg,
      href: '/eggs',
      activeColor: 'text-[#0D55CF]',
      inactiveColor: 'text-slate-500',
    },
  ];

  return (
    <div className="hidden portrait:flex fixed bottom-0 left-0 right-0 h-[70px] bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-t border-slate-100 z-50 rounded-t-[20px] justify-between items-center px-6 pb-2 pt-3">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        // Match reference image colors exactly
        let colorClass = '';
        if (isActive) {
           colorClass = item.activeColor;
        } else {
           if (item.label === 'Meat') colorClass = 'text-[#FF4A5C]';
           else if (item.label === 'Chicken') colorClass = 'text-[#F59000]';
           else colorClass = 'text-slate-400'; // Fish and Eggs are gray
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 min-w-[50px]",
              isActive ? item.activeColor : colorClass
            )}
          >
            <Icon 
               className={cn(
                 "h-6 w-6 stroke-[2]",
                 isActive && "stroke-[2.5]" // Slightly bolder if active
               )} 
            />
            <span className={cn(
              "text-[10px] font-bold",
              isActive ? item.activeColor : colorClass
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
