"use client";
import { allProducts } from "@/app/data";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import { generateSlug } from "@/lib/utils";
import Header from "@/components/product-page/Header";
import ProductDetails from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product: Product | undefined = allProducts.find(
    (p) => generateSlug(p.title) === params.slug
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={product.title} />
        <Header data={product} />
        <ProductDetails product={product} />
      </div>
    </main>
  );
}
