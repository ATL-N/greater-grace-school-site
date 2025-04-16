"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player/youtube";
import { Calendar, Share2, ArrowLeft } from "lucide-react";

// Mock function to fetch event data - in a real app, this would come from your API/database
const getEventById = (id) => {
  const events = [
    {
      id: 1,
      title: "Annual Sports Day 2024",
      description:
        "Our annual interschool sports competition featuring track events, team sports, and individual challenges.",
      date: "March 15, 2024",
      fullContent: `
        <p>The 2024 Annual Sports Day was a tremendous success with over 500 student participants and 1,000 spectators. The event showcased the athletic talents of our students across multiple disciplines.</p>
        
        <p>The day began with an opening ceremony featuring a parade of athletes and a torch lighting ceremony. The school band performed our school anthem as students marched proudly representing their respective houses.</p>
        
        <h3>Track Events</h3>
        <p>The 100m, 200m, and 400m races were particularly competitive this year. Sarah Johnson from Grade 10 broke the school record in the girls' 100m dash with a time of 12.3 seconds. The relay races demonstrated excellent teamwork and coordination.</p>
        
        <h3>Field Events</h3>
        <p>Long jump, high jump, and shot put competitions saw enthusiastic participation. Marcus Lee set a new record in the high jump clearing 1.85 meters.</p>
        
        <h3>Team Sports</h3>
        <p>The basketball and volleyball tournaments were the highlights of the team competitions. Blue House emerged as champions in basketball while Red House dominated the volleyball matches.</p>
        
        <h3>Awards Ceremony</h3>
        <p>The day concluded with an awards ceremony where Principal Dr. Williams congratulated all participants and presented trophies to the winners. Green House was declared the overall champion of Sports Day 2024.</p>
      `,
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
      fullContent: `
        <p>This year's Science Fair was our biggest yet, with over 120 projects from students across all grade levels. The gymnasium was transformed into a hub of scientific innovation and discovery.</p>
        
        <p>Projects ranged from environmental studies and renewable energy solutions to robotics and artificial intelligence applications. The level of creativity and scientific rigor demonstrated by our students impressed all attendees.</p>
        
        <h3>Guest Judges</h3>
        <p>We were honored to have three professors from the local university and two scientists from the National Research Laboratory serving as judges. They spent time with each student, asking questions and providing valuable feedback.</p>
        
        <h3>Award-Winning Projects</h3>
        <p>The grand prize went to Emma Chen and David Park for their project on "Microplastic Filtration Systems for Urban Water Sources." Their prototype demonstrated remarkable efficiency in removing microplastics from water samples.</p>
        
        <p>Other notable projects included a solar-powered irrigation system, a machine learning algorithm for early plant disease detection, and a bioplastic derived from food waste.</p>
        
        <h3>Community Impact</h3>
        <p>The Science Fair was open to the public in the afternoon, allowing community members to interact with our young scientists. Local news outlets covered the event, highlighting our school's commitment to STEM education.</p>
      `,
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
      fullContent: `
        <p>Our Annual Cultural Day celebrated the rich diversity within our school community. Students, parents, and staff came together to share cultural traditions, foods, performances, and artifacts from over 30 different countries.</p>
        
        <h3>Cultural Performances</h3>
        <p>The auditorium hosted continuous performances throughout the day, including traditional dances from India, Korea, Mexico, and Nigeria. Musical performances featured instruments from around the world, and several students performed songs in their native languages.</p>
        
        <h3>Global Food Festival</h3>
        <p>The cafeteria was transformed into an international food court where families shared dishes representing their heritage. Attendees received "passports" that were stamped at each food station they visited.</p>
        
        <h3>Cultural Exhibitions</h3>
        <p>Classrooms were converted into country-specific exhibition spaces where students displayed artifacts, artwork, and information about different nations. Interactive activities in each room allowed visitors to experience aspects of each culture.</p>
        
        <h3>Traditional Attire</h3>
        <p>Many students and teachers wore traditional clothing representing their cultural backgrounds, creating a vibrant atmosphere of global celebration.</p>
        
        <p>The event concluded with a "Parade of Nations" where representatives from each cultural group carried their flags across the stage, symbolizing unity in diversity.</p>
      `,
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
      fullContent: `
        <p>The Class of 2024 Graduation Ceremony was a momentous occasion held at the Grand City Auditorium. 215 students received their diplomas in front of proud family members, friends, faculty, and staff.</p>
        
        <h3>Commencement Address</h3>
        <p>We were honored to have distinguished alumna Dr. Michelle Rodriguez, renowned neurosurgeon and humanitarian, deliver an inspiring commencement address. She encouraged graduates to pursue their passions while finding ways to contribute to society.</p>
        
        <h3>Student Achievements</h3>
        <p>This graduating class earned over $3.2 million in scholarships collectively. 85% of graduates will be continuing their education at colleges and universities, 10% will be entering vocational training programs, and 5% will be joining the workforce or military.</p>
        
        <h3>Special Recognitions</h3>
        <p>Valedictorian James Wilson delivered a moving speech reflecting on the class's journey. Salutatorian Aisha Patel led the graduates in the turning of the tassel ceremony. The Principal's Award for Outstanding Character was presented to Carlos Mendez for his exceptional community service work.</p>
        
        <h3>Musical Performances</h3>
        <p>The ceremony featured performances by the school choir, including their rendition of "Time of Your Life" and an original song composed by graduating senior Lisa Chen.</p>
        
        <p>The ceremony concluded with the traditional hat toss, symbolizing the end of one chapter and the beginning of new adventures for our graduates.</p>
      `,
      images: [
        "/images/events/graduation-1.jpg",
        "/images/events/graduation-2.jpg",
        "/images/events/graduation-3.jpg",
      ],
      videoId: "jkl012mno", // YouTube video ID
    },
  ];

  return events.find((event) => event.id === parseInt(id));
};

