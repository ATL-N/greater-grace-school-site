"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// This would come from your database in a real implementation
const eventsData = {
  "annual-sports-day-2024": {
    title: "Annual Sports Day 2024",
    date: "March 15, 2024",
    category: "sports",
    description:
      "Our annual interschool sports competition featuring track events, team sports, and individual challenges.",
    content: `
      <p>The sun shone brightly as students, teachers, and parents gathered for our Annual Sports Day 2024. The event kicked off with an inspiring march-past, followed by the lighting of the sports torch by our school's top athlete.</p>
      
      <p>This year's event featured a wide range of competitions including:</p>
      <ul>
        <li>100m, 200m, and 400m races</li>
        <li>Long jump and high jump</li>
        <li>Relay races</li>
        <li>Basketball and football tournaments</li>
        <li>Swimming competitions</li>
      </ul>
      
      <p>The highlight of the day was the inter-house relay race, where Blue House emerged victorious with a record-breaking time. The event concluded with an awards ceremony recognizing outstanding performances across all categories.</p>
      
      <p>Our Principal, Mrs. Johnson, praised the students for their sporting spirit and emphasized the importance of physical fitness alongside academic excellence.</p>
      
      <p>We extend our gratitude to all the teachers, staff, and parent volunteers who helped make this year's Sports Day a tremendous success.</p>
    `,
    images: [
      {
        url: "/images/events/sports-day-1.jpg",
        caption: "Opening ceremony with all participants",
      },
      {
        url: "/images/events/sports-day-2.jpg",
        caption: "100m race finals",
      },
      {
        url: "/images/events/sports-day-3.jpg",
        caption: "Basketball tournament",
      },
      {
        url: "/images/events/sports-day-4.jpg",
        caption: "Award ceremony",
      },
    ],
    videoId: "abc123xyz", // YouTube video ID
  },
  "science-fair-2024": {
    title: "Science Fair 2024",
    date: "February 20, 2024",
    category: "academic",
    description:
      "Students showcase their innovative science projects and experiments to the school community and guest judges.",
    content: `
      <p>Our Science Fair 2024 was a remarkable showcase of innovation, critical thinking, and scientific curiosity. Students from grades 6-12 presented over 50 projects covering various disciplines including biology, chemistry, physics, and environmental science.</p>
      
      <p>Distinguished scientists from local universities served as judges, evaluating projects based on creativity, scientific methodology, presentation, and impact. The fair was divided into junior and senior categories to ensure fair competition.</p>
      
      <p>Some of the standout projects included:</p>
      <ul>
        <li>A solar-powered water purification system</li>
        <li>An app that helps identify local plant species</li>
        <li>A study on the effects of music on plant growth</li>
        <li>A biodegradable alternative to plastic packaging</li>
      </ul>
      
      <p>The grand prize went to 11th graders Maya Chen and David Rodriguez for their innovative project on using bacteria to break down microplastics.</p>
      
      <p>The fair also featured interactive workshops conducted by science faculty and guest speakers, allowing visitors to engage with scientific concepts in a hands-on manner.</p>
    `,
    images: [
      {
        url: "/images/events/science-fair-1.jpg",
        caption: "Student presenting her solar energy project",
      },
      {
        url: "/images/events/science-fair-2.jpg",
        caption: "Robotics demonstration",
      },
      {
        url: "/images/events/science-fair-3.jpg",
        caption: "Chemistry experiment showcase",
      },
    ],
    videoId: "def456uvw", // YouTube video ID
  },
  "annual-cultural-day-2023": {
    title: "Annual Cultural Day 2023",
    date: "December 10, 2023",
    category: "cultural",
    description:
      "A celebration of diverse cultures through performances, exhibitions, and interactive activities.",
    content: `
      <p>Our school transformed into a global village for the Annual Cultural Day 2023, celebrating the rich diversity of our school community. The event featured performances, exhibitions, and interactive activities representing cultures from around the world.</p>
      
      <p>The day began with a colorful parade where students dressed in traditional attire representing their cultural heritage. This was followed by a series of performances including:</p>
      <ul>
        <li>Traditional dances from various regions</li>
        <li>Musical performances featuring cultural instruments</li>
        <li>A multilingual poetry recitation</li>
        <li>Short plays depicting cultural stories and traditions</li>
      </ul>
      
      <p>The school halls were transformed into exhibition spaces where students showcased artifacts, photographs, and informational displays about different countries and cultures. Visitors had the opportunity to learn about traditional crafts, writing systems, and historical events.</p>
      
      <p>A crowd favorite was the international food festival, where families contributed dishes representing their cultural heritage. Attendees enjoyed sampling cuisines from around the world while learning about their significance and preparation methods.</p>
      
      <p>The event concluded with a unity ceremony, emphasizing our school's commitment to fostering understanding, respect, and appreciation for all cultures.</p>
    `,
    images: [
      {
        url: "/images/events/cultural-day-1.jpg",
        caption: "Cultural parade opening ceremony",
      },
      {
        url: "/images/events/cultural-day-2.jpg",
        caption: "Traditional dance performance",
      },
      {
        url: "/images/events/cultural-day-3.jpg",
        caption: "International food festival",
      },
      {
        url: "/images/events/cultural-day-4.jpg",
        caption: "Cultural exhibits and displays",
      },
    ],
    videoId: "ghi789rst", // YouTube video ID
  },
  "graduation-ceremony-2024": {
    title: "Graduation Ceremony 2024",
    date: "May 28, 2024",
    category: "academic",
    description:
      "Celebrating the achievements of our graduating class as they prepare for their next chapter.",
    content: `
      <p>The grand auditorium was filled with joy, pride, and a touch of nostalgia as we celebrated our Class of 2024 during this year's graduation ceremony. Decorated in our school colors, the venue welcomed graduates, their families, faculty, and staff for this momentous occasion.</p>
      
      <p>The ceremony began with the traditional procession of graduates, followed by welcome addresses from the School Board President and our Principal. This year's valedictorian, Emma Thompson, delivered an inspiring speech reflecting on the class's journey and looking forward to future endeavors.</p>
      
      <p>Special recognition was given to:</p>
      <ul>
        <li>Students with academic honors and distinctions</li>
        <li>Recipients of community service awards</li>
        <li>Athletes who demonstrated exceptional sportsmanship</li>
        <li>Students who overcame significant challenges</li>
      </ul>
      
      <p>Our guest speaker, distinguished alumnus Dr. James Carter, shared valuable insights about perseverance, lifelong learning, and giving back to the community.</p>
      
      <p>The highlight of the ceremony was the conferring of diplomas, with each graduate walking across the stage to receive their diploma and officially turn their tassel. The ceremony concluded with the traditional cap toss, symbolizing the end of one chapter and the beginning of another.</p>
      
      <p>A reception followed the ceremony, allowing graduates, families, and faculty to celebrate together one last time. We extend our heartfelt congratulations to the Class of 2024 and wish them success in all their future endeavors.</p>
    `,
    images: [
      {
        url: "/images/events/graduation-1.jpg",
        caption: "Graduates processing into the ceremony",
      },
      {
        url: "/images/events/graduation-2.jpg",
        caption: "Valedictorian speech",
      },
      {
        url: "/images/events/graduation-3.jpg",
        caption: "Diploma presentation",
      },
    ],
    videoId: "jkl012mno", // YouTube video ID
  },
};

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

