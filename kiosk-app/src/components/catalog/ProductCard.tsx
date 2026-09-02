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

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex h-full min-h-0 w-full flex-col justify-between overflow-hidden rounded-[8px] border border-slate-200 bg-[#F8FAFC] transition-all duration-200 select-none hover:cursor-pointer"
    >
      {/* Product Image Container - flex-grow & min-h-0 to stretch/shrink dynamically */}
      <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden bg-[#F8FAFC] p-1">
        <Image
          src={product.imageSrc}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />

        {/* Favorite Heart Button */}
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
      </div>

      {/* Product Content Details - shrink-0 to retain vertical space */}
      <div className="flex min-h-0 shrink-0 flex-col p-2.5 pt-3.5 select-none">
        <div className="mb-1 flex flex-col">
          {/* Title */}
          <h3
            className={cn(
              'mb-0.5 truncate text-[15px] leading-tight font-bold transition-colors text-slate-800',
              category === 'fish'
                ? 'group-hover:text-[#0D55CF]'
                : category === 'meat'
                  ? 'group-hover:text-[#F0314A]'
                  : category === 'chicken'
                    ? 'group-hover:text-[#F59000]'
                    : 'group-hover:text-[#10B981]'
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
        <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-2">
          <PriceDisplay
            price={product.price}
            unit={product.unit}
            className="text-slate-900 text-[15px] leading-none font-bold [&>span]:text-[11px]"
          />

          <div
            className={cn(
              'inline-flex shrink-0 items-center gap-1 text-[13px] font-bold transition-all duration-150',
              currentColorClass
            )}
          >
            <span className="group-hover:underline">Details</span>
            <ArrowRight className="h-[clamp(9px,0.8vw,12px)] w-[clamp(9px,0.8vw,12px)] stroke-[2.5]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
