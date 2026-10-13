import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/bazardor';

// সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
const toBanglaNumeral = (num: number | undefined | null): string => {
  if (num === undefined || num === null) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit: string) => banglaDigits[parseInt(digit, 10)]);
};

// সিঙ্গেল প্রোডাক্ট ফেচ করার ফাংশন
const getSingleProduct = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
      cache: "no-store",
    });
    
    if (!res.ok) return null;

    const data = await res.json();
    const products: Product[] = Array.isArray(data) ? data : data?.products || data?.data || [];
    
    // আইডি দিয়ে নির্দিষ্ট প্রোডাক্ট খুঁজে বের করা
    const product = products.find((item) => item.id.toString() === id.toString());
    return product || null;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

interface ProductDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

const ProductDetailsPage = async ({ params }: ProductDetailsProps) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto my-20 p-8 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-red-500 mb-4">পণ্যটি পাওয়া যায়নি!</h2>
        <p className="text-gray-500 text-sm mb-6">এই পণ্য সম্পর্কিত কোনো ডেটা সার্ভারে পাওয়া যায়নি।</p>
        <Link href="/" className="inline-block bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 transition">
          হোমপেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const isUp = product?.change?.dir === "up";
  const isDown = product?.change?.dir === "down";

  // সর্বনিম্ন ও সর্বোচ্চ দাম ক্যালকুলেশন
  const marketPrices = product?.markets?.map(m => m.min) || [];
  const minPrice = marketPrices.length > 0 ? Math.min(...marketPrices) : (product?.today ? product.today - 3 : 0);
  
  const marketMaxPrices = product?.markets?.map(m => m.max) || [];
  const maxPrice = marketMaxPrices.length > 0 ? Math.max(...marketMaxPrices) : (product?.today ? product.today + 5 : 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ব্রেডক্রাম্ব */}
      <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-green-600">হোম</Link>
        <span>›</span>
        <span>{product?.categoryNameBn || product?.category || 'পণ্যের ক্যাটাগরি'}</span>
        <span>›</span>
        <span className="text-gray-800 font-medium">{product?.nameBn}</span>
      </div>

      {/* ১. টপ কার্ড (মেইন হেডার) */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl border border-gray-100">
            {product?.image || product?.categoryIcon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product?.nameBn}</h1>
            <p className="text-xs text-gray-400 mt-1">
              {product?.unit === 'kg' ? 'প্রতি কেজি' : product?.unit === 'litre' ? 'প্রতি লিটার' : 'প্রতি একক'} · {product?.categoryNameBn || product?.category}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              গতকালের তুলনায় আজ দাম <span className={isUp ? "text-emerald-600 font-semibold" : isDown ? "text-red-600 font-semibold" : "text-gray-600 font-semibold"}>
                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "পরিবর্তন হয়নি"} · {toBanglaNumeral(Math.abs(product?.change?.pct || 0))}%
              </span>
            </p>
          </div>
        </div>

        {/* ডানপাশের আজকের গড় দাম */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-3 text-right w-full md:w-auto">
          <p className="text-xs text-gray-400">আজকের গড়</p>
          <p className="text-2xl font-bold text-gray-900">
            {toBanglaNumeral(product?.today)} <span className="text-sm font-normal text-gray-500">টাকা</span>
          </p>
          <p className={`text-xs font-semibold mt-0.5 ${isUp ? "text-emerald-600" : isDown ? "text-red-600" : "text-gray-500"}`}>
            {isUp ? "▲" : isDown ? "▼" : "—"} {toBanglaNumeral(Math.abs(product?.change?.pct || 0))}%
          </p>
        </div>
      </div>

      {/* ২. দামের সারসংক্ষেপ (Summary Cards) */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-900 mb-3">দামের সারসংক্ষেপ</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* সর্বনিম্ন দাম */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-gray-400">সর্বনিম্ন দাম</p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {toBanglaNumeral(minPrice)} <span className="text-sm font-normal text-gray-500">টাকা</span>
            </p>
            <p className="text-xs text-emerald-600 mt-1">সবচেয়ে কম দামের বাজার</p>
          </div>

          {/* সর্বাধিক দাম */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-gray-400">সর্বাধিক দাম</p>
            <p className="text-xl font-bold text-red-600 mt-1">
              {toBanglaNumeral(maxPrice)} <span className="text-sm font-normal text-gray-500">টাকা</span>
            </p>
            <p className="text-xs text-red-500 mt-1">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          {/* গড় দাম */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-gray-400">গড় দাম</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">
              {toBanglaNumeral(product?.today)} <span className="text-sm font-normal text-gray-500">টাকা</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">সর্বমোট গড়ের হিসাব</p>
          </div>
        </div>
      </div>

      {/* ৩. বাজারভিত্তিক আজকের দাম (Table) */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 mb-4">বাজারভিত্তিক আজকের দাম</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-400">
                <th className="py-3 px-4 font-medium">বাজার</th>
                <th className="py-3 px-4 font-medium">বিভাগ / এলাকা</th>
                <th className="py-3 px-4 font-medium">সর্বনিম্ন</th>
                <th className="py-3 px-4 font-medium">সর্বাধিক</th>
                <th className="py-3 px-4 font-medium text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {product?.markets && product.markets.length > 0 ? (
                product.markets.map((market, index) => {
                  const avgMarketPrice = Math.round((market.min + market.max) / 2);
                  return (
                    <tr key={index} className="hover:bg-gray-50/50 transition">
                      <td className="py-3.5 px-4 font-medium text-gray-800">{market.market}</td>
                      <td className="py-3.5 px-4 text-gray-500">{market.division}</td>
                      <td className="py-3.5 px-4 text-gray-700">{toBanglaNumeral(market.min)} টাকা</td>
                      <td className="py-3.5 px-4 text-gray-700">{toBanglaNumeral(market.max)} টাকা</td>
                      <td className="py-3.5 px-4 text-right font-bold text-gray-900">{toBanglaNumeral(avgMarketPrice)} টাকা</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-400 text-sm">
                    এই পণ্যের জন্য কোনো বাজারভিত্তিক ডেটা উপলব্ধ নেই।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;