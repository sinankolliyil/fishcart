import React from 'react';
import Image from 'next/image';
import { MapPin, PhoneCall, Mail } from 'lucide-react';

export function HomeFooter() {
  return (
    <footer className="grid h-full w-full grid-cols-4 items-stretch gap-[clamp(8px,1vw,16px)]">
      {/* Card 1: About Us */}
      <div className="relative flex flex-col justify-center overflow-hidden rounded-[16px] border border-[#E2E8F0] bg-white p-[clamp(16px,1.8vw,28px)] shadow-sm">
        <div className="relative z-10 flex max-w-[65%] flex-col">
          <h4 className="mb-2 text-[clamp(14px,min(1vw,1.6svh),18px)] font-bold text-[#0D55CF]">
            About Us
          </h4>
          <p className="text-[clamp(11px,min(0.8vw,1.2svh),13px)] leading-[1.4] text-[#475569]">
            We are passionate about delivering fresh and healthy food to your
            family.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 h-full w-[40%] opacity-90 mix-blend-multiply">
          <Image
            src="/assets/about_us_fish_exact.png"
            alt="About Us"
            fill
            className="object-contain object-right-bottom"
          />
        </div>
      </div>

      {/* Card 2: Our Stories */}
      <div className="relative flex flex-col justify-center overflow-hidden rounded-[16px] border border-[#E2E8F0] bg-white p-[clamp(16px,1.8vw,28px)] shadow-sm">
        <div className="relative z-10 flex max-w-[55%] flex-col">
          <h4 className="mb-2 text-[clamp(14px,min(1vw,1.6svh),18px)] font-bold text-[#0D55CF]">
            Our Stories
          </h4>
          <p className="text-[clamp(11px,min(0.8vw,1.2svh),13px)] leading-[1.4] text-[#475569]">
            From ocean to your kitchen, our journey of freshness.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 h-full w-[45%] opacity-90 mix-blend-multiply">
          <Image
            src="/assets/boat_exact.png"
            alt="Our Stories"
            fill
            className="object-contain object-right-bottom"
          />
        </div>
      </div>

      {/* Card 3: Contact Us */}
      <div className="relative flex flex-col justify-center overflow-hidden rounded-[16px] border border-[#E2E8F0] bg-white p-[clamp(16px,1.8vw,28px)] shadow-sm">
        <div className="relative z-10 flex max-w-[60%] flex-col">
          <h4 className="mb-2 text-[clamp(14px,min(1vw,1.6svh),18px)] font-bold text-[#0D55CF]">
            Contact Us
          </h4>
          <p className="text-[clamp(11px,min(0.8vw,1.2svh),13px)] leading-[1.4] text-[#475569]">
            We are here to help you. Reach out anytime.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 h-full w-[38%] opacity-90 mix-blend-multiply">
          <Image 
            src="/assets/boy.png" 
            alt="Contact Us" 
            fill 
            className="object-contain object-right-bottom" 
          />
        </div>
      </div>

      {/* Card 4: Address */}
      <div className="relative flex flex-col justify-center gap-2 overflow-hidden rounded-[16px] border border-[#E2E8F0] bg-white p-[clamp(16px,1.8vw,28px)] shadow-sm">
        <div className="relative z-10 flex max-w-[65%] flex-col gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-[#0D55CF]" />
            <span className="text-[clamp(10px,min(0.75vw,1.1svh),12px)] leading-[1.2] text-[#475569]">
              Unit 5 Hythe Quay,
              <br />
              England, CO2 8JB
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall className="h-4 w-4 shrink-0 text-[#0D55CF]" />
            <span className="text-[clamp(10px,min(0.75vw,1.1svh),12px)] font-bold text-[#1E293B]">
              +44 1206 123456
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-[#0D55CF]" />
            <span className="text-[clamp(10px,min(0.75vw,1.1svh),12px)] font-bold text-[#0D55CF]">
              hello@fishcart.co.uk
            </span>
          </div>
        </div>

        <div className="absolute top-1/2 right-4 h-[80%] w-[35%] -translate-y-1/2 opacity-90 mix-blend-multiply">
          <Image
            src="/assets/fishdd.png"
            alt="Address"
            fill
            className="object-contain object-right"
          />
        </div>
      </div>
    </footer>
  );
}
