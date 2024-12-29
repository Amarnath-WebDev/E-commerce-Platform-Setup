import { supabase } from '../supabase';
import type { Order, OrderItem } from '../../types';

export async function createOrder(items: OrderItem[], total: number) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total,
      status: 'pending'
    })
    .select()
    .single();

  if (orderError || !order) {
    throw new Error('Failed to create order');
  }

  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_time: item.price_at_time
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    throw new Error('Failed to create order items');
  }

  return order;
}