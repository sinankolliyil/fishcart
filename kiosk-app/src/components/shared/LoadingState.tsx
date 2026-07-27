import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ message = "Loading...", className }: LoadingStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4", className)}>
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <p className="text-text-muted font-medium">{message}</p>
    </div>
  );
}
