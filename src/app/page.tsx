"use client";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import { allProducts } from "./data";
import ProductCard from "@/components/common/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Product } from "@/types/product.types";
import Reviews from "@/components/homepage/Reviews";
import { reviewsData } from "./data";

interface FiltersState {
  categories: string[];
  sizes: string[];
  colors: string[];
  dressStyles: string[];
  priceRange: [number, number];
}

export default function HomePage() {
  const [filters, setFilters] = useState<FiltersState>({
    categories: [],
    sizes: [],
    colors: [],
    dressStyles: [],
    priceRange: [0, 1000],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // You can adjust this number

  const handleFilterChange = (callback: (prev: FiltersState) => FiltersState) => {
    setFilters(callback);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredProducts = allProducts.filter((product: Product) => {
    const { categories, sizes, colors, dressStyles, priceRange } = filters;
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false;
    }
    if (sizes.length > 0 && !sizes.some((size) => product.sizes.includes(size))) {
      return false;
    }
    if (colors.length > 0 && !colors.some((color) => product.colors.includes(color))) {
      return false;
    }
    if (dressStyles.length > 0 && !dressStyles.includes(product.dressStyle)) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    return true;
  });

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <>
     
      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-black/10 rounded-[20px] px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <Filters onChange={handleFilterChange} />
          </div>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-2xl md:text-[32px]">Casual</h1>
                <MobileFilters onChange={handleFilterChange} />
              </div>
              <div className="flex flex-col sm:items-center sm:flex-row">
                <span className="text-sm md:text-base text-black/60 mr-3">
                  Showing {indexOfFirstProduct + 1}-{
                    Math.min(indexOfLastProduct, filteredProducts.length)
                  } of {filteredProducts.length} Products
                </span>
                <div className="flex items-center">
                  Sort by:{" "}
                  <Select defaultValue="most-popular">
                    <SelectTrigger className="font-medium text-sm px-1.5 sm:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-popular">Most Popular</SelectItem>
                      <SelectItem value="low-price">Low Price</SelectItem>
                      <SelectItem value="high-price">High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {currentProducts.map((product: Product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            <hr className="border-t-black/10" />
            <Pagination className="justify-between">
              <PaginationPrevious
                href="#"
                onClick={handlePrevious}
                className="border border-black/10"
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : undefined}
              />
              <PaginationContent>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={() => paginate(i + 1)}
                      className="text-black/50 font-medium text-sm"
                      isActive={i + 1 === currentPage}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>

              <PaginationNext
                href="#"
                onClick={handleNext}
                className="border border-black/10"
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : undefined}
              />
            </Pagination>
          </div>
        </div>
      </div>
      </main>
    </>
  );
}
