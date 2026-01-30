import { useState, useCallback } from "react";
import { Product, CartItem } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const toggleCartItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Producto quitado",
          description: `${product.name} se quitó de tu lista`,
        });
        return prev.filter((item) => item.product.id !== product.id);
      }

      toast({
        title: "Producto agregado",
        description: `${product.name} se agregó a tu lista`,
      });

      return [...prev, { product, quantity: 1 }];
    });
  }, [toast]);

  const isInCart = useCallback((productId: string) => {
    return items.some((item) => item.product.id === productId);
  }, [items]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        toast({
          title: "Producto eliminado",
          description: `${item.product.name} se eliminó de tu lista`,
        });
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  }, [toast]);

  const updateNotes = useCallback((productId: string, notes: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, notes } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return {
    items,
    toggleCartItem,
    isInCart,
    updateQuantity,
    removeItem,
    updateNotes,
    clearCart,
  };
}
