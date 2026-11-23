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

export interface OrderSettings {
  whatsappNumber?: string;
  orderButtonText?: string;
  preorderButtonText?: string;
  orderMessagePrefix?: string;
  cartNoticeHeading?: string;
  cartNoticeDescription?: string;
  enabled?: boolean;
}

export function CartClient({ initialSettings }: { initialSettings?: OrderSettings | null }) {
  const { cart, cartCount, subtotal, updateQuantity, removeFromCart, clearCart } = useStore();
  const [orderSettings, setOrderSettings] = useState<OrderSettings | null>(initialSettings || null);

  useEffect(() => {
    sanityFetch<OrderSettings>(ORDER_SETTINGS_QUERY, {}, { bypassCache: true })
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

  const formatWhatsAppNumber = (num: string) => {
    let clean = num.replace(/[^0-9]/g, '');
    if (clean.length === 10 && /^[6-9]/.test(clean)) {
      clean = '91' + clean;
    } else if (clean.startsWith('0') && clean.length === 11) {
      clean = '44' + clean.slice(1);
    }
    return clean;
  };

  const handleWhatsAppCheckout = () => {
    if (!cart.length) return;

    // Clean phone number: remove spaces, symbols, ensure country code
    const cleanNumber = formatWhatsAppNumber(whatsappNumber);

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
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePreorderInquiry = () => {
    const cleanNumber = formatWhatsAppNumber(whatsappNumber);
    const message = `Hello FishCart! I would like to inquire about placing a pre-order from your store.`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
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
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight sm:text-2xl">
                Shopping Cart
              </h1>
              {cartCount > 0 && (
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                  {cartCount} item{cartCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Review your fresh selections before ordering.
            </p>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95 cursor-pointer"
            title="Clear entire cart"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {/* ── Main Cart Content ────────────────────────────────────── */}
      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-[#0D55CF]">
            <ShoppingCart className="h-10 w-10 opacity-60" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-slate-800">Your Cart is Empty</h2>
          <p className="mt-1 max-w-sm text-xs text-slate-500">
            Looks like you haven&apos;t added any fresh items yet. Explore our fresh fish, meat, chicken, and farm eggs!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link
              href="/fish"
              className="rounded-xl bg-[#0D55CF] px-4 py-2 text-xs font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md active:scale-95"
            >
              Browse Fresh Fish
            </Link>
            <Link
              href="/meat"
              className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200 active:scale-95"
            >
              Browse Meat
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50 active:scale-95"
            >
              Go to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 pb-8">
          {/* Cart Items List (col 7 on desktop) */}
          <div className="space-y-3 lg:col-span-7 xl:col-span-8">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs transition-shadow hover:shadow-sm sm:gap-4 sm:p-4"
              >
                {/* Product Image */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-24 sm:w-24 border border-slate-100">
                  <Image
                    src={item.imageSrc || '/assets/1_image.png'}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info + Actions */}
                <div className="flex flex-1 flex-col justify-between self-stretch">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                        {item.title}
                      </h3>
                      {item.size ? (
                        <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                          <span className="font-semibold text-blue-600">
                            {item.size.label}
                          </span>
                          {item.size.subLabel && (
                            <span className="text-[11px] text-slate-400">
                              ({item.size.subLabel})
                            </span>
                          )}
                          <span className="text-slate-300">•</span>
                          <span className="capitalize">{item.category}</span>
                        </div>
                      ) : (
                        <p className="mt-0.5 text-xs text-slate-400 capitalize">
                          {item.category} • {item.unit || 'Standard'}
                        </p>
                      )}
                    </div>

                    {/* Remove Item Button */}
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Quantity Controls + Price */}
                  <div className="mt-2 flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-slate-600 shadow-2xs hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
                        title="Decrease quantity"
                      >
                        <Minus className="h-3 w-3 stroke-[3]" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-slate-600 shadow-2xs hover:bg-slate-100 active:scale-90 transition-all cursor-pointer"
                        title="Increase quantity"
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

