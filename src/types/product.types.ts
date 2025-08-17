export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
  timeline?: string; // new or old
  category: string;
  sizes: string[];
  colors: string[];
  dressStyle: string;
  brand?: string;
};
