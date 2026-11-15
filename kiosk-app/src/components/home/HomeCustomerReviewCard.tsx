'use client';

import React, { useState, useEffect } from 'react';
import { Rating } from '@/components/ui/Rating';
import { sanityFetch } from '@/lib/sanity';
import { HOME_CUSTOMER_SAYS_QUERY } from '@/lib/sanityQueries';

interface ReviewItem {
  customerName: string;
  rating: number;
  reviewText: string;
  tagline?: string;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    customerName: 'Priya S.',
    rating: 5,
    reviewText: "Super fresh products and great variety. Fishcart is our family's choice.",
  },
  {
    customerName: 'Ahmed K.',
    rating: 5,
    reviewText: 'Outstanding seafood quality and prompt delivery. Best in Colchester!',
  },
  {
    customerName: 'Sarah M.',
    rating: 5,
    reviewText: 'The seabass and salmon are always fresh and perfectly cleaned.',
  },
];

export function HomeCustomerReviewCard() {
  const [data, setData] = useState<{
    sectionHeading?: string;
    selectedReviews?: ReviewItem[];
    customReviews?: ReviewItem[];
  } | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    sanityFetch<any>(HOME_CUSTOMER_SAYS_QUERY)
      .then((res) => {
        if (res) setData(res);
      })
      .catch(() => {});
  }, []);

  const heading = data?.sectionHeading || 'What Our Customers Say';

  const validSelected = (data?.selectedReviews || []).filter(
    (r) => r && r.customerName && r.reviewText
  );
  const validCustom = (data?.customReviews || []).filter(
    (r) => r && r.customerName && r.reviewText
  );

  const reviewsList: ReviewItem[] =
    validSelected.length > 0
      ? validSelected
      : validCustom.length > 0
      ? validCustom
      : DEFAULT_REVIEWS;

  // Auto-rotate every 6s if more than 1 review
  useEffect(() => {
    if (reviewsList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviewsList.length]);

  const activeIndex = currentIndex % reviewsList.length;
  const activeReview = reviewsList[activeIndex] || DEFAULT_REVIEWS[0];

  const quote = activeReview.reviewText;
  const customerName = activeReview.customerName;
  const score = activeReview.rating ?? 5;

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
        <p className="mb-[clamp(3px,min(0.52vw,0.75svh),6px)] pr-4 text-[clamp(15px,min(0.885vw,1.35svh),15px)] leading-[1.4] font-medium text-[#1E293B] transition-opacity duration-300">
          &quot;{quote}&quot;
        </p>
        <p className="text-[14px] font-bold text-[#1E293B]">
          – {customerName}
        </p>
      </div>
      <div className="mt-auto flex justify-center gap-2 pb-1">
        {reviewsList.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to review ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
            className={`h-[5px] cursor-pointer rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'w-[14px] bg-[#0D55CF]'
                : 'w-[5px] bg-[#93C5FD] hover:bg-[#60A5FA]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

