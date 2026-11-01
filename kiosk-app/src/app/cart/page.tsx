'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Phone,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { sanityFetch } from '@/lib/sanity';
import { ORDER_SETTINGS_QUERY } from '@/lib/sanityQueries';
import { cn } from '@/lib/utils';

interface OrderSettings {
  whatsappNumber?: string;
  orderButtonText?: string;
  preorderButtonText?: string;
  orderMessagePrefix?: string;
  cartNoticeHeading?: string;
  cartNoticeDescription?: string;
  enabled?: boolean;
}

export default function CartPage() {
  const { cart, cartCount, subtotal, updateQuantity, removeFromCart, clearCart } = useStore();
  const [orderSettings, setOrderSettings] = useState<OrderSettings | null>(null);

  useEffect(() => {
    sanityFetch<OrderSettings>(ORDER_SETTINGS_QUERY)
      .then((data) => {
        if (data) setOrderSettings(data);
      })
      .catch((err) => console.warn('Failed to fetch order settings:', err));
  }, []);

  const whatsappNumber = orderSettings?.whatsappNumber || '+44 1206 123456';
  const orderButtonText = orderSettings?.orderButtonText || 'Order via WhatsApp';
  const preorderButtonText = orderSettings?.preorderButtonText || 'Contact Store for Pre-orders';
  const orderMessagePrefix =
    orderSettings?.orderMessagePrefix ||
    'Hello FishCart! I would like to place a pre-order from your website:';
  const cartNoticeHeading =
    orderSettings?.cartNoticeHeading || 'Store Pickup / WhatsApp Pre-Order';
  const cartNoticeDescription =
    orderSettings?.cartNoticeDescription ||
    'Orders are placed directly via WhatsApp with our store team for fresh cutting and speedy preparation.';
  const isWhatsAppEnabled = orderSettings?.enabled !== false;

  const handleWhatsAppCheckout = () => {
    if (!cart.length) return;

    // Clean phone number: remove spaces, symbols, keep digits
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

    // Format cart items
    const itemsList = cart
      .map((item, idx) => {
        const sizeText = item.size
          ? ` (${item.size.label}${item.size.subLabel ? ` - ${item.size.subLabel}` : ''})`
          : '';
        return `${idx + 1}. *${item.title}*${sizeText}\n   Qty: ${item.quantity} × £${item.unitPrice.toFixed(2)} = *£${(item.unitPrice * item.quantity).toFixed(2)}*`;
      })
      .join('\n\n');

    const message = `${orderMessagePrefix}\n\n🛒 *ORDER ITEMS:*\n${itemsList}\n\n━━━━━━━━━━━━━━━\n*Total Items:* ${cartCount}\n*Estimated Total:* *£${subtotal.toFixed(2)}*\n━━━━━━━━━━━━━━━\n\nPlease confirm availability and delivery / pickup time. Thank you!`;

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handlePreorderInquiry = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const message = `Hello FishCart! I would like to inquire about placing a pre-order from your store.`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

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
                Shopping Cart
              </h1>
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-100 px-2 text-xs font-bold text-[#0D55CF]">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Review your fresh selections before ordering.
            </p>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95 cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear Cart
          </button>
        )}
      </div>

      {/* ── Main Content Area ─────────────────────────────────────── */}
      {cart.length === 0 ? (
        /* Empty State */
        <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
          <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-[#0D55CF] shadow-inner">
            <ShoppingCart className="h-12 w-12 stroke-[1.8]" />
            <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-white shadow-md">
              <Sparkles className="h-4 w-4 fill-white" />
            </span>
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-900">Your cart is empty</h2>
          <p className="mb-6 max-w-md text-sm text-slate-500">
            Looks like you haven&apos;t added any fresh seafood or meats yet. Browse our daily fresh catches
            and farm-fresh specials!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/fish"
              className="flex items-center gap-2 rounded-xl bg-[#0D55CF] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95"
            >
              Explore Fresh Fish <ArrowRight className="h-3.5 w-3.5" />
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
        /* Cart Layout: Items (Left) + Order Summary (Right) */
        <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Items List (col 7 on desktop) */}
          <div className="space-y-3 lg:col-span-7 xl:col-span-8">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs transition-all hover:border-blue-200 hover:shadow-sm sm:gap-4 sm:p-4"
              >
                {/* Product Thumbnail */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24">
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <ShoppingCart className="h-6 w-6 opacity-40" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/product/${item.productId}`}
                        className="truncate text-sm font-bold text-slate-900 transition-colors hover:text-blue-600 sm:text-base"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-slate-400 transition-colors hover:text-red-500 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Size and Weight Badges */}
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {item.size ? (
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-100">
                          {item.size.label} {item.size.subLabel ? `(${item.size.subLabel})` : ''}
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                          Standard Pack
                        </span>
                      )}
                      {item.category && (
                        <span className="capitalize text-[11px] text-slate-500">
                          • {item.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50/80 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-white active:scale-90 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3 stroke-[3]" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-blue-600 transition-colors hover:bg-white active:scale-90 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3 stroke-[3]" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900 sm:text-base">
                        £{(item.unitPrice * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        £{item.unitPrice.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Card (col 5 on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
              <h2 className="mb-4 text-base font-bold text-slate-900">Order Summary</h2>

              <div className="space-y-2.5 border-b border-slate-100 pb-4 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-slate-900">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Store Handling & Cleaning</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Freshness Guarantee</span>
                  <span className="font-semibold text-blue-600">100% Guaranteed</span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-900">Total Estimate</span>
                <span className="text-xl font-extrabold text-[#0D55CF]">
                  £{subtotal.toFixed(2)}
                </span>
              </div>

              {/* Informational Notice */}
              <div className="mt-4 rounded-xl bg-emerald-50/70 p-3 border border-emerald-100">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-emerald-950">
                      {cartNoticeHeading}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-emerald-800/90">
                      {cartNoticeDescription}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold text-emerald-700">
                      WhatsApp: {whatsappNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              {isWhatsAppEnabled ? (
                <button
                  onClick={handleWhatsAppCheckout}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] py-3 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 fill-white" />
                  {orderButtonText} ➔
                </button>
              ) : (
                <button
                  disabled
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-200 py-3 text-xs font-bold text-slate-500 cursor-not-allowed"
                >
                  Online Checkout Disabled
                </button>
              )}

              {/* Pre-order Inquiry Button */}
              <button
                onClick={handlePreorderInquiry}
                className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white py-2.5 text-xs font-bold text-[#0D55CF] transition-colors hover:bg-blue-50 active:scale-98 cursor-pointer"
              >
                <Phone className="h-3.5 w-3.5" />
                {preorderButtonText}
              </button>

              <Link
                href="/"
                className="mt-3 block text-center text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
