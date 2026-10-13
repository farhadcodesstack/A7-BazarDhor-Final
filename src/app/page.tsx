import AllProducts from '@/components/AllProducts';
import DecreasedProducts from '@/components/DecreasedProducts';
import IncreasedProducts from '@/components/IncreasedProducts';
import React from 'react';

const page = () => {
  return (
    <div>
      {/* ফিল্টার করা প্রোডাক্ট সেকশনসমূহ */}
      <IncreasedProducts />
      <DecreasedProducts />
      <AllProducts />
    </div>
  );
};

export default page;