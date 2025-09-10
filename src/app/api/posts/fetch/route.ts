// app/api/posts/fetch/route.ts
import { NextResponse } from "next/server";
import { db } from "@/drizzle";
import { products } from "@/drizzle/schema";

export async function GET() {
  try {
    const data = await db.select().from(products);

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}