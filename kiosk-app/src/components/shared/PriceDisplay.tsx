import { cn } from "@/lib/utils"

export interface PriceDisplayProps {
  price: number;
  unit?: string;
  className?: string;
  size?: "default" | "lg";
}

export function PriceDisplay({ price, unit = "kg", className, size = "default" }: PriceDisplayProps) {
  return (
    <div className={cn("font-bold text-text-heading", className, size === "lg" ? "text-3xl" : "text-xl")}>
      £{price.toFixed(2)}
      {unit && (
        <span className={cn("font-normal text-slate-500 ml-1", size === "lg" ? "text-lg" : "text-[11px]")}>
          / {unit}
        </span>
      )}
    </div>
  )
}
