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
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);

  const memoizedOnChange = useCallback(onChange, []);

  useEffect(() => {
    memoizedOnChange((prev) => ({ ...prev, priceRange }));
  }, [priceRange, memoizedOnChange]);

  const handleValueChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4" contentClassName="overflow-visible">
          <Slider
            value={priceRange}
            onValueChange={handleValueChange}
            min={0}
            max={250}
            step={1}
            label="$"
          />
          <div className="mb-3" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
