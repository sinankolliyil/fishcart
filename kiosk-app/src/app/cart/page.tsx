import React from 'react';
import { sanityFetch } from '@/lib/sanity';
import { ORDER_SETTINGS_QUERY } from '@/lib/sanityQueries';
import { CartClient, OrderSettings } from '@/components/cart/CartClient';

export const revalidate = 5;

export default async function CartPage() {
  let orderSettings: OrderSettings | null = null;
  try {
    orderSettings = await sanityFetch<OrderSettings>(ORDER_SETTINGS_QUERY, {}, { bypassCache: true });
  } catch (err) {
    console.warn('Failed to fetch order settings from Sanity:', err);
  }

  return <CartClient initialSettings={orderSettings} />;
}
