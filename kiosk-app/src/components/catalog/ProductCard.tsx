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
    <Card className="group flex h-full min-h-0 w-full flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 select-none hover:shadow-md">
      {/* Product Image Container - flex-grow & min-h-0 to stretch/shrink dynamically */}
      <div className="relative flex min-h-0 w-full flex-1 items-center justify-center overflow-hidden bg-[#F8FAFC] p-1">
        <Image
          src={product.imageSrc}
          alt={product.title}
          fill
          sizes="20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-103"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFav(!isFav);
          }}
          className="text-text-muted absolute top-1.5 right-1.5 z-20 cursor-pointer rounded-full bg-white p-1 shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md active:scale-90"
        >
          <Heart
            className={cn(
              'h-3.5 w-3.5 stroke-[2.5]',
              isFav
                ? 'fill-[#F0314A] text-[#F0314A]'
                : 'text-text-muted hover:text-text-heading'
            )}
          />
        </button>
      </div>

      {/* Product Content Details - shrink-0 to retain vertical space */}
      <div className="flex min-h-0 shrink-0 flex-col border-t border-gray-50 bg-white p-2.5 pt-1.5 select-none">
        <div className="mb-1.5 flex flex-col">
          {/* Title */}
          <h3 className="text-text-heading group-hover:text-primary mb-0.5 truncate text-[clamp(17px,min(1.2vw,1.8svh),20px)] leading-tight font-black transition-colors">
            {product.title}
          </h3>

          {/* Details (Origin • Format) ,badge */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-text-muted text-[clamp(8px,0.68vw,9.5px)] leading-none font-bold">
              {product.origin} • {product.format}
            </span>

            {product.badgeLabel && (
              <Badge
                variant="soft"
                className={cn(
                  'rounded border px-2 py-0.5 text-[clamp(7px,0.55vw,9px)] leading-none font-bold',
                  currentBadgeBg
                )}
              >
                {product.badgeLabel}
              </Badge>
            )}
          </div>
        </div>

        {/* Price and Details link */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-1">
          <PriceDisplay
            price={product.price}
            unit={product.unit}
            className="text-text-heading text-[clamp(10px,min(0.85vw,1.25svh),13px)] leading-none font-black"
          />

          <Link
            href={`/product/${product.id}`}
            className={cn(
              'inline-flex shrink-0 items-center gap-0.5 text-[clamp(13px,min(0.9vw,1.2svh),14px)] font-extrabold transition-all duration-150',
              currentColorClass
            )}
          >
            <span className="group-hover:underline">Details</span>
            <ArrowRight className="h-3 w-3 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
