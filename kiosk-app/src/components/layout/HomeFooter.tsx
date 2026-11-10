'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, PhoneCall, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sanityFetch } from '@/lib/sanity';
import { HOME_FOOTER_QUERY } from '@/lib/sanityQueries';

interface HomeFooterData {
  storeAddress?: string;
  phone?: string;
  email?: string;
  aboutUsText?: string;
  ourStoriesText?: string;
  contactUsText?: string;
}

function useHomeFooterData() {
  const [footer, setFooter] = useState<HomeFooterData | null>(null);

  useEffect(() => {
    sanityFetch<HomeFooterData>(HOME_FOOTER_QUERY)
      .then((res) => {
        if (res) setFooter(res);
      })
      .catch(() => {});
  }, []);

  return {
    address: footer?.storeAddress || 'Unit 5 Hythe Quay, England, CO2 8JB',
    phone: footer?.phone || '+44 1206 123456',
    email: footer?.email || 'hello@fishcart.co.uk',
    aboutText:
      footer?.aboutUsText || 'Delivering fresh & healthy food to your family.',
    storiesText:
      footer?.ourStoriesText ||
      'From ocean to your kitchen, Journey of freshness.',
    contactText:
      footer?.contactUsText || 'We are here to help you. Reach out anytime.',
  };
}

