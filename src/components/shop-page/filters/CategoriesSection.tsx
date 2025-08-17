"use client";
import React, { useState, useEffect, useCallback } from "react";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "T-shirts",
    slug: "/shop?category=t-shirts",
  },
  {
    title: "Shorts",
    slug: "/shop?category=shorts",
  },
  {
    title: "Shirts",
    slug: "/shop?category=shirts",
  },
  {
    title: "Hoodie",
    slug: "/shop?category=hoodie",
  },
  {
    title: "Jeans",
    slug: "/shop?category=jeans",
  },
];

interface CategoriesSectionProps {
  onChange: (callback: (prev: any) => any) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleCheckboxChange = (title: string) => {
    const newCheckedItems = checkedItems.includes(title)
      ? checkedItems.filter((item) => item !== title)
      : [...checkedItems, title];
    setCheckedItems(newCheckedItems);
  };

  const memoizedOnChange = useCallback(onChange, []);

  useEffect(() => {
    memoizedOnChange((prev) => ({ ...prev, categories: checkedItems }));
  }, [checkedItems, memoizedOnChange]);

  const filteredCategories = categoriesData.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {filteredCategories.map((category, idx) => (
        <div key={idx} className="flex items-center justify-between py-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checkedItems.includes(category.title)}
              onChange={() => handleCheckboxChange(category.title)}
            />
            <span>{category.title}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoriesSection;
