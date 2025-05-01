"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
  Home,
  Info,
  BookOpen,
  UserPlus,
  Image as ImageIcon,
  Mail,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setIsDark(theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const linkStyles = (path) => {
    const baseStyles =
      "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200";
    const hoverStyles = "hover:bg-opacity-10 hover:bg-primary hover:scale-105";
    const activeStyles = isActive(path)
      ? "bg-primary bg-opacity-10 font-semibold border-b-2"
      : "";

    return `${baseStyles} ${hoverStyles} ${activeStyles}`.trim();
  };

  // Enhanced mobile navigation item with animations
  const mobileNavItem = (path, label, icon) => {
    const isItemActive = isActive(path);
    return (
      <Link
        href={path}
        className={`relative flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
          isItemActive
            ? "text-primary transform scale-110"
            : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        }`}
      >
        {/* Animated background for active item */}
        {isItemActive && (
          <span className="absolute inset-0 bg-primary bg-opacity-10 rounded-lg animate-pulse"></span>
        )}

        {/* Icon with animation */}
        <div
          className={`relative z-10 transition-all duration-300 ${
            isItemActive ? "transform -translate-y-1" : ""
          }`}
        >
          {icon}
        </div>

        {/* Label with animation */}
        <span
          className={`text-xs mt-1 relative z-10 transition-all duration-300 ${
            isItemActive ? "font-bold" : "font-medium"
          }`}
        >
          {label}
        </span>

        {/* Animated indicator line for active item */}
        {isItemActive && (
          <span
            className="absolute bottom-0 w-8 h-0.5 rounded-full bg-primary animate-glow"
            style={{
              boxShadow:
                "0 0 8px var(--primary-color), 0 0 12px var(--primary-color)",
            }}
          ></span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav
        className="fixed w-full top-0 z-50 bg-opacity-90 backdrop-blur-sm shadow-xl"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Image
                src="/favicon.ico"
                alt="Greater Grace Christian Academy Logo"
                width={32}
                height={32}
                className="hover:rotate-12 transition-transform duration-300"
              />
              <Link
                href="/"
                className="text-2xl font-bold hover:opacity-80 transition-opacity duration-200"
                style={{ color: "var(--primary-color)" }}
              >
                Greater Grace Christian Academy
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  href="/"
                  className={linkStyles("/")}
                  style={{ borderColor: "var(--primary-color)" }}
                >
                  Home
                </Link>
                <Link
                  href="/webpages/about"
                  className={linkStyles("/webpages/about")}
                  style={{ borderColor: "var(--primary-color)" }}
                >
                  About
                </Link>
                <Link
                  href="/webpages/academics"
                  className={linkStyles("/webpages/academics")}
                  style={{ borderColor: "var(--primary-color)" }}
                >
                  Academics
                </Link>
                <Link
                  href="/webpages/admissions"
                  className={linkStyles("/webpages/admissions")}
                  style={{ borderColor: "var(--primary-color)" }}
                >
                  Admissions
                </Link>
                <Link
                  href="/webpages/gallery"
                  className={linkStyles("/webpages/gallery")}
                  style={{ borderColor: "var(--primary-color)" }}
                >
                  Facilities And Events
                </Link>
                <Link
                  href="/webpages/contact"
                  className={linkStyles("/webpages/contact")}
                  style={{ borderColor: "var(--primary-color)" }}
                >
                  Contact
                </Link>

                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-600 transition-colors duration-200"
                  style={{ color: "var(--primary-color)" }}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile theme toggle */}
            <div className="md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-600 transition-colors duration-200"
                style={{ color: "var(--primary-color)" }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Bottom Mobile Navigation with animations */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 bg-opacity-95 backdrop-blur-md shadow-lg z-50 border-t transition-all duration-300"
        style={{
          backgroundColor: "var(--background-color)",
          borderColor: "var(--primary-color)",
          borderTopWidth: "1px",
          borderTopStyle: "solid",
          borderTopColor: "rgba(var(--primary-rgb), 0.2)",
        }}
      >
        {/* Glass morphism effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-5"></div>

        {/* Navigation items container */}
        <div className="relative grid grid-cols-6 gap-1 py-2">
          {mobileNavItem("/", "Home", <Home size={20} className="mx-auto" />)}
          {mobileNavItem(
            "/webpages/about",
            "About",
            <Info size={20} className="mx-auto" />
          )}
          {mobileNavItem(
            "/webpages/academics",
            "Academics",
            <BookOpen size={20} className="mx-auto" />
          )}
          {mobileNavItem(
            "/webpages/admissions",
            "Admissions",
            <UserPlus size={20} className="mx-auto" />
          )}
          {mobileNavItem(
            "/webpages/gallery",
            "Gallery",
            <ImageIcon size={20} className="mx-auto" />
          )}
          {mobileNavItem(
            "/webpages/contact",
            "Contact",
            <Mail size={20} className="mx-auto" />
          )}
        </div>
      </div>

      {/* CSS animations for mobile navigation */}
      <style jsx global>{`
        @keyframes glow {
          0% {
            opacity: 0.5;
            transform: scaleX(0.8);
          }
          50% {
            opacity: 1;
            transform: scaleX(1.2);
          }
          100% {
            opacity: 0.5;
            transform: scaleX(0.8);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.1;
          }
        }

        .animate-glow {
          animation: glow 2s infinite;
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>

      {/* Add padding to the bottom of the page to prevent content from being hidden behind the bottom navigation */}
      <div className="md:hidden h-20"></div>
    </>
  );
}
