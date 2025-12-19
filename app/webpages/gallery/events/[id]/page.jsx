import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import StoryDetailClient from "./StoryDetailClient";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const story = await prisma.story.findUnique({
    where: { id: id },
  });

  if (!story) {
    return {
      title: 'Not Found'
    }
  }

  return {
    title: story.title,
    description: story.description,
  }
}

export default async function EventDetailPage({ params }) {
  const { id } = await params;

  const story = await prisma.story.findUnique({
    where: { id: id },
    include: {
      images: true, // include all related images
    },
  });

  if (!story) {
    notFound();
  }

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <div className="absolute top-0 left-0 w-full z-20">
        <div className="relative max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-white">
             <Link href="/">
              <span className="hover:opacity-80 transition-opacity">Home</span>
            </Link>
            <span>/</span>
            <Link href="/webpages/gallery/events">
              <span className="hover:opacity-80 transition-opacity">Events</span>
            </Link>
            <span>/</span>
            <span className="opacity-80 truncate max-w-[200px] sm:max-w-none">{story.title}</span>
          </div>
        </div>
      </div>
      
      <StoryDetailClient story={story} />

      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center mb-16">
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