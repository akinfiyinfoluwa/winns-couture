"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

interface PriceSectionProps {
  onChange: (callback: (prev: any) => any) => void;
}

const PriceSection: React.FC<PriceSectionProps> = ({ onChange }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  const memoizedOnChange = useCallback(onChange, []);

  useEffect(() => {
    memoizedOnChange((prev) => ({ ...prev, priceRange }));
  }, [priceRange, memoizedOnChange]);

  const handleValueChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-6 pb-2" contentClassName="overflow-visible">
          <div className="space-y-4">
            {/* Price Range Display */}
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">From</span>
                <span className="text-lg font-bold text-black">{formatPrice(priceRange[0])}</span>
              </div>
              <div className="text-gray-300">—</div>
              <div className="flex flex-col text-right">
                <span className="text-xs text-gray-500 font-medium">To</span>
                <span className="text-lg font-bold text-black">{formatPrice(priceRange[1])}</span>
              </div>
            </div>

            {/* Slider */}
            <div className="pt-2 pb-1">
              <Slider
                value={priceRange}
                onValueChange={handleValueChange}
                min={0}
                max={1000000}
                step={1000}
                label="₦"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
