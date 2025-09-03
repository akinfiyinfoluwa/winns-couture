//nextjs backend for deleting images from supabase storage
import { NextResponse } from "next/server";
import client from "../../../../../utils/supabase/client";


// Initialize Supabase (server-side key for storage)
const supabase = client

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json(
        { error: "You must provide a fileName to delete." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.storage
      .from("images") // Ensure you have a bucket named 'images'
      .remove([fileName]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}