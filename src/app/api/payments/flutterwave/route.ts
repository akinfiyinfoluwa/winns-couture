import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log("=== Flutterwave Payment Route Called ===");
  
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log("Request body parsed successfully");
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { amount, customer, customizations, shippingDetails, cartItems } = body;
    
    console.log("Extracted payload:", { amount, customer: customer?.name, email: customer?.email });

    // Validate required fields
    if (!amount || amount <= 0) {
      console.error("Invalid amount:", amount);
      return NextResponse.json(
        { error: "Invalid or missing amount" },
        { status: 400 }
      );
    }

    if (!customer || !customer.email || !customer.name) {
      console.error("Missing customer info:", { customer });
      return NextResponse.json(
        { error: "Missing required customer information" },
        { status: 400 }
      );
    }

    // Get API key
    const flutterWaveSecretKey = process.env.FLW_SECRET_KEY;
    console.log("Checking API key...", flutterWaveSecretKey ? "Found" : "NOT FOUND");

    if (!flutterWaveSecretKey) {
      console.error("FLW_SECRET_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Payment gateway is not configured" },
        { status: 500 }
      );
    }

    // Generate transaction reference
    const txRef = `WC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    console.log("Generated transaction reference:", txRef);

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
    console.log("Base URL:", baseUrl);

    // Build payload
    const paymentPayload = {
      tx_ref: txRef,
      amount: amount,
      currency: "NGN",
      redirect_url: `${baseUrl}/payment-success?ref=${txRef}`,
      customer: {
        email: customer.email,
        name: customer.name,
        phonenumber: customer.phonenumber,
      },
      customizations: {
        title: customizations?.title || "Winns Couture Payment",
      },
    };

    console.log("Sending to Flutterwave:", JSON.stringify(paymentPayload, null, 2));

    // Call Flutterwave API
    console.log("Making request to Flutterwave API...");
    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${flutterWaveSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentPayload),
    });

    console.log("Response status:", response.status);
    const contentType = response.headers.get("content-type");
    console.log("Response content-type:", contentType);

    // Handle non-JSON responses
    if (!contentType?.includes("application/json")) {
      const textResponse = await response.text();
      console.error("Non-JSON response received:", textResponse.substring(0, 500));
      return NextResponse.json(
        {
          error: "Invalid response from Flutterwave. Check your API key.",
          statusCode: response.status,
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("Flutterwave response:", JSON.stringify(data, null, 2));

    // Success response
    if (data.status === "success" && data.data?.link) {
      console.log("Payment link generated successfully");
      return NextResponse.json({
        success: true,
        link: data.data.link,
        reference: txRef,
      });
    }

    // Error response
    console.error("Flutterwave returned error:", data);
    return NextResponse.json(
      {
        error: data.message || "Failed to create payment link",
        reference: txRef,
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("=== ERROR in Flutterwave Route ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Full error:", error);

    return NextResponse.json(
      {
        error: "An error occurred while processing payment",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
