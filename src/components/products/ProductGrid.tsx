import React from 'react';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { useProducts } from '../../lib/hooks/useProducts';

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const { products, loading, error } = useProducts(
    selectedCategory ?? undefined,
    searchQuery || undefined
  );

  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    ) as string[];
    return uniqueCategories;
  }, [products]);

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSearch={setSearchQuery}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}