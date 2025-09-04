
// app/api/posts/fetch/route.ts
import { NextResponse } from "next/server";
import client from "../../../../../utils/supabase/client";

const supabase = client;

export async function GET() {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
