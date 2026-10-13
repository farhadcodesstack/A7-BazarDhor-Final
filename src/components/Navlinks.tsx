import Link from 'next/link';
import { Category } from '@/types/bazardor';

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/categories');
    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || data?.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const Navlinks = async () => {
  const categories: Category[] = await getCategories();

  return (
    <nav className="w-full bg-white border-b border-gray-100 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-7 px-6 overflow-x-auto scrollbar-hide">
        
        {/* ১. প্রথমে হোম পেজে ফেরার জন্য একটি Home লিংক যোগ করা হলো */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-600 font-bold text-sm whitespace-nowrap transition-colors"
        >
          <span>🏠 হোম</span>
        </Link>

        {/* ২. এরপর API থেকে আসা ক্যাটেগরিগুলোর ম্যাপ */}
        {Array.isArray(categories) &&
          categories.map((c: Category) => {
            const categorySlug = c.slug || c.id;

            return (
              <Link
                key={c.id}
                href={`/category/${categorySlug}`}
                className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-600 font-medium text-sm whitespace-nowrap transition-colors"
              >
                {c.icon && <span className="text-base">{c.icon}</span>}
                <span>{c.nameBn}</span>
              </Link>
            );
          })}
      </div>
    </nav>
  );
};

export default Navlinks;