import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { Button } from "../ui/button";
import Rating from "../ui/Rating";
import { generateSlug } from "@/lib/utils";

type ProductCardProps = {
  data: Product;
};

const formatPrice = (price: number) => {
  return price.toLocaleString('en-NG');
};

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <Link
      href={`/product/${generateSlug(data.title)}`}
      className="flex flex-col items-start aspect-auto border border-black/10 hover:border-yellow-600 transition-all duration-300 p-4 rounded-xl"
    >
      <div className="bg-[#F0EEED] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden">
        <Image
          src={data.srcUrl}
          width={295}
          height={298}
          className="rounded-md w-full h-full object-contain hover:scale-110 transition-all duration-500"
          alt={data.title}
          priority
        />
      </div>
      <strong className="text-black xl:text-xl">{data.title}</strong>
      <div className="flex items-center space-x-[5px] xl:space-x-2.5">
       
        {data.timeline === "new" && (
          <span className="bg-green-400 text-white text-xs xl:text-sm py-1 px-2 rounded-full mr-2">
            {data.timeline}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-[5px] xl:space-x-2.5 mt-2">
        {data.discount > 0 ? (
          <span className="font-bold text-black text-xl xl:text-2xl">
            {`₦${formatPrice(Math.round(
              data.price - (data.price * data.discount) / 100
            ))}`}
          </span>
        ) : data.discount > 0 ? (
          <span className="font-bold text-black text-xl xl:text-2xl">
            {`₦${formatPrice(Math.round(data.price - data.discount))}`}
          </span>
        ) : (
          <span className="font-bold text-black text-xl xl:text-2xl">
            ₦{formatPrice(Math.round(data.price))}
          </span>
        )}
       
        {data.discount > 0 && (
          <span className="font-bold text-black/40 line-through text-xl xl:text-2xl">
            ₦{formatPrice(Math.round(data.price))}
          </span>
        )}
        {data.discount > 0 ? (
          <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
            {`-${data.discount}%`}
          </span>
        ) : (
          data.discount > 0 && (
            <span className="font-medium text-[10px] xl:text-xs py-1.5 px-3.5 rounded-full bg-[#FF3333]/10 text-[#FF3333]">
              {`-₦${data.discount}`}
            </span>
          )
        )}
      </div>
      <Button className="mt-4 w-fit h-fit p-2.5 rounded-full bg-black/5 hover:bg-black/10 transition-all duration-300 ml-auto" size="icon">
        <Image
          src="/icons/cart.svg"
          width={24}
          height={24}
          alt="Add to cart"
        />
      </Button>
    </Link>
  );
};

export default ProductCard;
