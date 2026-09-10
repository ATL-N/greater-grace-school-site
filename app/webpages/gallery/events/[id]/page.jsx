import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import StoryDetailClient from "./StoryDetailClient";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const story = await prisma.story.findUnique({
      where: { id: id },
      include: {
        images: {
          take: 1,
        },
      },
    });

    if (!story) {
      return {
        title: "Event Story Not Found",
        robots: {
          index: false,
        },
      };
    }

    const imageUrl = story.images?.[0]?.url || "https://apamgreatergracechristianacademygh.org/images/facilities/classroomblock.jpg";
    const pageUrl = `https://apamgreatergracechristianacademygh.org/webpages/gallery/events/${id}`;

    return {
      title: story.title,
      description: story.description || "Read about this memorable event and story at Greater Grace Christian Academy, Apam.",
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: `${story.title} | Greater Grace Christian Academy`,
        description: story.description,
        url: pageUrl,
        siteName: "Greater Grace Christian Academy",
        type: "article",
        publishedTime: story.date ? new Date(story.date).toISOString() : undefined,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: story.title,
          },
        ],
        locale: "en_GH",
      },
      twitter: {
        card: "summary_large_image",
        title: story.title,
        description: story.description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "School Event",
    };
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": story.title,
    "description": story.description,
    "image": story.images?.[0]?.url ? [story.images[0].url] : ["https://apamgreatergracechristianacademygh.org/images/facilities/classroomblock.jpg"],
    "datePublished": story.date ? new Date(story.date).toISOString() : undefined,
    "dateModified": story.updatedAt ? new Date(story.updatedAt).toISOString() : undefined,
    "author": {
      "@type": "EducationalOrganization",
      "name": "Greater Grace Christian Academy",
      "url": "https://apamgreatergracechristianacademygh.org"
    },
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Greater Grace Christian Academy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://apamgreatergracechristianacademygh.org/favicon.ico"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://apamgreatergracechristianacademygh.org/webpages/gallery/events/${id}`
    }
  };

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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