// app/api/upload/route.ts (Next.js 13+ with App Router)
// or pages/api/upload.ts (Next.js 12)

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase (server-side key for storage)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for server uploads
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "You must select an image to upload." },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("images") // Ensure you have a bucket named 'images'
      .upload(fileName, fileBuffer, {
        contentType: file.type,
      });

    if (error) {
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
