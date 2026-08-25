import React from 'react';
import { Fish, ShieldCheck, Phone, MessageSquare } from 'lucide-react';
import { BottomInfoItem } from '@/types/catalog';
import { cn } from '@/lib/utils';

export interface BottomInfoSectionProps {
  bottomInfo: BottomInfoItem[];
  category: 'fish' | 'meat' | 'chicken' | 'eggs';
}

function getInfoIcon(iconName: string, className?: string) {
  switch (iconName) {
    case 'fish':
      return <Fish className={className} />;
    case 'shield':
      return <ShieldCheck className={className} />;
    case 'phone':
      return <Phone className={className} />;
    case 'contact':
    default:
      return <MessageSquare className={className} />;
  }
}

export function BottomInfoSection({
  bottomInfo,
  category,
}: BottomInfoSectionProps) {
  const iconThemeColors = {
    fish: 'text-[#0D55CF] bg-blue-50/50 border-blue-100',
    meat: 'text-[#F0314A] bg-red-50/50 border-red-100',
    chicken: 'text-[#F59000] bg-orange-50/70 border-orange-100',
    eggs: 'text-[#10B981] bg-emerald-50/70 border-emerald-100',
  };

  const currentTheme = iconThemeColors[category] || iconThemeColors.fish;

  return (
    <div className="grid h-full min-h-0 w-full grid-cols-4 gap-[var(--main-gap)] overflow-hidden select-none">
      {bottomInfo.map((info, idx) => (
        <div
          key={idx}
          className="flex h-full min-h-0 items-center gap-[clamp(8px,0.9vw,14px)] rounded-[8px] bg-white px-[clamp(12px,1vw,18px)] py-[clamp(10px,1vw,16px)] "
        >
          {/* Circular Icon Container */}
          <div
            className={cn(
              'flex h-[clamp(18px,1.3vw,26px)] w-[clamp(18px,1.3vw,26px)] shrink-0 items-center justify-center rounded-full border',
              currentTheme
            )}
          >
            {getInfoIcon(
              info.iconName,
              'h-[clamp(10px,0.8vw,14px)] w-[clamp(10px,0.8vw,14px)] stroke-[2]'
            )}
          </div>

          {/* Text content details */}
          <div className="flex min-w-0 flex-1 flex-col justify-center pr-2">
            <h4 className="text-text-heading text-[clamp(15px,min(0.95vw,1.3svh),20px)] leading-tight font-black">
              {' '}
              {info.title}
            </h4>
            <p className="line-clamp-2 text-[clamp(11px,min(0.75vw,1.05svh),14px)] leading-[1.35] text-[#475569]">
              {' '}
              {info.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
