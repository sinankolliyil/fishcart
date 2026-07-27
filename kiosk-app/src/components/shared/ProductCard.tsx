import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PriceDisplay } from "./PriceDisplay";

export interface ProductCardProps {
  id: string;
  title: string;
  origin: string;
  format: string; // e.g., "Fillet", "Whole"
  price: number;
  unit: string;
  imageSrc: string;
  badgeLabel?: string;
}

export function ProductCard({
  id,
  title,
  origin,
  format,
  price,
  unit,
  imageSrc,
  badgeLabel,
}: ProductCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-base hover:shadow-hover">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-background overflow-hidden p-6">
        <Image 
          src={imageSrc}
          alt={title}
          fill
          className="object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-surface/80 text-text-muted hover:text-primary hover:bg-surface shadow-sm transition-colors">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-text-heading leading-tight mb-1">{title}</h3>
          <p className="text-sm text-text-muted">
            {origin} &bull; {format}
          </p>
          
          {badgeLabel && (
            <div className="mt-3">
              <Badge variant="soft">{badgeLabel}</Badge>
            </div>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <PriceDisplay price={price} unit={unit} />
          
          <Link 
            href={`/product/${id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View Details <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
