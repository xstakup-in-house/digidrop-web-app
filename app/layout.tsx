import React from "react"
import type { Metadata } from "next";
import {  Chakra_Petch } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import ClientProviders from "@/providers/ClientProviders";




const chakra = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  style: "normal"
});



export const metadata: Metadata = {
  title: "DigiDrops | Web3 Growth and Marketing",
  description: "Expert Web3 Growth & Marketing by Digidrops. Join via utility SBTs for community access & identity. Scale your project – digidrops.xyz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chakra.variable} antialiased bg-[#1C1C1C]`}
      >
        <Toaster position="bottom-right" richColors/>
        <ClientProviders>
           {children}
        </ClientProviders>
        
      </body>
    </html>
  );
}
