import Link from "next/link";
import prisma from "@/lib/db";
import Image from "next/image";

async function getFeaturedStories() {
  const stories = await prisma.story.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 3,
    include: {
      images: {
        take: 1,
      },
    },
  });
  return stories;
}

export default async function Gallery() {
  const featuredStories = await getFeaturedStories();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animated-element">
          <h1
            className="text-4xl sm:text-6xl font-bold mb-6"
            style={{ color: "var(--primary-color)" }}
          >
            School Gallery
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore our world-class facilities and exciting school events. Take
            a visual journey through our campus life.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/webpages/gallery/facilities">
              <div
                className="px-8 py-4 rounded-lg text-center font-semibold text-lg hover-scale transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: "var(--accent-color)",
                  color: "var(--text-color)",
                }}
              >
                Campus Facilities
              </div>
            </Link>
            <Link href="/webpages/gallery/events">
              <div
                className="px-8 py-4 rounded-lg text-center font-semibold text-lg hover-scale transition-all duration-300 shadow-lg"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
              >
                School Events
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Overview */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="p-6 rounded-lg hover-scale animated-element shadow-2xl"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--primary-color)" }}
              >
                Our Facilities
              </h3>
              <p className="mb-4">
                Explore our state-of-the-art campus designed to provide the best
                learning environment for our students. From modern classrooms to
                sports facilities, we have everything needed for holistic
                education.
              </p>
              <div className="mt-4">
                <Link href="/webpages/gallery/facilities">
                  <div
                    className="inline-block px-6 py-2 rounded-md font-medium hover-scale"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                    }}
                  >
                    View Facilities
                  </div>
                </Link>
              </div>
            </div>

            <div
              className="p-6 rounded-lg hover-scale animated-element shadow-2xl"
              style={{ backgroundColor: "var(--background-color)" }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "var(--primary-color)" }}
              >
                School Events
              </h3>
              <p className="mb-4">
                Relive our most memorable school events through photos and
                videos. From annual day celebrations to sports competitions,
                academic achievements to cultural programs.
              </p>
              <div className="mt-4">
                <Link href="/webpages/gallery/events">
                  <div
                    className="inline-block px-6 py-2 rounded-md font-medium hover-scale"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                    }}
                  >
                    View Events
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Images */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8 mb-5 rounded shadow-2xl"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "var(--primary-color)" }}>
            Featured Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <Link key={story.id} href={`/webpages/gallery/events/${story.id}`}>
                <div className="rounded-lg overflow-hidden shadow-xl hover-scale h-full">
                  <div className="relative w-full h-64">
                    <Image
                      src={story.images?.[0]?.url || "/images/placeholder.jpg"}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div
                    className="p-4"
                    style={{ backgroundColor: "var(--background-color)" }}
                  >
                    <p className="font-medium" style={{ color: "var(--text-color)" }}>{story.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
