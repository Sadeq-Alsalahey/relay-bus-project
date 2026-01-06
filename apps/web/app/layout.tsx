import type { Metadata } from "next";
import localFont from "next/font/local";

import Header from "./components/header";


import "./globals.css";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Relay Bus",
  description: "Smart Transportation Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        {/* 🔹 Header يظهر في كل الصفحات */}
        <Header />

        {/* 🔹 محتوى الصفحة (page.tsx) */}
        <main>{children}</main>

        {/* 🔹 Footer يظهر في كل الصفحات */}
      
      </body>
    </html>
  );
}
