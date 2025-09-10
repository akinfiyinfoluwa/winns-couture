import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      const data = await db.select().from(products);
      return NextResponse.json({ data });
    }

    const data = await db.select().from(products).where(eq(products.slug, slug));

    if (data.length === 0) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ data: data[0] });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}