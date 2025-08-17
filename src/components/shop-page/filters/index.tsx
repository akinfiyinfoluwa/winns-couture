import React, { useState } from "react";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ColorsSection from "@/components/shop-page/filters/ColorsSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import SizeSection from "@/components/shop-page/filters/SizeSection";
import BrandsSection from "@/components/shop-page/filters/BrandsSection";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  onChange: (callback: (prev: any) => any) => void;
}

const Filters: React.FC<FiltersProps> = ({ onChange }) => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (updater: (prev: any) => any) => {
    setFilters(updater);
  };

  const handleApplyFilters = () => {
    onChange((prev) => ({ ...prev, ...filters }));
  };

  return (
    <>
      <hr className="border-t-black/10" />
      <CategoriesSection onChange={handleFilterChange} />
      <hr className="border-t-black/10" />
      <PriceSection onChange={handleFilterChange} />
      <hr className="border-t-black/10" />
      <ColorsSection onChange={handleFilterChange} />
      <hr className="border-t-black/10" />
      <SizeSection onChange={handleFilterChange} />
      <hr className="border-t-black/10" />
      <BrandsSection />
      <Button
        type="button"
        className="bg-black w-full rounded-full text-sm font-medium py-4 h-12"
        onClick={handleApplyFilters}
      >
        Apply Filter
      </Button>
    </>
  );
};

export default Filters;
