// বাজার ডাটার টাইপ
export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

// দামের পরিবর্তনের টাইপ
export interface PriceChange {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

// প্রধান পণ্য (Product) টাইপ
export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceChange;
  markets: Market[];
}

// ক্যাটাগরি (Category) টাইপ
export interface Category {
  id: number | string;
  name: string;
  nameBn: string;
  icon: string;
  slug?: string;
}

// ProductCard Props টাইপ
export interface ProductCardProps {
  item: Product;
}