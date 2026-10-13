import React from "react";
import Link from "next/link"; 
import { Product } from "@/types/bazardor";


const toBanglaNumeral = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit: string) => banglaDigits[parseInt(digit, 10)]);
};

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

const Marque = async () => {
  const marqueText: Product[] = await getProducts();
  

  const duplicatedItems: Product[] = [...marqueText, ...marqueText, ...marqueText];

  return (
    <div className="mx-auto w-full max-w-7xl border-y border-gray-200 bg-gray-50/50 py-2.5 overflow-hidden relative">
      <style>{`
        @keyframes scrollMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scrollMarquee 50s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track">
        {duplicatedItems.map((item: Product, index: number) => {
          const isUp = item?.change?.dir === "up";
          const isDown = item?.change?.dir === "down";

          return (
          
            <Link
              key={item.id ? `${item.id}-${index}` : index}
              href={`/products/${item?.id}`}
              className="flex shrink-0 items-center gap-2.5 border-r border-gray-200 px-6 text-sm text-gray-800 whitespace-nowrap hover:bg-gray-100/60 transition-colors cursor-pointer"
            >
              <span className="text-base">{item?.image || item?.categoryIcon || "🛒"}</span>

              <span className="font-semibold text-gray-900 hover:text-green-600 transition-colors">
                {item?.nameBn}
              </span>

              <span className="text-gray-700">
                {toBanglaNumeral(item?.today)} টাকা/{item?.unit === 'kg' ? 'কেজি' : item?.unit === 'litre' ? 'লিটার' : 'একক'}
              </span>

              <span
                className={`font-bold flex items-center gap-0.5 ${
                  isUp
                    ? "text-emerald-600"
                    : isDown
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {toBanglaNumeral(Math.abs(item?.change?.pct || 0))}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Marque;