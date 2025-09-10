// app/api/posts/delete/route.ts
import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from 'cloudinary';
import '../../../../../utils/cloudinary/client';

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const product = await db.select().from(products).where(eq(products.id, parseInt(id)));

    if (product.length === 0) {
        return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    if (product[0].public_id) {
        await cloudinary.uploader.destroy(product[0].public_id);
    }

    const data = await db.delete(products).where(eq(products.id, parseInt(id))).returning();

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
