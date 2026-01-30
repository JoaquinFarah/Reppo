import { useState } from "react";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { ProductCard } from "@/components/ProductCard";
import { CartSidebar } from "@/components/CartSidebar";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { generateWhatsAppMessage, sendWhatsAppMessage } from "@/utils/whatsapp";
import { useToast } from "@/hooks/use-toast";
import { Package, Store, User, Phone, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORE_NAME = "REPPO";

const PREDEFINED_CONTACTS = [
  { name: "FERNANDO", number: "2613656363" },
  { name: "GABRIEL", number: "2615706757" },
  { name: "JOAQUIN", number: "2615596712" },
];

const Index = () => {
  const { toast } = useToast();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [selectedContact, setSelectedContact] = useState<string>("");
  const [businessName, setBusinessName] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const formatDateDisplay = (date: Date | undefined) => {
    if (!date) return "";
    const dayName = format(date, "EEEE", { locale: es }).toUpperCase();
    const dayNumber = format(date, "d");
    const monthName = format(date, "MMMM", { locale: es }).toUpperCase();
    return `${dayName}/${dayNumber}/${monthName}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setCalendarOpen(false);
  };
  
  const {
    products,
    brands,
    categories,
    searchQuery,
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
    selectedCategory,
    setSelectedCategory,
  } = useProducts();

  const {
    items,
    toggleCartItem,
    isInCart,
    removeItem,
    clearCart,
  } = useCart();

  const handleContactSelect = (value: string) => {
    setSelectedContact(value);
    if (value === "custom") {
      setWhatsappNumber("");
    } else {
      const contact = PREDEFINED_CONTACTS.find(c => c.name === value);
      if (contact) {
        setWhatsappNumber(contact.number);
      }
    }
  };

  const handleSendWhatsApp = () => {
    const numberToUse = selectedContact === "custom" ? whatsappNumber : whatsappNumber;
    
    if (!numberToUse) {
      toast({
        title: "Número requerido",
        description: "Por favor selecciona o ingresa un número de WhatsApp",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Lista vacía",
        description: "Agrega productos a tu lista antes de enviar",
        variant: "destructive",
      });
      return;
    }

    const message = generateWhatsAppMessage(items, STORE_NAME, {
      businessName,
      sellerName,
      date: formatDateDisplay(selectedDate),
    });
    sendWhatsAppMessage(numberToUse, message);
    
    toast({
      title: "¡Pedido enviado!",
      description: "Se abrió WhatsApp con tu pedido",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header storeName={STORE_NAME} />
      
      <main className="container mx-auto px-4 py-6 pb-24">
        {/* Order Info Card */}
        <Card className="mb-6 border-4 border-foreground bg-card shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 uppercase">
                  <CalendarDays className="h-4 w-4 text-accent" />
                  Fecha
                </label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {selectedDate ? formatDateDisplay(selectedDate) : "Seleccionar fecha..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      locale={es}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 uppercase">
                  <Store className="h-4 w-4 text-primary" />
                  Nombre del Negocio
                </label>
                <Input
                  placeholder="Ej: Almacén Don Pedro"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 uppercase">
                  <User className="h-4 w-4 text-primary" />
                  Nombre del Vendedor
                </label>
                <Input
                  placeholder="Ej: María García"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2 uppercase">
                  <Phone className="h-4 w-4 text-accent" />
                  WhatsApp de Destino
                </label>
                <Select value={selectedContact} onValueChange={handleContactSelect}>
                  <SelectTrigger className="border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <SelectValue placeholder="Seleccionar contacto..." />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-card border-2 border-foreground">
                    {PREDEFINED_CONTACTS.map((contact) => (
                      <SelectItem key={contact.name} value={contact.name}>
                        {contact.name} ({contact.number})
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Ingresar otro número...</SelectItem>
                  </SelectContent>
                </Select>
                {selectedContact === "custom" && (
                  <Input
                    placeholder="Ej: 2614567890"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="mt-2 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            brands={brands}
            categories={categories}
          />
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              No se encontraron productos
            </h3>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Intenta con otros filtros de búsqueda
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {products.length} producto{products.length !== 1 ? "s" : ""} encontrado{products.length !== 1 ? "s" : ""}
            </p>
            
            <div className="flex flex-col gap-2">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInCart={isInCart(product.id)}
                  onToggleCart={toggleCartItem}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <CartSidebar
        items={items}
        onRemoveItem={removeItem}
        onSendWhatsApp={handleSendWhatsApp}
      />
    </div>
  );
};

export default Index;