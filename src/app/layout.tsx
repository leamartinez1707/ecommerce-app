import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/app/config/fonts";

export const metadata: Metadata = {
  title: { template: "%s - Teslo | Shop", default: "Teslo Shop | eCommerce" },
  description: "Tienda online de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4 sm:p-6`}
      >
        {children}
      </body>
    </html>
  );
}
