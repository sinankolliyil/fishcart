import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Droplet, Leaf } from 'lucide-react';
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
    <div className="grid h-full min-h-[950px] w-full grid-rows-[minmax(0,38fr)_minmax(0,25fr)_minmax(0,16fr)_minmax(0,10fr)_minmax(0,10fr)] gap-[clamp(8px,1vw,16px)]">
      {/* ═══════════════════════════════════════════════════
          ROW 1 — Hero (7 cols) + Categories (5 cols)  33%
          ═══════════════════════════════════════════════════ */}
      <div className="grid grid-cols-12 gap-[var(--main-gap)] overflow-hidden"> 
        {/* ── Hero Card ── */}
        <div className="relative col-span-7 h-full w-full overflow-hidden rounded-[16px] bg-slate-950 shadow-sm">
          <HeroBannerCarousel />
        </div>

        {/* ── Categories Grid ── */}
        <div className="col-span-5 grid grid-rows-[55fr_45fr] gap-[var(--cat-gap)] overflow-hidden">
          <div className="grid grid-cols-3 gap-[var(--cat-gap)] overflow-hidden">
            <CategoryCard
              title="Fish"
              subtitle="100+ Items"
              imageSrc="/assets/fish.png"
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
        <div className="col-span-1 flex min-h-0 flex-col justify-between overflow-hidden rounded-[16px] bg-[#0D55CF] p-[var(--recipe-padding)] shadow-sm">
          <div>
            <h3 className="mb-1 text-[clamp(17px,min(1.25vw,2svh),22px)] font-bold text-white">
              How to Make Delicious
            </h3>
            <p className="text-[clamp(15px,min(0.73vw,1.1svh),13px)] text-white/90">
              Step by step cooking videos for every taste
            </p>
          </div>

          <div className="mt-1 grid min-h-0 flex-1 grid-cols-3 gap-2">
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
                  <div className="flex h-[clamp(20px,min(1.67vw,2.7svh),30px)] w-[clamp(20px,min(1.67vw,2.7svh),30px)] items-center justify-center rounded-full bg-white text-[#0D55CF] shadow-md">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="ml-0.5 h-[clamp(8px,min(0.73vw,1.1svh),12px)] w-[clamp(8px,min(0.73vw,1.1svh),12px)]"
                    >
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 z-10">
                  <p className="text-[clamp(10px,min(0.83vw,1.3svh),14px)] leading-tight font-bold text-white">
                    {recipe.title}
                  </p>
                  <p className="mt-0.5 text-[clamp(8px,min(0.73vw,1.1svh),12px)] leading-tight text-white/90">
                    {recipe.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[var(--recipe-btn-mt)] flex w-fit h-[var(--recipe-btn-h)] items-center rounded-[8px] bg-white px-[clamp(10px,0.83vw,16px)]">
            <Link
              href="/cook"
              className="inline-flex items-center gap-2 text-[clamp(10px,min(0.78vw,1.15svh),13px)] font-bold text-[#0D55CF] hover:underline"
            >
              View All Recipes
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* ── Nutrition ── */}
        <div className="relative col-span-1 flex flex-row overflow-hidden rounded-[16px] bg-[#EBF2FE] p-[var(--nutrition-padding)] shadow-sm">
          {/* Left Column (58%) */}
          <div className="relative z-10 flex w-[58%] flex-col pr-2">
            <h3 className="mb-[clamp(3px,min(0.42vw,0.6svh),6px)] text-[clamp(17px,min(1.25vw,2svh),22px)] font-bold text-[#0D55CF]">
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

            <div className="mt-auto flex w-full justify-between">
              <div className="flex flex-1 flex-col items-center gap-1.5">
                <div className="relative h-[clamp(40px,3vw,48px)] w-[clamp(40px,3vw,48px)] shrink-0">
                  <Image
                    src="/assets/benafit_hand.png"
                    alt="High in Protein"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-center text-[clamp(10px,min(0.8vw,1.2svh),12px)] leading-[1.2] font-bold text-[#1E293B]">
                  High in
                  <br />
                  Protein
                </span>
              </div>
              <div className="h-[36px] w-[1px] self-center bg-[#0D55CF]/15" />
              <div className="flex flex-1 flex-col items-center gap-1.5">
                <div className="relative h-[clamp(40px,3vw,48px)] w-[clamp(40px,3vw,48px)] shrink-0">
                  <Image
                    src="/assets/benafit_badge.png"
                    alt="Rich in Vitamins"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-center text-[clamp(10px,min(0.8vw,1.2svh),12px)] leading-[1.2] font-bold text-[#1E293B]">
                  Rich in
                  <br />
                  Vitamins
                </span>
              </div>
              <div className="h-[36px] w-[1px] self-center bg-[#0D55CF]/15" />
              <div className="flex flex-1 flex-col items-center gap-1.5">
                <div className="relative h-[clamp(40px,3vw,48px)] w-[clamp(40px,3vw,48px)] shrink-0">
                  <Image
                    src="/assets/benafit_heart.png"
                    alt="Good for Heart"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-center text-[clamp(10px,min(0.8vw,1.2svh),12px)] leading-[1.2] font-bold text-[#1E293B]">
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
        <div className="col-span-1 flex min-h-0 flex-col justify-between overflow-hidden rounded-[16px] bg-[#F4F9FF] p-[var(--testimonial-padding)] shadow-sm">
          <div>
            <h3 className="mb-[clamp(3px,min(0.52vw,0.75svh),6px)] text-[clamp(17px,min(1.25vw,2svh),22px)] font-bold text-[#0D55CF]">
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
            className={`group relative col-span-1 cursor-pointer overflow-hidden rounded-[16px] bg-gradient-to-tr ${item.gradient} shadow-[0px_4px_10px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
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
        <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[16px] bg-[#EAF4FE] p-[clamp(12px,1.5vw,20px)] shadow-sm">
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
        <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[16px] bg-[#A7E8DF] p-[clamp(12px,1.5vw,20px)] shadow-sm">
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
        <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[16px] bg-[#CAEFA7] p-[clamp(12px,1.5vw,20px)] shadow-sm">
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
        <div className="col-span-1 flex items-center justify-between overflow-hidden rounded-[16px] bg-[#EAF4FE] p-[clamp(12px,1.5vw,20px)] shadow-sm">
          <div className="mr-2 flex flex-1 flex-col text-left">
            <h4 className="mb-[2px] truncate text-[clamp(14px,min(1vw,1.6svh),16px)] font-bold text-[#0D55CF]">
              Join Our Community
            </h4>
            <p className="mb-2 line-clamp-2 text-[clamp(12px,min(0.8vw,1.3svh),13px)] leading-[1.3] text-[#1E293B]">
              Be a part of our journey for healthy and delicious living.
            </p>
            
          </div>
          <div className="relative shrink-0 rounded-[10px] bg-white p-[clamp(4px,0.4vw,6px)] shadow-[0px_2px_8px_rgba(0,0,0,0.08)]">
            <div className="relative h-[clamp(48px,4.5vw,64px)] w-[clamp(48px,4.5vw,64px)]">
              <Image
                src="/assets/whatsapp_qr.png"
                alt="QR Code"
                fill
                className="rounded-[4px] object-cover"
              />
            </div>
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
