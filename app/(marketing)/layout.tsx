import React from "react";
import Navbar from "./_components/nav-bar";
import Footer from "@/components/common/footer";
import { Chakra_Petch } from "next/font/google"; 
import type { Metadata } from "next";


const chakra = Chakra_Petch({
  variable: "--font-chakra", 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: "normal"
});

export const metadata: Metadata = {
  title: "DigiDrops | Web3 Growth and Marketing",
  description: "Expert Web3 Growth & Marketing by Digidrops. Join via utility SBTs for community access & identity. Scale your project – digidrops.xyz",
  icons: {
    icon: "assets/favicon.png", 
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* To make Navbar and Footer use the font, we apply 
       chakra.className to the parent div, not just the <main> tag.
    */
    <div className={`${chakra.variable} ${chakra.className} antialiased bg-[#1C1C1C] min-h-screen flex flex-col`}>
      <Navbar />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}