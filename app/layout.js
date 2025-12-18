import { Inter } from "next/font/google";
import AuthProvider from "./providers/auth-provider";
import PageLayout from "./components/PageLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://greatergracechristianacademygh.org"),
  title: {
    template: "%s | Greater Grace Christian Academy",
    default:
      "Greater Grace Christian Academy | Christian Education Excellence Since 1995",
  },
  description:
    "Greater Grace Christian Academy offers a transformative education experience focused on academic excellence, character development, and holistic growth.",
  keywords: [
    "Christian academy",
    "education",
    "school",
    "academic excellence",
    "character development",
    "Apam",
    "Mr. Alfred Acquah",
    "madam inno",
    "madam ino",
    "15 Anniversary",
    "Anniversary",
    "ggca Anniversary",
    "ggca"
  ],
  authors: [{ name: "Greater Grace Christian Academy" }],
  creator: "Greater Grace Christian Academy",
  publisher: "Greater Grace Christian Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      me: ["yourname@youremail.com"],
    },
  },
};

export function generateViewport() {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PageLayout>{children}</PageLayout>
        </AuthProvider>
      </body>
    </html>
  );
}