import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import type { Product } from '../../types';
import { useStore } from '../../lib/store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = React.useState(1);
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold">
            ${(product.price / 100).toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={decrementQuantity}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors"
          disabled={product.inventory < 1}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.inventory < 1 ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}