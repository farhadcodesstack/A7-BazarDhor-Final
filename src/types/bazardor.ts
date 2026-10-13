// bazar er type
export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

// price changer er type
export interface PriceChange {
  dir: 'up' | 'down' | 'flat';
  pct: number;
}

// Product er main type
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

// Category er type
export interface Category {
  id: number | string;
  name: string;
  nameBn: string;
  icon: string;
  slug?: string;
}

// ProductCard Props er type
export interface ProductCardProps {
  item: Product;
}