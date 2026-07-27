"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home, color: "text-surface" },
  { href: "/fish", label: "Fish", icon: Fish, color: "text-[#0D55CF]" },
  { href: "/meat", label: "Meat", icon: Beef, color: "text-[#F0314A]" },
  { href: "/chicken", label: "Chicken", icon: Drumstick, color: "text-[#F59000]" },
  { href: "/eggs", label: "Eggs", icon: Egg, color: "text-[#F5A623]" },
  { href: "#", label: "How to Cook", icon: ChefHat, color: "text-[#0D55CF]" },
  { href: "#", label: "Benefits", icon: HeartPulse, color: "text-[#0D55CF]" },
  { href: "/story", label: "Our Stories", icon: BookOpen, color: "text-[#0D55CF]" },
  { href: "#", label: "About Us", icon: Info, color: "text-[#0D55CF]" },
  { href: "#", label: "Contact Us", icon: Phone, color: "text-[#0D55CF]" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] flex-shrink-0 bg-[#F4F7FB] h-full flex flex-col overflow-hidden border-r border-gray-100 z-50">
      {/* Logo */}
      <div className="p-6 pb-2">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex -space-x-1.5 text-primary">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" viewBox="0 0 24 24" className="w-8 h-8">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" viewBox="0 0 24 24" className="w-8 h-8">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </div>
          <div className="mt-1">
            <h1 className="text-[22px] font-black text-primary tracking-wide leading-none">
              FISHCART
            </h1>
            <p className="text-[11px] text-primary/70 mt-1 font-semibold tracking-wide">
              Daily Fresh Partner
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          // Exact match for home, startsWith for others to keep active state on sub-pages
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "#";

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-[16px] text-[15px] font-bold transition-all border",
                isActive
                  ? "bg-[#0D55CF] text-white border-[#0D55CF] shadow-[0_4px_12px_rgba(13,85,207,0.2)]"
                  : "bg-white text-[#1E293B] border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:-translate-y-0.5"
              )}
            >
              <item.icon
                strokeWidth={isActive ? 2.5 : 2}
                className={cn(
                  "w-[22px] h-[22px]",
                  isActive ? "text-white" : item.color
                )}
              />
              <span className="truncate tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Promo Badge */}
      <div className="p-4 mt-auto">
        <div className="bg-[#3BA3FF] rounded-[16px] p-5 text-white relative overflow-hidden flex items-center justify-between shadow-sm">
          <div className="relative z-10 w-[75%]">
            <h4 className="font-bold text-[14px] mb-1 leading-snug text-white">
              Freshness<br />You Can Trust
            </h4>
            <p className="text-[10px] text-white/90 leading-relaxed pr-2">
              We ensure premium quality and freshness in every product we deliver.
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <ShieldCheck className="w-[36px] h-[36px] stroke-[1] text-white" />
          </div>
        </div>
      </div>
    </aside>
  );
}
