"use client";

import React from "react";
import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

const Notfound = () => {
  return (
    <div className="min-h-[85vh] bg-[#edf2ee] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
            <AlertCircle className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-gray-900 tracking-tight">
            4<span className="text-emerald-600">0</span>4
          </h1>
          <h2 className="text-xl font-bold text-gray-800">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
            আপনি যে পেজটিতে প্রবেশ করার চেষ্টা করছেন তা হয়তো সরানো হয়েছে, ডিলিট
            করা হয়েছে অথবা লিংকটি ভুল রয়েছে।
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#00873e] hover:bg-[#007335] text-white text-xs font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-sm"
          >
            <Home className="w-4 h-4" />
            হোম পেজে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
