import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/app/config/fonts";

export const metadata: Metadata = {
  title: "Ecommerce App",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
