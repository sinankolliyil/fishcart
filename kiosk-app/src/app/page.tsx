import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Droplet,
  Leaf,
  Dumbbell,
  Dna,
  Sparkles,
  HeartPulse,
  ShieldCheck,
  MapPin,
  PhoneCall,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Rating } from '@/components/ui/Rating';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { HomeFooter } from '@/components/layout/HomeFooter';
import { HeroBannerCarousel } from '@/components/shared/HeroBannerCarousel';
import { RecipeCarousel } from '@/components/home/RecipeCarousel';

export default function HomePage() {
  return (
    <>
      {/* ── LANDSCAPE VIEW ── 
    
     * CSS Grid with percentage-based rows guarantees all 5 rows always fit
     * inside the available height (main's content area) at any landscape viewport.
     *
     * Row heights resolve as percentage of the grid container (main's content area).
     * The `auto` footer row gets exactly the remaining space after rows 1–4 and gaps.
     *
     * This is mathematically identical to the reference design (1920×1200) and
     * scales proportionally to every shorter landscape viewport without overflow.
     */}
      <div className="grid h-full min-h-[950px] w-full grid-rows-[minmax(0,38fr)_minmax(0,32fr)_minmax(0,16fr)_minmax(0,11fr)_minmax(0,10fr)] gap-[clamp(5px,1vw,15px)] portrait:hidden">
        {/* ═══════════════════════════════════════════════════
          ROW 1 — Hero (7 cols) + Categories (5 cols)  33%
          ═══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-12 gap-[var(--main-gap)] overflow-hidden portrait:flex portrait:flex-col">
          {/* ── Hero Card ── */}
          <div className="relative col-span-7 h-full w-full overflow-hidden rounded-[8px] bg-slate-950 portrait:h-[40vh] portrait:min-h-[300px]">
            <HeroBannerCarousel />
          </div>

          {/* ── Categories Grid ── */}
          <div className="col-span-5 grid grid-rows-[55fr_45fr] gap-[var(--cat-gap)] overflow-hidden portrait:flex portrait:h-auto portrait:flex-col">
            <div className="grid grid-cols-3 gap-[var(--cat-gap)] overflow-hidden portrait:h-[180px] portrait:grid-cols-3">
              <CategoryCard
                title="Fish"
                subtitle="100+ Items"
                imageSrc="/assets/aa_fish.png"
                variant="fish"
                href="/fish"
                className="h-full"
              />
              <CategoryCard
                title="Meat"
                subtitle="50+ Items"
                imageSrc="/assets/meat.png"
                variant="meat"
                href="/meat"
                className="h-full"
              />
              <CategoryCard
                title="Chicken"
                subtitle="30+ Items"
                imageSrc="/assets/chicken.png"
                variant="chicken"
                href="/chicken"
                className="h-full"
              />
            </div>
            <div className="portrait:h-[120px]">
              <CategoryCard
                title="Eggs"
                subtitle="Farm Fresh"
                imageSrc="/assets/egg.png"
                variant="eggs"
                href="/eggs"
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
          ROW 2 — Recipe | Nutrition | Testimonial              25%
          ═══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-3 gap-[var(--row2-gap)] overflow-hidden xl:grid-cols-[1.15fr_1.16fr_0.7fr] portrait:flex portrait:flex-col">
          {/* ── Recipe ── */}
          <div className="col-span-1 flex min-h-0 flex-col justify-between overflow-hidden rounded-[8px] bg-[#A9D3FB] p-[var(--recipe-padding)] portrait:min-h-[300px]">
            <div>
              <h3 className="mb-[clamp(4px,min(0.5vw,0.75svh),8px)] text-[clamp(17px,min(1.25vw,2svh),22px)] font-bold text-[#0D55CF]">
                How to Make Delicious
              </h3>
              <p className="text-[clamp(15px,min(0.73vw,1.1svh),13px)] text-[#0D55CF]/90">
                Step by step cooking videos for every taste
              </p>
            </div>

            <RecipeCarousel />

            <div className="mt-[var(--recipe-padding)] flex h-[var(--recipe-btn-h)] w-fit items-center justify-center rounded-[5px] bg-white px-[clamp(10px,0.83vw,16px)]">
              <Link
                href="/cook"
                className="inline-flex items-center gap-3 text-[clamp(10px,min(0.78vw,1.15svh),13px)] font-bold text-[#0D55CF] hover:underline"
              >
                View All Recipes
                <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* ── Nutrition ── */}
          <div className="relative col-span-1 flex flex-row overflow-hidden rounded-[8px] bg-[#E1EDFA] p-[var(--nutrition-padding)] portrait:min-h-[300px]">
            {/* Left Column (58%) */}
            <div className="relative z-10 flex w-[58%] flex-col pr-2">
              <h3 className="mb-[clamp(4px,min(0.5vw,0.75svh),8px)] text-[clamp(17px,min(1.25vw,2svh),22px)] font-bold text-[#0D55CF]">
                Benefits & Nutrition
              </h3>
              <p className="mb-[var(--nutrition-desc-mb)] text-[clamp(15px,min(0.99vw,1.5svh),13px)] leading-[1.4] text-[#1E293B]">
                Fish, meat, eggs and chicken are rich in protein, vitamins and
                minerals for a stronger, healthier you.
              </p>
              <Link
                href="/benefits"
                className="mb-auto flex items-center gap-1 text-[clamp(12px,min(0.78vw,1.15svh),13px)] font-bold text-[#0D55CF] hover:underline"
              >
                Learn More <ArrowRight className="h-3 w-3 stroke-[2.5]" />
              </Link>

              <div className="mt-auto flex justify-start gap-[clamp(12px,1.5vw,20px)]">
                <div className="flex flex-col items-start gap-1.5">
                  <div className="flex h-[clamp(24px,2vw,32px)] w-[clamp(24px,2vw,32px)] shrink-0 items-center justify-start text-[#0D55CF]">
                    <Dumbbell className="h-full w-full stroke-[1.5]" />
                  </div>
                  <span className="text-left text-[clamp(10px,min(0.8vw,1.2svh),12px)] leading-[1.2] font-bold text-[#1E293B]">
                    High in
                    <br />
                    Protein
                  </span>
                </div>
                <div className="h-[36px] w-[1px] self-center bg-[#0D55CF]/15" />
                <div className="flex flex-col items-start gap-1.5">
                  <div className="flex h-[clamp(24px,2vw,32px)] w-[clamp(24px,2vw,32px)] shrink-0 items-center justify-start text-[#0D55CF]">
                    <Sparkles className="h-full w-full stroke-[1.5]" />
                  </div>
                  <span className="text-left text-[clamp(10px,min(0.8vw,1.2svh),12px)] leading-[1.2] font-bold text-[#1E293B]">
                    Rich in
                    <br />
                    Vitamins
                  </span>
                </div>
                <div className="h-[36px] w-[1px] self-center bg-[#0D55CF]/15" />
                <div className="flex flex-col items-start gap-1.5">
                  <div className="flex h-[clamp(24px,2vw,32px)] w-[clamp(24px,2vw,32px)] shrink-0 items-center justify-start text-[#0D55CF]">
                    <HeartPulse className="h-full w-full stroke-[1.5]" />
                  </div>
                  <span className="text-left text-[clamp(10px,min(0.8vw,1.2svh),12px)] leading-[1.2] font-bold text-[#1E293B]">
                    Good for
                    <br />
                    Heart
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (42%) */}
            <div className="pointer-events-none relative w-[42%] flex-shrink-0">
              {/* Expanded bounds inside the column to allow the image to fill space optimally without overlapping text */}
              <div className="absolute top-[-5%] right-[-5%] bottom-[-5%] left-0">
                <Image
                  src="/assets/nametoadd.png"
                  alt="Salmon Benefits"
                  fill
                  className="object-contain object-right"
                />
              </div>
            </div>
          </div>

          {/* ── Testimonial ── */}
          <div className="col-span-1 flex min-h-0 flex-col justify-between overflow-hidden rounded-[8px] bg-[#E1EDFA] p-[var(--testimonial-padding)] portrait:min-h-[250px]">
            <div>
              <h3 className="mb-[clamp(4px,min(0.5vw,0.75svh),8px)] text-[clamp(17px,min(1.25vw,2svh),22px)] font-bold text-[#0D55CF]">
                What Our Customers Say
              </h3>
              <div className="mb-1 text-[#0D55CF]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>
              <Rating
                score={5}
                size={14}
                className="mb-2 gap-0.5 text-[#F5A623]"
              />
              <p className="mb-[clamp(3px,min(0.52vw,0.75svh),6px)] pr-4 text-[clamp(15px,min(0.885vw,1.35svh),15px)] leading-[1.4] font-medium text-[#1E293B]">
                &quot;Super fresh products and great variety. Fishcart is our
                family&apos;s choice.&quot;
              </p>
              <p className="text-[14px] font-bold text-[#1E293B]">– Priya S.</p>
            </div>
            <div className="mt-auto flex justify-center gap-2 pb-1">
              <div className="h-[5px] w-[5px] rounded-full bg-[#0D55CF]" />
              <div className="h-[5px] w-[5px] rounded-full bg-[#93C5FD]" />
              <div className="h-[5px] w-[5px] rounded-full bg-[#93C5FD]" />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
          ROW 3 — Promotional Product Banners       16%
          ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-4 gap-[var(--showcase-gap)] overflow-hidden portrait:grid-cols-2">
          {[
            {
              title: 'All Fish Items',
              image: '/assets/all_fish.png',
              href: '/fish',
              gradient: 'from-[#DCE9FA] to-[#F8FAFD]',
            },
            {
              title: 'All Meat Items',
              image: '/assets/all_meat.png',
              href: '/meat',
              gradient: 'from-[#E0EAF5] to-[#F9FBFC]',
            },
            {
              title: 'Chicken Items',
              image: '/assets/all_chicken.png',
              href: '/chicken',
              gradient: 'from-[#E0EAF5] to-[#F9FBFC]',
            },
            {
              title: 'Eggs',
              image: '/assets/all_egg.png',
              href: '/eggs',
              gradient: 'from-[#EAE5DF] to-[#F9F8F6]',
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group relative col-span-1 cursor-pointer overflow-hidden rounded-[8px] bg-[#DFE8F2] portrait:aspect-[4/3]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover mix-blend-multiply"
              />
              <div
                className="absolute bottom-[clamp(8px,min(1vw,1.5svh),16px)] left-[clamp(8px,min(1vw,1.5svh),16px)] z-10 rounded-[12px] bg-white px-[clamp(12px,min(1vw,1.5svh),16px)] py-[clamp(8px,min(0.8vw,1.2svh),12px)] shadow-[0px_2px_8px_rgba(0,0,0,0.08)]"
                style={{ width: 'max-content' }}
              >
                <h4 className="text-[clamp(13px,min(0.9vw,1.3svh),16px)] font-bold text-[#1E293B]">
                  {item.title}
                </h4>
                <p className="mt-[2px] flex items-center gap-1 text-[clamp(11px,min(0.75vw,1.1svh),14px)] font-bold text-[#0D55CF] group-hover:underline">
                  Explore Now{' '}
                  <ArrowRight className="h-[clamp(10px,min(0.73vw,1.1svh),14px)] w-[clamp(10px,min(0.73vw,1.1svh),14px)] stroke-[2.5]" />
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ════════════════════════════════════════
          ROW 4 — Information Cards           10%
          ════════════════════════════════════════ */}
        <div className="grid grid-cols-4 gap-[var(--info-gap)] overflow-hidden portrait:grid-cols-1">
          {/* Card 1 */}
          <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[8px] bg-[#EAF4FE] p-[clamp(12px,1.5vw,20px)]">
            <div className="mr-2 flex flex-1 flex-col text-left">
              <h4 className="mb-1 truncate text-[clamp(14px,min(1vw,1.6svh),16px)] font-bold text-[#0D55CF]">
                Daily Selection
              </h4>
              <p className="line-clamp-2 text-[clamp(12px,min(0.8vw,1.3svh),13px)] leading-[1.3] text-[#1E293B]">
                Handpicked daily from trusted suppliers for the best quality.
              </p>
            </div>
            <div className="shrink-0 text-[#0D55CF]">
              <CheckCircle2 className="h-[clamp(36px,3.5vw,54px)] w-[clamp(36px,3.5vw,54px)] stroke-[1]" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[8px] bg-[#A7E8DF] p-[clamp(12px,1.5vw,20px)]">
            <div className="mr-2 flex flex-1 flex-col text-left">
              <h4 className="mb-1 truncate text-[clamp(14px,min(1vw,1.6svh),16px)] font-bold text-[#0D55CF]">
                Hygienic & Safe
              </h4>
              <p className="line-clamp-2 text-[clamp(12px,min(0.8vw,1.3svh),13px)] leading-[1.3] text-[#1E293B]">
                Cleaned, packed and delivered with highest hygiene standards.
              </p>
            </div>
            <div className="shrink-0 text-white">
              <Droplet className="h-[clamp(36px,3.5vw,54px)] w-[clamp(36px,3.5vw,54px)] stroke-[1]" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[8px] bg-[#CAEFA7] p-[clamp(12px,1.5vw,20px)]">
            <div className="mr-2 flex flex-1 flex-col text-left">
              <h4 className="mb-1 truncate text-[clamp(14px,min(1vw,1.6svh),16px)] font-bold text-[#0D55CF]">
                Sourced Responsibly
              </h4>
              <p className="line-clamp-2 text-[clamp(12px,min(0.8vw,1.3svh),13px)] leading-[1.3] text-[#1E293B]">
                We care for the ocean and the environment for a better future.
              </p>
            </div>
            <div className="shrink-0 text-white">
              <Leaf className="h-[clamp(36px,3.5vw,54px)] w-[clamp(36px,3.5vw,54px)] stroke-[1]" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[8px] bg-[#5CA3F6] p-[clamp(12px,1.5vw,20px)]">
            <div className="mr-2 flex flex-1 flex-col text-left">
              <h4 className="mb-1 text-[clamp(14px,min(1vw,1.6svh),16px)] leading-[1.2] font-bold text-white">
                Freshness You Can Trust
              </h4>
              <p className="line-clamp-3 text-[clamp(12px,min(0.8vw,1.3svh),13px)] leading-[1.3] text-white">
                We ensure premium quality and freshness in every product we
                deliver.
              </p>
            </div>
            <div className="shrink-0 text-white">
              <ShieldCheck className="h-[clamp(36px,3.5vw,54px)] w-[clamp(36px,3.5vw,54px)] stroke-[1]" />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════
          ROW 5 — Footer         (auto)
          Gets exactly the remaining space after rows 1–4 and 4 gaps.
          ════════════════════════════════ */}
        <div className="h-full w-full">
          <HomeFooter />
        </div>
      </div>

      {/* ── PORTRAIT VIEW ── */}
      <div className="hidden portrait:flex portrait:h-auto portrait:w-full portrait:flex-col portrait:gap-2 portrait:bg-white">
        {/* Mobile Hero */}
        <div className="relative mx-2 mt-0 h-[28vh] max-h-[320px] min-h-[220px] w-[calc(100%-16px)] shrink-0 overflow-hidden rounded-[12px] bg-slate-900">
          <HeroBannerCarousel />
        </div>

        {/* Mobile Categories Row - Exact Reference Style */}
        <div className="scrollbar-hide w-full overflow-x-auto px-2">
          <div className="flex w-full justify-between gap-2 sm:gap-3">
            {[
              {
                title: 'Fish',
                items: '100+ Items',
                img: '/assets/aa_fish.png',
                href: '/fish',
                bg: '#EAF4FE',
                circle: '#D8ECFF',
                arrow: '#6CA5FC',
              },
              {
                title: 'Meat',
                items: '50+ Items',
                img: '/assets/meat.png',
                href: '/meat',
                bg: '#FFEBEE',
                circle: '#FFE0E5',
                arrow: '#FF7282',
              },
              {
                title: 'Chicken',
                items: '30+ Items',
                img: '/assets/chicken.png',
                href: '/chicken',
                bg: '#FFF3E0',
                circle: '#FFE7C2',
                arrow: '#FCBA5C',
              },
              {
                title: 'Eggs',
                items: 'Farm Fresh',
                img: '/assets/egg_pas.png',
                href: '/eggs',
                bg: '#EBF7EE',
                circle: '#DDF2E2',
                arrow: '#61C277',
              },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="relative h-[16vh] max-h-[140px] min-h-[110px] min-w-[70px] flex-1 overflow-hidden transition-transform active:scale-[0.97]"
                style={{
                  backgroundColor: cat.bg,
                  borderRadius: '50% 50% 16px 16px',
                }}
              >
                {/* Circular image background */}
                <div
                  className="absolute top-[15%] left-1/2 aspect-square w-[75%] max-w-[100px] -translate-x-1/2 rounded-full"
                  style={{
                    backgroundColor: cat.circle,
                  }}
                />

                {/* Product image */}
                <div className="absolute top-[20%] left-1/2 aspect-square w-[85%] max-w-[110px] -translate-x-1/2">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                  />
                </div>

                {/* Bottom title & arrow */}
                <div className="absolute bottom-[8%] left-0 flex w-full flex-col items-center gap-0.5">
                  <span className="text-[11px] font-bold text-[#1E293B] sm:text-[13px]">
                    {cat.title}
                  </span>
                  <div
                    className="flex h-4 w-4 items-center justify-center rounded-full sm:h-5 sm:w-5"
                    style={{ backgroundColor: cat.arrow }}
                  >
                    <ArrowRight className="h-2.5 w-2.5 stroke-[3] text-white sm:h-3 sm:w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Benefits & Nutrition */}
        <div className="relative mx-2 flex h-[20vh] max-h-[220px] min-h-[160px] shrink-0 overflow-hidden rounded-[16px] border border-white/50 bg-[#F2F8FF] p-3 shadow-sm sm:rounded-[24px] sm:p-5">
          {/* Background circle behind the salmon plate */}
          <div className="pointer-events-none absolute top-[-10%] right-[-5%] aspect-square h-[120%] rounded-full bg-[#E4F0FF]" />

          {/* Left Text/Icons */}
          <div className="relative z-10 flex h-full w-[55%] flex-col justify-center gap-4 pb-3 sm:gap-4">
            <div className="flex flex-col">
              <h3 className="text-[clamp(15px,min(1.25vw,2svh),22px)] font-bold tracking-tight whitespace-nowrap text-[#0D55CF]">
                Benefits & Nutrition
              </h3>
              <p className="mt-0.5 pr-2 text-[10px] leading-[1.25] font-medium text-slate-600 sm:text-[12px]">
                Rich in protein and vitamins for a healthier you.
              </p>
            </div>

            <div className="flex h-[40px] w-fit items-center gap-2 rounded-xl bg-white/60 px-2 backdrop-blur-md sm:h-[60px] sm:gap-3 sm:px-3">
              <div className="flex flex-col items-center">
                <Dumbbell className="h-4 w-4 stroke-[2] text-[#0D6EFD] sm:h-5 sm:w-5" />
                <span className="text-center text-[9px] leading-tight font-bold text-[#1E293B] sm:text-[11px]">
                  High in
                  <br />
                  Protein
                </span>
              </div>
              <div className="h-6 w-[1px] bg-blue-200/70 sm:h-10" />
              <div className="flex flex-col items-center">
                <Sparkles className="h-4 w-4 stroke-[2] text-[#0D6EFD] sm:h-5 sm:w-5" />
                <span className="text-center text-[9px] leading-tight font-bold text-[#1E293B] sm:text-[11px]">
                  Rich in
                  <br />
                  Vitamins
                </span>
              </div>
              <div className="h-6 w-[1px] bg-blue-200/70 sm:h-10" />
              <div className="flex flex-col items-center">
                <HeartPulse className="h-4 w-4 stroke-[2] text-[#0D6EFD] sm:h-5 sm:w-5" />
                <span className="text-center text-[9px] leading-tight font-bold text-[#1E293B] sm:text-[11px]">
                  Good for
                  <br />
                  Heart
                </span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="pointer-events-none absolute top-[5%] right-[2%] bottom-[5%] z-0 w-[55%]">
            <Image
              src="/assets/nametoadd.png"
              alt="Salmon plate"
              fill
              className="object-contain object-right"
            />
          </div>
        </div>

        {/* Mobile Recipe Section */}
        <div className="mx-2 flex shrink-0 flex-col rounded-[20px] bg-[#E1EDFA] p-4">
          <div className="mb-3 flex flex-col">
            <h3 className="mb-0.5 text-[18px] leading-tight font-bold text-[#0B1F5B]">
              How to Make Delicious
            </h3>
            <p className="text-[14px] font-medium text-slate-600">
              Step by step cooking videos for every taste
            </p>
          </div>

          <div className="flex h-[18vh] max-h-[200px] min-h-[160px] w-full flex-col overflow-hidden rounded-xl">
            <RecipeCarousel />
          </div>

          <div className="mt-3 flex w-full justify-center">
            <Link
              href="/cook"
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-bold whitespace-nowrap text-[#0D55CF] shadow-sm transition-transform active:scale-95"
            >
              View All Recipes
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Mobile Promotional Banners (2x2 Grid) */}
        <div className="grid shrink-0 grid-cols-2 gap-3 px-2">
          {[
            {
              title: 'All Fish Items',
              image: '/assets/all_fish.png',
              href: '/fish',
              color: 'text-[#0D55CF]',
              bg: 'bg-[#0D55CF]',
            },
            {
              title: 'All Meat Items',
              image: '/assets/all_meat.png',
              href: '/meat',
              color: 'text-[#FF4A5C]',
              bg: 'bg-[#FF4A5C]',
            },
            {
              title: 'Chicken Items',
              image: '/assets/all_chicken.png',
              href: '/chicken',
              color: 'text-[#F59000]',
              bg: 'bg-[#F59000]',
            },
            {
              title: 'Eggs',
              image: '/assets/all_egg.png',
              href: '/eggs',
              color: 'text-[#F59000]',
              bg: 'bg-[#F59000]',
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group relative flex aspect-square flex-col overflow-hidden rounded-[12px] border border-gray-100 bg-[#F4F7FB] shadow-sm transition-transform active:scale-95"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-2 left-10 z-10 inline-flex w-max items-center gap-2 rounded-[24px] bg-white/95 py-1.5 pr-1.5 pl-3 shadow-md backdrop-blur-sm">
                <div className="flex flex-col">
                  <h4 className="text-[13px] leading-[1.1] font-bold text-[#0B1F5B]">
                    {item.title}
                  </h4>
                  <p className={`mt-0.5 text-[11px] font-bold ${item.color}`}>
                    Explore Now
                  </p>
                </div>
                <div
                  className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full ${item.bg} text-white`}
                >
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Info Cards */}
        <div className="flex shrink-0 flex-col gap-2.5 px-2">
          {/* Card 1 */}
          <div className="relative flex items-center overflow-hidden rounded-[12px] bg-[#EAF4FE] p-3 shadow-sm">
            <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 opacity-[0.08]">
              <CheckCircle2 className="h-28 w-28 stroke-[1] text-[#0D55CF]" />
            </div>
            <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#0D55CF]/10 bg-white text-[#0D55CF]">
              <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="z-10 ml-3 flex flex-col">
              <h4 className="text-[16px] font-bold text-[#0B1F5B]">
                Daily Selection
              </h4>
              <p className="mt-0.5 max-w-[90%] text-[13px] leading-tight font-medium text-slate-600">
                Handpicked daily from trusted suppliers for the best quality.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative flex items-center overflow-hidden rounded-[12px] bg-[#A7E8DF] p-3 shadow-sm">
            <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 text-white opacity-[0.25]">
              <Droplet className="h-28 w-28 stroke-[1]" />
            </div>
            <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal-500/10 bg-white text-teal-600">
              <Droplet className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="z-10 ml-3 flex flex-col">
              <h4 className="text-[16px] font-bold text-[#0B1F5B]">
                Hygienic & Safe
              </h4>
              <p className="mt-0.5 max-w-[90%] text-[13px] leading-tight font-medium text-teal-900">
                Cleaned, packed and delivered with highest hygiene standards.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative flex items-center overflow-hidden rounded-[12px] bg-[#CAEFA7] p-3 shadow-sm">
            <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 text-white opacity-[0.25]">
              <Leaf className="h-28 w-28 stroke-[1]" />
            </div>
            <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-green-500/10 bg-white text-green-600">
              <Leaf className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="z-10 ml-3 flex flex-col">
              <h4 className="text-[16px] font-bold text-[#0B1F5B]">
                Sourced Responsibly
              </h4>
              <p className="mt-0.5 max-w-[90%] text-[13px] leading-tight font-medium text-green-900">
                We care for the ocean and the environment for a better future.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative flex items-center overflow-hidden rounded-[12px] bg-[#5CA3F6] p-3 shadow-sm">
            <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 text-white opacity-[0.15]">
              <ShieldCheck className="h-28 w-28 stroke-[1]" />
            </div>
            <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white">
              <ShieldCheck className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="z-10 ml-3 flex flex-col">
              <h4 className="text-[16px] font-bold text-white">
                Freshness You Can Trust
              </h4>
              <p className="mt-0.5 max-w-[90%] text-[13px] leading-tight font-medium text-white/90">
                We ensure premium quality and freshness in every product we
                deliver.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile About / Stories */}
        <div className="flex shrink-0 gap-3 px-2 pb-1 w-full">
          {/* About Us */}
          <div className="relative flex aspect-square flex-1 flex-col overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="relative z-10 flex flex-col">
              <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
                About Us
              </h4>
              <p className="text-[13px] leading-[1.3] font-medium text-slate-500">
                Delivering fresh & healthy food to your family.
              </p>
            </div>
            <div className="absolute right-1 bottom-1 h-14 w-14 opacity-90 mix-blend-multiply">
              <Image
                src="/assets/about_us_fish_exact.png"
                alt="About Us"
                fill
                className="object-contain object-right-bottom"
              />
            </div>
          </div>

          {/* Our Stories */}
          <div className="relative flex aspect-square flex-1 flex-col overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="relative z-10 flex flex-col">
              <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
                Our Stories
              </h4>
              <p className="max-w-[90%] text-[13px] leading-[1.3] font-medium text-slate-500">
                From ocean to your kitchen, journey of freshness.
              </p>
            </div>
            <div className="absolute right-1 bottom-1 h-12 w-16 opacity-90 mix-blend-multiply">
              <Image
                src="/assets/boat_exact.png"
                alt="Our Stories"
                fill
                className="object-contain object-right-bottom"
              />
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="relative mx-2 flex shrink-0 flex-col justify-center gap-2 overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="relative z-10 flex w-full flex-col items-center gap-2 text-center">
            <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
              Contact Us
            </h4>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#0D55CF]" />
              <span className="text-[14px] leading-tight font-medium text-slate-600">
                Unit 5 Hythe Quay, England, CO2 8JB
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <PhoneCall className="h-4 w-4 shrink-0 text-[#0D55CF]" />
              <span className="text-[14px] font-bold text-[#0B1F5B]">
                +44 1206 123456
              </span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[#0D55CF]" />
              <span className="text-[14px] font-bold text-[#0D55CF]">
                hello@fishcart.co.uk
              </span>
            </div>
          </div>

          <div className="absolute top-1/2 right-2 h-14 w-16 -translate-y-1/2 opacity-20 mix-blend-multiply">
            <Image
              src="/assets/fishdd.png"
              alt="Address"
              fill
              className="object-contain object-right"
            />
          </div>
        </div>
      </div>
    </>
  );
}
