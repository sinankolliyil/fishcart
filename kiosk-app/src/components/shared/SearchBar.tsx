import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = "Search for fresh fish...", className }: SearchBarProps) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
      <Input 
        type="search"
        placeholder={placeholder}
        className="pl-12 h-12 rounded-full border-gray-200 text-base  focus-visible:ring-primary focus-visible:border-primary"
      />
    </div>
  )
}
