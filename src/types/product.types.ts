

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: number;
  rating: number;
  timeline?: string; // new or old
  category: string;
  sizes: string[];
  colors: string[];
  dressStyle: string;
  brand?: string;
};
