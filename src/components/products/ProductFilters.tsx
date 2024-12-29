import React from 'react';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onSearch: (query: string) => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  onSearch,
}: ProductFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}