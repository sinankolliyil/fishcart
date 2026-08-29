import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Droplet,
  Leaf,
  Dumbbell,
  Sparkles,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Rating } from '@/components/ui/Rating';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { HomeFooter } from '@/components/layout/HomeFooter';
import { HeroBannerCarousel } from '@/components/shared/HeroBannerCarousel';
import { RecipeCarousel } from '@/components/home/RecipeCarousel';

export default function HomePage() {
  return (
    /*
     * CSS Grid with percentage-based rows guarantees all 5 rows always fit
     * inside the available height (main's content area) at any landscape viewport.
     *
     * Row heights resolve as percentage of the grid container (main's content area).
     * The `auto` footer row gets exactly the remaining space after rows 1–4 and gaps.
     *
     * This is mathematically identical to the reference design (1920×1200) and
     * scales proportionally to every shorter landscape viewport without overflow.
     */
    <div className="grid h-full min-h-[950px] w-full grid-rows-[minmax(0,38fr)_minmax(0,32fr)_minmax(0,16fr)_minmax(0,11fr)_minmax(0,10fr)] gap-[clamp(5px,1vw,15px)]">
      {/* ═══════════════════════════════════════════════════
          ROW 1 — Hero (7 cols) + Categories (5 cols)  33%
          ═══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-[var(--main-gap)] overflow-hidden">
        {/* ── Hero Card ── */}
        <div className="relative col-span-7 h-full w-full overflow-hidden rounded-[8px] bg-slate-950">
          <HeroBannerCarousel />
        </div>

        {/* ── Categories Grid ── */}
        <div className="col-span-5 grid grid-rows-[55fr_45fr] gap-[var(--cat-gap)] overflow-hidden">
          <div className="grid grid-cols-3 gap-[var(--cat-gap)] overflow-hidden">
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

      {/* ═══════════════════════════════════════════════════════════
          ROW 2 — Recipe | Nutrition | Testimonial              25%
          ═══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-[var(--row2-gap)] overflow-hidden xl:grid-cols-[1.15fr_1.16fr_0.7fr]">
        {/* ── Recipe ── */}
        <div className="col-span-1 flex min-h-0 flex-col justify-between overflow-hidden rounded-[8px] bg-[#A9D3FB] p-[var(--recipe-padding)]">
          <div>
            <h3 className="mb-[clamp(4px,min(0.5vw,0.75svh),8px)] text-[clamp(17px,min(1.25vw,2svh),22px)] font-bold text-[#0D55CF]">
              How to Make Delicious
            </h3>
            <p className="text-[clamp(15px,min(0.73vw,1.1svh),13px)] text-[#0D55CF]/90">
              Step by step cooking videos for every taste
            </p>
          </div>

          <RecipeCarousel />

          <div className="mt-[var(--recipe-btn-mt)] flex h-[var(--recipe-btn-h)] w-fit items-center rounded-[5px] bg-white px-[clamp(10px,0.83vw,16px)]">
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
        <div className="relative col-span-1 flex flex-row overflow-hidden rounded-[8px] bg-[#E1EDFA] p-[var(--nutrition-padding)]">
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
        <div className="col-span-1 flex min-h-0 flex-col justify-between overflow-hidden rounded-[8px] bg-[#E1EDFA] p-[var(--testimonial-padding)]">
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
      <div className="grid grid-cols-4 gap-[var(--showcase-gap)] overflow-hidden">
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
            className="group relative col-span-1 cursor-pointer overflow-hidden rounded-[8px] bg-[#DFE8F2]"
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
      <div className="grid grid-cols-4 gap-[var(--info-gap)] overflow-hidden">
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
  );
}
