import React from 'react';
import { AboutPage, AboutUsData } from '@/components/about/AboutPage';
import { sanityFetch } from '@/lib/sanity';
import { ABOUT_US_QUERY } from '@/lib/sanityQueries';

export default async function Page() {
  let aboutData: AboutUsData | null = null;
  try {
    aboutData = await sanityFetch<AboutUsData>(ABOUT_US_QUERY);
  } catch (err) {
    console.warn('Failed to fetch About Us data from Sanity, using default values:', err);
  }

  return <AboutPage data={aboutData} />;
}
