// app/api/posts/delete/route.ts
import { NextResponse } from "next/server";
import client from "../../../../../utils/supabase/client";

const supabase = client;

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    // First, fetch the product to get the image URL
    const { data: productData, error: fetchError } = await supabase
      .from("products")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (productData && productData.image) {
      const imageUrl = productData.image;
      const fileName = imageUrl.split("/").pop();

      if (fileName) {
        const { error: deleteImageError } = await supabase.storage
          .from("images")
          .remove([fileName]);

        if (deleteImageError) {
          console.error("Error deleting image:", deleteImageError);
          // You might want to decide if you want to proceed with deleting the product record even if image deletion fails
        }
      }
    }

    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}