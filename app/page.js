import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Book, Users, Trophy, Calendar } from "lucide-react";
import AnniversaryBanner from "./webcomponents/AnniversaryBanner";
import Confetti from "./webcomponents/Confetti";
import prisma from "@/lib/db";

export const dynamic = 'force-dynamic'; // Force dynamic rendering

export const metadata = {
  title: "Greater Grace Christian Academy | Excellence in Education in Apam",
  description:
    "Welcome to Greater Grace Christian Academy in Apam, Ghana. Providing transformative Christian education, academic excellence, modern curriculum, and character development from Creche to JHS.",
  keywords: [
    "Greater Grace Christian Academy",
    "GGCA Apam",
    "Christian Academy Apam",
    "best school in Apam Ghana",
    "Creche Apam",
    "Primary school Apam",
    "Junior High School Apam",
    "admissions Apam school",
    "BECE excellence Apam"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Welcome to Greater Grace Christian Academy, Apam",
    description:
      "Where innovation meets education. Shaping tomorrow's leaders through excellence in teaching, learning, and Christian moral values.",
    url: "https://apamapamgreatergracechristianacademygh.org",
    siteName: "Greater Grace Christian Academy",
    images: [
      {
        url: "/images/facilities/classroomblock.jpg",
        width: 1200,
        height: 630,
        alt: "Greater Grace Christian Academy Campus",
      },
    ],
    locale: "en_GH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welcome to Greater Grace Christian Academy, Apam",
    description:
      "Where innovation meets education. Shaping tomorrow's leaders through excellence in teaching, learning, and Christian values.",
    images: ["/images/facilities/classroomblock.jpg"],
  },
};

async function getLatestStories() {
  try {
    const stories = await prisma.story.findMany({
      orderBy: {
        date: 'desc',
      },
      take: 3,
      include: {
        images: {
          take: 1, // We only need the first image for the preview
        },
      },
    });
    return stories;
  } catch (error) {
    console.error("Error fetching latest stories:", error);
    return [];
  }
}

export default async function Home() {
  const latestStories = await getLatestStories();

  return (
    <main className="min-h-screen">
      {/* <Confetti /> */}

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animated-element">
            <h1
              className="text-4xl sm:text-6xl font-bold mb-6"
              style={{
                color: "var(--primary-color)",
                animation: "color-change 3s infinite",
              }}
            >
              Welcome to Greater Grace Christian Academy, Apam
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Where innovation meets education. Shaping tomorrow&apos;s leaders
              through excellence in teaching and learning.
            </p>
            <Link
              href="/webpages/admissions"
              className="inline-flex items-center px-6 py-3 rounded-full text-white hover-scale"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              Begin Your Journey <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <AnniversaryBanner />

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
            {latestStories.map((story) => (
               <div
                key={story.id}
                className="rounded-lg overflow-hidden hover-scale animated-element"
                style={{ backgroundColor: "var(--accent-color)" }}
              >
                <div className="relative w-full h-48">
                  <Image
                    src={story.images[0]?.url || "/images/placeholder.jpg"}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={true}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {story.title}
                  </h3>
                  <p className="mb-4 line-clamp-3">
                    {story.description}
                  </p>
                  <Link
                    href={`/webpages/gallery/events/${story.id}`}
                    className="inline-flex items-center"
                    style={{ color: "var(--primary-color)" }}
                  >
                    Read More <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
