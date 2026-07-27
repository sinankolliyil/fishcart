import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, actionLabel, actionHref, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between mb-6", className)}>
      <div>
        <h2 className="text-3xl font-bold text-text-heading leading-tight mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-text-body text-base max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      
      {actionLabel && actionHref && (
        <Button variant="link" asChild className="text-primary font-semibold text-base p-0 h-auto gap-2">
          <Link href={actionHref}>
            {actionLabel} <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      )}
    </div>
  );
}
