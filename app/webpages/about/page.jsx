import ImageGallery from "../../webcomponents/ImageGallery";
import {
  Users,
  Award,
  Target,
  Clock,
  Book,
  Globe,
  Heart,
  Star,
} from "lucide-react";

export const metadata = {
  title: "About | Greater Grace Christian Academy",
  description:
    "Learn about Greater Grace Christian Academy's mission, vision, core values, and rich history. Discover our journey since our founding in 2010, and our commitment to excellence in education and holistic student development in Apam.",
  keywords: [
    "Christian academy",
    "education",
    "school history",
    "founding story",
    "mission statement",
    "core values",
    "academic excellence",
    "Greater Grace Christian Academy Apam",
    "Mr. Acquah",
    "Mr. Alfred Acquah",
    "Mrs. Acquah",
    "Mrs. Innocentia Acquah",
  ],
  // Open Graph / Facebook metadata
  openGraph: {
    title: "About Greater Grace Christian Academy",
    description:
      "Discover our mission, vision, core values, and the inspiring founding story of Greater Grace Christian Academy since 2010. Learn how we shape minds and build futures.",
    url: "https://greatergracechristianacademygh.org/about",
    siteName: "Greater Grace Christian Academy",
    images: [
      {
        url: "https://greatergracechristianacademygh.org/images/facilities/classroomblock.jpg", // Make sure this image is relevant or update if needed
        width: 1200,
        height: 630,
        alt: "Greater Grace Christian Academy campus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "About Greater Grace Christian Academy",
    description:
      "Discover our mission, vision, core values, and the inspiring founding story of Greater Grace Christian Academy since 2010. Learn how we shape minds and build futures.",
    images: [
      "https://greatergracechristianacademygh.org/images/facilities/classroomblock.jpg", // Make sure this image is relevant or update if needed
    ],
  },
  // Additional metadata
  alternates: {
    canonical: "https://greatergracechristianacademygh.org/about",
  },
};

const galleryImages = [
  {
    url: "/images/events/ggca science fair 1.jpg",
    caption: "Annual Science Fair 2024",
  },
  {
    url: "/images/facilities/images.jpeg",
    caption: "Sports Day Championship",
  },
  {
    url: "/images/events/culture8.jpeg",
    caption: "Cultural Festival",
  },
  {
    url: "/images/events/graduation20241.jpeg",
    caption: "Graduation Ceremony",
  },
  // {
  //   url: "/images/facilities/2-29-754x424.jpg",
  //   caption: "International Exchange Program",
  // },
  {
    url: "/images/events/ggca science fair 3.jpg",
    caption: "Community Service Initiative",
  },
];

export default function About() {
  return (
    <main className="min-h-screen">
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
            {/* Updated this line slightly to be more general if history details are below */}
            We are dedicated to shaping minds and building futures through
            innovative education and an unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* Mission, Vision, and Motto */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "var(--accent-color2)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div
              className="p-6 rounded-lg shadow-md animated-element"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <Book
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h2
                className="text-2xl font-bold mb-4 text-center"
                style={{ color: "var(--text-color)" }}
              >
                Our Mission
              </h2>
              <p className="text-center" style={{ color: "var(--text-color)" }}>
                To offer high quality education with good moral values in a
                Christian environment and to help produce children of high
                intellectual abilities.
              </p>
            </div>

            {/* Vision */}
            <div
              className="p-6 rounded-lg shadow-md animated-element"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <Globe
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h2
                className="text-2xl font-bold mb-4 text-center"
                style={{ color: "var(--text-color)" }}
              >
                Our Vision
              </h2>
              <p className="text-center" style={{ color: "var(--text-color)" }}>
                To produce children with high intellectual abilities and
                empowering them to grow spiritually and socially, guided by
                Christian values and principles, to become compassionate leaders
                positively impacting their communities and the world.
              </p>
            </div>

            {/* Motto */}
            <div
              className="p-6 rounded-lg shadow-md animated-element"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <Star
                className="mx-auto mb-4"
                size={40}
                style={{ color: "var(--primary-color)" }}
              />
              <h2
                className="text-2xl font-bold mb-4 text-center"
                style={{ color: "var(--text-color)" }}
              >
                Our Motto
              </h2>
              <p
                className="text-center text-xl italic"
                style={{ color: "var(--text-color)" }}
              >
                "Humility And Hard work"
              </p>
              <p
                className="text-center mt-2 "
                style={{ color: "var(--text-color)" }}
              >
                A commitment to intellectual growth, personal empowerment, and
                achieving excellence in all endeavors.
              </p>
            </div>
          </div>
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

      {/* Additional Core Values */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="animated-element">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: "var(--primary-color)" }}
              >
                Our Comprehensive Approach
              </h2>
              <p className="mb-4">
                At Greater Grace Christian Academy, we believe in a holistic
                educational approach that goes beyond traditional academics. Our
                commitment extends to developing well-rounded individuals who
                are intellectually curious, socially responsible, and
                emotionally intelligent.
              </p>
              <p className="mb-4">
                We integrate academic rigor with character development, ensuring
                that our students are not just knowledgeable, but also ethical,
                empathetic, and prepared to make meaningful contributions to
                society.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-4 rounded-lg text-center animated-element"
                style={{ backgroundColor: "var(--accent-color2)" }}
              >
                <Heart
                  className="mx-auto mb-2"
                  size={30}
                  style={{ color: "var(--primary-color)" }}
                />
                <h3 className="font-semibold">Social Responsibility</h3>
              </div>
              <div
                className="p-4 rounded-lg text-center animated-element"
                style={{ backgroundColor: "var(--accent-color2)" }}
              >
                <Globe
                  className="mx-auto mb-2"
                  size={30}
                  style={{ color: "var(--primary-color)" }}
                />
                <h3 className="font-semibold">Global Perspective</h3>
              </div>
              <div
                className="p-4 rounded-lg text-center animated-element"
                style={{ backgroundColor: "var(--accent-color2)" }}
              >
                <Star
                  className="mx-auto mb-2"
                  size={30}
                  style={{ color: "var(--primary-color)" }}
                />
                <h3 className="font-semibold">Personal Growth</h3>
              </div>
              <div
                className="p-4 rounded-lg text-center animated-element"
                style={{ backgroundColor: "var(--accent-color2)" }}
              >
                <Book
                  className="mx-auto mb-2"
                  size={30}
                  style={{ color: "var(--primary-color)" }}
                />
                <h3 className="font-semibold">Lifelong Learning</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section - UPDATED */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animated-element">
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: "var(--primary-color)" }}
              >
                Our Journey/History: A Legacy of Growth
              </h2>
              <p className="mb-4">
                The story of Greater Grace Christian Academy began in 2010,
                sparked by the vision and dedication of Mr. Acquah and Mrs.
                Acquah of Apam. Fueled by a passion for transformative
                education, the journey commenced with careful planning and the
                strategic acquisition of our school plot, ideally situated
                between the Ghana Education Service and Apam Secondary School.
              </p>
              <p className="mb-4">
                With unwavering determination, we launched our initial
                operations from a temporary space, even as we worked diligently
                to establish our permanent home. The generous support of
                community members, particularly individuals like Patricia
                Incoom, was instrumental during these foundational stages.
              </p>
              <p>
                Resourcefulness and community spirit marked our early path as we
                proudly established our first Kindergarten structure, followed
                by our initial two classrooms – laying the groundwork for the
                vibrant learning community we are today. We continue to build on
                this legacy, committed to nurturing future leaders and
                innovators.
              </p>
              {/* <h5
                className="text-2xl font-bold mb-6"
                style={{ color: "var(--text-color)" }}
              >
                Our Journey: Our Founding Story
              </h5>
              <p>
                Apam Greater Grace Christian Academy was born from the vision of
                Mr. Acquah and Mrs. Acquah of Apam. Planning began in August
                2010 with the securing of our current school plot, conveniently
                situated near key educational landmarks.
              </p>
              <p>
                Our journey started modestly, operating initially from a
                temporary location while our main site was in development.
                Thanks to early community support, including the significant
                help of individuals like Patricia Incoom, we were able to
                establish our first Kindergarten building and two classrooms,
                marking the exciting first steps of our growth.
              </p> */}
            </div>
            <div className="rounded-lg overflow-hidden animated-element">
              {/* You might want to choose an image that better reflects the "founding" or "early days" if available,
                  otherwise, classroomblock.jpg is a good general image. */}
              <img
                src="/images/facilities/classroomblock.jpg"
                alt="Greater Grace Christian Academy Campus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8 my-4 rounded shadow"
        style={{ backgroundColor: "var(--accent-color2)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Life at Greater Grace Christian Academy
          </h2>
          <ImageGallery images={galleryImages} />
        </div>
      </section>
    </main>
  );
}
