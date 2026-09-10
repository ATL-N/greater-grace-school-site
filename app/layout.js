import { Inter } from "next/font/google";
import AuthProvider from "./providers/auth-provider";
import PageLayout from "./components/PageLayout";
import JsonLd from "./components/JsonLd";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://apamgreatergracechristianacademygh.org";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Greater Grace Christian Academy",
    default:
      "Greater Grace Christian Academy | Excellence in Christian Education in Apam",
  },
  description:
    "Greater Grace Christian Academy (GGCA) in Apam, Central Region, Ghana offers transformative education from Creche, Kindergarten, Primary to JHS with proven academic excellence, moral discipline, and Christian values.",
  keywords: [
    "Greater Grace Christian Academy",
    "GGCA Apam",
    "Apam Christian school",
    "best school in Apam",
    "schools in Central Region Ghana",
    "Christian education Ghana",
    "Creche Apam",
    "Kindergarten Apam",
    "Primary school Apam",
    "Junior High School Apam",
    "JHS Apam",
    "BECE pass rate Apam",
    "Mr. Alfred Acquah",
    "Mrs. Innocentia Acquah",
    "madam inno",
    "madam ino",
    "GGCA 15th Anniversary",
    "Ghana Education Service",
    "Christian academy Ghana",
    "academic excellence Apam"
  ],
  authors: [{ name: "Greater Grace Christian Academy", url: siteUrl }],
  creator: "Greater Grace Christian Academy",
  publisher: "Greater Grace Christian Academy",
  applicationName: "Greater Grace Christian Academy",
  category: "Education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon1.ico", sizes: "32x32", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: siteUrl,
    siteName: "Greater Grace Christian Academy",
    title: "Greater Grace Christian Academy | Excellence in Christian Education",
    description:
      "Nurturing tomorrow's leaders through academic excellence, innovation, and Christian values in Apam, Ghana.",
    images: [
      {
        url: "/images/facilities/classroomblock.jpg",
        width: 1200,
        height: 630,
        alt: "Greater Grace Christian Academy Campus Block, Apam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greater Grace Christian Academy | Apam, Ghana",
    description:
      "Transformative Christian education from Creche to JHS with proven academic excellence.",
    images: ["/images/facilities/classroomblock.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function generateViewport() {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#0f4c81" },
      { media: "(prefers-color-scheme: dark)", color: "#0b192c" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <PageLayout>{children}</PageLayout>
        </AuthProvider>
      </body>
    </html>
  );
}