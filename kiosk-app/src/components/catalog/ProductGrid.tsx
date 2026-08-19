import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, List, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductItem } from '@/types/catalog';
import { PriceDisplay } from '@/components/shared/PriceDisplay';
import { ProductCard } from './ProductCard';

export interface ProductGridProps {
  products: ProductItem[];
  category: 'fish' | 'meat' | 'chicken' | 'eggs';
  totalItems: number;
  activeSort: string;
  onSortChange: (sort: string) => void;
}

export function ProductGrid({
  products,
  category,
  totalItems,
  activeSort,
  onSortChange,
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const colors = {
    fish: 'bg-[#0D55CF] text-white',
    meat: 'bg-[#F0314A] text-white',
    chicken: 'bg-[#F59000] text-white',
    eggs: 'bg-[#10B981] text-white',
  };

  const textThemeColors = {
    fish: 'text-[#0D55CF]',
    meat: 'text-[#F0314A]',
    chicken: 'text-[#F59000]',
    eggs: 'text-[#10B981]',
  };

  const currentActiveBg = colors[category] || colors.fish;
  const currentTextColor = textThemeColors[category] || textThemeColors.fish;

  const scrollRef = useRef<HTMLDivElement>(null);

  // Pagination logic: 8 items per page chunked
  const itemsPerPage = 8;
  const pages: ProductItem[][] = [];
  for (let i = 0; i < products.length; i += itemsPerPage) {
    pages.push(products.slice(i, i + itemsPerPage));
  }
  const totalPages = pages.length;
  
  // Ensure currentPage is valid if products change
  const validPage = Math.min(currentPage, Math.max(1, totalPages));
  if (validPage !== currentPage && validPage > 0) {
    setCurrentPage(validPage);
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const newPage = Math.round(scrollLeft / width) + 1;
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col justify-between overflow-hidden select-none">
      {/* Product List Header */}
      <div className="mb-2 flex shrink-0 items-center justify-between border-b border-gray-100 pb-1.5">
        {/* Count Label */}
        <div className="flex items-center gap-4">
          <span className="text-[clamp(12px,min(2vw,2.5svh),16px)] font-black text-[#475569]">
            Showing {(validPage - 1) * itemsPerPage + 1}-{Math.min(validPage * itemsPerPage, products.length)} of {totalItems} items
          </span>
        </div>

        {/* View Controls & Sort */}
        <div className="flex items-center gap-3">
          {/* View As Toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-text-muted text-[clamp(15px,min(0.9vw,1.25svh),15px)] font-bold">
              View:
            </span>
            <div className="border-gray-150 flex items-center gap-0.5 rounded-lg border bg-white p-0.5 shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'cursor-pointer rounded p-1 transition-all duration-150',
                  viewMode === 'grid'
                    ? currentActiveBg
                    : 'text-text-muted hover:text-text-heading hover:bg-slate-50'
                )}
                title="Grid view"
              >
                <Grid className="h-3.5 w-3.5 stroke-[2.5]" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'cursor-pointer rounded p-1 transition-all duration-150',
                  viewMode === 'list'
                    ? currentActiveBg
                    : 'text-text-muted hover:text-text-heading hover:bg-slate-50'
                )}
                title="List view"
              >
                <List className="h-3.5 w-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-text-muted text-[clamp(15px,min(0.9vw,1.25svh),15px)] font-bold">
              Sort:
            </span>
            <div className="relative">
              <select
                value={activeSort}
                onChange={(e) => onSortChange(e.target.value)}
                className="text-text-heading cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-0.5 pr-6 pl-2 text-[clamp(14px,min(0.9vw,1.25svh),15px)] font-bold shadow-sm outline-none focus:border-[#0D55CF]"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popularity">Popularity</option>
              </select>
              <ChevronDown className="text-text-muted pointer-events-none absolute top-1/2 right-1.5 h-3 w-3 -translate-y-1/2 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Product List Content Grid */}
      <div className="min-h-0 w-full flex-1 overflow-hidden relative group">
        {products.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <svg
              className="text-text-muted mb-2 h-10 w-10 opacity-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25-2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <h4 className="text-text-heading mb-0.5 text-[clamp(11px,1vw,14px)] font-bold">
              No products found
            </h4>
            <p className="text-text-muted max-w-[220px] text-center text-[clamp(8px,0.72vw,10.5px)]">
              No products match these filters.
            </p>
          </div>
        ) : (
          <div 
            ref={scrollRef} 
            onScroll={handleScroll}
            className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {pages.map((pageProducts, pageIdx) => (
              <div key={pageIdx} className="min-w-full h-full snap-center shrink-0">
                {viewMode === 'grid' ? (
                  <div className="grid h-full min-h-0 w-full grid-cols-4 grid-rows-2 gap-[var(--main-gap)] overflow-hidden">
                    {pageProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        category={category}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid h-full min-h-0 w-full grid-cols-2 grid-rows-4 gap-[var(--main-gap)] overflow-hidden">
                    {pageProducts.map((product) => (
                      <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        className="group flex h-full min-h-0 cursor-pointer items-center gap-2.5 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 shadow-sm transition-all hover:shadow-md"
                      >
                        {/* Image */}
                        <div className="relative aspect-square h-full shrink-0 overflow-hidden rounded-lg bg-slate-50">
                          <Image
                            src={product.imageSrc}
                            alt={product.title}
                            fill
                            sizes="10vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
        
                        {/* Title & Origin info */}
                        <div className="flex min-w-0 flex-1 flex-col">
                          <h4 
                            className={cn(
                              "text-text-heading truncate text-[clamp(9px,0.8vw,11.5px)] leading-none font-extrabold transition-colors",
                              category === 'fish' ? 'group-hover:text-[#0D55CF]' :
                              category === 'meat' ? 'group-hover:text-[#F0314A]' :
                              category === 'chicken' ? 'group-hover:text-[#F59000]' :
                              'group-hover:text-[#10B981]'
                            )}
                          >
                            {product.title}
                          </h4>
                          <p className="text-text-muted mt-0.5 truncate text-[clamp(7.5px,0.6vw,9.5px)]">
                            {product.origin} &bull; {product.format}
                          </p>
                          {product.badgeLabel && (
                            <span
                              className={cn(
                                'py-0.2 mt-1 w-fit rounded border px-1 text-[clamp(7px,0.55vw,9px)] leading-none font-extrabold',
                                category === 'fish'
                                  ? 'border-blue-100 bg-blue-50/70 text-[#0D55CF]'
                                  : category === 'meat'
                                    ? 'border-red-100 bg-red-50/70 text-[#F0314A]'
                                    : category === 'chicken'
                                      ? 'border-orange-100 bg-orange-50/70 text-[#F59000]'
                                      : 'border-emerald-100 bg-emerald-50/70 text-[#10B981]'
                              )}
                            >
                              {product.badgeLabel}
                            </span>
                          )}
                        </div>
        
                        {/* Price Display */}
                        <div className="shrink-0 pr-1 text-right">
                          <PriceDisplay
                            price={product.price}
                            unit={product.unit}
                            className="text-text-heading text-[clamp(9px,0.8vw,12px)] font-black"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Floating Prev Button */}
        {totalPages > 1 && (
          <button
            onClick={scrollPrev}
            className={cn(
              "absolute left-[-10px] top-1/2 z-10 hidden h-[clamp(30px,min(2.5vw,3.5svh),40px)] w-[clamp(30px,min(2.5vw,3.5svh),40px)] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white/95 text-[#0D55CF] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all hover:scale-110 md:flex",
              validPage === 1 ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <ChevronLeft className="h-[60%] w-[60%] stroke-[2.5]" />
          </button>
        )}

        {/* Floating Next Button */}
        {totalPages > 1 && (
          <button
            onClick={scrollNext}
            className={cn(
              "absolute right-[-10px] top-1/2 z-10 hidden h-[clamp(30px,min(2.5vw,3.5svh),40px)] w-[clamp(30px,min(2.5vw,3.5svh),40px)] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white/95 text-[#0D55CF] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all hover:scale-110 md:flex",
              validPage === totalPages ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <ChevronRight className="h-[60%] w-[60%] stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
}
