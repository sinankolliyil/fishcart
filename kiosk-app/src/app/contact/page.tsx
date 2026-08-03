import React from 'react';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="flex h-full w-full flex-col justify-between overflow-hidden">
      {/* Empty Content Area with placeholder */}
      <div className="flex flex-grow items-center justify-center">
        <h1 className="text-2xl font-extrabold text-slate-800">Contact Us</h1>
      </div>

      {/* Footer (aligned matching homepage layout structure) */}
      <div className="flex shrink-0 items-center justify-between border-t border-slate-100 bg-[#F4F7FB] pt-[var(--main-gap)]">
        <Footer />
      </div>
    </div>
  );
}
