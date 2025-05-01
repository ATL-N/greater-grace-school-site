"use client";

import { useEffect } from "react";
// import Navbar from "./webcomponents/Navbar";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Book, Users, Trophy, Calendar } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animated-element">
            <h1
              className="text-4xl sm:text-6xl font-bold mb-6"
              style={{ color: "var(--primary-color)" }}
            >
              Welcome to Greater Grace Christian Academy, Apam
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Where innovation meets education. Shaping tomorrow's leaders
              through excellence in teaching and learning.
            </p>
            <Link
              href="webpages/admissions"
              className="inline-flex items-center px-6 py-3 rounded-full text-white hover-scale"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              Begin Your Journey <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div
            className="text-center p-6 rounded-lg hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <Book
              className="mx-auto mb-4"
              size={40}
              style={{ color: "var(--primary-color)" }}
            />
            <h3 className="text-xl font-semibold mb-2">Modern Curriculum</h3>
            <p>Innovative learning approaches designed for the future</p>
          </div>
          <div
            className="text-center p-6 rounded-lg hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <Users
              className="mx-auto mb-4"
              size={40}
              style={{ color: "var(--primary-color)" }}
            />
            <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
            <p>Dedicated teachers committed to student success</p>
          </div>
          <div
            className="text-center p-6 rounded-lg hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <Trophy
              className="mx-auto mb-4"
              size={40}
              style={{ color: "var(--primary-color)" }}
            />
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p>Proven track record of academic achievement</p>
          </div>
          <div
            className="text-center p-6 rounded-lg hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <Calendar
              className="mx-auto mb-4"
              size={40}
              style={{ color: "var(--primary-color)" }}
            />
            <h3 className="text-xl font-semibold mb-2">Activities</h3>
            <p>Rich variety of extracurricular programs</p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: "var(--primary-color)" }}
          >
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="rounded-lg overflow-hidden hover-scale animated-element"
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              <div className="relative w-full h-48">
                <Image
                  src="/images/events/ggca science fair 5.jpg"
                  alt="National Science Quiz Competition"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={true}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  National Science Quiz Victory
                </h3>
                <p className="mb-4">
                  Our JHS students won the Regional Science and Mathematics Quiz
                  Competition held in Cape Coast. The team of three students
                  brought home the championship trophy after demonstrating
                  exceptional knowledge in mathematics, physics, and biology,
                  making GGCA proud.
                </p>
                <Link
                  href={`/webpages/gallery/events/5`}
                  className="inline-flex items-center"
                  style={{ color: "var(--primary-color)" }}
                >
                  Read More <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>

            <div
              className="rounded-lg overflow-hidden hover-scale animated-element"
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              <div className="relative w-full h-48">
                <Image
                  src="/images/events/culture5.jpeg"
                  alt="ICT Lab Expansion"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  New ICT Lab Opens
                </h3>
                <p className="mb-4">
                  Thanks to support from alumni and community partners, GGCA has
                  opened a state-of-the-art computer laboratory with 25
                  workstations, reliable internet connectivity, and educational
                  software. This facility will significantly enhance our
                  students' digital literacy skills.
                </p>
                <Link
                  href={`/webpages/gallery/events/6`}
                  className="inline-flex items-center"
                  style={{ color: "var(--primary-color)" }}
                >
                  Read More <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>

            <div
              className="rounded-lg overflow-hidden hover-scale animated-element"
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              <div className="relative w-full h-48">
                <Image
                  src="/images/events/culture5.jpeg"
                  alt="Cultural Dance Competition"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  GGCA Wins Cultural Dance Competition
                </h3>
                <p className="mb-4">
                  Our traditional dance troupe secured first place at the
                  Central Region Schools Cultural Festival. Their outstanding
                  performance of traditional Fante dances earned high praise
                  from judges and has qualified the school to represent the
                  region at the national level in Accra.
                </p>
                <Link
                  href={`/webpages/gallery/events/7`}
                  className="inline-flex items-center"
                  style={{ color: "var(--primary-color)" }}
                >
                  Read More <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
