"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { setBrands } from "@/lib/features/products/productsSlice";

const BrandsSection = () => {
  const dispatch = useAppDispatch();
  const { brands } = useAppSelector((state) => state.products);

  const handleBrandChange = (brand: string) => {
    dispatch(setBrands(brand));
  };

  const allBrands = ["mystyle-express", "new-arrivals", "the-winifred"];

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Brands</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-y-2 pt-2">
          {allBrands.map((brand) => (
            <div
              key={brand}
              className="flex items-center gap-x-2 cursor-pointer"
              onClick={() => handleBrandChange(brand)}
            >
              <div
                className={`w-4 h-4 rounded-sm border border-black ${
                  brands.includes(brand) ? "bg-black" : "bg-white"
                }`}
              />
              <span className="capitalize">{brand.replace("-", " ")}</span>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BrandsSection;
