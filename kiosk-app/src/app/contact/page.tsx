'use client';

import React from 'react';
import Image from 'next/image';
import { HomeFooter } from '@/components/layout/HomeFooter';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="grid h-full min-h-0 w-full grid-rows-[minmax(0,89fr)_minmax(0,10fr)] gap-[var(--main-gap)] overflow-hidden bg-slate-50 select-none">
      <div className="relative flex min-h-0 w-full overflow-hidden">
        
        {/* --- Unified Background --- */}
        <div className="absolute inset-0 bg-slate-50"></div>

        {/* --- Main Content (Floating Glass Centerpiece) --- */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-12 py-8">
          
          <div className="flex h-full max-h-[800px] w-full max-w-[1300px] overflow-hidden rounded-[24px] border border-white/60 bg-white/70 shadow-[0_30px_60px_rgba(13,85,207,0.08)] backdrop-blur-[40px]">
            
            {/* Left Column inside Card: Info */}
            <div className="relative flex w-[40%] flex-col overflow-hidden bg-[#1E293B] p-10 text-white">
               {/* Decorative background gradients */}
               <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[#0D55CF]/30 blur-[100px]" />
               <div className="absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[#5CA3F6]/20 blur-[100px]" />

               <div className="relative z-10 flex h-full flex-col">
                 <div className="mb-2 flex items-center gap-2">
                   <div className="h-[2px] w-8 bg-[#0D55CF]" />
                   <span className="text-xs font-bold uppercase tracking-wider text-[#0D55CF]">
                     Contact Us
                   </span>
                 </div>
                 <h2 className="mb-2 text-3xl font-black tracking-tight text-white">Get in Touch</h2>
                 <p className="mb-8 text-sm font-medium leading-relaxed text-slate-300">
                   Experience premium support. We are here to answer your questions and assist with your orders, delivering freshness to your door.
                 </p>

                 <div className="flex flex-1 flex-col justify-center gap-6">
                    <div className="group flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white/10 text-[#5CA3F6] transition-colors group-hover:bg-[#0D55CF] group-hover:text-white">
                        <MapPin className="h-5 w-5" strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col pt-1">
                        <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Our Location</span>
                        <span className="text-base font-semibold text-white">Marine Drive, Kochi<br/>Kerala, 682031</span>
                      </div>
                    </div>

                    <div className="group flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white/10 text-[#5CA3F6] transition-colors group-hover:bg-[#0D55CF] group-hover:text-white">
                        <Phone className="h-5 w-5" strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col pt-1">
                        <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Call Us</span>
                        <span className="text-base font-semibold text-white">+91 98765 43210</span>
                        <span className="text-xs text-slate-400">Mon-Sun, 8am to 9pm</span>
                      </div>
                    </div>

                    <div className="group flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-white/10 text-[#5CA3F6] transition-colors group-hover:bg-[#0D55CF] group-hover:text-white">
                        <Mail className="h-5 w-5" strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col pt-1">
                        <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Support</span>
                        <span className="text-base font-semibold text-white">support@fishcart.in</span>
                      </div>
                    </div>
                 </div>

                 <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="font-handwriting text-xl italic text-white/50">Team FishCart</span>
                 </div>
               </div>
            </div>

            {/* Right Column inside Card: Form */}
            <div className="flex w-[60%] flex-col bg-gradient-to-br from-white/90 to-[#DFE8F2]/30 p-10">
               <div className="mb-8">
                 <h3 className="text-3xl font-black text-[#1E293B]">Send a Message</h3>
                 <p className="mt-2 text-sm font-medium text-slate-500">Fill out the form below and our customer success team will get back to you immediately.</p>
               </div>

               <form className="flex flex-1 flex-col gap-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="group relative flex flex-col">
                      <input type="text" id="fname" className="peer w-full border-b-2 border-slate-300 bg-transparent px-0 py-2 text-base font-bold text-[#1E293B] outline-none transition-colors focus:border-[#0D55CF]" placeholder=" " />
                      <label htmlFor="fname" className="absolute left-0 -top-4 text-xs font-bold text-[#0D55CF] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#0D55CF]">First Name</label>
                    </div>
                    <div className="group relative flex flex-col">
                      <input type="text" id="lname" className="peer w-full border-b-2 border-slate-300 bg-transparent px-0 py-2 text-base font-bold text-[#1E293B] outline-none transition-colors focus:border-[#0D55CF]" placeholder=" " />
                      <label htmlFor="lname" className="absolute left-0 -top-4 text-xs font-bold text-[#0D55CF] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#0D55CF]">Last Name</label>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="group relative flex flex-col">
                      <input type="email" id="email" className="peer w-full border-b-2 border-slate-300 bg-transparent px-0 py-2 text-base font-bold text-[#1E293B] outline-none transition-colors focus:border-[#0D55CF]" placeholder=" " />
                      <label htmlFor="email" className="absolute left-0 -top-4 text-xs font-bold text-[#0D55CF] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#0D55CF]">Email Address</label>
                    </div>
                    <div className="group relative flex flex-col">
                      <input type="tel" id="phone" className="peer w-full border-b-2 border-slate-300 bg-transparent px-0 py-2 text-base font-bold text-[#1E293B] outline-none transition-colors focus:border-[#0D55CF]" placeholder=" " />
                      <label htmlFor="phone" className="absolute left-0 -top-4 text-xs font-bold text-[#0D55CF] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#0D55CF]">Phone Number</label>
                    </div>
                 </div>

                 <div className="group relative flex flex-1 flex-col">
                    <textarea id="message" className="peer w-full flex-1 resize-none border-b-2 border-slate-300 bg-transparent px-0 py-2 text-base font-bold text-[#1E293B] outline-none transition-colors focus:border-[#0D55CF]" placeholder=" " defaultValue={""} />
                    <label htmlFor="message" className="absolute left-0 -top-4 text-xs font-bold text-[#0D55CF] transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-[#0D55CF]">Your Message</label>
                 </div>

                 <div className="mt-4 flex justify-end">
                    <button type="button" className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-[8px] bg-[#0D55CF] px-8 py-3 font-bold text-white shadow-[0_8px_16px_rgba(13,85,207,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(13,85,207,0.35)] hover:bg-[#0b47b0]">
                       <span className="relative z-10 text-base tracking-wide">Send Message</span>
                       <Send className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
                       <div className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </button>
                 </div>
               </form>
            </div>

          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <HomeFooter />
      </div>
    </div>
  );
}
