"use client";

import Link from "next/link";
import FacilityTour from "../../../webcomponents/FacilityTour";
import ImageGallery from "../../../webcomponents/ImageGallery";

const facilityImages = [
  {
    url: "/images/facilities/classroom 30.jpg",
    caption: "Modern Computer Laboratory",
  },
  // {
  //   url: "/images/facilities/classroom 5.jpg",
  //   caption: "Olympic-Size Swimming Pool",
  // },
  // {
  //   url: "/images/facilities/library.jpg",
  //   caption: "State-of-the-art Library",
  // },
  // {
  //   url: "/images/facilities/sports-complex.jpg",
  //   caption: "Indoor Sports Complex",
  // },
  {
    url: "/images/facilities/digital-center.jpg",
    caption: "Digital Music Center",
  },
  {
    url: "/images/events/ggca science fair 3.jpg",
    caption: "Agric Farms",
  },
];

export default function Facilities() {
  return (
    <main className="min-h-screen">
      {/* Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link href="/">
            <span
              className="hover:text-opacity-80"
              style={{ color: "var(--primary-color)" }}
            >
              Home
            </span>
          </Link>
          <span>/</span>
          <Link href="/gallery">
            <span
              className="hover:text-opacity-80"
              style={{ color: "var(--primary-color)" }}
            >
              Gallery
            </span>
          </Link>
          <span>/</span>
          <span>Facilities</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 page-transition">
        <div className="max-w-7xl mx-auto text-center animated-element">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: "var(--primary-color)" }}
          >
            World-Class Facilities
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore our state-of-the-art campus designed to provide the best
            learning environment for our students.
          </p>
        </div>
      </section>

      {/* Virtual Tour */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8 mb-5 rounded-lg"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Take a Virtual Tour
          </h2>
          <FacilityTour />
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 mb-5 rounded-lg shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Facility Gallery
          </h2>
          <ImageGallery images={facilityImages} />
        </div>
      </section>

      {/* Facility Types */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 mb-4 rounded-lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="p-6 rounded-lg hover-scale animated-element shadow-2xl"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--primary-color)" }}
              >
                Academic Facilities
              </h3>
              <ul className="space-y-3">
                <li>Smart Classrooms</li>
                <li>Science Laboratories</li>
                <li>Computer Labs</li>
                <li>Digital Library</li>
                <li>Language Lab</li>
                <li>STEM Center</li>
              </ul>
            </div>

            <div
              className="p-6 rounded-lg hover-scale animated-element shadow-2xl"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--primary-color)" }}
              >
                Sports Facilities
              </h3>
              <ul className="space-y-3">
                <li>Indoor Sports Complex</li>
                <li>Swimming Pool</li>
                <li>Basketball Courts</li>
                <li>Football Field</li>
                <li>Tennis Courts</li>
                <li>Fitness Center</li>
              </ul>
            </div>

            <div
              className="p-6 rounded-lg hover-scale animated-element shadow-2xl"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--primary-color)" }}
              >
                Additional Facilities
              </h3>
              <ul className="space-y-3">
                <li>Cafeteria</li>
                <li>Medical Center</li>
                <li>Counseling Center</li>
                <li>Art Studio</li>
                <li>Music Rooms</li>
                <li>Transport Services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Gallery Button */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 text-center mb-12">
        <Link href="/webpages/gallery">
          <div
            className="inline-block px-6 py-3 rounded-md font-medium hover-scale shadow-lg"
            style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          >
            Back to Gallery
          </div>
        </Link>
      </section>
    </main>
  );
}
