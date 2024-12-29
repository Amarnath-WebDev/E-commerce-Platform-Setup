import React from 'react';
import { Link } from 'react-router-dom';
import { Store } from 'lucide-react';
import { Cart } from './Cart';

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Store className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold">ShopStack</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Cart />
          </div>
        </div>
      </div>
    </nav>
  );
}