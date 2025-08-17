"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const colors = [
  { name: "Green", value: "bg-green-600" },
  { name: "Red", value: "bg-red-600" },
  { name: "Yellow", value: "bg-yellow-300" },
  { name: "Orange", value: "bg-orange-600" },
  { name: "Cyan", value: "bg-cyan-400" },
  { name: "Blue", value: "bg-blue-600" },
  { name: "Purple", value: "bg-purple-600" },
  { name: "Pink", value: "bg-pink-600" },
  { name: "White", value: "bg-white" },
  { name: "Black", value: "bg-black" },
];

interface ColorsSectionProps {
  onChange: (callback: (prev: any) => any) => void;
}

const ColorsSection: React.FC<ColorsSectionProps> = ({ onChange }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    const newCheckedItems = checkedItems.includes(value)
      ? checkedItems.filter((item) => item !== value)
      : [...checkedItems, value];
    setCheckedItems(newCheckedItems);
  };

  const memoizedOnChange = useCallback(onChange, []);

  useEffect(() => {
    memoizedOnChange((prev) => ({ ...prev, colors: checkedItems }));
  }, [checkedItems, memoizedOnChange]);

  return (
    <Accordion type="single" collapsible defaultValue="filter-colors">
      <AccordionItem value="filter-colors" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Colors
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-row flex-wrap gap-4">
            {colors.map((color, index) => (
              <div
                key={index}
                className={cn(
                  "w-8 h-8 rounded-full cursor-pointer",
                  color.value,
                  {
                    "border-2 border-black": checkedItems.includes(color.value),
                  }
                )}
                onClick={() => handleCheckboxChange(color.value)}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;
