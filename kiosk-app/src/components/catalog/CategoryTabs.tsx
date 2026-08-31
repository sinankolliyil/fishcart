import React from 'react';
import { cn } from '@/lib/utils';
import { Fish, Globe, MoreHorizontal, Beef, Drumstick, Egg } from 'lucide-react';
import { CategoryTabItem } from '@/types/catalog';

// Custom Grill Icon
function GrillIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v4M5 12h14c0 3.87-3.13 7-7 7s-7-3.13-7-7z" />
      <path d="M7 12V8M17 12V8M12 12V8" />
      <path d="M8 19l-2 3M16 19l2 3" />
    </svg>
  );
}

// Custom Curry Bowl Icon
function CurryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2v3M9 2v3M15 2v3" />
      <path d="M4 11h16a1 1 0 0 1 1 1v3c0 3.3-2.7 6-6 6H9c-3.3 0-6-2.7-6-6v-3a1 1 0 0 1 1-1z" />
      <path d="M3 14h18" />
    </svg>
  );
}

// Map icon string to component
function getIcon(iconName: string, className?: string) {
  switch (iconName) {
    case 'fish':
      return <Fish className={className} />;
    case 'beef':
      return <Beef className={className} />;
    case 'drumstick':
      return <Drumstick className={className} />;
    case 'egg':
      return <Egg className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'grill':
      return <GrillIcon className={className} />;
    case 'curry':
      return <CurryIcon className={className} />;
    case 'dots':
    default:
      return <MoreHorizontal className={className} />;
  }
}

export interface CategoryTabsProps {
  tabs: CategoryTabItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  category: 'fish' | 'meat' | 'chicken' | 'eggs';
}

export function CategoryTabs({
  tabs,
  activeTabId,
  onTabChange,
  category,
}: CategoryTabsProps) {
  const activeBgColors = {
    fish: 'bg-[#0D55CF] border-[#0D55CF] shadow-[0_3px_8px_rgba(13,85,207,0.12)]',
    meat: 'bg-[#F0314A] border-[#F0314A] shadow-[0_3px_8px_rgba(240,49,74,0.12)]',
    chicken:
      'bg-[#F59000] border-[#F59000] shadow-[0_3px_8px_rgba(245,144,0,0.12)]',
    eggs: 'bg-[#10B981] border-[#10B981] shadow-[0_3px_8px_rgba(16,185,129,0.12)]',
  };

  const iconColors = {
    fish: 'text-[#0D55CF]',
    meat: 'text-[#F0314A]',
    chicken: 'text-[#F59000]',
    eggs: 'text-[#10B981]',
  };

  const darkTextColors = {
    fish: 'text-[#102B7B]',
    meat: 'text-[#5C1422]',
    chicken: 'text-[#663500]',
    eggs: 'text-[#09402B]',
  };

  const currentActiveStyle = activeBgColors[category] || activeBgColors.fish;
  const currentIconColor = iconColors[category] || iconColors.fish;
  const currentDarkTextColor = darkTextColors[category] || 'text-[#0A1835]';

  return (
    <div className="grid h-full min-h-0 w-full grid-cols-5 gap-[var(--main-gap)] overflow-hidden select-none">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex h-full min-h-0 flex-1 items-center gap-[clamp(4px,min(0.6vw,0.85svh),10px)]',
              'rounded-md border px-[clamp(4px,0.8vw,12px)] py-[clamp(2px,0.4vw,6px)]',
              'cursor-pointer overflow-hidden text-left transition-all duration-200',
              isActive
                ? cn('text-white', currentActiveStyle)
                : cn('border-gray-100 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.01)] hover:-translate-y-0.5 hover:', currentDarkTextColor)
            )}
          >
            {/* Icon Circle Wrapper */}
            <div
              className={cn(
                'flex h-[clamp(18px,1.4vw,25px)] w-[clamp(18px,1.4vw,25px)] shrink-0 items-center justify-center rounded-full transition-colors duration-200',
                isActive
                  ? 'bg-white/15 text-white'
                  : cn('bg-[#F4F7FB]', currentIconColor)
              )}
            >
              {getIcon(
                tab.iconName,
                'h-[clamp(18px,1.4vw,25px)] w-[clamp(18px,1.4vw,25px)] stroke-[2]'
              )}
            </div>

            {/* Text container */}
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[clamp(17px,min(1.2vw,1.6svh),22px)] leading-tight font-bold pb-[2px]">
                {tab.label}
              </span>
              <span
                className={cn(
                  'mt-0.5 text-[clamp(11px,min(0.9vw,1.25svh),14px)] leading-tight font-medium pb-[1px]',
                  isActive ? 'text-white/80' : 'opacity-80'
                )}
              >
                {tab.countLabel}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
