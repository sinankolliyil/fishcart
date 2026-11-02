'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '@/lib/sanity';
import { HOME_CAROUSEL_QUERY, HOME_RIBBON_QUERY } from '@/lib/sanityQueries';

interface SlideItem {
  image: string;
  title: string;
  description: string;
  destinationUrl?: string | null;
  offerText?: string | null;
}

interface AnnouncementItem {
  text: string;
  icon?: string;
  color?: string;
}

const DEFAULT_SLIDES: SlideItem[] = [
  {
    image: '/assets/fresh_fish_on_ice_1783634420753.png',
    title: 'Finest Fresh Fish',
    description:
      'Caught daily, packed hygienically, and delivered fresh to your doorstep.',
  },
  {
    image: '/assets/fresh_fish_on_ice_1783634420753.png',
    title: 'Premium Cut Meats',
    description:
      'Tender, juicy cuts of mutton and beef sourced from certified farms.',
  },
  {
    image: '/assets/fresh_fish_on_ice_1783634420753.png',
    title: 'Farm Fresh Chicken',
    description:
      '100% natural, antibiotic-free chicken prepared fresh for every order.',
  },
  {
    image: '/assets/fresh_fish_on_ice_1783634420753.png',
    title: 'Nutritious Farm Eggs',
    description:
      'Freshly sourced organic and free-range eggs rich in high-quality protein.',
  },
  {
    image: '/assets/fresh_fish_on_ice_1783634420753.png',
    title: 'Gourmet Seafood Delights',
    description:
      'Premium salmon, prawns, and exotic seafood frozen at peak freshness.',
  },
];

const DEFAULT_ANNOUNCEMENTS: AnnouncementItem[] = [
  { text: '20% OFF on Fresh Fish', icon: 'tag', color: 'text-blue-400' },
  { text: 'Buy 2 Get 1 Free', icon: 'gift', color: 'text-emerald-400' },
  { text: 'Weekend Chicken Deals', icon: 'fire', color: 'text-orange-400' },
  { text: 'Free Delivery on Orders Over £25', icon: 'truck', color: 'text-cyan-400' },
];

function renderRibbonIcon(icon?: string, colorClass?: string) {
  const cls = `h-3.5 w-3.5 portrait:h-4 portrait:w-4 ${colorClass || 'text-blue-400'}`;
  switch (icon) {
    case 'gift':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5H3M21 12H3m18 4.5H3M12 3v18M7.5 7.5a3 3 0 100-6 3 3 0 000 6zM16.5 7.5a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
      );
    case 'fire':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
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
      );
    case 'truck':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125a1.125 1.125 0 001.125-1.125V9.75M8.25 18.75V14.25m0 0H12m.75 1.5h2.25M9 8.25h3m-3 3h3m7.5-3h1.125V12h-3.75z"
          />
        </svg>
      );
    case 'tag':
    default:
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a1.125 1.125 0 001.591 0l7.22-7.22a1.125 1.125 0 000-1.591L11.16 3.659A2.25 2.25 0 009.568 3z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h.008v.008H6V7.5z" />
        </svg>
      );
  }
}

