export type Color = { name: string; hex: string };

export type Variant = {
  id: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
};

export type Review = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  collection: string;
  description: string;
  details: string[];
  basePrice: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  badge: string | null;
  image: string;
  imageAlt: string;
  colors: Color[];
  variants: Variant[];
  reviews?: Review[];
};

export type CartItem = {
  key: string;
  product: Product;
  variantId: string;
  size: string;
  color: string;
  quantity: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

export type Order = {
  id: string;
  userId: string;
  createdAt: string;
  items: Array<{
    productId: string;
    variantId?: string;
    name: string;
    variant: string;
    sku?: string;
    quantity: number;
    unitPrice: number;
    image?: string;
  }>;
  totals: { subtotal: number; shipping: number; tax: number; total: number };
  shippingAddress: Record<string, string>;
  paymentStatus: string;
  orderStatus: string;
  timeline: Array<{ label: string; date: string; complete: boolean }>;
};

export type AdminDashboard = {
  metrics: { revenue: number; orders: number; units: number; conversion: number };
  orders: Order[];
  lowStock: Array<{ product: string; id: string; size: string; color: string; sku: string; stock: number }>;
  monthlyRevenue: Array<{ month: string; value: number }>;
};
