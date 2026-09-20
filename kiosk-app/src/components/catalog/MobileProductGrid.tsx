'use client';

import React from 'react';
import { ProductItem } from '@/types/catalog';
import { ProductCard } from './ProductCard';

export interface MobileProductGridProps {
  products: ProductItem[];
  category: 'fish' | 'meat' | 'chicken' | 'eggs';
  totalItems: number;
  onOpenFilter?: () => void;
}

export function MobileProductGrid({
  products,
  category,
  totalItems,
  onOpenFilter,
}: MobileProductGridProps) {
  return (
    <div className="flex w-full flex-col px-2 pb-6">
      {/* Header Info */}
      <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2 pt-1">
        <span className="text-[14px] font-bold text-slate-600">
          {products.length} Products Found
        </span>
        {onOpenFilter && (
          <button
            onClick={onOpenFilter}
            className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-200 active:scale-95"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filter
          </button>
        )}
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center rounded-[12px] bg-white py-16 shadow-sm border border-slate-50">
          <svg
            className="mb-2 h-10 w-10 text-slate-300"
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
          <p className="text-center text-[13px] font-medium text-slate-500">
            No products match these filters.
          </p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-2 gap-2">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
            />
          ))}
        </div>
      )}
    </div>
  );
}