export function HomeFooter() {
  const { address, phone, email, aboutText, storiesText, contactText } =
    useHomeFooterData();

  return (
    <footer className="grid w-full grid-cols-4 items-stretch rounded-[8px] border border-slate-200 bg-white portrait:grid-cols-1 portrait:divide-y portrait:divide-slate-200 portrait:h-auto min-h-[clamp(60px,8.5svh,82px)]">
      {/* Card 1: About Us */}
      <div className="relative flex flex-col justify-center overflow-hidden py-[clamp(6px,0.9svh,14px)] px-[clamp(12px,1.4vw,24px)]">
        <div className="relative z-10 flex flex-col">
          <h4 className="mb-0.5 text-[clamp(13px,min(0.95vw,1.4svh),17px)] font-bold text-[#0D55CF]">
            About Us
          </h4>
          <p className="line-clamp-2 text-[clamp(10.5px,min(0.75vw,1.1svh),12.5px)] leading-[1.25] text-[#475569]">
            {aboutText}
          </p>
        </div>
      </div>

      {/* Card 2: Our Stories */}
      <div className="relative flex flex-col justify-center overflow-hidden py-[clamp(6px,0.9svh,14px)] px-[clamp(12px,1.4vw,24px)] before:absolute before:left-0 before:top-3 before:bottom-3 before:w-[1px] before:bg-slate-200 portrait:before:hidden">
        <div className="relative z-10 flex max-w-[55%] flex-col">
          <h4 className="mb-0.5 text-[clamp(13px,min(0.95vw,1.4svh),17px)] font-bold text-[#0D55CF]">
            Our Stories
          </h4>
          <p className="line-clamp-2 text-[clamp(10.5px,min(0.75vw,1.1svh),12.5px)] leading-[1.25] text-[#475569]">
            {storiesText}
          </p>
        </div>
        <div className="absolute right-4 bottom-0 h-full w-[45%] opacity-90 mix-blend-multiply">
          <Image
            src="/assets/boat_exact.png"
            alt="Our Stories"
            fill
            sizes="20vw"
            className="object-contain object-right-bottom"
          />
        </div>
      </div>

      {/* Card 3: Contact Us */}
      <div className="relative flex flex-col justify-center overflow-hidden py-[clamp(6px,0.9svh,14px)] px-[clamp(12px,1.4vw,24px)] before:absolute before:left-0 before:top-3 before:bottom-3 before:w-[1px] before:bg-slate-200 portrait:before:hidden">
        <div className="relative z-10 flex max-w-[60%] flex-col">
          <h4 className="mb-0.5 text-[clamp(13px,min(0.95vw,1.4svh),17px)] font-bold text-[#0D55CF]">
            Contact Us
          </h4>
          <p className="line-clamp-2 text-[clamp(10.5px,min(0.75vw,1.1svh),12.5px)] leading-[1.25] text-[#475569]">
            {contactText}
          </p>
        </div>
        <div className="absolute right-0 bottom-0 h-full w-[38%] opacity-90 mix-blend-multiply">
          <Image
            src="/assets/boy.png"
            alt="Contact Us"
            fill
            sizes="20vw"
            className="object-contain object-right-bottom"
          />
        </div>
      </div>

      {/* Card 4: Address */}
      <div className="relative flex flex-col justify-center gap-[clamp(3px,0.5svh,6px)] overflow-hidden py-[clamp(6px,0.9svh,14px)] px-[clamp(12px,1.4vw,24px)] before:absolute before:left-0 before:top-3 before:bottom-3 before:w-[1px] before:bg-slate-200 portrait:before:hidden">
        <div className="relative z-10 flex max-w-[78%] flex-col gap-[clamp(2px,0.4svh,5px)]">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-[clamp(11px,1.1svh,15px)] w-[clamp(11px,1.1svh,15px)] shrink-0 text-[#0D55CF]" />
            <span className="truncate text-[clamp(9.5px,min(0.72vw,1.1svh),12px)] leading-tight text-[#475569]">
              {address}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <PhoneCall className="h-[clamp(11px,1.1svh,15px)] w-[clamp(11px,1.1svh,15px)] shrink-0 text-[#0D55CF]" />
            <span className="text-[clamp(9.5px,min(0.72vw,1.1svh),12px)] leading-tight font-bold text-[#1E293B]">
              {phone}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="h-[clamp(11px,1.1svh,15px)] w-[clamp(11px,1.1svh,15px)] shrink-0 text-[#0D55CF]" />
            <span className="text-[clamp(9.5px,min(0.72vw,1.1svh),12px)] leading-tight font-bold text-[#0D55CF]">
              {email}
            </span>
          </div>
        </div>

        <div className="absolute top-1/2 right-1 h-[80%] w-[25%] -translate-y-1/2 opacity-90 mix-blend-multiply">
          <Image
            src="/assets/fishdd.png"
            alt="Address"
            fill
            sizes="10vw"
            className="object-contain object-right"
          />
        </div>
      </div>
    </footer>
  );
}

export function MobileFooter({ className }: { className?: string }) {
  const { address, phone, email, aboutText, storiesText } = useHomeFooterData();

  return (
    <div
      className={cn(
        'hidden portrait:flex portrait:flex-col portrait:gap-3 portrait:px-2 portrait:pb-4',
        className
      )}
    >
      <div className="flex w-full shrink-0 gap-3">
        {/* About Us */}
        <div className="relative flex aspect-[4/3] flex-1 flex-col overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="relative z-10 flex flex-col">
            <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
              About Us
            </h4>
            <p className="text-[13px] leading-[1.3] font-medium text-slate-500">
              {aboutText}
            </p>
          </div>
        </div>

        {/* Our Stories */}
        <div className="relative flex aspect-[4/3] flex-1 flex-col overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="relative z-10 flex flex-col">
            <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
              Our Stories
            </h4>
            <p className="max-w-[90%] text-[13px] leading-[1.3] font-medium text-slate-500">
              {storiesText}
            </p>
          </div>
          <div className="absolute right-1 bottom-1 h-12 w-16 opacity-90 mix-blend-multiply">
            <Image
              src="/assets/boat_exact.png"
              alt="Our Stories"
              fill
              sizes="64px"
              className="object-contain object-right-bottom"
            />
          </div>
        </div>
      </div>

      {/* Contact Us */}
      <div className="relative flex shrink-0 flex-col justify-center gap-2 overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="relative z-10 flex w-full flex-col items-center gap-2 text-center">
          <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">
            Contact Us
          </h4>
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-[#0D55CF]" />
            <span className="text-[14px] leading-tight font-medium text-slate-600">
              {address}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <PhoneCall className="h-4 w-4 shrink-0 text-[#0D55CF]" />
            <span className="text-[14px] font-bold text-[#0B1F5B]">
              {phone}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-[#0D55CF]" />
            <span className="text-[14px] font-bold text-[#0D55CF]">
              {email}
            </span>
          </div>
        </div>

        <div className="absolute top-1/2 right-2 h-14 w-16 -translate-y-1/2 opacity-20 mix-blend-multiply">
          <Image
            src="/assets/fishdd.png"
            alt="Address"
            fill
            sizes="64px"
            className="object-contain object-right"
          />
        </div>
      </div>
    </div>
  );
}
