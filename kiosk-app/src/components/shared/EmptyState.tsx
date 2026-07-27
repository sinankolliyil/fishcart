import { PackageX } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyState({ 
  title = "No results found", 
  description = "Try adjusting your filters or search query.", 
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-6">
        <PackageX className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-text-heading mb-2">{title}</h3>
      <p className="text-text-muted max-w-sm">{description}</p>
    </div>
  );
}
