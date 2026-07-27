import React from 'react';

export function Footer() {
  return (
    <footer className="grid h-full w-full grid-cols-5 gap-4">
      {/* ================= CARD 1 ================= */}

      <div className="flex items-center gap-3 rounded-[15px] bg-white p-4 shadow-sm">
        <div className="flex shrink-0 items-center justify-center opacity-60">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 stroke-[#0D55CF] stroke-[3]"
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
            <circle cx="28" cy="22" r="1" fill="#0D55CF" />
          </svg>
        </div>

        <div className="flex flex-col">
          <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
            100% Fresh
          </h4>
          <p className="text-[16px] leading-[1.3] text-[#1E293B]">
            Sourced Daily
          </p>
        </div>
      </div>

      {/* ================= CARD 2 ================= */}

      <div className="flex items-center gap-3 rounded-[15px] bg-white p-4 shadow-sm">
        <div className="flex shrink-0 items-center justify-center opacity-60">
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3 19 6v6c0 5-3.4 8-7 9-3.6-1-7-4-7-9V6l7-3Z" />
            <path d="M12 9v5" />
            <path d="M9.5 11.5H14.5" />
          </svg>
        </div>

        <div className="flex flex-col">
          <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
            Hygienic & Safe
          </h4>
          <p className="text-[16px] leading-[1.3] text-[#1E293B]">
            Cleaned with care
          </p>
        </div>
      </div>

      {/* ================= CARD 3 ================= */}

      <div className="flex items-center gap-3 rounded-[15px] bg-white p-4 shadow-sm">
        <div className="flex shrink-0 items-center justify-center opacity-60">
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="5" width="12" height="9" rx="1" />
            <path d="M14 8h4l3 3v3h-7" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="18" cy="17" r="2" />
          </svg>
        </div>

        <div className="flex flex-col">
          <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
            Fast Delivery
          </h4>
          <p className="text-[16px] leading-[1.3] text-[#1E293B]">
            On time, every time
          </p>
        </div>
      </div>

      {/* ================= CARD 4 ================= */}

      <div className="flex items-center gap-3 rounded-[15px] bg-white p-4 shadow-sm">
        <div className="flex shrink-0 items-center justify-center opacity-60">
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="5" />
            <path d="M9.5 13L8 21l4-2.5L16 21l-1.5-8" />
            <path d="M12 6.5l.8 1.6 1.8.3-1.3 1.3.3 1.8-1.6-.8-1.6.8.3-1.8-1.3-1.3 1.8-.3Z" />
          </svg>
        </div>

        <div className="flex flex-col">
          <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
            Best Quality
          </h4>
          <p className="text-[16px] leading-[1.3] text-[#1E293B]">
            Only the best for you
          </p>
        </div>
      </div>

      {/* ================= CARD 5 ================= */}

      <div className="flex items-center gap-3 rounded-[15px] bg-white p-4 shadow-sm">
        <div className="flex shrink-0 items-center justify-center opacity-60">
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 4c-7 0-12 4-12 10 0 4 2.8 6 6 6 6 0 8-6 8-16Z" />
            <path d="M9 15c2-2 5-4 9-6" />
          </svg>
        </div>

        <div className="flex flex-col">
          <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
            Sustainable Sourcing
          </h4>
          <p className="text-[16px] leading-[1.3] text-[#1E293B]">
            Better for tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
}
