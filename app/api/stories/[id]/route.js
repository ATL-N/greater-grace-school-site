import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db';

const storySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  content: z.string().min(20, 'Content must be at least 20 characters long'),
  date: z.string().datetime(), // ISO 8601 date string
  category: z.string().optional(),
  videoId: z.string().optional(),
  images: z.array(z.object({
    url: z.string().url(),
    caption: z.string().optional(),
  })).max(6, 'You can upload a maximum of 6 images'),
});

// GET a single story by ID (public)
export async function GET(request, { params }) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const story = await prisma.story.findUnique({
      where: { id: id },
      include: { images: true },
    });

    if (!story) {
      return NextResponse.json({ message: 'Story not found' }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error(`GET STORY (ID: ${id}) ERROR:`, error);
    return NextResponse.json(
      { message: 'An error occurred while fetching the story.' },
      { status: 500 }
    );
  }
}

// PUT (update) a story by ID (protected)
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const validation = storySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input.', errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { title, description, content, date, category, videoId, images } = validation.data;

    // Use a transaction to update the story and its images
    const updatedStory = await prisma.$transaction(async (tx) => {
      // 1. Delete existing images for the story
      await tx.image.deleteMany({
        where: { storyId: id },
      });

      // 2. Update the story and create the new images
      const story = await tx.story.update({
        where: { id: id },
        data: {
          title,
          description,
          content,
          date: new Date(date),
          category,
          videoId,
          images: {
            create: images.map(img => ({ url: img.url, caption: img.caption })),
          },
        },
        include: {
          images: true,
        },
      });
      return story;
    });

    return NextResponse.json(updatedStory);
  } catch (error) {
    console.error(`UPDATE STORY (ID: ${id}) ERROR:`, error);
    return NextResponse.json(
      { message: 'An error occurred while updating the story.' },
      { status: 500 }
    );
  }
}

// DELETE a story by ID (protected)
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    // The schema relation `onDelete: Cascade` ensures related images are also deleted.
    await prisma.story.delete({
      where: { id: id },
    });

    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error) {
    console.error(`DELETE STORY (ID: ${id}) ERROR:`, error);
    return NextResponse.json(
      { message: 'An error occurred while deleting the story.' },
      { status: 500 }
    );
  }
}
