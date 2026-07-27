import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "soft"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        {
          "bg-primary text-surface hover:bg-primary/80": variant === "default",
          "bg-secondary text-primary hover:bg-secondary/80": variant === "secondary",
          "border border-primary text-primary": variant === "outline",
          "bg-blue-50 text-primary border border-blue-100": variant === "soft",
        },
        className
      )}
      {...props}
    />
  )
}
