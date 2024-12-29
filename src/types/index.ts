export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  inventory: number;
  image_url: string | null;
  category: string | null;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
}