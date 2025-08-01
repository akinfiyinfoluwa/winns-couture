"use client";

import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import { usePathname } from 'next/navigation';



export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en">
      <body >
        <HolyLoader color="#868686" />
        {!isAdminRoute && <TopBanner />}
        <Providers>
          {!isAdminRoute && <TopNavbar />}
          {children}
        </Providers>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}