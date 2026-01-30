import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { sampleProducts, brands, categories } from "@/data/products";

export function useProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const sortedBrands = useMemo(() => {
    return [...brands].sort((a, b) => a.localeCompare(b, 'es'));
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered = sampleProducts.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.specifications.some((spec) =>
          spec.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesBrand = !selectedBrand || product.brand === selectedBrand;
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;

      return matchesSearch && matchesBrand && matchesCategory;
    });

    // Sort alphabetically by name only
    return filtered.sort((a, b) => a.name.localeCompare(b.name, 'es'));
  }, [searchQuery, selectedBrand, selectedCategory]);

  return {
    products: filteredProducts,
    allProducts: sampleProducts,
    brands: sortedBrands,
    categories,
    searchQuery,
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
    selectedCategory,
    setSelectedCategory,
  };
}
