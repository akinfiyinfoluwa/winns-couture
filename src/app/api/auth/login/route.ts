import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

import { JWT_SECRET } from "@/lib/config";

const secret = new TextEncoder().encode(JWT_SECRET);

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const payload = { username };
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/"
    });

    return NextResponse.json({ message: "Login successful" });
  } else {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }
}
