// app/api/posts/edit/route.ts
import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from 'cloudinary';
import '../../../../../utils/cloudinary/client';

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

    const product = await db.select().from(products).where(eq(products.id, parseInt(id)));

    if (product.length === 0) {
        return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const productData: any = {
      name,
      description,
      discount: discount ? parseInt(discount) : null,
      price: parseFloat(price),
      brand,
      published: published === 'true',
      slug,
      updatedAt: new Date(),
    };

    if (file) {
      if (product[0].public_id) {
        await cloudinary.uploader.destroy(product[0].public_id);
      }

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
      productData.image_url = result.secure_url;
      productData.public_id = result.public_id;
    }

    const data = await db.update(products).set(productData).where(eq(products.id, parseInt(id))).returning();

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
