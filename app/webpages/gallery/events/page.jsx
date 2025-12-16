import Link from "next/link";
import prisma from "@/lib/db";
import Image from "next/image";

// Event Card Component - adapted for the new data structure
const EventCard = ({ event }) => {
  const imageUrl = event.images?.[0]?.url || "/images/placeholder.jpg";
  
  return (
    <Link href={`/webpages/gallery/events/${event.id}`}>
      <div
        className="rounded-lg overflow-hidden shadow-xl hover-scale cursor-pointer animated-element h-full flex flex-col"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3
            className="text-xl font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            {event.title}
          </h3>
          <p className="text-sm mt-1 mb-2 text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
          <p className="text-sm flex-grow">{event.description}</p>
          <div
            className="mt-4 inline-block px-4 py-2 rounded text-sm font-medium self-start"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "white",
            }}
          >
            Read More
          </div>
        </div>
      </div>
    </Link>
  );
};

export default async function Events() {
  const stories = await prisma.story.findMany({
    orderBy: {
      date: 'desc',
    },
    include: {
      images: {
        take: 1,
      },
    },
  });

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
          <span>Events</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 page-transition">
        <div className="max-w-7xl mx-auto text-center animated-element">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: "var(--primary-color)" }}
          >
            School Events
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore our most memorable school events. Click on any event to see
            detailed information, photos, and videos.
          </p>
        </div>
      </section>

      {/* Event Listing */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          {stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500">
                No events have been posted yet. Please check back soon!
              </p>
            </div>
          )}
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
