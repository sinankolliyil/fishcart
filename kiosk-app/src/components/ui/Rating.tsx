import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface RatingProps {
  score: number;
  reviews?: number;
  className?: string;
  size?: number;
}

export function Rating({ score, reviews, className, size = 16 }: RatingProps) {
  // Array of 5 items
  const maxStars = 5;
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.5;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex text-accent">
        {[...Array(maxStars)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} size={size} className="fill-accent" />;
          }
          if (i === fullStars && hasHalfStar) {
            // A simple half-star approximation via SVG would be ideal, but for now
            // we'll use a filled star if they just passed .5, or we can use custom fill.
            // Lucide doesn't have a half star by default without custom masking.
            // We will use a standard fill-accent for half for now, or just an outline.
            return <Star key={i} size={size} className="fill-accent opacity-50" />;
          }
          return <Star key={i} size={size} className="text-gray-300" />;
        })}
      </div>
      {reviews !== undefined && (
        <div className="text-sm font-semibold text-text-heading">
          {score.toFixed(1)} <span className="text-text-muted font-normal">({reviews} Reviews)</span>
        </div>
      )}
    </div>
  )
}
