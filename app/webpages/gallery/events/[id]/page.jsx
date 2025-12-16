"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player/youtube";
import { Calendar, Share2, ArrowLeft } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const getEventById = (id) => {
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
    // ... all the other hardcoded events
  ];
  return events.find((event) => event.id === parseInt(id));
};

const YouTubeEmbed = ({ videoId }) => {
  if (!videoId) return null;
  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <div className="relative pt-[56.25%]">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          className="absolute top-0 left-0"
          width="100%"
          height="100%"
          controls={true}
          light={true}
          pip={true}
          config={{
            youtube: {
              playerVars: { modestbranding: 1, rel: 0 },
            },
          }}
        />
      </div>
    </div>
  );
};

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      const eventData = getEventById(params.id);
      setEvent(eventData);
    }
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!event) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">Event not found</h1>
            <Link href="/webpages/gallery/events">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium shadow-lg" style={{backgroundColor: "var(--primary-color)", color: "var(--background-color)"}}>
                    <ArrowLeft size={18} />
                    Return to Events
                </div>
            </Link>
      </div>
    );
  }

  const slides = event.images.map((img) => ({ src: img.url || img, title: img.caption })) || [];

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--background-color)" }}>
        <div className="absolute top-0 left-0 w-full z-20">
            <div className="relative max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 text-sm text-white">
                    <Link href="/"><span className="hover:opacity-80 transition-opacity">Home</span></Link>
                    <span>/</span>
                    <Link href="/webpages/gallery/events"><span className="hover:opacity-80 transition-opacity">Events</span></Link>
                    <span>/</span>
                    <span className="opacity-80 truncate max-w-[200px] sm:max-w-none">{event.title}</span>
                </div>
            </div>
        </div>
        
        <div className="relative h-72 w-full">
            <img src={event.images[0]?.url || event.images[0]} alt={event.title} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12 z-10">
                <div className="animated-element">
                    <h1 className="text-5xl font-bold text-white mb-4">{event.title}</h1>
                    <div className="flex items-center text-white mb-4">
                        <Calendar className="mr-2" size={20} />
                        <span className="text-lg">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xl text-white max-w-2xl">{event.description}</p>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
            <div className="rounded-xl p-6 lg:p-10 mb-16 shadow-2xl" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <article className="prose prose-lg max-w-none mt-8" style={{ color: "var(--text-color)" }} dangerouslySetInnerHTML={{ __html: event.fullContent }}></article>
                    </div>
                    <div className="lg:col-span-1 mt-10">
                        <div className="sticky top-8 space-y-10">
                            {event.videoId && (
                            <div className="rounded-xl p-6" style={{ backgroundColor: "var(--accent-color)" }}>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-color)" }}>Event Highlights</h3>
                                <YouTubeEmbed videoId={event.videoId} />
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {event.images && event.images.length > 0 && (
            <section className="py-16 px-4 sm:px-6 lg:px-8 mb-16" style={{ backgroundColor: "var(--accent-color)" }}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: "var(--primary-color)" }}>Event Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {event.images.map((image, index) => (
                            <div key={index} className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer" style={{ backgroundColor: "var(--background-color)" }} onClick={() => { setLightboxIndex(index); setLightboxOpen(true); }}>
                                <div className="relative group h-64 w-full">
                                    <img src={image.url || image} alt={image.caption || `Event image ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
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
        )}

        <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} index={lightboxIndex} slides={slides} />
        
        <section className="py-12 px-4 sm:px-6 lg:px-8 text-center mb-16">
            <Link href="/webpages/gallery/events">
                <div className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium shadow-lg transition-transform duration-300 hover:scale-105" style={{ backgroundColor: "var(--primary-color)", color: "var(--background-color)" }}>
                    <ArrowLeft size={20} />
                    Back to All Events
                </div>
            </Link>
        </section>
    </main>
  );
}
