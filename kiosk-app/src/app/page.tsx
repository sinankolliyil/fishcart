import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Play,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Award,
  Droplet,
  Leaf,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Rating } from '@/components/ui/Rating';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-hidden">
      {/* Row 1: Hero and Categories */}
      <div className="grid h-[36%] min-h-0 shrink-0 grid-cols-12 gap-4">
        {/* Hero Section */}
        <div className="relative col-span-7 flex h-full min-h-0 flex-col justify-between overflow-hidden rounded-[16px] bg-[#E8F4FA] shadow-sm">
          {/* Ice Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/ice_cubes_bg.png"
              alt="Ice background"
              fill
              className="object-cover opacity-35"
            />
          </div>

          {/* Overlapping Fish Image */}
          <div className="absolute top-[0%] right-[0%] bottom-[0%] z-10 w-[78%]">
            <Image
              src="/assets/hero_fish_new.png"
              alt="Fresh Salmon and Fish"
              fill
              className="scale-[1] object-contain object-right drop-shadow-2xl"
            />
          </div>

          <div className="relative z-20 flex h-full w-[42%] flex-col justify-center px-10 py-8">
            <div className="max-w-[320px]">
              <h1 className="mb-7 text-[49.7px] leading-[1.01] font-bold text-[#0D55CF]">
                Fresh Fish.
                <br />
                Healthy Life.
              </h1>
              <p className="mb-6 max-w-[320px] text-[20px] leading-[1.4] font-medium text-[#1E293B]">
                Handpicked daily for
                <br />
                freshness you can trust.
              </p>
              <div className="w-max">
                <Link href="/community">
                  <Button
                    size="default"
                    className="mt-6 h-[38px] gap-2 rounded-[8px] bg-[#0D55CF] px-5 text-[13px] font-bold text-white shadow-sm hover:bg-[#0D55CF]/90"
                  >
                    Join Us
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-10">
              {[
                {
                  label: '100%\nFresh',
                  icon: (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                    >
                      <path d="M12 2l2.4 2.4L18 4l.6 3.4 3 1.8-1.2 3.2L22 15l-2.4 2.4-.6 3.4-3.4-.6L13.8 22 12 19.6 10.2 22l-1.8-1.8-3.4.6-.6-3.4L2 15l1.6-2.6L2.4 9.2 5.4 7.4 6 4l3.4.6z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ),
                },
                {
                  label: 'Hygienic\n& Safe',
                  icon: (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="M12 8l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5L12 8z"></path>
                    </svg>
                  ),
                },
                {
                  label: 'Daily\nDelivery',
                  icon: (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                    >
                      <rect height="13" width="15" x="1" y="3"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                  ),
                },
                {
                  label: 'Best\nQuality',
                  icon: (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                    >
                      <circle cx="12" cy="8" r="6"></circle>
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
                      <path d="M12 6l1 2 2 .5-1.5 1.5.5 2-2-1-2 1 .5-2-1.5-1.5 2-.5L12 6z"></path>
                    </svg>
                  ),
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex items-center justify-center text-[#0D55CF]">
                    {item.icon}
                  </div>
                  <div className="text-[12px] leading-[1.2] font-bold whitespace-pre-line text-[#1E293B]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="col-span-5 grid min-h-0 grid-rows-[55fr_45fr] gap-2">
          <div className="grid min-h-0 grid-cols-3 gap-2">
            <CategoryCard
              title="Fish"
              subtitle="100+ Items"
              imageSrc="/assets/cat_fish.png"
              variant="fish"
              href="/category/fish"
              className="h-full min-h-0"
            />
            <CategoryCard
              title="Meat"
              subtitle="50+ Items"
              imageSrc="/assets/cat_meat.png"
              variant="meat"
              href="/category/meat"
              className="h-full min-h-0"
            />
            <CategoryCard
              title="Chicken"
              subtitle="30+ Items"
              imageSrc="/assets/cat_chicken.png"
              variant="chicken"
              href="/category/chicken"
              className="h-full min-h-0"
            />
          </div>
          <CategoryCard
            title="Eggs"
            subtitle="Farm Fresh"
            imageSrc="/assets/cat_eggs.png"
            variant="eggs"
            href="/category/eggs"
            className="h-full min-h-0"
          />
        </div>
      </div>

      {/* Row 2: Recipe, Nutrition, Testimonial */}
      <div className="grid h-[26%] min-h-0 shrink-0 grid-cols-[1.15fr_1.16fr_0.7fr] gap-2">
        {/* Recipe Container */}
        <div className="text-surface col-span-1 flex min-h-0 flex-col justify-between rounded-[16px] bg-[#0D55CF] p-6 shadow-sm">
          <div>
            <h3 className="mb-1 text-[21px] font-bold text-white">
              How to Make Delicious
            </h3>
            <p className="text-[14px] text-white/90">
              Step by step cooking videos for every taste
            </p>
          </div>

          <div className="mt-3 grid flex-1 grid-cols-3 gap-2">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="absolute inset-0 z-10 flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white text-[#0D55CF] shadow-md">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="ml-0.5 h-[14px] w-[14px]"
                    >
                      <path d="M5 3l14 9-14 9V3z"></path>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 z-10">
                  <p className="text-[13px] leading-tight font-bold text-white">
                    {recipe.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-tight text-white/90">
                    {recipe.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex h-[34px] items-center rounded-[8px] bg-white px-4">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0D55CF] hover:underline"
            >
              View All Recipes
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Nutrition Section */}
        <div className="relative col-span-1 flex min-h-0 flex-col overflow-hidden rounded-[16px] bg-[#F4F9FF] p-6 shadow-sm">
          <h3 className="mb-1.5 text-[21px] font-bold text-[#0D55CF]">
            Benefits & Nutrition
          </h3>
          <p className="relative z-10 mb-4 pr-[30%] text-[15px] leading-[1.5] text-[#1E293B]">
            Fish, meat, eggs and chicken are rich in 
            <br /> protein, vitamins and minerals for a 
            <br /> stronger,healthier you.
          </p>
          <Link
            href="#"
            className="relative z-10 mb-auto flex items-center gap-1 text-[11px] font-bold text-[#0D55CF] hover:underline"
          >
            Learn More <ArrowRight className="h-3 w-3 stroke-[2.5]" />
          </Link>

          <div className="gap relative z-10 mt-auto flex w-[80%] justify-center">
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
                  className="h-6 w-6"
                >
                  <path d="M18 20V10" />
                  <path d="M12 20V4" />
                  <path d="M6 20v-4" />
                </svg>
              </div>
              <span className="text-center text-[9px] leading-tight font-bold text-[#1E293B]">
                High in
                <br />
                Protein
              </span>
            </div>
            <div className="h-[28px] w-[1px] self-center bg-[#0D55CF]/15"></div>
            <div className="flex flex-1 flex-col items-center gap-1.5">
              <div className="text-[#0D55CF]">
                <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
              </div>
              <span className="text-center text-[9px] leading-tight font-bold text-[#1E293B]">
                Rich in
                <br />
                Vitamins
              </span>
            </div>
            <div className="h-[28px] w-[1px] self-center bg-[#0D55CF]/15"></div>
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
                  className="h-6 w-6"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <span className="text-center text-[9px] leading-tight font-bold text-[#1E293B]">
                Good for
                <br />
                Heart
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute top-[-5%] right-[-10%] bottom-[-5%] w-[65%] opacity-100">
            <Image
              src="/assets/nametoadd.png"
              alt="Salmon Benefits"
              fill
              className="object-contain object-right"
            />
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="col-span-1 flex min-h-0 flex-col justify-between rounded-[16px] bg-[#F4F9FF] p-5 shadow-sm">
          <div>
            <h3 className="mb-2 text-[21px] font-bold text-[#0D55CF]">
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
            <p className="mb-2 pr-4 text-[12px] leading-[1.5] font-medium text-[#1E293B]">
              "Super fresh products and great variety. Fishcart is our family's
              choice."
            </p>
            <p className="text-[9px] font-bold text-[#1E293B]">– Priya S.</p>
          </div>

          <div className="mt-auto flex justify-center gap-2 pb-1">
            <div className="h-[5px] w-[5px] rounded-full bg-[#0D55CF]"></div>
            <div className="h-[5px] w-[5px] rounded-full bg-[#93C5FD]"></div>
            <div className="h-[5px] w-[5px] rounded-full bg-[#93C5FD]"></div>
          </div>
        </div>
      </div>

      {/* Row 3: Promotional Products */}
      <div className="grid h-[16%] min-h-0 shrink-0 grid-cols-4 gap-4">
        {[
          { title: 'All Fish Items', image: '/assets/fish_showcase.png' },
          { title: 'All Meat Items', image: '/assets/meat_showcase.png' },
          { title: 'Chicken Items', image: '/assets/chicken_showcase.png' },
          { title: 'Eggs', image: '/assets/eggs_showcase.png' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="group relative col-span-1 min-h-0 cursor-pointer overflow-hidden rounded-[16px] border border-[#E2E8F0] shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 z-10 rounded-[10px] bg-white px-4 py-2.5 shadow-sm"
              style={{ width: 'fit-content' }}>
              <h4 className="text-[13px] font-bold text-[#1E293B]">
                {item.title}
              </h4>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-[#0D55CF] group-hover:underline">
                Explore Now <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Row 4: Information Cards */}
      <div className="grid h-[11%] min-h-0 shrink-0 grid-cols-4 gap-4">
        <div className="col-span-1 flex min-h-0 items-center justify-between rounded-[16px] bg-[#E8F3FA] p-4 shadow-sm">
          <div className="min-w-0 flex-1 pr-2">
            <h4 className="mb-1 truncate text-[12px] font-bold text-[#0D55CF]">
              Daily Selection
            </h4>
            <p className="line-clamp-2 text-[10px] leading-[1.3] text-[#1E293B]">
              Handpicked daily from trusted suppliers for the best quality.
            </p>
          </div>
          <div className="shrink-0 text-[#0D55CF]">
            <CheckCircle2 className="h-[32px] w-[32px] stroke-[1.5]" />
          </div>
        </div>

        <div className="col-span-1 flex min-h-0 items-center justify-between rounded-[16px] bg-[#A5E3E0] p-4 shadow-sm">
          <div className="min-w-0 flex-1 pr-2">
            <h4 className="mb-1 truncate text-[12px] font-bold text-[#0D55CF]">
              Hygienic & Safe
            </h4>
            <p className="line-clamp-2 text-[10px] leading-[1.3] text-[#1E293B]">
              Cleaned, packed and delivered with highest hygiene standards.
            </p>
          </div>
          <div className="shrink-0 text-white">
            <Droplet className="h-[32px] w-[32px] stroke-[1.5]" />
          </div>
        </div>

        <div className="col-span-1 flex min-h-0 items-center justify-between rounded-[16px] bg-[#D4EFA5] p-4 shadow-sm">
          <div className="min-w-0 flex-1 pr-2">
            <h4 className="mb-1 truncate text-[12px] font-bold text-[#0D55CF]">
              Sourced Responsibly
            </h4>
            <p className="line-clamp-2 text-[10px] leading-[1.3] text-[#1E293B]">
              We care for the ocean and the environment for a better future.
            </p>
          </div>
          <div className="shrink-0 text-white">
            <Leaf className="h-[32px] w-[32px] stroke-[1.5]" />
          </div>
        </div>

        <div className="col-span-1 flex min-h-0 items-center justify-between rounded-[16px] bg-[#E8F3FA] p-4 text-[#1E293B] shadow-sm">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <h4 className="mb-1 truncate text-[12px] font-bold text-[#0D55CF]">
              Join Our Community
            </h4>
            <p className="mb-2 line-clamp-2 text-[10px] leading-[1.3]">
              Be a part of our journey for healthy and delicious living.
            </p>
            <Button
              size="sm"
              className="h-[24px] w-max gap-1 rounded-full bg-[#0D55CF] px-3 py-0 text-[10px] font-bold text-white"
            >
              Join Us <ArrowRight className="h-3 w-3 stroke-[2.5]" />
            </Button>
          </div>
          <div className="relative ml-2 h-[48px] w-[48px] shrink-0 rounded-lg bg-white p-1">
            <Image
              src="/assets/whatsapp_qr.png"
              alt="QR Code"
              fill
              className="rounded-md object-cover p-1"
            />
          </div>
        </div>
      </div>

      {/* Row 5: Footer */}
      <div className="relative min-h-0 w-full flex-1">
        <Footer />
      </div>
    </div>
  );
}
