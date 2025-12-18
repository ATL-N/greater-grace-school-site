"use client";

import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { Calendar } from "lucide-react";

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
            youtube: { playerVars: { modestbranding: 1, rel: 0 } },
          }}
        />
      </div>
    </div>
  );
};

export default function StoryDetailClient({ story }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = story.images.map((img) => ({ src: img.url, title: img.caption })) || [];
  const heroImage = story.images?.[0]?.url || "/images/placeholder.jpg";

  return (
    <>
      <div className="relative h-72 w-full">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12 z-10">
          <div className="animated-element">
            <h1 className="text-5xl font-bold text-white mb-4">{story.title}</h1>
            <div className="flex items-center text-white mb-4">
              <Calendar className="mr-2" size={20} />
              <span className="text-lg">{new Date(story.date).toLocaleDateString()}</span>
            </div>
            <p className="text-xl text-white max-w-2xl">{story.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="rounded-xl p-6 lg:p-10 mb-16 shadow-2xl" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none mt-8" style={{ color: "var(--text-color)" }} dangerouslySetInnerHTML={{ __html: story.content }}></article>
            </div>
            <div className="lg:col-span-1 mt-10">
              <div className="sticky top-8 space-y-10">
                {story.videoId && (
                  <div className="rounded-xl p-6" style={{ backgroundColor: "var(--accent-color)" }}>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--primary-color)" }}>Event Highlights</h3>
                    <YouTubeEmbed videoId={story.videoId} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {story.images && story.images.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 mb-16" style={{ backgroundColor: "var(--accent-color)" }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: "var(--primary-color)" }}>Event Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {story.images.map((image, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
                  style={{ backgroundColor: "var(--background-color)" }}
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <div className="relative group h-64 w-full">
                     <Image
                        src={image.url}
                        alt={image.caption || `Event image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
      />
    </>
  );
}