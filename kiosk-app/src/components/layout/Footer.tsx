import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="grid grid-cols-4 gap-4 h-full w-full">
      {/* Card 1: About Us */}
      <div className="bg-white rounded-[16px] p-4 shadow-sm flex items-center justify-between min-h-0 overflow-hidden">
        <div className="flex-1 min-w-0 pr-2 flex flex-col justify-center h-full">
          <h4 className="text-[#0D55CF] font-bold text-[12px] mb-1">About Us</h4>
          <p className="text-[10px] text-[#1E293B] leading-[1.3] line-clamp-3">
            We are passionate about delivering fresh and healthy food to your family.
          </p>
        </div>
        <div className="shrink-0 flex items-center justify-center h-full opacity-60">
          {/* Simple SVG mimicking the fish over waves */}
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 stroke-[#0D55CF] stroke-[1.5]">
            <path d="M12 40 Q20 32 28 40 T44 40 T60 32" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 48 Q16 40 24 48 T40 48 T56 40" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M48 24 C48 18 36 12 28 16 C20 20 16 28 20 32 C24 36 36 34 44 28 C46 26 48 24 48 24 Z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44 28 L52 32 L52 20 Z" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="28" cy="22" r="1.5" fill="#0D55CF"/>
          </svg>
        </div>
      </div>

      {/* Card 2: Our Stories */}
      <div className="bg-white rounded-[16px] p-4 shadow-sm flex items-center justify-between min-h-0 overflow-hidden relative">
        <div className="flex-1 min-w-0 pr-[40%] flex flex-col justify-center h-full z-10">
          <h4 className="text-[#0D55CF] font-bold text-[12px] mb-1">Our Stories</h4>
          <p className="text-[10px] text-[#1E293B] leading-[1.3] line-clamp-3">
            From ocean to your kitchen, our journey of freshness.
          </p>
        </div>
        <div className="absolute right-0 bottom-0 h-[120%] w-[50%] pointer-events-none">
          {/* Since we don't have the exact image, we'll use an img tag pointing to an asset that might exist, or a placeholder */}
          <img src="/assets/story-boat.png" alt="Boat" className="w-full h-full object-cover object-bottom" />
        </div>
      </div>

      {/* Card 3: Contact Us */}
      <div className="bg-white rounded-[16px] p-4 shadow-sm flex items-center justify-between min-h-0 overflow-hidden relative">
        <div className="flex-1 min-w-0 pr-[40%] flex flex-col justify-center h-full z-10">
          <h4 className="text-[#0D55CF] font-bold text-[12px] mb-1">Contact Us</h4>
          <p className="text-[10px] text-[#1E293B] leading-[1.3] line-clamp-3">
            We are here to help you. <br /> Reach out anytime.
          </p>
        </div>
        <div className="absolute right-2 bottom-0 h-[100%] w-[40%] pointer-events-none flex items-end justify-center">
          <img src="/assets/contact-boy.png" alt="Boy" className="h-[90%] w-auto object-contain object-bottom" />
        </div>
      </div>

      {/* Card 4: Contact Info */}
      <div className="bg-white rounded-[16px] p-4 shadow-sm flex items-center justify-between min-h-0 overflow-hidden">
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5 h-full">
          <div className="flex items-start gap-2 text-[10px] text-[#1E293B]">
            <MapPin className="w-3.5 h-3.5 text-[#0D55CF] shrink-0 mt-[1px]" />
            <span className="leading-tight font-medium">
              Unit 5 Hythe Quay,<br />
              Colchester, England, CO2 8JB
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#1E293B]">
            <Phone className="w-3.5 h-3.5 text-[#0D55CF] shrink-0" />
            <span className="font-medium">+44 1206 123456</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#1E293B]">
            <Mail className="w-3.5 h-3.5 text-[#0D55CF] shrink-0" />
            <span className="font-medium">hello@fishcart.co.uk</span>
          </div>
        </div>
        <div className="shrink-0 flex items-center justify-center h-full opacity-60">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 stroke-[#0D55CF] stroke-[1.2]">
             <path d="M4 44 Q16 34 28 44 T52 44" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M4 52 Q16 42 28 52 T52 52" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M38 22 C38 16 28 10 20 14 C12 18 8 26 12 32 C16 38 28 36 36 30 C38 28 38 24 38 22 Z" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M36 30 L44 36 L46 22 Z" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M52 26 C52 23 48 20 44 22 C40 24 38 28 40 32 C42 36 48 34 50 32 C52 30 52 28 52 26 Z" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M50 32 L56 36 L58 24 Z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </footer>
  );
}
