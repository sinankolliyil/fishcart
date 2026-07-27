import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, ShieldCheck, Truck, Award, Droplet, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-hidden">
      {/* Row 1: Hero and Categories */}
      <div className="grid grid-cols-12 gap-4 h-[36%] min-h-0 shrink-0">
        {/* Hero Section */}
        <div className="col-span-7 relative overflow-hidden rounded-[16px] bg-[#E8F4FA] shadow-sm flex flex-col justify-between min-h-0 h-full">
          {/* Ice Background */}
          <div className="absolute inset-0 z-0">
            <Image src="/assets/ice_cubes_bg.png" alt="Ice background" fill className="object-cover opacity-60 mix-blend-multiply" />
          </div>

          {/* Overlapping Fish Image */}
          <div className="absolute top-[5%] right-[-5%] bottom-[-5%] w-[65%] z-10">
            <Image
              src="/assets/hero_fish.png"
              alt="Fresh Salmon and Fish"
              fill
              className="object-contain object-right drop-shadow-2xl scale-[1.15]"
            />
          </div>

          <div className="relative z-20 p-8 flex flex-col h-full w-[80%]">
            <div className="max-w-[320px]">
              <h1 className="text-[42px] font-bold text-[#0D55CF] leading-[1.1] mb-4">
                Fresh Fish.<br />Healthy Life.
              </h1>
              <p className="text-[14px] text-[#1E293B] font-medium mb-6 leading-[1.4]">
                Handpicked daily for<br/>freshness you can trust.
              </p>
              <Button size="default" className="rounded-[8px] px-5 gap-2 w-max text-[13px] font-bold h-[38px] bg-[#0D55CF] text-white hover:bg-[#0D55CF]/90 shadow-sm">
                Join Us 
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Button>
            </div>
            
            <div className="mt-auto flex items-center gap-6">
              {[
                { 
                  label: "100%\nFresh",
                  icon: (
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6">
                      <path d="M12 2l2.4 2.4L18 4l.6 3.4 3 1.8-1.2 3.2L22 15l-2.4 2.4-.6 3.4-3.4-.6L13.8 22 12 19.6 10.2 22l-1.8-1.8-3.4.6-.6-3.4L2 15l1.6-2.6L2.4 9.2 5.4 7.4 6 4l3.4.6z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )
                },
                { 
                  label: "Hygienic\n& Safe",
                  icon: (
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path d="M12 8l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5L12 8z"></path>
                    </svg>
                  )
                },
                { 
                  label: "Daily\nDelivery",
                  icon: (
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6">
                      <rect height="13" width="15" x="1" y="3"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                  )
                },
                { 
                  label: "Best\nQuality",
                  icon: (
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-6 h-6">
                      <circle cx="12" cy="8" r="6"></circle>
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
                      <path d="M12 6l1 2 2 .5-1.5 1.5.5 2-2-1-2 1 .5-2-1.5-1.5 2-.5L12 6z"></path>
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="text-[#0D55CF] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="text-[10px] font-bold text-[#1E293B] leading-[1.2] whitespace-pre-line">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="col-span-5 grid grid-rows-[55fr_45fr] gap-4 min-h-0">
          <div className="grid grid-cols-3 gap-4 min-h-0">
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
      <div className="grid grid-cols-4 gap-4 h-[26%] min-h-0 shrink-0">
        {/* Recipe Container */}
        <div className="col-span-2 bg-[#0D55CF] rounded-[16px] p-6 flex flex-col justify-between text-surface shadow-sm min-h-0">
          <div>
            <h3 className="text-[20px] font-bold mb-1 text-white">How to Make Delicious</h3>
            <p className="text-white/90 text-[12px]">Step by step cooking videos for every taste</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3 my-auto h-[60%]">
            {[
              { img: "/assets/fish2.jpg", title: "Fish Curry", sub: "Spicy & Tangy" },
              { img: "/assets/prod_1_salmon.jpg", title: "Grilled Fish", sub: "Healthy & Tasty" },
              { img: "/assets/prod_7_prawns.jpg", title: "Fish Fry", sub: "Crispy & Juicy" }
            ].map((recipe, idx) => (
              <div key={idx} className="relative h-full w-full rounded-[12px] overflow-hidden group cursor-pointer border border-white/10">
                <Image src={recipe.img} alt={recipe.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-110 z-10">
                  <div className="bg-white text-[#0D55CF] rounded-full w-[32px] h-[32px] flex items-center justify-center shadow-md">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-[14px] h-[14px] ml-0.5">
                      <path d="M5 3l14 9-14 9V3z"></path>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 z-10">
                  <p className="font-bold text-[13px] text-white leading-tight">{recipe.title}</p>
                  <p className="text-[11px] text-white/90 leading-tight mt-1">{recipe.sub}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="white" size="default" className="w-max rounded-[8px] bg-white gap-2 px-5 font-bold text-[#0D55CF] text-[11px] h-[32px] mt-1 shadow-sm hover:bg-gray-50">
            View All Recipes <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Button>
        </div>

        {/* Nutrition Section */}
        <div className="col-span-1 bg-[#F4F9FF] rounded-[16px] p-6 shadow-sm flex flex-col relative overflow-hidden min-h-0">
          <h3 className="text-[14px] font-bold text-[#0D55CF] mb-1.5">Benefits & Nutrition</h3>
          <p className="text-[11px] text-[#1E293B] mb-4 relative z-10 leading-[1.5] pr-[30%]">
            Fish, meat, eggs and chicken are rich in protein, vitamins and minerals for a stronger, healthier you.
          </p>
          <Link href="#" className="text-[#0D55CF] font-bold text-[11px] flex items-center gap-1 hover:underline relative z-10 mb-auto">
            Learn More <ArrowRight className="w-3 h-3 stroke-[2.5]" />
          </Link>
          
          <div className="flex justify-between mt-auto relative z-10 w-[80%] pb-1">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className="text-[#0D55CF]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-4"/></svg>
              </div>
              <span className="text-[9px] font-bold text-center leading-tight text-[#1E293B]">High in<br/>Protein</span>
            </div>
            <div className="w-[1px] bg-[#0D55CF]/15 h-[28px] self-center"></div>
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className="text-[#0D55CF]">
                <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-[9px] font-bold text-center leading-tight text-[#1E293B]">Rich in<br/>Vitamins</span>
            </div>
            <div className="w-[1px] bg-[#0D55CF]/15 h-[28px] self-center"></div>
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className="text-[#0D55CF]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <span className="text-[9px] font-bold text-center leading-tight text-[#1E293B]">Good for<br/>Heart</span>
            </div>
          </div>
          
          <div className="absolute right-[-10%] top-[-5%] bottom-[-5%] w-[65%] opacity-100 pointer-events-none">
            <Image src="/assets/benefits_salmon.png" alt="Salmon Benefits" fill className="object-contain object-right" />
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="col-span-1 bg-[#F4F9FF] rounded-[16px] p-5 shadow-sm flex flex-col justify-between min-h-0">
          <div>
            <h3 className="text-[14px] font-bold text-[#0D55CF] mb-2">What Our Customers Say</h3>
            <div className="text-[#0D55CF] mb-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/></svg>
            </div>
            <Rating score={5} size={14} className="mb-2 gap-0.5 text-[#F5A623]" />
            <p className="text-[#1E293B] text-[10px] leading-[1.5] mb-2 font-medium pr-4">
              "Super fresh products and great variety. Fishcart is our family's choice."
            </p>
            <p className="text-[#1E293B] text-[9px] font-bold">
              – Priya S.
            </p>
          </div>
          
          <div className="flex justify-center gap-2 mt-auto pb-1">
            <div className="w-[5px] h-[5px] rounded-full bg-[#0D55CF]"></div>
            <div className="w-[5px] h-[5px] rounded-full bg-[#93C5FD]"></div>
            <div className="w-[5px] h-[5px] rounded-full bg-[#93C5FD]"></div>
          </div>
        </div>
      </div>

      {/* Row 3: Promotional Products */}
      <div className="grid grid-cols-4 gap-4 h-[16%] min-h-0 shrink-0">
        {[
          { title: "All Fish Items", image: "/assets/fish_showcase.png" },
          { title: "All Meat Items", image: "/assets/meat_showcase.png" },
          { title: "Chicken Items", image: "/assets/chicken_showcase.png" },
          { title: "Eggs", image: "/assets/eggs_showcase.png" },
        ].map((item, idx) => (
          <div key={idx} className="col-span-1 rounded-[16px] overflow-hidden shadow-sm relative min-h-0 group cursor-pointer transition-transform hover:-translate-y-0.5 border border-[#E2E8F0]">
            <Image src={item.image} alt={item.title} fill className="object-cover transition-transform group-hover:scale-105" />
            <div className="absolute bottom-4 left-4 z-10 bg-white px-4 py-2.5 rounded-[12px] w-max shadow-sm">
              <h4 className="font-bold text-[#1E293B] text-[13px]">{item.title}</h4>
              <p className="text-[#0D55CF] text-[10px] font-bold flex items-center gap-1 mt-0.5 group-hover:underline">
                Explore Now <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Row 4: Information Cards */}
      <div className="grid grid-cols-4 gap-4 h-[11%] min-h-0 shrink-0">
        <div className="col-span-1 bg-[#E8F3FA] rounded-[16px] p-4 shadow-sm flex items-center justify-between min-h-0">
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="font-bold text-[12px] mb-1 truncate text-[#0D55CF]">Daily Selection</h4>
            <p className="text-[10px] text-[#1E293B] leading-[1.3] line-clamp-2">Handpicked daily from trusted suppliers for the best quality.</p>
          </div>
          <div className="text-[#0D55CF] shrink-0">
            <CheckCircle2 className="w-[32px] h-[32px] stroke-[1.5]" />
          </div>
        </div>
        
        <div className="col-span-1 bg-[#A5E3E0] rounded-[16px] p-4 shadow-sm flex items-center justify-between min-h-0">
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="font-bold mb-1 text-[12px] truncate text-[#0D55CF]">Hygienic & Safe</h4>
            <p className="text-[10px] text-[#1E293B] leading-[1.3] line-clamp-2">Cleaned, packed and delivered with highest hygiene standards.</p>
          </div>
          <div className="text-white shrink-0">
            <Droplet className="w-[32px] h-[32px] stroke-[1.5]" />
          </div>
        </div>
        
        <div className="col-span-1 bg-[#D4EFA5] rounded-[16px] p-4 shadow-sm flex items-center justify-between min-h-0">
          <div className="flex-1 min-w-0 pr-2">
            <h4 className="font-bold mb-1 text-[12px] truncate text-[#0D55CF]">Sourced Responsibly</h4>
            <p className="text-[10px] text-[#1E293B] leading-[1.3] line-clamp-2">We care for the ocean and the environment for a better future.</p>
          </div>
          <div className="text-white shrink-0">
            <Leaf className="w-[32px] h-[32px] stroke-[1.5]" />
          </div>
        </div>
        
        <div className="col-span-1 bg-[#E8F3FA] rounded-[16px] p-4 shadow-sm flex items-center justify-between min-h-0 text-[#1E293B]">
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h4 className="font-bold mb-1 text-[12px] truncate text-[#0D55CF]">Join Our Community</h4>
            <p className="text-[10px] leading-[1.3] mb-2 line-clamp-2">Be a part of our journey for healthy and delicious living.</p>
            <Button size="sm" className="h-[24px] text-[10px] px-3 py-0 rounded-full w-max gap-1 font-bold bg-[#0D55CF] text-white">Join Us <ArrowRight className="w-3 h-3 stroke-[2.5]"/></Button>
          </div>
          <div className="shrink-0 ml-2 w-[48px] h-[48px] bg-white rounded-lg p-1 relative">
             <Image src="/assets/whatsapp_qr.png" alt="QR Code" fill className="object-cover rounded-md p-1" />
          </div>
        </div>
      </div>
      
      {/* Row 5: Footer */}
      <div className="flex-1 min-h-0 w-full relative">
        <Footer />
      </div>
    </div>
  );
}
