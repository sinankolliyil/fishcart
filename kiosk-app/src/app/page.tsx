import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Droplet,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Rating } from '@/components/ui/Rating';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { Footer } from '@/components/layout/Footer';
import { HeroBannerCarousel } from '@/components/shared/HeroBannerCarousel';

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
    <div className="grid h-full w-full grid-rows-[33%_25%_16%_10%_auto] gap-[var(--main-gap)] overflow-hidden">
      {/* ═══════════════════════════════════════════════════
          ROW 1 — Hero (7 cols) + Categories (5 cols)  33%
          ═══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-[var(--main-gap)] overflow-hidden">
        {/* ── Hero Card ── */}
        <div className="relative col-span-7 overflow-hidden rounded-[16px] bg-slate-950 shadow-sm h-full w-full">
          <HeroBannerCarousel />
        </div>

        {/* ── Categories Grid ── */}
        <div className="col-span-5 grid grid-rows-[55fr_45fr] gap-[var(--cat-gap)] overflow-hidden">
          <div className="grid grid-cols-3 gap-[var(--cat-gap)] overflow-hidden">
            <CategoryCard
              title="Fish"
              subtitle="100+ Items"
              imageSrc="/assets/cat_fish.png"
              variant="fish"
              href="/category/fish"
              className="h-full"
            />
            <CategoryCard
              title="Meat"
              subtitle="50+ Items"
              imageSrc="/assets/cat_meat.png"
              variant="meat"
              href="/category/meat"
              className="h-full"
            />
            <CategoryCard
              title="Chicken"
              subtitle="30+ Items"
              imageSrc="/assets/cat_chicken.png"
              variant="chicken"
              href="/category/chicken"
              className="h-full"
            />
          </div>
          <CategoryCard
            title="Eggs"
            subtitle="Farm Fresh"
            imageSrc="/assets/cat_eggs.png"
            variant="eggs"
            href="/category/eggs"
            className="h-full"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          ROW 2 — Recipe | Nutrition | Testimonial              25%
          ═══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 gap-[var(--row2-gap)] overflow-hidden lg:grid-cols-3 xl:grid-cols-[1.15fr_1.16fr_0.7fr]">
        {/* ── Recipe ── */}
        <div className="col-span-1 flex flex-col justify-between overflow-hidden rounded-[16px] bg-[#0D55CF] p-[var(--recipe-padding)] shadow-sm">
          <div>
            <h3 className="mb-1 text-[clamp(16px,1.25vw,24px)] font-bold text-white">
              How to Make Delicious
            </h3>
            <p className="text-[clamp(11px,0.73vw,14px)] text-white/90">
              Step by step cooking videos for every taste
            </p>
          </div>

          <div className="mt-1 grid flex-1 grid-cols-3 gap-2">
            {[
              {
                img: '/assets/fish2.jpg',
                title: 'Fish Curry',
                sub: 'Spicy & Tangy',
              },
              {
                img: '/assets/prod_1_salmon.jpg',
                title: 'Grilled Fish',
                sub: 'Healthy & Tasty',
              },
              {
                img: '/assets/prod_7_prawns.jpg',
                title: 'Prawns',
                sub: 'Crispy & Juicy',
              },
            ].map((recipe, idx) => (
              <div
                key={idx}
                className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[12px] border border-white/10"
              >
                <Image
                  src={recipe.img}
                  alt={recipe.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 z-10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="flex h-[clamp(24px,1.67vw,32px)] w-[clamp(24px,1.67vw,32px)] items-center justify-center rounded-full bg-white text-[#0D55CF] shadow-md">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="ml-0.5 h-[clamp(10px,0.73vw,14px)] w-[clamp(10px,0.73vw,14px)]"
                    >
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 z-10">
                  <p className="text-[clamp(12px,0.83vw,16px)] leading-tight font-bold text-white">
                    {recipe.title}
                  </p>
                  <p className="mt-0.5 text-[clamp(10px,0.73vw,14px)] leading-tight text-white/90">
                    {recipe.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[var(--recipe-btn-mt)] flex h-[var(--recipe-btn-h)] items-center rounded-[8px] bg-white px-[clamp(10px,0.83vw,16px)]">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 text-[clamp(13px,0.78vw,15px)] font-bold text-[#0D55CF] hover:underline"
            >
              View All Recipes
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* ── Nutrition ── */}
        <div className="relative col-span-1 flex flex-col overflow-hidden rounded-[16px] bg-[#F4F9FF] p-[var(--nutrition-padding)] shadow-sm">
          <h3 className="mb-[clamp(4px,0.42vw,8px)] text-[clamp(15px,1.25vw,24px)] font-bold text-[#0D55CF]">
            Benefits & Nutrition
          </h3>
          <p className="relative z-10 mb-[var(--nutrition-desc-mb)] pr-[30%] text-[clamp(10px,0.99vw,15px)] leading-[1.5] text-[#1E293B]">
            Fish, meat, eggs and chicken are rich in
            <br /> protein, vitamins and minerals for a
            <br /> stronger,healthier you.
          </p>
          <Link
            href="#"
            className="relative z-10 mb-auto flex items-center gap-1 text-[clamp(13px,0.78vw,15px)] font-bold text-[#0D55CF] hover:underline"
          >
            Learn More <ArrowRight className="h-3 w-3 stroke-[2.5]" />
          </Link>

          <div className="relative z-10 mt-auto flex w-[80%] justify-center gap-0.5">
            <div className="flex flex-1 flex-col items-center gap-1.5">
              <div className="text-[#0D55CF]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[clamp(18px,1.25vw,24px)] w-[clamp(18px,1.25vw,24px)]"
                >
                  <path d="M18 20V10" />
                  <path d="M12 20V4" />
                  <path d="M6 20v-4" />
                </svg>
              </div>
              <span className="text-center text-[clamp(10px,0.677vw,13px)] leading-tight font-bold text-[#1E293B]">
                High in
                <br />
                Protein
              </span>
            </div>
            <div className="h-[22px] w-[1px] self-center bg-[#0D55CF]/15" />
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-[#0D55CF]">
                <ShieldCheck className="h-[clamp(18px,1.25vw,24px)] w-[clamp(18px,1.25vw,24px)] stroke-[1.5]" />
              </div>
              <span className="text-center text-[clamp(10px,0.677vw,13px)] leading-tight font-bold text-[#1E293B]">
                Rich in
                <br />
                Vitamins
              </span>
            </div>
            <div className="h-[28px] w-[1px] self-center bg-[#0D55CF]/15" />
            <div className="flex flex-1 flex-col items-center gap-1.5">
              <div className="text-[#0D55CF]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[clamp(18px,1.25vw,24px)] w-[clamp(18px,1.25vw,24px)]"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <span className="text-center text-[clamp(10px,0.677vw,13px)] leading-tight font-bold text-[#1E293B]">
                Good for
                <br />
                Heart
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute top-[-2%] right-[-3%] bottom-[-4%] w-[65%]">
            <Image
              src="/assets/nametoadd.png"
              alt="Salmon Benefits"
              fill
              className="object-contain object-right"
            />
          </div>
        </div>

        {/* ── Testimonial ── */}
        <div className="col-span-1 flex flex-col justify-between overflow-hidden rounded-[16px] bg-[#F4F9FF] p-[var(--testimonial-padding)] shadow-sm">
          <div>
            <h3 className="mb-[clamp(4px,0.52vw,8px)] text-[clamp(16px,1.25vw,24px)] font-bold text-[#0D55CF]">
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
            <p className="mb-[clamp(4px,0.52vw,8px)] pr-4 text-[clamp(11px,0.885vw,17px)] leading-[1.5] font-medium text-[#1E293B]">
              &quot;Super fresh products and great variety. Fishcart is our
              family&apos;s choice.&quot;
            </p>
            <p className="text-[9px] font-bold text-[#1E293B]">– Priya S.</p>
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
      <div className="grid grid-cols-2 gap-[var(--showcase-gap)] overflow-hidden lg:grid-cols-4">
        {[
          { title: 'All Fish Items', image: '/assets/fish_showcase.png' },
          { title: 'All Meat Items', image: '/assets/meat_showcase.png' },
          { title: 'Chicken Items', image: '/assets/chicken_showcase.png' },
          { title: 'Eggs', image: '/assets/eggs_showcase.png' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="group relative col-span-1 cursor-pointer overflow-hidden rounded-[16px] border border-[#E2E8F0] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div
              className="absolute bottom-[var(--showcase-label-bottom)] left-[var(--showcase-label-left)] z-10 rounded-[10px] bg-white px-[var(--showcase-label-px)] py-[var(--showcase-label-py)] shadow-sm"
              style={{ width: 'fit-content' }}
            >
              <h4 className="text-[clamp(12px,0.91vw,17.5px)] font-bold text-[#1E293B]">
                {item.title}
              </h4>
              <p className="mt-0.5 flex items-center gap-1 text-[clamp(10px,0.78vw,15px)] font-bold text-[#0D55CF] group-hover:underline">
                Explore Now{' '}
                <ArrowRight className="h-[clamp(10px,0.73vw,14px)] w-[clamp(10px,0.73vw,14px)] stroke-[2.5]" />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════════
          ROW 4 — Information Cards           10%
          ════════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-[var(--info-gap)] overflow-hidden lg:grid-cols-4">
        <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[16px] bg-[#E8F3FA] p-[var(--info-padding)] shadow-sm">
          <div className="min-w-0 flex-1 pr-2">
            <h4 className="mb-1 truncate text-[clamp(13px,0.94vw,18px)] font-bold text-[#0D55CF]">
              Daily Selection
            </h4>
            <p className="line-clamp-2 text-[clamp(11px,0.83vw,16px)] leading-[1.3] text-[#1E293B]">
              Handpicked daily from trusted suppliers for the best quality.
            </p>
          </div>
          <div className="shrink-0 text-[#0D55CF]">
            <CheckCircle2 className="h-[var(--info-icon-size)] w-[var(--info-icon-size)] stroke-[1.5]" />
          </div>
        </div>

        <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[16px] bg-[#A5E3E0] p-[var(--info-padding)] shadow-sm">
          <div className="min-w-0 flex-1 pr-2">
            <h4 className="mb-1 truncate text-[clamp(13px,0.94vw,18px)] font-bold text-[#0D55CF]">
              Hygienic & Safe
            </h4>
            <p className="line-clamp-2 text-[clamp(11px,0.83vw,16px)] leading-[1.3] text-[#1E293B]">
              Cleaned, packed and delivered with highest hygiene standards.
            </p>
          </div>
          <div className="shrink-0 text-white">
            <Droplet className="h-[var(--info-icon-size)] w-[var(--info-icon-size)] stroke-[1.5]" />
          </div>
        </div>

        <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[16px] bg-[#D4EFA5] p-[var(--info-padding)] shadow-sm">
          <div className="min-w-0 flex-1 pr-2">
            <h4 className="mb-1 truncate text-[clamp(13px,0.94vw,18px)] font-bold text-[#0D55CF]">
              Sourced Responsibly
            </h4>
            <p className="line-clamp-2 text-[clamp(11px,0.83vw,16px)] leading-[1.3] text-[#1E293B]">
              We care for the ocean and the environment for a better future.
            </p>
          </div>
          <div className="shrink-0 text-white">
            <Leaf className="h-[var(--info-icon-size)] w-[var(--info-icon-size)] stroke-[1.5]" />
          </div>
        </div>

        <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[16px] bg-[#E8F3FA] p-[var(--info-padding)] text-[#1E293B] shadow-sm">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <h4 className="mb-1 truncate text-[clamp(13px,0.94vw,18px)] font-bold text-[#0D55CF]">
              Join Our Community
            </h4>
            <p className="mb-2 line-clamp-2 text-[clamp(11px,0.83vw,16px)] leading-[1.3]">
              Be a part of our journey for healthy and delicious living.
            </p>
          </div>
          <div className="relative ml-2 h-[var(--info-qr-size)] w-[var(--info-qr-size)] shrink-0 rounded-lg bg-white p-1">
            <Image
              src="/assets/whatsapp_qr.png"
              alt="QR Code"
              fill
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          ROW 5 — Footer         (auto)
          Gets exactly the remaining space after rows 1–4 and 4 gaps.
          ════════════════════════════════ */}
      <div className="overflow-hidden">
        <Footer />
      </div>
    </div>
  );
}
