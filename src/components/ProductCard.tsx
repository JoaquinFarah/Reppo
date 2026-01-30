import { Product } from "@/types/product";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
  onToggleCart: (product: Product) => void;
}

export function ProductCard({ product, isInCart, onToggleCart }: ProductCardProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer hover:bg-accent/50",
        isInCart ? "bg-primary/10 border-primary" : "bg-card border-border"
      )}
      onClick={() => onToggleCart(product)}
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground truncate">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {product.brand} • {product.unit}
        </p>
      </div>
      
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full shrink-0 ml-3 transition-colors",
        isInCart ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      )}>
        {isInCart ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
      </div>
    </div>
  );
}
