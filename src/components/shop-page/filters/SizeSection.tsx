"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface SizeSectionProps {
  onChange: (callback: (prev: any) => any) => void;
}

const sizes = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];

const SizeSection: React.FC<SizeSectionProps> = ({ onChange }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange = (size: string) => {
    const newCheckedItems = checkedItems.includes(size)
      ? checkedItems.filter((item) => item !== size)
      : [...checkedItems, size];
    setCheckedItems(newCheckedItems);
  };

  const memoizedOnChange = useCallback(onChange, []);

  useEffect(() => {
    memoizedOnChange((prev) => ({ ...prev, sizes: checkedItems }));
  }, [checkedItems, memoizedOnChange]);

  return (
    <Accordion type="single" collapsible defaultValue="filter-size">
      <AccordionItem value="filter-size" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Size
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-row flex-wrap gap-4">
            {sizes.map((size, index) => (
              <button
                key={index}
                className={cn(
                  "px-4 py-2 rounded-md",
                  {
                    "bg-black text-white": checkedItems.includes(size),
                    "bg-gray-200 text-black": !checkedItems.includes(size),
                  }
                )}
                onClick={() => handleCheckboxChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