export function HeroBannerCarousel() {
  const [slides, setSlides] = useState<SlideItem[]>(DEFAULT_SLIDES);
  const [ribbonAnnouncements, setRibbonAnnouncements] = useState<AnnouncementItem[]>(DEFAULT_ANNOUNCEMENTS);
  const [showRibbon, setShowRibbon] = useState<boolean>(true);

  const [activeSlide, setActiveSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Fetch live CMS data for hero carousel and ribbon announcements
  useEffect(() => {
    // 1. Fetch hero carousel slides
    sanityFetch<{
      slides?: Array<{
        title: string;
        description: string;
        image?: string;
        destinationUrl?: string;
        offerText?: string;
        active?: boolean;
      }>;
    }>(HOME_CAROUSEL_QUERY)
      .then((res) => {
        if (res?.slides && res.slides.length > 0) {
          const activeSlides = res.slides.filter((s) => s.active !== false && s.title);
          if (activeSlides.length > 0) {
            setSlides(
              activeSlides.map((s, idx) => ({
                image: s.image || DEFAULT_SLIDES[idx % DEFAULT_SLIDES.length].image,
                title: s.title,
                description: s.description || '',
                destinationUrl: s.destinationUrl || null,
                offerText: s.offerText || null,
              }))
            );
          }
        }
      })
      .catch(() => {});

    // 2. Fetch top ribbon announcements & visibility
    sanityFetch<{
      announcements?: Array<{
        text: string;
        icon?: string;
        color?: string;
      }>;
      visibility?: boolean;
    }>(HOME_RIBBON_QUERY)
      .then((res) => {
        if (res) {
          if (typeof res.visibility === 'boolean') {
            setShowRibbon(res.visibility);
          }
          if (res.announcements && res.announcements.length > 0) {
            setRibbonAnnouncements(res.announcements);
          }
        }
      })
      .catch(() => {});
  }, []);

  // Replicated slides for circular infinite looping: [Last, ...Slides, First]
  const displaySlides = useMemo(() => {
    if (slides.length <= 1) return slides;
    return [slides[slides.length - 1], ...slides, slides[0]];
  }, [slides]);

  // Reset active slide when slides length changes
  useEffect(() => {
    setActiveSlide(slides.length > 1 ? 1 : 0);
    setIsTransitioning(false);
  }, [slides.length]);

  // Guards added to prevent double click and out of bound indexing
  const handleNext = useCallback(() => {
    if (isTransitioning || slides.length <= 1) return;
    setIsTransitioning(true);
    setActiveSlide((prev) => prev + 1);
  }, [isTransitioning, slides.length]);

  const handlePrev = useCallback(() => {
    if (isTransitioning || slides.length <= 1) return;
    setIsTransitioning(true);
    setActiveSlide((prev) => prev - 1);
  }, [isTransitioning, slides.length]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (isTransitioning || slides.length <= 1) return;
      setIsTransitioning(true);
      setActiveSlide(index + 1);
    },
    [isTransitioning, slides.length]
  );

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== 'transform') return;

    if (slides.length <= 1) {
      setIsTransitioning(false);
      return;
    }

    if (activeSlide === 0) {
      setIsTransitioning(false);
      setActiveSlide(slides.length);
    } else if (activeSlide === displaySlides.length - 1) {
      setIsTransitioning(false);
      setActiveSlide(1);
    } else {
      setIsTransitioning(false);
    }
  };

  // Safe ref for autoplay to satisfy single-interval requirement
  const nextRef = useRef(handleNext);
  useEffect(() => {
    nextRef.current = handleNext;
  }, [handleNext]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      nextRef.current();
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

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
    slides.length <= 1
      ? 0
      : activeSlide === 0
        ? slides.length - 1
        : activeSlide === displaySlides.length - 1
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

      {/* ── Premium Offer Ribbon (Dynamic from CMS) ── */}
      {showRibbon && (
        <div className="absolute top-0 right-0 left-0 z-30 flex h-[var(--hero-ribbon-h)] items-center overflow-hidden border-b border-white/10 bg-black/40 backdrop-blur-md select-none">
          <div className="animate-marquee-custom flex items-center py-1 whitespace-nowrap">
            {/* List of Offers */}
            <div className="flex items-center space-x-12 px-6">
              {ribbonAnnouncements.map((item, idx) => (
                <span
                  key={`r1-${idx}`}
                  className="flex items-center gap-1.5 text-[10px] portrait:text-[12px] font-bold tracking-wider portrait:tracking-normal text-white uppercase"
                >
                  {renderRibbonIcon(item.icon, item.color)}
                  {item.text}
                </span>
              ))}
            </div>
            {/* Duplicate list for seamless looping */}
            <div className="flex items-center space-x-12 px-6">
              {ribbonAnnouncements.map((item, idx) => (
                <span
                  key={`r2-${idx}`}
                  className="flex items-center gap-1.5 text-[10px] portrait:text-[12px] font-bold tracking-wider portrait:tracking-normal text-white uppercase"
                >
                  {renderRibbonIcon(item.icon, item.color)}
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Carousel Slides Wrapper (Dynamic from CMS) ── */}
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
        {displaySlides.map((slide, idx) => (
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
                className="pointer-events-none object-cover object-center opacity-65 select-none"
                priority={idx === 1}
              />
            </div>

            {/* Text Overlay */}
            <div className="pointer-events-none absolute inset-0 z-20">
              <div
                className={`flex h-full items-start ${
                  showRibbon
                    ? 'pt-[calc(var(--hero-ribbon-h)+clamp(16px,2vw,32px))] portrait:pt-[calc(var(--hero-ribbon-h)+40px)]'
                    : 'pt-[clamp(24px,3vw,44px)] portrait:pt-10'
                }`}
              >
                <div className="ml-[8%] max-w-[85%] sm:max-w-[520px] text-white">
                  {slide.offerText && (
                    <span className="mb-2 inline-block rounded-full bg-blue-600/90 px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase backdrop-blur-sm shadow-sm">
                      {slide.offerText}
                    </span>
                  )}

                  <h2 className="text-[clamp(36px,9vw,48px)] portrait:text-[28px] leading-[1.05] font-bold tracking-tight !text-white drop-shadow-md">
                    {slide.title}
                  </h2>

                  <p className="mt-2 text-[clamp(16px,5vw,20px)] portrait:text-[13px] leading-[1.4] font-medium text-slate-100 drop-shadow-sm">
                    {slide.description}
                  </p>

                  {slide.destinationUrl && (
                    <div className="pointer-events-auto mt-4">
                      <Link
                        href={slide.destinationUrl}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[13px] font-bold text-[#0D55CF] shadow-md transition-transform hover:scale-105 active:scale-95"
                      >
                        Explore Now
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Navigation Arrows ── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 z-30 portrait:hidden flex h-[clamp(28px,min(2.5vw,4svh),44px)] w-[clamp(28px,min(2.5vw,4svh),44px)] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/35 text-white opacity-75 backdrop-blur-sm transition-all duration-200 hover:bg-black/55 hover:opacity-100 focus:outline-none active:scale-95"
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
            className="absolute top-1/2 right-4 z-30 portrait:hidden flex h-[clamp(28px,min(2.5vw,4svh),44px)] w-[clamp(28px,min(2.5vw,4svh),44px)] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/35 text-white opacity-75 backdrop-blur-sm transition-all duration-200 hover:bg-black/55 hover:opacity-100 focus:outline-none active:scale-95"
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
        </>
      )}

      {/* ── Pagination Dots ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`cursor-pointer transition-all duration-300 focus:outline-none ${
                activeDotIndex === idx
                  ? 'h-1.5 w-6 rounded-full bg-white'
                  : 'h-1.5 w-1.5 rounded-full bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
