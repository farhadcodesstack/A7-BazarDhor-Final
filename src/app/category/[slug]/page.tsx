import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/bazardor';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// API থেকে সব পণ্য ফেচ করার ফাংশন
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

const CategoryProductsPage = async ({ params }: CategoryPageProps) => {
  // Next.js 15+ এ params একটি Promise হতে পারে, তাই await করা নিরাপদ
  const { slug } = await params;
  const products: Product[] = await getProducts();

  // ক্যাটাগরির slug বা category নাম অনুযায়ী পণ্য ফিল্টার করা
  const filteredProducts = products.filter(
    (item) => item.category === slug || item.slug === slug
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ক্যাটাগরি টাইটেল */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
          {slug === 'chal' ? 'চাল' : slug === 'dal' ? 'ডাল' : slug === 'tel' ? 'তেল' : slug === 'sobji' ? 'সবজি' : slug === 'mach' ? 'মাছ' : slug} ক্যাটাগরির পণ্যসমূহ
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          এই ক্যাটাগরিতে মোট {filteredProducts.length}টি পণ্য পাওয়া গেছে।
        </p>
      </div>

      {/* পণ্যগুলো গ্রিড আকারে দেখানো */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-base">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।</p>
        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;