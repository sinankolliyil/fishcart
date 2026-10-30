import React from 'react';
import { sanityFetch } from '@/lib/sanity';
import { STORE_CONTACT_QUERY } from '@/lib/sanityQueries';
import { ContactClient, StoreContactData } from '@/components/contact/ContactClient';

export default async function ContactPage() {
  let contactData: StoreContactData | null = null;
  try {
    contactData = await sanityFetch<StoreContactData>(STORE_CONTACT_QUERY);
  } catch (err) {
    console.warn('Failed to fetch contact data from Sanity, using default values:', err);
  }

  return <ContactClient data={contactData} />;
}
