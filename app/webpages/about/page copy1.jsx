"use client";

import ImageGallery from "../../webcomponents/ImageGallery";
import { Users, Award, Target, Clock } from "lucide-react";

const galleryImages = [
  {
    url: "/images/facilities/gold.png",
    caption: "Annual Science Fair 2024",
  },
  {
    url: "/api/placeholder/600/400",
    caption: "Sports Day Championship",
  },
  {
    url: "/api/placeholder/600/400",
    caption: "Cultural Festival",
  },
  {
    url: "/api/placeholder/600/400",
    caption: "Graduation Ceremony",
  },
  {
    url: "/api/placeholder/600/400",
    caption: "International Exchange Program",
  },
  {
    url: "/api/placeholder/600/400",
    caption: "Community Service Initiative",
  },
];

export default function About() {
  return (
    <main className="min-h-screen">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animated-element">
          <h1
            className="text-4xl sm:text-6xl font-bold mb-6"
            style={{ color: "var(--primary-color)" }}
          >
            About Greater Grace Christian Academy
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Since 1995, we've been shaping minds and building futures through
            innovative education and unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div
              className="text-center p-6 rounded-lg hover-scale animated-element"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <Users
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p>Fostering a supportive and inclusive learning environment</p>
            </div>
            <div
              className="text-center p-6 rounded-lg hover-scale animated-element"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <Award
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p>Striving for the highest standards in education</p>
            </div>
            <div
              className="text-center p-6 rounded-lg hover-scale animated-element"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <Target
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p>Embracing new ideas and methods in learning</p>
            </div>
            <div
              className="text-center p-6 rounded-lg hover-scale animated-element"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <Clock
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h3 className="text-xl font-semibold mb-2">Dedication</h3>
              <p>Committed to student success and growth</p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animated-element">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: "var(--primary-color)" }}
              >
                Our History
              </h2>
              <p className="mb-4">
                Founded in 1995, Greater Grace Christian Academy began with a vision to
                revolutionize education through innovative teaching methods and
                a student-centered approach.
              </p>
              <p className="mb-4">
                Over the years, we've grown from a small institution of 50
                students to a leading academic center with over 1,000 students
                and 100 faculty members.
              </p>
              <p>
                Our commitment to excellence has earned us numerous accolades
                and recognitions, including the National Education Excellence
                Award in 2023.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden animated-element">
              <img
                src="/api/placeholder/600/400"
                alt="School History"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Life at Greater Grace Christian Academy
          </h2>
          <ImageGallery images={galleryImages} />
        </div>
      </section>

      {/* <Footer /> */}
    </main>
  );
}
