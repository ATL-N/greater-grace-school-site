import { Inter } from "next/font/google";
import Navbar from "./webcomponents/Navbar";
import Footer from "./webcomponents/Footer";
import AuthProvider from "./providers/auth-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar /> {/* Render Navbar */}
          <main>{children}</main> {/* Render page content */}
          <Footer /> {/* Render Footer */}
        </AuthProvider>
      </body>
    </html>
  );
}
