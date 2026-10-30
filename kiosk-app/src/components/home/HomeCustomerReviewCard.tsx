'use client';

import React, { useState, useEffect } from 'react';
import { Rating } from '@/components/ui/Rating';
import { sanityFetch } from '@/lib/sanity';
import { HOME_CUSTOMER_SAYS_QUERY } from '@/lib/sanityQueries';

export function HomeCustomerReviewCard() {
  const [data, setData] = useState<{
    sectionHeading?: string;
    reviews?: Array<{
      customerName: string;
      rating: number;
      reviewText: string;
      tagline?: string;
    }>;
  } | null>(null);

  useEffect(() => {
    sanityFetch<any>(HOME_CUSTOMER_SAYS_QUERY)
      .then((res) => {
        if (res) setData(res);
      })
      .catch(() => {});
  }, []);

  const heading = data?.sectionHeading || 'What Our Customers Say';
  const activeReview = data?.reviews && data.reviews.length > 0 ? data.reviews[0] : null;

  const quote = activeReview?.reviewText || "Super fresh products and great variety. Fishcart is our family's choice.";
  const customerName = activeReview?.customerName || "Priya S.";
  const score = activeReview?.rating ?? 5;

  return (
    <div className="col-span-1 flex min-h-0 flex-col justify-between overflow-hidden rounded-[8px] bg-[#E1EDFA] p-[var(--testimonial-padding)] portrait:min-h-[250px]">
      <div>
        <h3 className="mb-[clamp(4px,min(0.5vw,0.75svh),8px)] text-[clamp(17px,min(1.25vw,2svh),22px)] font-bold text-[#0D55CF]">
          {heading}
        </h3>
        <div className="mb-1 text-[#0D55CF]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>
        </div>
        <Rating score={score} size={14} className="mb-2 gap-0.5 text-[#F5A623]" />
        <p className="mb-[clamp(3px,min(0.52vw,0.75svh),6px)] pr-4 text-[clamp(15px,min(0.885vw,1.35svh),15px)] leading-[1.4] font-medium text-[#1E293B]">
          &quot;{quote}&quot;
        </p>
        <p className="text-[14px] font-bold text-[#1E293B]">
          – {customerName}
        </p>
      </div>
      <div className="mt-auto flex justify-center gap-2 pb-1">
        <div className="h-[5px] w-[5px] rounded-full bg-[#0D55CF]" />
        <div className="h-[5px] w-[5px] rounded-full bg-[#93C5FD]" />
        <div className="h-[5px] w-[5px] rounded-full bg-[#93C5FD]" />
      </div>
    </div>
  );
}
