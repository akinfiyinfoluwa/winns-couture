import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "@/styles/globals.css";

import HolyLoader from "holy-loader";
import Providers from "./providers";
import AdminLayout from "./AdminLayout";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Winn's Couture",
  description: "An e-commerce app for a fashion brand.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <HolyLoader color="#868686" />
        <Providers>
          <AdminLayout>{children}</AdminLayout>
        </Providers>
      </body>
    </html>
  );
}
