import { Droplet, ShieldCheck, Truck, Award, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="grid h-full w-full grid-cols-5 gap-4">
      {/* Card 1: fresh */}
      <div className="flex min-h-0 items-center justify-between overflow-hidden rounded-[14px] bg-white p-4 shadow-sm">
        <div className="flex h-full min-w-0 flex-1 flex-col justify-center pr-2">
          <h4 className="mb-1 text-[12px] font-bold text-[#0D55CF]">
            100% Fresh
          </h4>
          <p className="line-clamp-3 text-[10px] leading-[1.3] text-[#1E293B]">
            Sourced Daily
          </p>
        </div>
        <div className="flex h-full shrink-0 items-center justify-center opacity-60">
          {/* Simple SVG mimicking the fish over waves */}
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 stroke-[#0D55CF] stroke-[1.5]"
          >
            <path
              d="M12 40 Q20 32 28 40 T44 40 T60 32"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 48 Q16 40 24 48 T40 48 T56 40"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M48 24 C48 18 36 12 28 16 C20 20 16 28 20 32 C24 36 36 34 44 28 C46 26 48 24 48 24 Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M44 28 L52 32 L52 20 Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="28" cy="22" r="1.5" fill="#0D55CF" />
          </svg>
        </div>
      </div>

      {/* Card 2: hygieneic */}
      <div className="relative flex min-h-0 items-center justify-between overflow-hidden rounded-[16px] bg-white p-4 shadow-sm">
        <div className="z-10 flex h-full min-w-0 flex-1 flex-col justify-center pr-[40%]">
          <h4 className="mb-1 text-[12px] font-bold text-[#0D55CF]">
            Hygienic & Safe
          </h4>
          <p className="line-clamp-3 text-[10px] leading-[1.3] text-[#1E293B]">
            Cleaned with care
          </p>
        </div>

        <div className="pointer-events-none absolute right-0 bottom-0 h-[120%] w-[50%]">
          {/* Since we don't have the exact image, we'll use an img tag pointing to an asset that might exist, or a placeholder */}
        </div>
      </div>

      {/* Card 3:delivery */}
      <div className="relative flex min-h-0 items-center justify-between overflow-hidden rounded-[16px] bg-white p-4 shadow-sm">
        <div className="z-10 flex h-full min-w-0 flex-1 flex-col justify-center pr-[40%]">
          <h4 className="mb-1 text-[12px] font-bold text-[#0D55CF]">
            Fast Delivery
          </h4>
          <p className="line-clamp-3 text-[10px] leading-[1.3] text-[#1E293B]">
            On time, every time
          </p>
        </div>
        <div className="pointer-events-none absolute right-0 bottom-0 h-[120%] w-[50%]">
          {/* Since we don't have the exact image, we'll use an img tag pointing to an asset that might exist, or a placeholder */}
        </div>
      </div>

      {/* Card 4:quality */}
      <div className="relative flex min-h-0 items-center justify-between overflow-hidden rounded-[16px] bg-white p-4 shadow-sm">
        <div className="z-10 flex h-full min-w-0 flex-1 flex-col justify-center pr-[40%]">
          <h4 className="mb-1 text-[12px] font-bold text-[#0D55CF]">
            Best Quality
          </h4>
          <p className="line-clamp-3 text-[10px] leading-[1.3] text-[#1E293B]">
            Only the best for you
          </p>
        </div>
        <div className="pointer-events-none absolute right-2 bottom-0 flex h-[100%] w-[40%] items-end justify-center"></div>
      </div>

      {/* Card 5: Sustainable Sourcing */}

      <div className="relative flex min-h-0 items-center justify-between overflow-hidden rounded-[16px] bg-white p-4 shadow-sm">
        <div className="z-10 flex h-full min-w-0 flex-1 flex-col justify-center pr-[40%]">
          <h4 className="mb-1 text-[12px] font-bold text-[#0D55CF]">
            Sustainable Sourcing
          </h4>
          <p className="line-clamp-3 text-[10px] leading-[1.3] text-[#1E293B]">
            Better for tomorrow
          </p>
        </div>
        <div className="pointer-events-none absolute right-2 bottom-0 flex h-[100%] w-[40%] items-end justify-center"></div>
      </div>
    </footer>
  );
}
