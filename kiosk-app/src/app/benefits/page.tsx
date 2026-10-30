import React from 'react';
import { BenefitsPage, BenefitsContentData } from '@/components/benefits/BenefitsPage';
import { sanityFetch } from '@/lib/sanity';
import { BENEFITS_CONTENT_QUERY } from '@/lib/sanityQueries';

export default async function BenefitsRoute() {
  let benefitsData: BenefitsContentData | null = null;
  try {
    benefitsData = await sanityFetch<BenefitsContentData>(BENEFITS_CONTENT_QUERY);
  } catch (err) {
    console.warn('Failed to fetch benefits data from Sanity, using default values:', err);
  }

  return <BenefitsPage data={benefitsData} />;
}
