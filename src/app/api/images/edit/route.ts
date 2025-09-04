// app/api/images/edit/route.ts
import { NextResponse } from "next/server";
import client from "../../../../../utils/supabase/client";

const supabase = client;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const oldFileName = formData.get("oldFileName") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "You must select an image to upload." },
        { status: 400 }
      );
    }

    if (!oldFileName) {
      return NextResponse.json(
        { error: "You must provide the old file name to replace." },
        { status: 400 }
      );
    }

    // First, remove the old file
    const { error: removeError } = await supabase.storage
      .from("images")
      .remove([oldFileName]);

    if (removeError) {
      // We can choose to log this error but still proceed to upload the new file
      console.error("Error removing old file:", removeError);
    }

    // Next, upload the new file
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, fileBuffer, {
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
