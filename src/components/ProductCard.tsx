import React from 'react';
import { ProductCardProps } from '@/types/bazardor';

// সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
const toBanglaNumeral = (num: number | undefined | null): string => {
  if (num === undefined || num === null) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit: string) => banglaDigits[parseInt(digit, 10)]);
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const isUp = item?.change?.dir === "up";
  const isDown = item?.change?.dir === "down";

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      {/* উপরে: নাম ও একক */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{item?.image || item?.categoryIcon || "🛒"}</span>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">
              {item?.nameBn}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {item?.unit === 'kg' ? 'প্রতি কেজি' : item?.unit === 'litre' ? 'প্রতি লিটার' : 'প্রতি একক'}
            </p>
          </div>
        </div>
      </div>

      {/* নিচে: দাম ও পরিবর্তনের হার */}
      <div className="flex items-end justify-between mt-4 pt-3 border-t border-gray-50">
        <div>
          <p className="text-xs text-gray-500">আজকের গড়</p>
          <p className="text-lg font-bold text-gray-900">
            {toBanglaNumeral(item?.today)} টাকা
          </p>
        </div>

        {/* দাম বাড়া / কমার ব্যাজ */}
        <div
          className={`flex items-center gap-1 font-semibold text-sm px-2 py-1 rounded-md ${
            isUp
              ? "text-emerald-600 bg-emerald-50"
              : isDown
              ? "text-red-600 bg-red-50"
              : "text-gray-500 bg-gray-50"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{toBanglaNumeral(Math.abs(item?.change?.pct || 0))}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;