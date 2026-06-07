"use client";

import React from "react";
import { usePathname } from "next/navigation";
import DashboardNavbar from "../_components/dashboard-navbar";
import Footer from "@/components/common/footer";

export default function MembershipLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showNavbar = false;

  return (
    <div className="min-h-screen w-full relative">
      {showNavbar && <DashboardNavbar />}
      {children}
      <Footer />
    </div>
  );
}
