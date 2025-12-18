import prisma from "@/lib/db";
import StoryForm from "../../StoryForm";
import { notFound } from "next/navigation";

export default async function EditStoryPage({ params }) {
  const awaitedParams = await params;
  const id = parseInt(awaitedParams.id, 10);

  if (isNaN(id)) {
    notFound();
  }

  const story = await prisma.story.findUnique({
    where: { id: id },
    include: { images: true },
  });

  if (!story) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ color: "var(--primary-color)" }}>
        Edit Story
      </h1>
      <StoryForm story={story} />
    </div>
  );
}
