'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

export interface WishlistItem {
  id: string;
  title: string;
  category?: 'fish' | 'meat' | 'chicken' | 'eggs' | string;
  price: number;
  unit?: string;
  imageSrc?: string;
  format?: string;
  origin?: string;
  status?: string;
  badgeLabel?: string;
}

export interface CartItem {
  cartItemId: string; // unique identifier e.g. `${productId}_${sizeId || 'default'}`
  productId: string;
  title: string;
  category?: string;
  unitPrice: number;
  unit?: string;
  imageSrc?: string;
  size?: {
    id: string;
    label: string;
    subLabel?: string;
  };
  quantity: number;
}

interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info';
}

interface StoreContextType {
  // Wishlist
  wishlist: WishlistItem[];
  wishlistCount: number;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (
    product: {
      id: string;
      title: string;
      category?: string;
      price: number;
      unit?: string;
      imageSrc?: string;
    },
    size?: { id: string; label: string; subLabel?: string; price?: number },
    quantity?: number
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  setQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;

  // Toast
  toast: ToastMessage | null;
  clearToast: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'fishcart_wishlist_v1';
const CART_STORAGE_KEY = 'fishcart_cart_v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }

      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.warn('Failed to parse cart/wishlist from localStorage', e);
    }
    setIsMounted(true);
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist, isMounted]);

  // Save cart to localStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart, isMounted]);

  // Auto-dismiss toast
  const showToast = useCallback((title: string, message?: string) => {
    setToast({ id: String(Date.now()), title, message, type: 'success' });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  // Wishlist methods
  const isInWishlist = useCallback(
    (id: string) => wishlist.some((item) => item.id === id),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (item: WishlistItem) => {
      setWishlist((prev) => {
        const exists = prev.some((p) => p.id === item.id);
        if (exists) {
          showToast('Removed from Liked', `${item.title} was removed from your liked list.`);
          return prev.filter((p) => p.id !== item.id);
        } else {
          showToast('Saved to Liked', `${item.title} added to your liked list!`);
          return [...prev, item];
        }
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Cart methods
  const addToCart = useCallback(
    (
      product: {
        id: string;
        title: string;
        category?: string;
        price: number;
        unit?: string;
        imageSrc?: string;
      },
      size?: { id: string; label: string; subLabel?: string; price?: number },
      quantity: number = 1
    ) => {
      const sizeId = size?.id || 'default';
      const cartItemId = `${product.id}_${sizeId}`;
      const effectivePrice = size?.price !== undefined && size.price > 0 ? size.price : product.price;

      setCart((prev) => {
        const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              cartItemId,
              productId: product.id,
              title: product.title,
              category: product.category,
              unitPrice: effectivePrice,
              unit: product.unit || 'kg',
              imageSrc: product.imageSrc,
              size: size
                ? {
                    id: size.id,
                    label: size.label,
                    subLabel: size.subLabel,
                  }
                : undefined,
              quantity,
            },
          ];
        }
      });

      const sizeLabel = size?.label ? ` (${size.label})` : '';
      showToast('Added to Cart', `${quantity}x ${product.title}${sizeLabel} added to your cart.`);
    },
    [showToast]
  );

  const updateQuantity = useCallback((cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  }, []);

  const setQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
      );
    }
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const wishlistCount = wishlist.length;

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cart]);

  return (
    <StoreContext.Provider
      value={{
        wishlist,
        wishlistCount,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        cart,
        cartCount,
        subtotal,
        addToCart,
        updateQuantity,
        setQuantity,
        removeFromCart,
        clearCart,
        toast,
        clearToast,
      }}
    >
      {children}
      {/* Visual Toast Notification Banner */}
      {toast && (
        <div className="fixed top-4 right-4 z-[9999] flex items-center gap-3 rounded-xl border border-blue-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#0D55CF]">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{toast.title}</p>
            {toast.message && <p className="text-[11px] text-slate-500">{toast.message}</p>}
          </div>
          <button
            onClick={clearToast}
            className="ml-2 text-slate-400 transition-colors hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
