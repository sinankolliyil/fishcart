"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export function QuantityControl({ quantity, onIncrease, onDecrease, className }: QuantityControlProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="h-10 w-10 rounded-full border-gray-200 text-text-heading hover:border-primary hover:text-primary"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <span className="text-lg font-bold w-6 text-center">{quantity}</span>
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onIncrease}
        className="h-10 w-10 rounded-full border-gray-200 text-text-heading hover:border-primary hover:text-primary"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
