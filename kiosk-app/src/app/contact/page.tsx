'use client';

import React from 'react';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  User,
  MessageSquare,
  List,
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[10px] bg-white shadow-sm select-none relative">
      {/* =========================================
            TOP SECTION: CURVED HEADER
        ========================================= */}
      <div className="relative flex h-[240px] w-full shrink-0 flex-col items-center justify-start overflow-visible bg-[#0D55CF] pt-[30px] text-white">
        {/* Dotted background pattern */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 2px, transparent 2px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Large Faded Background Circles (like screenshot) */}
        <div className="absolute top-[10%] -left-[5%] h-[200px] w-[200px] rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute top-[50%] left-[45%] h-[150px] w-[150px] rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute top-[5%] -right-[2%] h-[250px] w-[250px] rounded-full bg-white/10 blur-xl"></div>

        <div className="relative z-10 mt-2 flex flex-col items-center text-center">
          <h1 className="text-[clamp(32px,3.5vw,48px)] font-black tracking-tight drop-shadow-sm">
            Contact Us
          </h1>
          <p className="mt-1 max-w-[500px] text-[clamp(12px,1vw,14px)] leading-relaxed font-medium text-white/90">
            We&apos;re here to help! Get in touch with us for any queries,
            orders or support.
          </p>
          <ChevronDown className="mt-2 h-5 w-5 opacity-80" strokeWidth={1.5} />
        </div>

        {/* Floating Elements - perfectly matched to screenshot positions & scaled to fit */}
        {/* Left meat */}
        <div className="absolute top-[15%] left-[8%] z-20 h-[80px] w-[80px] overflow-hidden rounded-full border-[3px] border-white/30 bg-white shadow-xl">
          <Image
            src="/assets/meat.png"
            alt="Meat"
            fill
            className="object-cover p-1"
          />
        </div>
        {/* Left phone icon */}
       
        {/* Left chicken (nestled in curve) */}
        <div className="absolute bottom-[20px] left-[26%] z-20 h-[90px] w-[90px] overflow-hidden rounded-full border-[3px] border-white shadow-2xl">
          <Image src="/assets/c_whole_chicken.png" alt="Chicken" fill className="object-cover" />
        </div>
        
        {/* Right fish */}
        <div className="absolute top-[15%] right-[10%] z-20 h-[80px] w-[80px] overflow-hidden rounded-full border-[3px] border-white/30 bg-white shadow-xl">
          <Image src="/assets/fish2.jpg" alt="Fish" fill className="object-cover" />
        </div>
        {/* Right mail icon */}
        <div className="absolute top-[25%] right-[26%] flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg z-20">
           <Mail className="h-3 w-3 text-[#0D55CF]" />
        </div>
        {/* Right mince (nestled in curve) */}
        <div className="absolute bottom-[25px] right-[28%] z-20 h-[80px] w-[80px] overflow-hidden rounded-full border-[3px] border-white shadow-2xl">
          <Image src="/assets/b_lamb_cutlets.png" alt="Mince" fill className="object-cover p-1" />
        </div>

        {/* SVG Wave Separator */}
        <div className="absolute bottom-[-2px] left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block h-[115px] w-full"
            viewBox="0 0 1664 190"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="
        M0,108
        C115,171 245,171 365,122
        C485,73 590,96 705,126
        C825,158 930,174 1045,143
        C1165,110 1285,94 1400,113
        C1505,130 1585,132 1664,111
        L1664,190
        L0,190
        Z
      "
            />
          </svg>
        </div>
      </div>

      {/* =========================================
            MIDDLE SECTION: CONTACT INFO & FORM
        ========================================= */}
      {/* min-h-0 prevents flex children from pushing bounds out */}
      <div className="relative z-30 flex min-h-0 w-full flex-1 flex-col items-center bg-white px-[40px]">
        <div className="flex h-full w-full max-w-[1000px] gap-8 md:items-center lg:gap-16">
          {/* Left: Contact Info */}
          <div className="flex w-[40%] flex-col">
            <h2 className="mb-4 text-[22px] font-black text-slate-800">
              Get in <span className="text-[#0D55CF]">touch</span>
              <div className="mt-1 h-0.5 w-10 bg-[#0D55CF]"></div>
            </h2>

            <div className="flex flex-col gap-4">
              {/* Item */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0D55CF]">
                  <Phone className="h-3 w-3" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[13px] font-bold text-slate-800">
                    Phone
                  </h3>
                  <p className="mt-0.5 text-[11px] leading-tight font-medium text-slate-500">
                    Have a question or need assistance?
                    <br />
                    Call us anytime.
                  </p>
                  <p className="mt-0.5 text-[12px] font-bold text-[#0D55CF]">
                    +44 1206 123456
                  </p>
                </div>
              </div>
              {/* Item */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0D55CF]">
                  <Mail className="h-3 w-3" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[13px] font-bold text-slate-800">
                    Email
                  </h3>
                  <p className="mt-0.5 text-[11px] leading-tight font-medium text-slate-500">
                    Drop us an email and
                    <br />
                    we&apos;ll get back to you.
                  </p>
                  <p className="mt-0.5 text-[12px] font-bold text-[#0D55CF]">
                    hello@fishcart.co.uk
                  </p>
                </div>
              </div>
              {/* Item */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0D55CF]">
                  <MapPin className="h-3 w-3" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[13px] font-bold text-slate-800">
                    Head Office
                  </h3>
                  <p className="mt-0.5 text-[11px] leading-tight font-medium text-slate-500">
                    123, Fresh Fish Street, T. Nagar,
                    <br />
                    Chennai, Tamil Nadu - 600017
                  </p>
                </div>
              </div>
              {/* Item */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0D55CF]">
                  <Clock className="h-3 w-3" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[13px] font-bold text-slate-800">
                    Working Hours
                  </h3>
                  <p className="mt-0.5 text-[11px] leading-tight font-medium text-slate-500">
                    Monday - Sunday
                    <br />
                    8:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          {/* Highly compacted to fit safely within screen */}
          <div className="flex flex-1 flex-col rounded-[16px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <div className="col-span-1 flex flex-col">
                <label className="mb-1 text-[11px] font-bold text-slate-600">
                  First Name
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[#0D55CF]">
                    <User className="h-3 w-3 opacity-80" />
                  </div>
                  {/* Explicit border set to border-slate-200 to ensure visibility */}
                  <input
                    type="text"
                    placeholder="Type your first name"
                    className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 pl-8 text-[12px] font-medium text-slate-700 transition-colors outline-none focus:border-[#0D55CF]"
                  />
                </div>
              </div>
              {/* Last Name */}
              <div className="col-span-1 flex flex-col">
                <label className="mb-1 text-[11px] font-bold text-slate-600">
                  Last Name
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[#0D55CF]">
                    <User className="h-3 w-3 opacity-80" />
                  </div>
                  <input
                    type="text"
                    placeholder="Type your last name"
                    className="w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 pl-8 text-[12px] font-medium text-slate-700 transition-colors outline-none focus:border-[#0D55CF]"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="col-span-2 flex flex-col">
                <label className="mb-1 text-[11px] font-bold text-slate-600">
                  Email
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[#0D55CF]">
                    <Mail className="h-3 w-3" />
                  </div>
                  <input
                    type="email"
                    placeholder="Type your email"
                    className="w-full rounded-md border border-slate-200 bg-transparent py-2 pr-3 pl-8 text-[12px] font-medium text-slate-700 transition-colors outline-none focus:border-[#0D55CF]"
                  />
                </div>
              </div>
              {/* Phone */}
              <div className="col-span-2 flex flex-col">
                <label className="mb-1 text-[11px] font-bold text-slate-600">
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-[#0D55CF]">
                    <Phone className="h-3 w-3 opacity-80" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Type your phone number"
                    className="w-full rounded-md border border-slate-200 bg-transparent py-2 pr-3 pl-8 text-[12px] font-medium text-slate-700 transition-colors outline-none focus:border-[#0D55CF]"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="col-span-2 flex flex-col">
                <label className="mb-1 text-[11px] font-bold text-slate-600">
                  Message
                </label>
                <div className="relative flex">
                  <div className="absolute top-2.5 left-3 text-[#0D55CF]">
                    <MessageSquare className="h-3 w-3" />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Type your message"
                    className="w-full resize-none rounded-md border border-slate-200 bg-transparent px-3 pt-2 pb-2 pl-8 text-[12px] font-medium text-slate-700 transition-colors outline-none focus:border-[#0D55CF]"
                  ></textarea>
                </div>
              </div>
              {/* Submit Button */}
              <div className="col-span-2 mt-2 flex justify-start">
                <button className="flex items-center justify-center rounded-md bg-[#0D55CF] px-8 py-2 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0D55CF]/30">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
            BOTTOM SECTION: MAP AREA (approx 15-20%)
        ========================================= */}
      <div className="relative mt-auto flex h-[160px] w-full shrink-0 items-center justify-center overflow-hidden bg-white">
        {/* Real Map iframe background */}
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=80.19,13.04,80.25,13.08&amp;layer=mapnik"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 grayscale"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>

        {/* Top fade gradient to blend smoothly with the white section above */}
        <div className="absolute inset-x-0 top-0 z-10 h-[60px] bg-gradient-to-b from-white to-transparent"></div>

        {/* Light overlay to keep the map muted */}
        <div className="absolute inset-0 z-0 bg-white/40"></div>

        {/* Floating Map Pin Card (Bottom Center over the map) */}
        <div className="relative z-20 flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-6 py-4 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#0D55CF]">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-[14px] font-bold text-slate-800">
              FishCart Store
            </h3>
            <p className="mt-0.5 text-[12px] font-medium text-slate-500">
              123, Fresh Fish Street,
              <br />
              T. Nagar, Chennai - 600017
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
