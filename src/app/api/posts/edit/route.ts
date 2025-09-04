// app/api/posts/edit/route.ts
import { NextResponse } from "next/server";
import client from "../../../../../utils/supabase/client";

const supabase = client;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const discount = formData.get("discount") as string;
    const price = formData.get("price") as string;
    const brand = formData.get("brand") as string;
    const published = formData.get("published") as string;
    const slug = formData.get("slug") as string;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for updating a post." },
        { status: 400 }
      );
    }

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required fields." },
        { status: 400 }
      );
    }

    const productData: any = {
      name,
      description,
      discount: discount ? parseInt(discount) : null,
      price: parseFloat(price),
      brand,
      published: published === 'true',
      slug,
    };

    if (file) {
      // First, fetch the product to get the old image URL
      const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("image")
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error("Error fetching product for image deletion:", fetchError);
      } else if (product && product.image) {
        const oldImageUrl = product.image;
        const oldFileName = oldImageUrl.split("/").pop();

        if (oldFileName) {
          const { error: deleteImageError } = await supabase.storage
            .from("images")
            .remove([oldFileName]);

          if (deleteImageError) {
            console.error("Error deleting old image:", deleteImageError);
          }
        }
      }

      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, fileBuffer, {
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }
      
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      productData.image = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from("products")
      .update(productData)
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}