"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player/youtube";
import { Calendar, Share2, ArrowLeft } from "lucide-react";

// --- Import Lightbox ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Import default styles

// Mock function to fetch event data (Keep your existing function)
const getEventById = (id) => {
  // ... (your existing event data array and logic)
  const events = [
    {
      id: 1,
      title: "Music Practice Class",
      description:
        "Join us for our regular music practice session. All levels welcome.",
      date: "January 24, 2024",
      fullContent: `
      <p>This is our regular weekly music practice session, designed for students interested in honing their instrumental or vocal skills in a collaborative environment.</p>

      <p>Whether you play strings, brass, woodwinds, percussion, or are a vocalist, this is a great opportunity to practice ensemble pieces, work on individual technique, and prepare for upcoming school performances.</p>

      <h3>Session Focus</h3>
      <p>This week's session will focus on sight-reading new pieces for the spring concert and refining sections from our current repertoire. Bring your instrument, sheet music, and enthusiasm!</p>

      <h3>Details</h3>
      <p>The practice takes place every Wednesday afternoon in the Music Room (Room 105) from 3:30 PM to 5:00 PM. Music stands and some percussion instruments are provided, but please bring your own instrument.</p>

      <p>No formal sign-up is required, just show up ready to make music! All skill levels are encouraged to attend.</p>
    `,
      images: ["/images/events/brassband.jpeg"],
      videoId: "lhQG2xpyJS4",
    },
    {
      id: 2,
      title: "Science Fair 2024",
      description:
        "Students showcase their innovative science projects and experiments to the school community and guest judges.",
      date: "February 20, 2024",
      fullContent: `
      <p>This year's Science Fair was our biggest yet, with over 5 projects from students across all grade levels. The gymnasium was transformed into a hub of scientific innovation and discovery.</p>

      <p>Projects ranged from environmental studies and renewable energy solutions to robotics and artificial intelligence applications. The level of creativity and scientific rigor demonstrated by our students impressed all attendees.</p>

      <h3>Guest Judges</h3>
      <p>We were honored to have three teachers from the local senior high school and two scientists from the National Research Laboratory serving as judges. They spent time with each student, asking questions and providing valuable feedback.</p>

      <h3>Award-Winning Projects</h3>
      <p>The grand prize went to Emma Chen and David Park for their project on "Microplastic Filtration Systems for Urban Water Sources." Their prototype demonstrated remarkable efficiency in removing microplastics from water samples.</p>

      <p>Other notable projects included a solar-powered irrigation system, a machine learning algorithm for early plant disease detection, and a bioplastic derived from food waste.</p>

      <h3>Community Impact</h3>
      <p>The Science Fair was open to the public in the afternoon, allowing community members to interact with our young scientists. Local news outlets covered the event, highlighting our school's commitment to STEM education.</p>
    `,
      images: [
        "/images/events/ggca science fair 1.jpg",
        "/images/events/ggca science fair 2.jpg",
        "/images/events/ggca science fair 3.jpg",
        "/images/events/ggca science fair 4.jpg",
      ],
      videoId: "5oH3OSHS3SM",
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
      <p>The auditorium hosted continuous performances throughout the day, including traditional dances like Adowa from the Akan, Agbadza from the Ewe, and Kpanlogo from the Ga people. Musical performances featured vibrant drumming ensembles and instruments unique to different regions, and several students performed songs in languages such as Twi, Ewe, Ga, and Dagbani.</p>

      <h3>Global Food Festival</h3>
      <p>The cafeteria was transformed into an international food court where families shared dishes representing their heritage. Attendees received "passports" that were stamped at each food station they visited.</p>

      <h3>Cultural Exhibitions</h3>
      <p>Classrooms were converted into country-specific exhibition spaces where students displayed artifacts, artwork, and information about different nations. Interactive activities in each room allowed visitors to experience aspects of each culture.</p>

      <h3>Traditional Attire</h3>
      <p>Many students and teachers wore traditional clothing representing their cultural backgrounds, creating a vibrant atmosphere of global celebration.</p>

      <p>The event concluded with a "Parade of Nations" where representatives from each cultural group carried their flags across the stage, symbolizing unity in diversity.</p>
    `,
      images: [
        "/images/events/culture8.jpeg",
        "/images/events/culture4.jpeg",
        "/images/events/culture3.jpeg",
        "/images/events/culture2.jpeg",
        "/images/events/culture1.jpeg",
        "/images/events/culture6.jpeg",
        "/images/events/culture5.jpeg",
      ],
      videoId: "ghi789rst",
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
        "/images/events/greater-grace-graduation-2024-1.jpeg",
        "/images/events/greater-grace-graduation-2024-4.jpeg",
        "/images/events/greater-grace-graduation-2024-6.jpeg",
        "/images/events/greater-grace-graduation-2024-12.jpeg",
        "/images/events/greater-grace-graduation-2024-2.jpeg",
        "/images/events/greater-grace-graduation-2024-3.jpeg",
      ],
      videoId: "ZIpj3Yf5RZU",
    },
    {
      id: 5,
      title: "National Science Quiz Victory",
      description:
        "Our JHS students won the Regional Science and Mathematics Quiz Competition held in Cape Coast.",
      date: "March 15, 2024",
      fullContent: `
      <p>We are proud to announce that Greater Grace Christian Academy's science team has emerged victorious at the prestigious Regional Science and Mathematics Quiz Competition held in Cape Coast!</p>

      <h3>The Competition</h3>
      <p>Facing fierce competition from 32 schools across the Central Region, our team demonstrated exceptional knowledge, critical thinking, and teamwork throughout the three-day event. The final round was particularly intense, with our team pulling ahead in the final lightning round to secure the win.</p>

      <h3>Our Champions</h3>
      <p>The winning team consisted of three outstanding students: Kofi Mensah (JHS 3), Abena Osei (JHS 3), and Kwame Adu (JHS 2). They were expertly coached by Mrs. Akosua Boateng, our head of Science Department, who has been preparing the team for months through after-school practice sessions.</p>

      <h3>Subject Areas</h3>
      <p>The competition tested students in mathematics, physics, chemistry, and biology through multiple-choice questions, practical problem-solving, and rapid-response challenges. Our team showed particular strength in the experimental physics and applied mathematics sections.</p>

      <h3>Recognition</h3>
      <p>Each team member received a scholarship award, scientific calculators, and a collection of reference books. The school was presented with the championship trophy, laboratory equipment, and qualification for the national competition to be held in Accra later this year.</p>

      <p>This victory reflects the quality of our science education program and the dedication of both our students and faculty. We look forward to continuing this legacy of excellence as we prepare for the national competition!</p>
    `,
      images: [
        "/images/events/science-quiz-1.jpg",
        "/images/events/science-quiz-2.jpg",
      ],
      videoId: "pqr456stu",
    },
    {
      id: 6,
      title: "New ICT Lab Opens",
      description:
        "State-of-the-art computer laboratory with 25 workstations enhances digital literacy education.",
      date: "February 5, 2024",
      fullContent: `
      <p>Greater Grace Christian Academy is proud to announce the opening of our new state-of-the-art Information and Communications Technology (ICT) laboratory, designed to significantly enhance our students' digital literacy skills and technological capabilities.</p>

      <h3>Facility Specifications</h3>
      <p>The new lab features 25 modern workstations equipped with the latest hardware specifications, reliable high-speed internet connectivity, educational software packages, and a central teaching station with projection capabilities. The lab has been designed with ergonomic furniture and proper lighting to create an optimal learning environment.</p>

      <h3>Funding and Support</h3>
      <p>This important addition to our campus was made possible through the generous contributions of our alumni association, parent-teacher organization, and several community partners including GhanaComp Technologies and Central Regional Development Fund. Their combined support totaled approximately GH₵150,000 for the complete project.</p>

      <h3>Curriculum Integration</h3>
      <p>The lab will support a comprehensive ICT curriculum that includes basic computer literacy, coding and programming fundamentals, digital citizenship education, and multimedia content creation. Students from all grade levels will have scheduled access to the facility, with additional open hours for special projects and advanced studies.</p>

      <h3>Impact on Education</h3>
      <p>This facility represents a significant step forward in our mission to prepare students for success in an increasingly digital world. It will enable hands-on, practical learning experiences that develop critical 21st-century skills while supporting interdisciplinary projects across our curriculum.</p>

      <p>An official inauguration ceremony will be held next week, with representatives from our donor organizations and the Ghana Education Service in attendance. We invite all parents and community members to tour the facility following the ceremony.</p>
    `,
      images: [
        "/images/events/ict-lab-1.jpg",
        "/images/events/ict-lab-2.jpg",
        "/images/events/ict-lab-3.jpg",
      ],
      videoId: "vwx789yz",
    },
    {
      id: 7,
      title: "Cultural Dance Competition Win",
      description:
        "Our traditional dance troupe secured first place at the Central Region Schools Cultural Festival.",
      date: "April 8, 2024",
      fullContent: `
      <p>Greater Grace Christian Academy's cultural dance troupe has brought honor to our school by winning first place at the Central Region Schools Cultural Festival held in Elmina last weekend! This prestigious victory qualifies our school to represent the Central Region at the upcoming National Schools Cultural Festival in Accra.</p>

      <h3>The Performance</h3>
      <p>Our 15-member dance troupe delivered a captivating 12-minute performance featuring traditional Fante dances including Adenkum, Adzewa, and Asafo variations. The choreography, developed under the guidance of our Cultural Studies teacher Mr. Kwesi Ampah, beautifully blended authentic cultural elements with creative storytelling that depicted historical narratives of coastal Ghana.</p>

      <h3>Judges' Commendation</h3>
      <p>The panel of five judges awarded our performance the highest scores in authenticity, technical execution, costume design, and audience engagement. In their comments, the judges specifically praised the students' understanding of the cultural significance behind each movement and their synchronization with the live drumming accompaniment.</p>

      <h3>Student Participants</h3>
      <p>The dance troupe includes students from JHS 1 through JHS 3, many of whom have been practicing these traditional dances since primary school. Special recognition goes to dance captains Ama Koomson and Kofi Ansah, whose leadership helped maintain the group's focus and discipline throughout three months of intensive preparations.</p>

      <h3>National Competition</h3>
      <p>The troupe will now represent the Central Region at the National Schools Cultural Festival in Accra next month. This prestigious competition brings together winners from all 16 regions of Ghana and is attended by dignitaries from the Ministry of Education, Ministry of Tourism and Cultural Affairs, and traditional authorities from across the country.</p>

      <p>We invite the entire school community to a special showcase performance next Friday, where the dance troupe will present their winning routine and preview enhancements being developed for the national competition.</p>
    `,
      images: [
        "/images/events/dance-competition-1.jpg",
        "/images/events/dance-competition-2.jpg",
        "/images/events/dance-competition-3.jpg",
      ],
      videoId: "abc123def",
    },
  ];
  return events.find((event) => event.id === parseInt(id));
};

// YouTube Embed Component (Keep your existing component)
const YouTubeEmbed = ({ videoId }) => {
  // ... (your existing component)
  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <div className="relative pt-[56.25%]">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
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

// Social Media Share Button Component (Keep your existing component)
const SocialButton = ({ icon }) => {
  // ... (your existing component)
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
  const [activeImageIndex, setActiveImageIndex] = useState(0); // Still useful for sidebar featured image

  // --- State for Lightbox ---
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      const eventData = getEventById(params.id);
      setEvent(eventData);
      setLoading(false);
      // Reset active index if event changes
      setActiveImageIndex(0);
    }
  }, [params.id]);

  // --- Prepare slides for the lightbox ---
  const slides = event?.images.map((src) => ({ src })) || [];

  // --- Loading and Not Found States (Keep as is) ---
  if (loading) {
    // ... (your existing loading JSX)
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
    // ... (your existing not found JSX)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Event not found</h1>
        <Link href="/webpages/gallery/events">
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
      {/* Hero Section (Keep as is) */}
      <div className="relative h-72 w-full">
        {/* ... (your existing hero section JSX) ... */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            // Use activeImageIndex for the hero background for consistency, or keep it fixed to [0]
            backgroundImage: `url(${event.images[activeImageIndex || 0]})`,
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
            <Link href="/webpages/gallery/events">
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

      {/* Main Content Area (Keep as is, including sidebar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 ">
        {/* ... (your existing main content grid, article, sidebar) ... */}
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

                {/* Featured Image (uses activeImageIndex) */}
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
                      // Ensure activeImageIndex is valid before accessing images array
                      src={
                        event.images[
                          activeImageIndex < event.images.length
                            ? activeImageIndex
                            : 0
                        ]
                      }
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
                  // Highlight effect can be removed if not needed now, or kept
                  activeImageIndex === index ? "ring-4 ring-offset-2" : ""
                }`}
                style={{
                  ringColor: "var(--primary-color)",
                  backgroundColor: "var(--background-color)",
                }}
                // --- Updated onClick handler ---
                onClick={() => {
                  setActiveImageIndex(index); // Keep updating sidebar image
                  setLightboxIndex(index); // Set the index for the lightbox
                  setLightboxOpen(true); // Open the lightbox
                }}
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

      {/* --- Lightbox Component Instance --- */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        // You can add plugins here if needed, e.g., thumbnails, zoom
        // plugins={[Thumbnails, Zoom]}
      />

      {/* Back to Events Button (Keep as is) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center mb-16">
        {/* ... (your existing back button JSX) ... */}
        <Link href="/webpages/gallery/events">
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
