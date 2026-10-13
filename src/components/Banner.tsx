import Image from 'next/image';
import React from 'react';

const Banner = async () => {
    // সার্ভার সাইডে বা ক্লায়েন্ট সাইডে ব্যবহারের জন্য বাংলা ডেট ফরম্যাট
    const date = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });

    return (
        <div className="max-w-7xl mx-auto px-4 my-6">
            <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                
                {/* বাম পাশের কন্টেন্ট */}
                <div className="flex flex-col items-start max-w-2xl">
                    {/* তারিখের ব্যাজ (Figma Style) */}
                    <div className="inline-block bg-[#E8F5E9] text-[#008744] text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full mb-4">
                        {date}
                    </div>

                    {/* মেইন টাইটেল */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* বিবরণ */}
                    <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* বাটন */}
                    <button className="bg-[#008744] hover:bg-[#007138] text-white text-sm sm:text-base font-semibold px-6 py-3 rounded-xl transition-all shadow-sm">
                        সব পণ্য দেখুন
                    </button>
                </div>

                {/* ডান পাশের ইমেজ */}
                <div className="flex-shrink-0 flex items-center justify-center">
                    <Image
                        height={220}
                        width={220}
                        alt="image banner"
                        src="/bazar-hero.png"
                        className="object-contain w-48 sm:w-56 md:w-64 h-auto"
                        priority
                    />
                </div>

            </div>
        </div>
    );
};

export default Banner;