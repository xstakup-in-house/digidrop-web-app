import React from "react";
import DashboardNavbar from "../_components/dashboard-navbar";
import Footer from "@/components/common/footer";

export default function MembershipLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full relative">
      <DashboardNavbar />
      {children}
      <Footer />
    </div>
  );
}
