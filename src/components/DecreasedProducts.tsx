import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/bazardor';

const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const data = await res.json();
    return Array.isArray(data) ? data : data?.products || data?.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const DecreasedProducts = async () => {
  const products: Product[] = await getProducts();
  
  // 'any' ছাড়া ফিল্টারিং
  const decreased: Product[] = products.filter((item: Product) => item?.change?.dir === "down");

  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-emerald-500 text-lg">▼</span>
          <h2 className="text-xl font-bold text-gray-900">আজ দাম কমেছে</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {decreased.map((item: Product) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecreasedProducts;