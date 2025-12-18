"use client";

import { usePathname } from 'next/navigation';
import Navbar from "../webcomponents/Navbar";
import Footer from "../webcomponents/Footer";

export default function PageLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin") || pathname === "/login";

  return (
    <>
      {isAdminPage ? (
        // For admin pages, render children directly without public nav/footer
        children
      ) : (
        // For public pages, render the full layout
        <>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
