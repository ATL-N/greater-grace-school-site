"use client";

import { useState } from "react";
import Link from "next/link";

// Event data structure
const schoolEvents = [
  {
    id: 1,
    title: "Annual Sports Day 2024",
    description:
      "Our annual interschool sports competition featuring track events, team sports, and individual challenges.",
    date: "March 15, 2024",
    images: [
      "/images/events/sports-day-1.jpg",
      "/images/events/sports-day-2.jpg",
      "/images/events/sports-day-3.jpg",
      "/images/events/sports-day-4.jpg",
    ],
    videoId: "abc123xyz", // YouTube video ID
  },
  {
    id: 2,
    title: "Science Fair 2024",
    description:
      "Students showcase their innovative science projects and experiments to the school community and guest judges.",
    date: "February 20, 2024",
    images: [
      "/images/events/science-fair-1.jpg",
      "/images/events/science-fair-2.jpg",
      "/images/events/science-fair-3.jpg",
    ],
    videoId: "def456uvw", // YouTube video ID
  },
  {
    id: 3,
    title: "Annual Cultural Day",
    description:
      "A celebration of diverse cultures through performances, exhibitions, and interactive activities.",
    date: "December 10, 2023",
    images: [
      "/images/events/cultural-day-1.jpg",
      "/images/events/cultural-day-2.jpg",
      "/images/events/cultural-day-3.jpg",
      "/images/events/cultural-day-4.jpg",
    ],
    videoId: "ghi789rst", // YouTube video ID
  },
  {
    id: 4,
    title: "Graduation Ceremony 2024",
    description:
      "Celebrating the achievements of our graduating class as they prepare for their next chapter.",
    date: "May 28, 2024",
    images: [
      "/images/events/graduation-1.jpg",
      "/images/events/graduation-2.jpg",
      "/images/events/graduation-3.jpg",
    ],
    videoId: "jkl012mno", // YouTube video ID
  },
];

// YouTube Embed Component
const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, onClick }) => {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-xl hover-scale cursor-pointer animated-element"
      onClick={() => onClick(event)}
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={event.images[0]}
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
        <p className="text-sm line-clamp-2">{event.description}</p>
      </div>
    </div>
  );
};

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    // Scroll to the detail section
    setTimeout(() => {
      document
        .getElementById("event-detail")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const closeEventDetail = () => {
    setSelectedEvent(null);
  };

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
            Relive our most memorable school events through photos and videos.
            Click on any event to see details.
          </p>
        </div>
      </section>

      {/* Event Listing */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schoolEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={handleEventClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Event Detail Section */}
      {selectedEvent && (
        <section
          id="event-detail"
          className="py-12 px-4 sm:px-6 lg:px-8 mb-8 rounded-lg page-transition"
          style={{ backgroundColor: "var(--accent-color)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-3xl font-bold"
                style={{ color: "var(--primary-color)" }}
              >
                {selectedEvent.title}
              </h2>
              <button
                onClick={closeEventDetail}
                className="p-2 rounded-full"
                style={{ backgroundColor: "var(--background-color)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-8">
              <p className="text-lg mb-2">{selectedEvent.date}</p>
              <p className="text-lg">{selectedEvent.description}</p>
            </div>

            {/* YouTube Video */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Event Video</h3>
              <YouTubeEmbed videoId={selectedEvent.videoId} />
            </div>

            {/* Event Images */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Photo Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedEvent.images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-lg hover-scale"
                  >
                    <img
                      src={image}
                      alt={`${selectedEvent.title} - Image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
