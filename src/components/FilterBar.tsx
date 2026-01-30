import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBrand: string | null;
  onBrandChange: (brand: string | null) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  brands: string[];
  categories: string[];
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedBrand,
  onBrandChange,
  selectedCategory,
  onCategoryChange,
  brands,
  categories,
}: FilterBarProps) {
  const hasFilters = searchQuery || selectedBrand || selectedCategory;

  const clearFilters = () => {
    onSearchChange("");
    onBrandChange(null);
    onCategoryChange(null);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 bg-card"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => onSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Hidden categories for search functionality */}
      <div className="hidden" aria-hidden="true">
        {categories.map((category) => (
          <span key={category} data-category={category}>{category}</span>
        ))}
      </div>

      {/* Brands filter */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-2">
          {brands.map((brand) => (
            <Badge
              key={brand}
              variant={selectedBrand === brand ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/20 transition-colors shrink-0"
              onClick={() => onBrandChange(selectedBrand === brand ? null : brand)}
            >
              {brand}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
