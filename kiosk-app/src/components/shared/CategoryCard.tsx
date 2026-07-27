import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  href: string;
  variant: "fish" | "meat" | "chicken" | "eggs";
  className?: string;
}

export function CategoryCard({ title, subtitle, imageSrc, href, variant, className }: CategoryCardProps) {
  const styles = {
    fish: { bg: "bg-[#7EBEFE]", title: "text-[#0D55CF]", sub: "text-[#1E293B]", arrow: "text-[#0D55CF]" },
    meat: { bg: "bg-[#FF6770]", title: "text-white", sub: "text-white/90", arrow: "text-[#FF6770]" },
    chicken: { bg: "bg-[#FFAD29]", title: "text-white", sub: "text-white/90", arrow: "text-[#FFAD29]" },
    eggs: { bg: "bg-[#91C56A]", title: "text-white", sub: "text-white/90", arrow: "text-[#91C56A]" },
  };

  const currentStyle = styles[variant];

  return (
    <Link 
      href={href}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 transition-transform hover:-translate-y-1 shadow-sm",
        currentStyle.bg,
        className
      )}
    >
      <div className="z-10 relative">
        <h3 className={cn("text-[18px] font-bold mb-0.5 leading-tight", currentStyle.title)}>{title}</h3>
        <p className={cn("text-[11px] font-medium", currentStyle.sub)}>
          {subtitle}
        </p>
      </div>

      <div className={cn("absolute", variant === 'eggs' ? "right-[-5%] top-[-5%] bottom-[-5%] w-[45%]" : "right-[-5%] bottom-[-10%] w-[85%] h-[95%]")}>
        <img 
          src={imageSrc}
          alt={title}
          className={cn("w-full h-full object-contain drop-shadow-md", variant === 'eggs' ? "object-right" : "object-bottom-right scale-[1.15]")}
        />
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <div className={cn("flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110", currentStyle.arrow)}>
          <ArrowRight className="h-4 w-4 stroke-[2.5]" />
        </div>
      </div>
    </Link>
  );
}
