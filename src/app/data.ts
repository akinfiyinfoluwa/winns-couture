import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "John Doe",
    content: "Great product! Highly recommended.",
    rating: 5,
    date: "2024-08-15",
  },
  {
    id: 2,
    user: "Jane Smith",
    content: "Good quality, but a bit pricey.",
    rating: 4,
    date: "2024-08-14",
  },
  {
    id: 3,
    user: "Peter Jones",
    content: "The product exceeded my expectations.",
    rating: 5,
    date: "2024-08-13",
  },
  {
    id: 4,
    user: "Mary Williams",
    content: "I'm satisfied with my purchase.",
    rating: 4,
    date: "2024-08-12",
  },
];

export const topSellingData: Product[] = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    rating: 4.5,
    srcUrl: "/images/pic1.png",
    discount: {
      amount: 10,
      percentage: 10,
    },
    category: "T-shirts",
    sizes: ["Small", "Medium"],
    colors: ["bg-red-600"],
    dressStyle: "Casual",
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    rating: 4.2,
    srcUrl: "/images/pic2.png",
    discount: {
      amount: 20,
      percentage: 10,
    },
    category: "Shorts",
    sizes: ["Large", "X-Large"],
    colors: ["bg-blue-600"],
    dressStyle: "Gym",
  },
  {
    id: 3,
    title: "Product 3",
    price: 150,
    rating: 4.8,
    srcUrl: "/images/pic3.png",
    discount: {
      amount: 15,
      percentage: 10,
    },
    category: "Shirts",
    sizes: ["Medium", "Large"],
    colors: ["bg-white"],
    dressStyle: "Formal",
  },
  {
    id: 4,
    title: "Product 4",
    price: 250,
    rating: 4.0,
    srcUrl: "/images/pic4.png",
    discount: {
      amount: 25,
      percentage: 10,
    },
    category: "Hoodie",
    sizes: ["Small", "X-Large"],
    colors: ["bg-black"],
    dressStyle: "Casual",
  },
];

export const newArrivalsData: Product[] = [
  {
    id: 5,
    title: "Product 5",
    price: 120,
    rating: 4.6,
    srcUrl: "/images/pic5.png",
    discount: {
      amount: 12,
      percentage: 10,
    },
    category: "Jeans",
    sizes: ["Medium", "Large"],
    colors: ["bg-blue-600"],
    dressStyle: "Casual",
  },
  {
    id: 6,
    title: "Product 6",
    price: 220,
    rating: 4.3,
    srcUrl: "/images/pic6.png",
    discount: {
      amount: 22,
      percentage: 10,
    },
    category: "T-shirts",
    sizes: ["Small", "Large"],
    colors: ["bg-green-600"],
    dressStyle: "Casual",
  },
  {
    id: 7,
    title: "Product 7",
    price: 180,
    rating: 4.9,
    srcUrl: "/images/pic7.png",
    discount: {
      amount: 18,
      percentage: 10,
    },
    category: "Shorts",
    sizes: ["Medium", "X-Large"],
    colors: ["bg-yellow-300"],
    dressStyle: "Gym",
  },
  {
    id: 8,
    title: "Product 8",
    price: 280,
    rating: 4.1,
    srcUrl: "/images/pic8.png",
    discount: {
      amount: 28,
      percentage: 10,
    },
    category: "Shirts",
    sizes: ["Small", "Medium"],
    colors: ["bg-pink-600"],
    dressStyle: "Party",
  },
];

export const relatedProductData: Product[] = [
  {
    id: 9,
    title: "Product 9",
    price: 130,
    rating: 4.7,
    srcUrl: "/images/pic9.png",
    discount: {
      amount: 13,
      percentage: 10,
    },
    category: "Hoodie",
    sizes: ["Large", "X-Large"],
    colors: ["bg-purple-600"],
    dressStyle: "Casual",
  },
  {
    id: 10,
    title: "Product 10",
    price: 230,
    rating: 4.4,
    srcUrl: "/images/pic10.png",
    discount: {
      amount: 23,
      percentage: 10,
    },
    category: "Jeans",
    sizes: ["Small", "Medium"],
    colors: ["bg-cyan-400"],
    dressStyle: "Casual",
  },
  {
    id: 11,
    title: "Product 11",
    price: 190,
    rating: 5.0,
    srcUrl: "/images/pic11.png",
    discount: {
      amount: 19,
      percentage: 10,
    },
    category: "T-shirts",
    sizes: ["Medium", "Large"],
    colors: ["bg-orange-600"],
    dressStyle: "Casual",
  },
  {
    id: 12,
    title: "Product 12",
    price: 290,
    rating: 4.2,
    srcUrl: "/images/pic12.png",
    discount: {
      amount: 29,
      percentage: 10,
    },
    category: "Shorts",
    sizes: ["Small", "X-Large"],
    colors: ["bg-black"],
    dressStyle: "Gym",
  },
];

export const allProducts: Product[] = [
  ...topSellingData,
  ...newArrivalsData,
  ...relatedProductData,
];
