"use client";

import Link from "next/link";

// Event data structure
const schoolEvents = [
  {
    id: 1, // Kept the original ID, but updated content
    title: "Music Practice Class", // Changed title
    description:
      "Join us for our regular music practice session. All levels welcome.", // Changed description
    date: "January 24, 2024", // Changed date (example)
    image: "/images/events/brassband.jpeg", // Changed image (example)
  },
  {
    id: 2,
    title: "Science Fair 2024",
    description:
      "Students showcase their innovative science projects and experiments to the school community and guest judges.",
    date: "February 20, 2024",
    image: "/images/events/ggca science fair 1.jpg",
  },
  {
    id: 3,
    title: "Annual Cultural Day",
    description:
      "A celebration of diverse cultures through performances, exhibitions, and interactive activities.",
    date: "December 10, 2024",
    image: "/images/events/culture5.jpeg",
  },
  // {
  //   id: 4,
  //   title: "Graduation Ceremony 2024",
  //   description:
  //     "Celebrating the achievements of our graduating class as they prepare for their next chapter.",
  //   date: "May 28, 2024",
  //   image: "/images/events/graduation-1.jpg",
  // },
  // {
  //   id: 5,
  //   title: "Annual Sports Day 2024",
  //   description:
  //     "Our annual interschool sports competition featuring track events, team sports, and individual challenges.",
  //   date: "March 15, 2024",
  //   image: "/images/events/sports-day-1.jpg",
  // },
  // {
  //   id: 6,
  //   title: "Science Fair 2025",
  //   description:
  //     "Students showcase their innovative science projects and experiments to the school community and guest judges.",
  //   date: "February 20, 2024",
  //   image: "/images/events/science-fair-1.jpg",
  // },
  // {
  //   id: 7,
  //   title: "Annual Cultural Day",
  //   description:
  //     "A celebration of diverse cultures through performances, exhibitions, and interactive activities.",
  //   date: "December 10, 2023",
  //   image: "/images/events/cultural-day-1.jpg",
  // },
  // {
  //   id: 8,
  //   title: "Graduation Ceremony 2024",
  //   description:
  //     "Celebrating the achievements of our graduating class as they prepare for their next chapter.",
  //   date: "May 28, 2024",
  //   image: "/images/events/graduation-1.jpg",
  // },
];

// Event Card Component
const EventCard = ({ event }) => {
  return (
    <Link href={`/webpages/gallery/events/${event.id}`}>
      <div
        className="rounded-lg overflow-hidden shadow-xl hover-scale cursor-pointer animated-element h-full"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div className="h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3
            className="text-xl font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            {event.title}
          </h3>
          <p className="text-sm mt-1 mb-2">{event.date}</p>
          <p className="text-sm">{event.description}</p>
          <div
            className="mt-4 inline-block px-4 py-2 rounded text-sm font-medium"
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

export default function Events() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schoolEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Back to Gallery Button */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 text-center mb-12">
        <Link href="/gallery">
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
