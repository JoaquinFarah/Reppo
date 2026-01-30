export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  unit: string;
  specifications: string[];
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface AppSettings {
  whatsappNumber: string;
  storeName: string;
}
