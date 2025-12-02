"use client";
import { useEffect, useState } from "react";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import ProductDetails from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { useRouter } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Decode the slug to get the original title
        const decodedSlug = decodeURIComponent(params.slug);
        
        // Fetch all products from API
        const res = await fetch("/api/products/fetch-by-slug");
        const result = await res.json();
        
        if (res.ok && result.data) {
          const products = Array.isArray(result.data) ? result.data : [result.data];
          
          // Find product by matching the title with the slug
          const foundProduct = products.find((p: any) => {
            // Generate slug from product name the same way as in ProductCard
            const productSlug = p.name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "");
            const paramSlug = decodedSlug
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "");
            
            return productSlug === paramSlug;
          });
          
          if (foundProduct) {
            const mappedProduct: Product = {
              id: foundProduct.id,
              title: foundProduct.name,
              srcUrl: foundProduct.image_url || "/images/pic1.png",
              price: typeof foundProduct.price === 'number' ? foundProduct.price : parseFloat(foundProduct.price) || 0,
              discount: foundProduct.discount || 0,
              rating: 4.5,
              category: "General",
              sizes: ["Small", "Medium", "Large"],
              colors: ["bg-black"],
              dressStyle: "Casual",
              brand: foundProduct.brand || "mystyle-express",
            };
            setProduct(mappedProduct);
          } else {
            router.push("/not-found");
          }
        } else {
          router.push("/not-found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug, router]);

  if (loading) {
    return (
      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return null; // Router will redirect to not-found
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
