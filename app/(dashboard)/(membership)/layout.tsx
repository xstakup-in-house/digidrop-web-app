import type { Metadata } from "next";
import {  Chakra_Petch } from "next/font/google";
import { Toaster } from "sonner";
import DashboardNavbar from "../_components/dashboard-navbar";
import Footer from "@/components/common/footer";

const chakra = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  style: "normal"
});




export const metadata: Metadata = {
  title: "DigiDrops - web3",
  description: "A brief description of your website for SEO",
  icons: {
    icon: "assets/favicon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <div className={`${chakra.variable} antialiased bg-[#1C1C1C] min-h-screen w-full relative`}>
        <DashboardNavbar/>
          {children}
        <Footer/>
      </div>
    
  );
}