// Updated YouTube Embed Component using react-player
const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <div className="relative pt-[56.25%]">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=NxqaKBk4WjA`}
          className="absolute top-0 left-0"
          width="100%"
          height="100%"
          controls={true}
          light={false}
          pip={true}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

// Social Media Share Button Component
const SocialButton = ({ icon }) => {
  return (
    <button
      className="p-3 rounded-full transition-transform duration-300 hover:scale-110"
      style={{ backgroundColor: "var(--accent-color)" }}
    >
      {icon}
    </button>
  );
};

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      const eventData = getEventById(params.id);
      setEvent(eventData);
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4"
          style={{ borderColor: "var(--primary-color)" }}
        ></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Event not found</h1>
        <Link href="/events">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--background-color)",
            }}
          >
            <ArrowLeft size={18} />
            Return to Events
          </div>
        </Link>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      {/* Hero Section with Featured Image */}
      <div className="relative h-72 w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${event.images[0]})`,
            filter: "brightness(0.7)",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>

        {/* Navigation Breadcrumb */}
        <div className="relative max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center space-x-2 text-sm text-white">
            <Link href="/">
              <span
                className="hover:opacity-80 transition-opacity"
                style={{ color: "white" }}
              >
                Home
              </span>
            </Link>
            <span>/</span>
            <Link href="/gallery">
              <span
                className="hover:opacity-80 transition-opacity"
                style={{ color: "white" }}
              >
                Gallery
              </span>
            </Link>
            <span>/</span>
            <Link href="/events">
              <span
                className="hover:opacity-80 transition-opacity"
                style={{ color: "white" }}
              >
                Events
              </span>
            </Link>
            <span>/</span>
            <span className="opacity-80" style={{ color: "white" }}>
              {event.title}
            </span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12 z-10">
          <div className="animated-element">
            <h1 className="text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex items-center text-white mb-4">
              <Calendar className="mr-2" size={20} />
              <span className="text-lg">{event.date}</span>
            </div>
            <p className="text-xl text-white max-w-2xl">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 ">
        <div
          className="rounded-xl  p-6 lg:p-10 mb-16 shadow-2xl"
          style={{
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              <article
                className="prose prose-lg max-w-none mt-8"
                style={{ color: "var(--text-color)" }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: event.fullContent }}
                ></div>
              </article>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 mt-10">
              <div className="sticky top-8 space-y-10">
                {/* Video Section */}
                <div
                  className="rounded-xl p-6"
                  style={{
                    backgroundColor: "var(--accent-color)",
                    color: "var(--text-color)",
                  }}
                >
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: "var(--primary-color)" }}
                  >
                    Event Highlights
                  </h3>
                  <YouTubeEmbed videoId={event.videoId} />
                </div>

                {/* Share Section */}
                <div
                  className="rounded-xl p-6"
                  style={{
                    backgroundColor: "var(--accent-color)",
                    color: "var(--text-color)",
                  }}
                >
                  <h3
                    className="text-2xl font-bold mb-4 flex items-center gap-2"
                    style={{ color: "var(--primary-color)" }}
                  >
                    <Share2 size={20} />
                    Share This Event
                  </h3>
                  <div className="flex space-x-4">
                    <SocialButton
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          style={{ color: "var(--background-color)" }}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      }
                    />
                    <SocialButton
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          style={{ color: "var(--background-color)" }}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      }
                    />
                    <SocialButton
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          style={{ color: "var(--background-color)" }}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      }
                    />
                    <SocialButton
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          style={{ color: "var(--background-color)" }}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      }
                    />
                  </div>
                </div>

                {/* Featured Image Zoom */}
                <div
                  className="rounded-xl p-6"
                  style={{
                    backgroundColor: "var(--accent-color)",
                    color: "var(--text-color)",
                  }}
                >
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: "var(--primary-color)" }}
                  >
                    Featured Image
                  </h3>
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={event.images[activeImageIndex || 0]}
                      alt={`${event.title} highlight image`}
                      className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8 mb-16"
        style={{ backgroundColor: "var(--accent-color)" }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: "var(--primary-color)" }}
          >
            Event Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {event.images.map((image, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                  activeImageIndex === index ? "ring-4 ring-offset-2" : ""
                }`}
                style={{
                  ringColor: "var(--primary-color)",
                  backgroundColor: "var(--background-color)",
                }}
                onClick={() => setActiveImageIndex(index)}
              >
                <div className="relative group">
                  <img
                    src={image}
                    alt={`${event.title} - Image ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-medium">Click to view</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Events Button */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center mb-16">
        <Link href="/events">
          <div
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium shadow-lg transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--background-color)",
            }}
          >
            <ArrowLeft size={20} />
            Back to All Events
          </div>
        </Link>
      </section>
    </main>
  );
}
