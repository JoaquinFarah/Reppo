import { CartItem } from "@/types/product";

export interface OrderInfo {
  businessName: string;
  sellerName: string;
  date?: string;
}

export function generateWhatsAppMessage(
  items: CartItem[], 
  storeName: string,
  orderInfo: OrderInfo
): string {
  const header = `🛒 *Pedido de Faltantes*\n${"─".repeat(20)}\n\n`;
  
  const orderDetails = [
    `📅 *Fecha:* ${orderInfo.date || "No especificada"}`,
    `🏪 *Negocio:* ${orderInfo.businessName || "No especificado"}`,
    `🧑‍💼 *Vendedor:* ${orderInfo.sellerName || "No especificado"}`,
  ].join("\n");
  
  const productLines = items.map((item, index) => {
    let line = `${index + 1}. *${item.product.name}*\n`;
    line += `   📦 Marca: ${item.product.brand}\n`;
    line += `   📏 Medida: ${item.product.unit}`;
    
    if (item.notes) {
      line += `\n   📝 Notas: ${item.notes}`;
    }
    
    return line;
  });

  const totalItems = items.length;

  const footer = `\n\n${"─".repeat(20)}\n*TOTAL: ${totalItems} productos*`;

  return header + orderDetails + "\n\n" + productLines.join("\n\n") + footer;
}

export function sendWhatsAppMessage(phoneNumber: string, message: string): void {
  const encodedMessage = encodeURIComponent(message);
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
  window.open(url, "_blank");
}
