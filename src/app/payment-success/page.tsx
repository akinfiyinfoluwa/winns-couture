"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks/redux";
import { clearCart } from "@/lib/features/carts/cartsSlice";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get the transaction reference from URL
    const reference = searchParams.get("ref");
    const status = searchParams.get("status");

    if (reference) {
      // Clear cart after successful payment
      dispatch(clearCart());

      // Set order details
      setOrderDetails({
        reference: reference,
        status: status || "completed",
        date: new Date().toLocaleDateString("en-NG"),
      });

      setIsLoading(false);
    }
  }, [searchParams, dispatch]);

  if (isLoading) {
    return (
      <main className="pb-20 pt-12">
        <div className="max-w-frame mx-auto px-4 xl:px-0 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-20 pt-12">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {/* Success Icon */}
          <div className="mb-8 flex items-center justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-md">
            Thank you for your purchase. Your order has been confirmed and will
            be processed shortly.
          </p>

          {/* Order Details */}
          <div className="bg-white p-6 rounded-lg border border-black/10 mb-8 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Reference:</span>
                <span className="font-medium">{orderDetails?.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600 capitalize">
                  {orderDetails?.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{orderDetails?.date}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button
              asChild
              className="flex-1 bg-black rounded-full h-[54px] text-white font-medium"
            >
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 rounded-full h-[54px] font-medium border-black"
            >
              <Link href="/orders">View Orders</Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center max-w-md">
            <p className="text-sm text-gray-600 mb-4">
              A confirmation email has been sent to your email address. Please
              keep your order reference for tracking purposes.
            </p>
            <p className="text-xs text-gray-500">
              For any inquiries, please contact our support team at{" "}
              <a href="mailto:support@winnscouture.com" className="font-medium">
                support@winnscouture.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
