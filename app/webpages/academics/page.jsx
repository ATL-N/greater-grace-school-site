// "use client";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import { BookOpen, Star, Users, Award } from "lucide-react";

const programs = [
  {
    level: "Pre-School",
    grades: "Creche-Kingdergerten",
    description:
      "Foundation years focusing on core subjects with hands-on learning experiences.",
    subjects: [
      "Writing",
      "Sribbling",
      "English",
      "Environmental Studies",
      "Arts",
      "Physical Education",
    ],
  },
  {
    level: "Primary School",
    grades: "1-6",
    description:
      "Developing critical thinking and specialized interests through advanced coursework.",
    subjects: [
      "Mathematics",
      "Integrated Sciences",
      "History",
      "Technology",
      "Languages",
    ],
  },
  {
    level: "High School",
    grades: "9-12",
    description:
      "College preparatory curriculum with AP and Honors courses available.",
    subjects: [
      "AP Courses",
      "STEM Programs",
      "Humanities",
      "Arts",
      "Sports",
    ],
  },
];

export default function Academics() {
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
            Academic Excellence
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our comprehensive curriculum is designed to challenge and inspire
            students, preparing them for success in college and beyond.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Academic Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="rounded-lg p-6 hover-scale animated-element"
                style={{ backgroundColor: "var(--background-color)" }}
              >
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--primary-color)" }}
                >
                  {program.level}
                </h3>
                <p className="text-lg mb-2">Grades {program.grades}</p>
                <p className="mb-4">{program.description}</p>
                <h4 className="font-semibold mb-2">Core Subjects:</h4>
                <ul className="list-disc pl-5">
                  {program.subjects.map((subject, idx) => (
                    <li key={idx} className="mb-1">
                      {subject}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Academic Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 hover-scale animated-element">
              <BookOpen
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h3 className="text-xl font-semibold mb-2">Small Class Sizes</h3>
              <p>
                Average 15:1 student-teacher ratio for personalized attention
              </p>
            </div>
            <div className="text-center p-6 hover-scale animated-element">
              <Star
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h3 className="text-xl font-semibold mb-2">Advanced Placement</h3>
              <p>Offering 15+ AP courses for WASSCE & SHS preparation</p>
            </div>
            <div className="text-center p-6 hover-scale animated-element">
              <Users
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h3 className="text-xl font-semibold mb-2">Expert Faculty</h3>
              <p>50% of teachers hold degrees</p>
            </div>
            <div className="text-center p-6 hover-scale animated-element">
              <Award
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h3 className="text-xl font-semibold mb-2">College Success</h3>
              <p>100% Senior High School acceptance rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div
            className="p-6 rounded-lg hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <h3
              className="text-4xl font-bold mb-2"
              style={{ color: "var(--primary-color)" }}
            >
              100%
            </h3>
            <p>SHS Acceptance Rate</p>
          </div>
          <div
            className="p-6 rounded-lg hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <h3
              className="text-4xl font-bold mb-2"
              style={{ color: "var(--primary-color)" }}
            >
              15:1
            </h3>
            <p>Student-Teacher Ratio</p>
          </div>
          <div
            className="p-6 rounded-lg hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <h3
              className="text-4xl font-bold mb-2"
              style={{ color: "var(--primary-color)" }}
            >
              100%
            </h3>
            <p>BECE Pass Rate</p>
          </div>
          <div
            className="p-6 rounded-lg hover-scale animated-element"
            style={{ backgroundColor: "var(--background-color)" }}
          >
            <h3
              className="text-4xl font-bold mb-2"
              style={{ color: "var(--primary-color)" }}
            >
              25+
            </h3>
            <p>Academic Clubs</p>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </main>
  );
}
