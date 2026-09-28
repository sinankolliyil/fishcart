import { cn } from "@/lib/utils"

export interface PriceDisplayProps {
  price: number;
  unit?: string;
  className?: string;
  size?: "default" | "lg";
}

export function PriceDisplay({ price, unit = "kg", className, size = "default" }: PriceDisplayProps) {
  return (
    <div className={cn("inline-flex items-baseline whitespace-nowrap font-bold text-text-heading", className, size === "lg" ? "text-3xl" : "text-xl")}>
      £{price.toFixed(2)}
      {unit && (
        <span className={cn("font-normal text-slate-500 ml-0.5 whitespace-nowrap", size === "lg" ? "text-lg" : "text-[10px]")}>
          /{unit}
        </span>
      )}
    </div>
  )
}
