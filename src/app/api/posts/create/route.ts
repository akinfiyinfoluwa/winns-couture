// app/api/posts/create/route.ts
import { NextResponse } from "next/server";
import client from "../../../../../utils/supabase/client";

const supabase = client;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const discount = formData.get("discount") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const brand = formData.get("brand") as string;
    const features = formData.get("features") as string; // Assuming features is a JSON string
    const published = formData.get("published") as string;

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
      category,
      brand,
      features: features ? JSON.parse(features) : null,
      published: published === 'true',
    };

    if (file) {
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
      .insert([productData])
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
