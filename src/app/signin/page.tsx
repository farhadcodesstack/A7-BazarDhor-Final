import React from 'react';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 bg-gray-50">
   
      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          সাইন ইন করুন
        </h2>

        <form className="space-y-4">
     
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input 
              type="email" 
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 transition" 
              placeholder="you@example.com" 
            />
          </div>

      
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input 
              type="password" 
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 transition" 
              placeholder="কমপক্ষে ৮ অক্ষর" 
            />
          </div>

        
          <button 
            type="submit" 
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200 shadow-sm"
          >
            সাইন ইন
          </button>
        </form>

    
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-3 text-xs text-gray-400 font-medium">অথবা</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

   
        <div className="grid grid-cols-2 gap-3">
       
          <button 
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.2v3.15C3.21 21.37 7.28 24 12 24z"/>
              <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.2C.44 8.13 0 9.87 0 12s.44 3.87 1.2 5.4l4.07-3.16z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.28 0 3.21 2.63 1.2 6.6l4.07 3.16c.95-2.85 3.6-4.96 6.73-4.96z"/>
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

        
          <button 
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            <svg className="w-4 h-4 fill-current text-gray-800" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

       
        <p className="text-center text-sm text-gray-500 mt-6">
          অ্যাকাউন্ট নেই?{' '}
          <Link href="/signup" className="text-green-600 font-semibold hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

  
      <div className="mt-6 text-center">
        <Link href="/" className="text-xs text-gray-500 hover:text-green-600 transition">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;