// app/api/posts/create/route.ts
import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { products } from "@/drizzle/schema";
import { v2 as cloudinary } from 'cloudinary';
import '../../../../../utils/cloudinary/client';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const discount = formData.get("discount") as string;
    const price = formData.get("price") as string;
    const brand = formData.get("brand") as string;
    const published = formData.get("published") as string;
    const slug = formData.get("slug") as string;

    if (!name || !price) {
      return NextResponse.json(
        { error: "Name and price are required fields." },
        { status: 400 }
      );
    }

    let imageUrl: string | undefined;
    let publicId: string | undefined;

    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const result: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "next-ecommerce" },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        stream.end(fileBuffer);
      });
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const productData:any = {
      name,
      description,
      discount: discount ? parseInt(discount) : undefined,
      price: parseFloat(price),
      slug,
      brand,
      published: published === 'true',
      image_url: imageUrl,
      public_id: publicId,
    };

    const data = await db.insert(products).values(productData).returning();

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
