import FacilityTour from "../../webcomponents/FacilityTour";
import ImageGallery from "../../webcomponents/ImageGallery";

export const metadata = {
  title: "School Facilities & Campus Infrastructure | Greater Grace Christian Academy",
  description:
    "Take a tour of our modern educational facilities at Greater Grace Christian Academy, Apam: smart classrooms, science labs, digital computer laboratories, library, and sports facilities.",
  keywords: [
    "GGCA facilities",
    "Apam school facilities",
    "science laboratory school Apam",
    "computer lab school Apam",
    "school sports complex Central Region Ghana",
    "Greater Grace Christian Academy campus"
  ],
  alternates: {
    canonical: "/webpages/facilities",
  },
  openGraph: {
    title: "School Facilities | Greater Grace Christian Academy, Apam",
    description:
      "Explore state-of-the-art facilities designed for modern teaching and holistic student growth at Greater Grace Christian Academy.",
    url: "https://apamgreatergracechristianacademygh.org/webpages/facilities",
    siteName: "Greater Grace Christian Academy",
    images: [
      {
        url: "/images/facilities/classroomblock.jpg",
        width: 1200,
        height: 630,
        alt: "Campus Facilities at Greater Grace Christian Academy",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Facilities | Greater Grace Christian Academy",
    description: "Explore our state-of-the-art campus and facilities in Apam, Ghana.",
    images: ["/images/facilities/classroomblock.jpg"],
  },
};

const facilityImages = [
  {
    url: "/images/facilities/swimming-pool.jpg",
    caption: "Modern Science Laboratory",
  },
  {
    url: "/images/facilities/gold.png",
    caption: "Olympic-Size Swimming Pool",
  },
  {
    url: "/images/facilities/library.jpg",
    caption: "State-of-the-art Library",
  },
  {
    url: "/images/facilities/sports-complex.jpg",
    caption: "Indoor Sports Complex",
  },
  {
    url: "/images/facilities/digital-center.jpg",
    caption: "Digital Learning Center",
  },
  {
    url: "/images/facilities/theater.jpg",
    caption: "Performing Arts Theater",
  },
];
export default function Facilities() {
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
        className="py-12 px-4 sm:px-6 lg:px-8 mb-5 rounded"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Take a Virtual Tour
          </h2>
          <FacilityTour />
        </div>
      </section>

      <section
        className="py-12 px-4 sm:px-6 lg:px-8 mb-5 rounded shadow-2xl"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Facility Gallery
          </h2>
          <ImageGallery images={facilityImages} />
        </div>
      </section>

      <section
        className="py-12 px-4 sm:px-6 lg:px-8 mb-4 rounded shadow-2xl"
        style={{ backgroundColor: "var(--background-color)" }}
      >
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

    </main>
  );
}
