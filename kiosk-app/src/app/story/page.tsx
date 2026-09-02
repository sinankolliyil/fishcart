import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Package,
  Heart,
  Award,
  ArrowRight,
} from 'lucide-react';

export default function StoryPage() {
  return (
    <div className="grid h-full min-h-0 w-full grid-rows-[minmax(0,35fr)_minmax(0,27fr)_minmax(0,17fr)_minmax(0,24fr)_minmax(0,12fr)] gap-2 lg:gap-3 xl:gap-[var(--main-gap)]">
      {/* ROW 1 — Story Introduction (28%) */}
      <div className="grid min-h-0 grid-cols-[40fr_20fr_40fr] gap-2 overflow-hidden lg:gap-3 xl:grid-cols-[38fr_28fr_34fr] xl:gap-[var(--main-gap)]">
        {/* Left Side: Intro */}
        <div className="flex min-h-0 flex-col justify-start px-[clamp(8px,1.2vw,18px)] pt-[clamp(6px,0.8vw,12px)]">


          <h1 className="mb-[clamp(4px,0.6vw,12px)] shrink-0 text-[clamp(32px,min(3vw,4svh),44px)] leading-tight font-bold tracking-tight text-[#102B7B]">
            Our Story
          </h1>

          <p className="line-clamp-3 text-[13px] leading-relaxed text-slate-600 lg:text-[14px] xl:text-[clamp(10px,0.9vw,14px)]">
            From a small online initiative to your trusted fresh partner. Our
            journey is built on hard work, honesty, and the love of our
            customers.
          </p>
        </div>

        {/* Center: Hero Image */}
        <div className="relative min-h-0 overflow-hidden rounded-[8px] bg-slate-100 ">
          <Image
            src="/assets/story_hero.png"
            alt="FishCart Family"
            fill
            className="object-cover"
          />
        </div>

        {/* Right: Stats 2x2 */}
        <div className="grid min-h-0 grid-cols-2 grid-rows-2 gap-2 lg:gap-3 xl:gap-[var(--main-gap)]">
          <div className="flex h-full flex-col rounded-[12px] border border-blue-50 bg-white p-2.5  lg:p-3 xl:p-[clamp(10px,1vw,16px)]">
            <div className="flex items-center gap-[clamp(8px,0.8vw,12px)]">
              <Award className="h-[clamp(20px,1.6vw,28px)] w-[clamp(20px,1.6vw,28px)] shrink-0 text-blue-600" />

              <div className="text-[clamp(15px,1.5vw,24px)] leading-none font-bold text-slate-900">
                1+
              </div>
            </div>

            <div className="mt-2 text-[13px] leading-tight font-bold text-slate-800 lg:text-[14px] xl:mt-[clamp(8px,0.8vw,10px)] xl:text-[clamp(10px,0.85vw,13px)]">
              Years of Trust
            </div>

            <div className="mt-1 text-[11px] leading-snug text-slate-500 lg:text-[12px] xl:mt-[clamp(3px,0.4vw,6px)] xl:text-[clamp(8px,0.7vw,10px)]">
              Serving you with freshness & care.
            </div>
          </div>

          <div className="flex h-full flex-col rounded-[12px] border border-blue-50 bg-white p-2.5  lg:p-3 xl:p-[clamp(10px,1vw,16px)]">
            <div className="flex items-center gap-[clamp(8px,0.8vw,12px)]">
              <Heart className="h-[clamp(20px,1.6vw,28px)] w-[clamp(20px,1.6vw,28px)] shrink-0 text-blue-600" />

              <div className="text-[clamp(15px,1.5vw,24px)] leading-none font-bold text-slate-900">
                10,000+
              </div>
            </div>

            <div className="mt-2 text-[13px] leading-tight font-bold text-slate-800 lg:text-[14px] xl:mt-[clamp(8px,0.8vw,10px)] xl:text-[clamp(10px,0.85vw,13px)]">
              Happy Customers
            </div>

            <div className="mt-1 text-[11px] leading-snug text-slate-500 lg:text-[12px] xl:mt-[clamp(3px,0.4vw,6px)] xl:text-[clamp(8px,0.7vw,10px)]">
              Your support is our strength.
            </div>
          </div>

          <div className="flex h-full flex-col rounded-[12px] border border-blue-50 bg-white p-2.5  lg:p-3 xl:p-[clamp(10px,1vw,16px)]">
            <div className="flex items-center gap-[clamp(8px,0.8vw,12px)]">
              <Truck className="h-[clamp(20px,1.6vw,28px)] w-[clamp(20px,1.6vw,28px)] shrink-0 text-blue-600" />

              <div className="text-[clamp(15px,1.5vw,24px)] leading-none font-bold text-slate-900">
                15,000+
              </div>
            </div>

            <div className="mt-2 text-[13px] leading-tight font-bold text-slate-800 lg:text-[14px] xl:mt-[clamp(8px,0.8vw,10px)] xl:text-[clamp(10px,0.85vw,13px)]">
              Orders Delivered
            </div>

            <div className="mt-1 text-[11px] leading-snug text-slate-500 lg:text-[12px] xl:mt-[clamp(3px,0.4vw,6px)] xl:text-[clamp(8px,0.7vw,10px)]">
              Pre-orders delivered with smile
            </div>
          </div>

          <div className="flex h-full flex-col rounded-[12px] border border-blue-50 bg-white p-2.5  lg:p-3 xl:p-[clamp(10px,1vw,16px)]">
            <div className="flex items-center gap-[clamp(8px,0.8vw,12px)]">
              <ShieldCheck className="h-[clamp(20px,1.6vw,28px)] w-[clamp(20px,1.6vw,28px)] shrink-0 text-blue-600" />

              <div className="text-[clamp(15px,1.5vw,24px)] leading-none font-bold text-slate-900">
                100%
              </div>
            </div>

            <div className="mt-2 text-[13px] leading-tight font-bold text-slate-800 lg:text-[14px] xl:mt-[clamp(8px,0.8vw,10px)] xl:text-[clamp(10px,0.85vw,13px)]">
              Quality Promise
            </div>

            <div className="mt-1 text-[11px] leading-snug text-slate-500 lg:text-[12px] xl:mt-[clamp(3px,0.4vw,6px)] xl:text-[clamp(8px,0.7vw,10px)]">
              Freshness & hygiene guaranteed
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2 — Journey (25%) */}
      <div className="grid min-h-0 grid-cols-2 gap-[var(--main-gap)] overflow-hidden">
        {/* Left Card */}
        <div className="flex h-full min-h-0 items-center justify-between overflow-hidden rounded-[8px] bg-white p-3  lg:p-4 xl:p-[clamp(12px,1.5vw,24px)]">
          <div className="flex min-h-0 flex-1 flex-col justify-center pr-3 lg:pr-4 xl:pr-[clamp(12px,1.5vw,24px)]">
            <h2 className="mb-2 text-[clamp(14px,1.5vw,22px)] leading-tight font-bold text-[#0D55CF] xl:mb-[clamp(4px,0.8vw,12px)]">
              How It All Started
            </h2>
            <p className="mb-2 line-clamp-1 text-[12px] text-slate-600 lg:text-[13px] xl:mb-[clamp(4px,0.8vw,12px)] xl:text-[clamp(9px,0.8vw,12px)]">
              One year ago, we started our journey with a simple idea – to
              deliver fresh fish and meat to our community. We began with online
              pre-orders and doorstep delivery.
            </p>
            <div className="flex min-h-0 flex-col gap-1 xl:gap-[clamp(2px,0.4vw,6px)]">
              {[
                'Took pre-orders through WhatsApp & calls',
                'Carefully sourced and packed every order',
                'Delivered to your doorstep with on-time promise',
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-[clamp(4px,0.6vw,8px)]"
                >
                  <CheckCircle2 className="h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] shrink-0 text-blue-600" />
                  <span className="truncate text-[12px] font-medium text-slate-700 lg:text-[13px] xl:text-[clamp(9px,0.7vw,11px)]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[90%] min-h-0 w-[25%] shrink-0 lg:w-[28%] xl:w-[35%]">
            <Image
              src="/assets/story_journey.png"
              alt="Journey"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Card */}
        <div className="flex h-full min-h-0 items-center justify-between overflow-hidden rounded-[8px] bg-white p-3  lg:p-4 xl:p-[clamp(12px,1.5vw,24px)]">
          <div className="flex min-h-0 flex-1 flex-col justify-center pr-3 lg:pr-4 xl:pr-[clamp(12px,1.5vw,24px)]">
            <h2 className="mb-2 text-[clamp(14px,1.5vw,22px)] leading-tight font-bold text-[#0D55CF] xl:mb-[clamp(4px,0.8vw,12px)]">
              Growing With You
            </h2>
            <p className="mb-2 line-clamp-1 text-[12px] text-slate-600 lg:text-[13px] xl:mb-[clamp(4px,0.8vw,12px)] xl:text-[clamp(9px,0.8vw,12px)]">
              Your trust and support motivated us to take the next big step –
              our own shop!
            </p>
            <div className="flex min-h-0 flex-col gap-1 xl:gap-[clamp(2px,0.4vw,6px)]">
              {[
                'Better variety, better quality',
                'More control on freshness',
                'Stronger supply network',
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-[clamp(4px,0.6vw,8px)]"
                >
                  <CheckCircle2 className="h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] shrink-0 text-blue-600" />
                  <span className="truncate text-[12px] font-medium text-slate-700 lg:text-[13px] xl:text-[clamp(9px,0.7vw,11px)]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[100%] min-h-0 w-[30%] shrink-0 py-2 lg:w-[34%] xl:w-[40%]">
            <Image
              src="/assets/story_store.png"
              alt="Storefront"
              fill
              className="rounded-[8px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* ROW 3 — Promise Strip (12%) */}
      <div className="flex min-h-0 items-center overflow-hidden rounded-[8px] bg-white ">
        <div className="flex flex-1 items-center justify-between px-3 py-2 lg:px-4 lg:py-3 xl:px-[clamp(12px,1.5vw,24px)] xl:py-[clamp(6px,1vw,16px)]">
          <div className="w-[15%] shrink-0">
            <h2 className="text-[clamp(15px,1.2vw,20px)] leading-tight font-bold text-[#0D55CF]">
              Our Promise
              <br />
              To You
            </h2>
            <p className="mt-1 line-clamp-2 text-[11px] text-slate-500 lg:text-[12px] xl:text-[clamp(11px,0.6vw,9px)]">
              We promise to deliver the freshest.
            </p>
          </div>

          <div className="flex min-h-0 flex-1 justify-around gap-1 px-1 lg:gap-2 xl:gap-1">
            {[
              { icon: ShieldCheck, text: 'Never compromise on quality' },
              { icon: ShieldCheck, text: 'Hygienically cleaned & packed' },
              { icon: Truck, text: 'Sourced from trusted suppliers' },
              { icon: Package, text: 'Delivered with care & on time' },
              { icon: Heart, text: '100% satisfaction or we make it right' },
              { icon: ShieldCheck, text: 'Sustainable Sourcing' },
            ].map((item, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex min-w-0 items-center gap-[clamp(4px,0.4vw,8px)]">
                  <item.icon className="h-[clamp(14px,1.2vw,20px)] w-[clamp(14px,1.2vw,20px)] shrink-0 text-blue-600" />

                  <span className="text-[11px] leading-tight font-semibold text-slate-700 lg:text-[12px] xl:text-[clamp(12px,0.65vw,10px)]">
                    {item.text}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="h-6 lg:h-8 w-[1px] shrink-0 bg-slate-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="relative h-full w-[10%] shrink-0 lg:w-[13%] xl:w-[17%]">
          <Image
            src="/assets/story_seafood.png"
            alt="Premium Seafood"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* ROW 4 — From Ocean To Your Shop (25%) */}
      <div className="flex min-h-0 flex-col rounded-[8px] bg-white p-3 pt-2 pb-1  lg:p-4 lg:pt-3 lg:pb-2 xl:p-[clamp(12px,1.5vw,24px)] xl:pt-[clamp(3px,0.6vw,6px)] xl:pb-2">
        <h2 className="mb-[6px] shrink-0 text-[clamp(14px,1.2vw,20px)] font-bold text-[#0D55CF]">
          From Ocean To Our Shop – Here&apos;s How It Happens
        </h2>

        <div className="flex min-h-0 flex-1 justify-between gap-[clamp(2px,0.4vw,6px)]">
          {[
            {
              img: 'prod_1_salmon.jpg',
              title: 'Daily Catch',
            },
            {
              img: 'prod_2_seabass.jpg',
              title: 'Sorting & Cleaning',
            },
            {
              img: 'crushed_ice_bg.png',
              title: 'Ice Packing',
            },
            {
              img: 'aa_fish.png',
              title: 'Air Freight',
            },
            {
              img: 'ice_cubes_bg.png',
              title: 'Import & Inspection',
            },
            {
              img: 'meat.png',
              title: 'Cold Storage & Transport',
            },
            {
              img: 'chicken.png',
              title: 'Final Check at Our Shop',
            },
            {
              img: 'contact_boy.png',
              title: 'Delivered to You',
            },
          ].map((step, i, arr) => (
            <React.Fragment key={i}>
              <div className="flex h-full min-w-0 flex-1 flex-col">
                <div className="relative mb-[clamp(2px,0.3vw,4px)] aspect-[2.5/1] w-full shrink-0 overflow-hidden rounded-[8px] bg-slate-200">
                  <div className="absolute top-1 left-1 z-10 flex h-[clamp(12px,1vw,18px)] w-[clamp(12px,1vw,18px)] items-center justify-center rounded-full bg-blue-600 text-[clamp(8px,0.6vw,10px)] font-bold text-white ">
                    {i + 1}
                  </div>
                  <Image
                    src={`/assets/${step.img}`}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="mb-[1px] text-[11px] leading-tight font-bold text-slate-800 lg:text-[12px] xl:text-[clamp(9px,0.7vw,11px)]">
                  {step.title}
                </h4>
              </div>
              {i < arr.length - 1 && (
                <div className="flex shrink-0 flex-col justify-start pt-[clamp(6px,1vw,16px)]">
                  <ArrowRight className="h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] text-blue-500" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ROW 5 — Thank You Footer (10%) */}
      <div className="grid min-h-0 grid-cols-2 gap-[var(--main-gap)] overflow-hidden">
        {/* Left Footer Card */}
        <div className="flex h-full min-h-0 items-center justify-between overflow-hidden rounded-[8px] bg-white p-2  lg:p-3 xl:p-[clamp(8px,1vw,16px)]">
          <div className="flex min-h-0 flex-1 items-center gap-[clamp(8px,1vw,16px)] pr-2">
            <Heart className="h-[clamp(24px,2.5vw,40px)] w-[clamp(24px,2.5vw,40px)] shrink-0 text-red-500" />
            <div className="flex min-h-0 flex-col">
              <h2 className="mb-1 text-[clamp(16px,1.5vw,20px)] font-bold text-[#0D55CF]">
                Thank You!
              </h2>
              <p className="line-clamp-2 text-[14px] leading-tight font-medium text-slate-600 lg:text-[12px] xl:text-[clamp(9px,0.8vw,11px)]">
                Every order, every feedback, and every smile pushes us to do
                better every day.
              </p>
            </div>
          </div>
          <div className="relative h-[100%] min-h-0 w-[20%] shrink-0 lg:w-[28%] xl:w-[35%]">
            <Image
              src="/assets/story_family_footer.png"
              alt="Family"
              fill
              className="object-contain object-center scale-[1.9]"
            />
          </div>
        </div>

        {/* Right Footer Card */}
        <div className="flex h-full min-h-0 items-center justify-between overflow-hidden rounded-[8px] bg-white p-2  lg:p-3 xl:p-[clamp(8px,1vw,16px)]">
          <div className="flex h-full flex-1 items-center justify-center pl-2">
            <p className="text-[14px] leading-tight font-bold text-slate-600 italic lg:text-[14px] xl:text-[clamp(11px,1.2vw,16px)]">
              <span className="text-[clamp(20px,2.5vw,32px)] leading-none text-blue-200">
                &quot;
              </span>{' '}
              We don&apos;t just sell fish & meat,
              <br />
              we deliver trust, health and happiness.
            </p>
          </div>
          <div className="relative h-full w-[28%] shrink-0 lg:w-[32%] xl:w-[35%]">
            <Image
              src="/assets/story_family_footer.png"
              alt="Boat Illustration"
              fill
              className="object-contain object-center scale-[1.9]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
