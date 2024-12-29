import { supabase } from '../supabase';
import { dummyProducts } from '../data/dummyProducts';
import type { Product } from '../../types';

export async function getProducts(category?: string, search?: string) {
  // For development, return filtered dummy products
  let products = dummyProducts;

  if (category) {
    products = products.filter(p => p.category === category);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description?.toLowerCase().includes(searchLower)
    );
  }

  return products as Product[];
}