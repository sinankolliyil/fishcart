'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const SLIDES = [
  {
    image: '/assets/fresh_fish_on_ice_1783634420753.png',
    title: 'Finest Fresh Fish',
    description:
      'Caught daily, packed hygienically, and delivered fresh to your doorstep.',
  },
  {
    image: '/assets/meat_showcase.png',
    title: 'Premium Cut Meats',
    description:
      'Tender, juicy cuts of mutton and beef sourced from certified farms.',
  },
  {
    image: '/assets/chicken_showcase.png',
    title: 'Farm Fresh Chicken',
    description:
      '100% natural, antibiotic-free chicken prepared fresh for every order.',
  },
  {
    image: '/assets/eggs_showcase.png',
    title: 'Nutritious Farm Eggs',
    description:
      'Freshly sourced organic and free-range eggs rich in high-quality protein.',
  },
  {
    image: '/assets/fish_showcase.png',
    title: 'Gourmet Seafood Delights',
    description:
      'Premium salmon, prawns, and exotic seafood frozen at peak freshness.',
  },
];

// Replicated slides for circular infinite looping: [Last, Slide1, Slide2, Slide3, Slide4, Slide5, First]
const DISPLAY_SLIDES = [SLIDES[SLIDES.length - 1], ...SLIDES, SLIDES[0]];

export function HeroBannerCarousel() {
  // Initialize to false as it is static on mount.
  const [activeSlide, setActiveSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Guards added to prevent double click and out of bound indexing
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveSlide((prev) => prev + 1);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveSlide((prev) => prev - 1);
  }, [isTransitioning]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setActiveSlide(index + 1);
    },
    [isTransitioning]
  );

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    // Only proceed if the transform transition finished
    if (e.propertyName !== 'transform') return;

    if (activeSlide === 0) {
      setIsTransitioning(false);
      setActiveSlide(SLIDES.length);
    } else if (activeSlide === DISPLAY_SLIDES.length - 1) {
      setIsTransitioning(false);
      setActiveSlide(1);
    } else {
      setIsTransitioning(false);
    }
  };

  // Safe ref for autoplay to satisfy single-interval / non-recreation requirement
  const nextRef = useRef(handleNext);
  useEffect(() => {
    nextRef.current = handleNext;
  }, [handleNext]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextRef.current();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Touch handlers for tablet swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Compute active visual dot mapping
  const activeDotIndex =
    activeSlide === 0
      ? SLIDES.length - 1
      : activeSlide === DISPLAY_SLIDES.length - 1
        ? 0
        : activeSlide - 1;

  return (
    <div
      className="relative h-full w-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Inline styles for custom GPU-accelerated continuous scrolling marquee */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-custom {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
      `,
        }}
      />

      {/* ── Premium Offer Ribbon ── */}
      <div className="absolute top-0 right-0 left-0 z-30 flex h-[var(--hero-ribbon-h)] items-center overflow-hidden border-b border-white/10 bg-black/40 backdrop-blur-md select-none">
        <div className="animate-marquee-custom flex items-center py-1 whitespace-nowrap">
          {/* List of Offers */}
          <div className="flex items-center space-x-12 px-6">
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.591 0l7.22-7.22a1.125 1.125 0 000-1.591L11.16 3.659A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7.5h.008v.008H6V7.5z"
                />
              </svg>
              20% OFF on Fresh Fish
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5H3M21 12H3m18 4.5H3M12 3v18M7.5 7.5a3 3 0 100-6 3 3 0 000 6zM16.5 7.5a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
              Buy 2 Get 1 Free
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                />
              </svg>
              Weekend Chicken Deals
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125a1.125 1.125 0 001.125-1.125V9.75M8.25 18.75V14.25m0 0H12m.75 1.5h2.25M9 8.25h3m-3 3h3m7.5-3h1.125V12h-3.75z"
                />
              </svg>
              Free Delivery Above ₹999
            </span>
          </div>
          {/* Duplicate list for seamless looping */}
          <div className="flex items-center space-x-12 px-6">
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.591 0l7.22-7.22a1.125 1.125 0 000-1.591L11.16 3.659A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7.5h.008v.008H6V7.5z"
                />
              </svg>
              20% OFF on Fresh Fish
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5H3M21 12H3m18 4.5H3M12 3v18M7.5 7.5a3 3 0 100-6 3 3 0 000 6zM16.5 7.5a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
              Buy 2 Get 1 Free
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                />
              </svg>
              Weekend Chicken Deals
            </span>
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-white uppercase">
              <svg
                className="h-3.5 w-3.5 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125a1.125 1.125 0 001.125-1.125V9.75M8.25 18.75V14.25m0 0H12m.75 1.5h2.25M9 8.25h3m-3 3h3m7.5-3h1.125V12h-3.75z"
                />
              </svg>
              Free Delivery Above ₹999
            </span>
          </div>
        </div>
      </div>

      {/* ── Carousel Slides Wrapper ── */}
      <div
        className="flex h-full w-full"
        style={{
          transform: `translate3d(-${activeSlide * 100}%, 0, 0)`,
          transition: isTransitioning
            ? 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)'
            : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {DISPLAY_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className="relative flex h-full w-full shrink-0 items-center bg-slate-950"
          >
            {/* Slide Background Image */}
            <div className="absolute inset-0 z-0 h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="pointer-events-none object-cover object-center opacity-85 select-none"
                priority={idx === 1}
              />
            </div>
            {/* Dark left-side gradient overlay for maximum text readability */}
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-2/3 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />*/}
            {/* Text Overlay */}

            <div className="pointer-events-none absolute inset-0 z-20">
              <div className="flex h-full items-start pt-[calc(var(--hero-ribbon-h)+clamp(16px,2vw,32px))]">
                <div className="ml-[8%] max-w-[520px] text-white">
                  <h2 className="text-[clamp(30px,3.5vw,44px)] leading-[1.08] font-extrabold tracking-tight !text-white ">
                    {slide.title}
                  </h2>

                  <p className="mt-3 text-[18px] leading-[1.4] font-medium text-slate-200 ">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Navigation Arrows ── */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 z-30 flex h-[clamp(28px,min(2.5vw,4svh),44px)] w-[clamp(28px,min(2.5vw,4svh),44px)] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/35 text-white opacity-75 backdrop-blur-sm transition-all duration-200 hover:bg-black/55 hover:opacity-100 focus:outline-none active:scale-95"
        aria-label="Previous slide"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 z-30 flex h-[clamp(28px,min(2.5vw,4svh),44px)] w-[clamp(28px,min(2.5vw,4svh),44px)] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/35 text-white opacity-75 backdrop-blur-sm transition-all duration-200 hover:bg-black/55 hover:opacity-100 focus:outline-none active:scale-95"
        aria-label="Next slide"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* ── Pagination Dots ── */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center space-x-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`cursor-pointer transition-all duration-300 focus:outline-none ${
              activeDotIndex === idx
                ? 'h-1.5 w-6 rounded-full bg-white '
                : 'h-1.5 w-1.5 rounded-full bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