export default function EventDetail() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    if (params.eventId && eventsData[params.eventId]) {
      setEvent(eventsData[params.eventId]);
    }
    setLoading(false);
  }, [params.eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--primary-color)" }}
          >
            Event Not Found
          </h1>
          <p className="mb-8">We couldn't find the event you're looking for.</p>
          <Link href="/gallery/events">
            <div
              className="inline-block px-6 py-3 rounded-md font-medium"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
              }}
            >
              Return to Events
            </div>
          </Link>
        </div>
      </div>
    );
  }

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
          <Link href="/gallery/events">
            <span
              className="hover:text-opacity-80"
              style={{ color: "var(--primary-color)" }}
            >
              Events
            </span>
          </Link>
          <span>/</span>
          <span>{event.title}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 page-transition">
        <div className="max-w-5xl mx-auto">
          <div
            className="inline-block px-3 py-1 rounded-full mb-4 text-sm font-medium"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "white",
            }}
          >
            {event.category}
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ color: "var(--primary-color)" }}
          >
            {event.title}
          </h1>
          <div className="flex items-center space-x-2 mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{event.date}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-lg overflow-hidden shadow-xl mb-8">
            <img
              src={event.images[0].url}
              alt={event.images[0].caption}
              className="w-full h-96 object-cover"
            />
            <div
              className="p-3 text-sm italic"
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              {event.images[0].caption}
            </div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className="prose max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: event.content }}
          />
        </div>
      </section>

      {/* Video Section */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8 mb-12 rounded-lg"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--primary-color)" }}
          >
            Event Video
          </h2>
          <YouTubeEmbed videoId={event.videoId} />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold mb-8"
            style={{ color: "var(--primary-color)" }}
          >
            Photo Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {event.images.map((image, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg hover-scale"
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-64 object-cover"
                />
                <div
                  className="p-3 text-sm"
                  style={{ backgroundColor: "var(--background-color)" }}
                >
                  {image.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 text-center mb-12">
        <Link href="/gallery/events">
          <div
            className="inline-block px-6 py-3 rounded-md font-medium hover-scale shadow-lg"
            style={{ backgroundColor: "var(--primary-color)", color: "white" }}
          >
            Back to Events
          </div>
        </Link>
      </section>
    </main>
  );
}
