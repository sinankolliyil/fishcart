import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { ProductItem } from '@/types/catalog';
import { cn } from '@/lib/utils';

export interface ProductCardProps {
  product: ProductItem;
  category: 'fish' | 'meat' | 'chicken' | 'eggs';
}

export function ProductCard({ product, category }: ProductCardProps) {
  const [isFav, setIsFav] = useState(product.isFavorite || false);
  const isDisabled = Boolean(
    product.isDisabled ||
    product.status === 'disabled' ||
    (product as any).availabilityStatus === 'disabled'
  );

  const colors = {
    fish: 'text-[#0D55CF] hover:text-[#0c4dbd]',
    meat: 'text-[#F0314A] hover:text-[#db233b]',
    chicken: 'text-[#F59000] hover:text-[#dd8000]',
    eggs: 'text-[#10B981] hover:text-[#0e9f6e]',
  };

  const badgeBgColors = {
    fish: 'bg-blue-50/70 text-[#0D55CF] border-blue-100',
    meat: 'bg-red-50/70 text-[#F0314A] border-red-100',
    chicken: 'bg-orange-50/70 text-[#F59000] border-orange-100',
    eggs: 'bg-emerald-50/70 text-[#10B981] border-emerald-100',
  };

  const currentColorClass = colors[category] || colors.fish;
  const currentBadgeBg = badgeBgColors[category] || badgeBgColors.fish;

  const cardContent = (
    <>
      {/* Product Image Container - flex-grow & min-h-0 to stretch/shrink dynamically */}
      <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden bg-[#F8FAFC] p-1 portrait:aspect-square portrait:min-h-[160px]">
        {product.imageSrc ? (
          <Image
            src={product.imageSrc}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <svg viewBox="0 0 64 64" className="h-10 w-10 opacity-30" fill="currentColor">
              <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm0 4c11.0 0 20 9.0 20 20s-9.0 20-20 20S12 43.0 12 32 21.0 12 32 12zm-2 8v14l10 6-2 3.5-12-7V20h4z"/>
            </svg>
          </div>
        )}

        {/* Disabled Overlay Badge */}
        {isDisabled && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
            <span className="rounded-md bg-slate-800/80 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              Currently Unavailable
            </span>
          </div>
        )}

        {/* Favorite Heart Button (only active when enabled) */}
        {!isDisabled && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFav(!isFav);
            }}
            className="text-text-muted hover: absolute top-[clamp(2px,0.4vw,6px)] right-[clamp(2px,0.4vw,6px)] z-20 cursor-pointer rounded-full bg-white p-[clamp(2px,0.3vw,4px)] transition-all duration-200 hover:bg-white active:scale-90"
          >
            <Heart
              className={cn(
                'h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] stroke-[2.5]',
                isFav
                  ? 'fill-[#F0314A] text-[#F0314A]'
                  : 'text-text-muted hover:text-text-heading'
              )}
            />
          </button>
        )}
      </div>

      {/* Product Content Details - shrink-0 to retain vertical space */}
      <div className="flex min-h-0 shrink-0 flex-col p-2.5 pt-3.5 select-none">
        <div className="mb-1 flex flex-col">
          {/* Title */}
          <h3
            className={cn(
              'mb-0.5 truncate text-[15px] leading-tight font-bold transition-colors text-slate-800',
              !isDisabled && (
                category === 'fish'
                  ? 'group-hover:text-[#0D55CF]'
                  : category === 'meat'
                    ? 'group-hover:text-[#F0314A]'
                    : category === 'chicken'
                      ? 'group-hover:text-[#F59000]'
                      : 'group-hover:text-[#10B981]'
              )
            )}
          >
            {product.title}
          </h3>

          {/* Details (Origin • Format) ,badge */}
          <div className="mt-1 flex flex-col items-start gap-1">
            <span className="text-slate-500 text-[13px] leading-none font-medium">
              {product.origin} • {product.format}
            </span>

            {product.badgeLabel && (
              <Badge
                variant="soft"
                className={cn(
                  'mt-0.5 rounded border px-2 py-0.5 text-[11px] leading-none font-bold',
                  currentBadgeBg
                )}
              >
                {product.badgeLabel}
              </Badge>
            )}
          </div>
        </div>

        {/* Price and Details link */}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-2 min-w-0">
          <PriceDisplay
            price={product.price}
            unit={product.unit}
            className="text-slate-900 text-[14px] portrait:text-[13px] leading-none font-bold whitespace-nowrap shrink-0 [&>span]:text-[10px] portrait:[&>span]:text-[9.5px]"
          />

          <div
            className={cn(
              'inline-flex shrink-0 items-center gap-0.5 text-[12px] portrait:text-[11px] font-bold transition-all duration-150 ml-1',
              isDisabled ? 'text-slate-400' : currentColorClass
            )}
          >
            <span className={isDisabled ? '' : 'group-hover:underline'}>
              {isDisabled ? 'Unavailable' : 'Details'}
            </span>
            {!isDisabled && <ArrowRight className="h-3 w-3 portrait:h-2.5 portrait:w-2.5 stroke-[2.5]" />}
          </div>
        </div>
      </div>
    </>
  );

  if (isDisabled) {
    return (
      <div
        className="group flex h-full min-h-0 w-full flex-col justify-between overflow-hidden rounded-[8px] border border-slate-200 bg-[#F8FAFC] opacity-50 grayscale pointer-events-none cursor-not-allowed select-none"
      >
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex h-full min-h-0 w-full flex-col justify-between overflow-hidden rounded-[8px] border border-slate-200 bg-[#F8FAFC] transition-all duration-200 select-none hover:cursor-pointer"
    >
      {cardContent}
    </Link>
  );
}
