import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[85vh] bg-[#edf2ee] flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100/80 flex flex-col items-center justify-center space-y-4 max-w-xs w-full">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-600 rounded-full animate-spin border-t-transparent"></div>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-sm font-bold text-gray-800 tracking-wide">
            লোড হচ্ছে...
          </h3>
          <p className="text-[11px] text-gray-400">
            অনুগ্রহ করে একটু অপেক্ষা করুন
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
