import { CartItem } from "@/types/product";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ShoppingCart, Trash2, MessageCircle, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CartSidebarProps {
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onSendWhatsApp: () => void;
}

export function CartSidebar({
  items,
  onRemoveItem,
  onSendWhatsApp,
}: CartSidebarProps) {
  const totalItems = items.length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="default" 
          size="lg"
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-2xl h-16 w-16 md:h-14 md:w-auto md:px-6 md:rounded-xl"
        >
          <ShoppingCart className="h-6 w-6" />
          <span className="hidden md:inline ml-2">Lista</span>
          {totalItems > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center bg-background text-primary border-2 border-primary md:relative md:top-0 md:right-0 md:ml-2"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col bg-foreground/95 text-background border-l-4 border-primary">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2 text-background">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Lista de Faltantes
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-background">
              Volver
            </Button>
          </SheetClose>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <Package className="h-16 w-16 text-background/30 mb-4" />
            <p className="text-background/70">
              Tu lista está vacía
            </p>
            <p className="text-sm text-background/50 mt-1">
              Agrega productos del catálogo
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-3 py-4">
                {items.map((item) => (
                  <div 
                    key={item.product.id} 
                    className="bg-background/10 backdrop-blur-sm rounded-lg p-3 border border-background/20"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight text-background">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-background/60">
                          {item.product.brand} • {item.product.unit}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-background/60 hover:text-destructive hover:bg-destructive/20 shrink-0"
                        onClick={() => onRemoveItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4 border-t border-background/20">
              <div className="flex justify-between items-center">
                <span className="text-background/70">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  {totalItems} productos
                </span>
              </div>

              <Button
                variant="whatsapp"
                size="xl"
                className="w-full"
                onClick={onSendWhatsApp}
              >
                <MessageCircle className="h-5 w-5" />
                Enviar por WhatsApp
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}