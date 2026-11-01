'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

export default function WishlistPage() {
  const { wishlist, wishlistCount, removeFromWishlist, addToCart } = useStore();

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto px-4 py-4 lg:px-8 lg:py-6">
      {/* ── Top Header ────────────────────────────────────────────── */}
      <div className="mb-4 flex shrink-0 items-center justify-between border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-600 shadow-xs transition-colors hover:bg-slate-100 hover:text-blue-600 active:scale-95 border border-slate-200"
            title="Back to Home"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 lg:text-2xl">
                Liked Items
              </h1>
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-100 px-2 text-xs font-bold text-[#F0314A]">
                {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Your favorite items are saved here until you remove them.
            </p>
          </div>
        </div>

        {wishlist.length > 0 && (
          <Link
            href="/cart"
            className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#0D55CF] transition-colors hover:bg-blue-50 active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            View Cart
          </Link>
        )}
      </div>

      {/* ── Main Content Area ─────────────────────────────────────── */}
      {wishlist.length === 0 ? (
        /* Empty State */
        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
          <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-[#F0314A] shadow-inner">
            <Heart className="h-12 w-12 stroke-[1.8]" />
            <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-white shadow-md">
              <Sparkles className="h-4 w-4 fill-white" />
            </span>
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-900">No liked items yet</h2>
          <p className="mb-6 max-w-md text-sm text-slate-500">
            Tap the heart icon on any product in our category lists or product details pages to keep your
            favorite items saved here.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/fish"
              className="flex items-center gap-2 rounded-xl bg-[#0D55CF] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95"
            >
              Browse Fresh Fish <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/meat"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 active:scale-95"
            >
              Fresh Meat
            </Link>
            <Link
              href="/chicken"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 active:scale-95"
            >
              Farm Chicken
            </Link>
          </div>
        </div>
      ) : (
        /* Wishlist Grid */
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-200 hover:border-blue-300 hover:shadow-md"
            >
              {/* Product Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-300">
                    <Heart className="h-8 w-8 opacity-30" />
                  </div>
                )}

                {/* Remove / Unlike Heart Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWishlist(item.id);
                  }}
                  className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#F0314A] shadow-xs backdrop-blur-xs transition-transform hover:scale-110 active:scale-90"
                  title="Remove from liked"
                >
                  <Heart className="h-4 w-4 fill-[#F0314A] stroke-[2.5]" />
                </button>

                {/* Category Pill */}
                {item.category && (
                  <span className="absolute bottom-2 left-2 rounded-md bg-slate-900/70 px-2 py-0.5 text-[10px] font-bold text-white capitalize backdrop-blur-xs">
                    {item.category}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-1 flex-col justify-between p-3">
                <div>
                  <Link
                    href={`/product/${item.id}`}
                    className="line-clamp-1 text-sm font-bold text-slate-900 transition-colors hover:text-blue-600"
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                  <p className="mt-0.5 text-xs font-semibold text-slate-700">
                    £{item.price.toFixed(2)}{' '}
                    <span className="text-[10px] font-normal text-slate-400">
                      / {item.unit || 'kg'}
                    </span>
                  </p>
                </div>

                {/* Actions: Add to Cart & View Details */}
                <div className="mt-3 flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      addToCart(
                        {
                          id: item.id,
                          title: item.title,
                          category: item.category,
                          price: item.price,
                          unit: item.unit,
                          imageSrc: item.imageSrc,
                        },
                        undefined,
                        1
                      );
                    }}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#0D55CF] py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-95"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    <span>Add to Cart</span>
                  </button>

                  <Link
                    href={`/product/${item.id}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                    title="View Product Details"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
