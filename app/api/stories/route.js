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

// GET all stories (public, no auth required for this one)
export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      orderBy: {
        date: 'desc',
      },
      include: {
        images: true,
      },
    });
    return NextResponse.json(stories);
  } catch (error) {
    console.error('GET STORIES ERROR:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching stories.' },
      { status: 500 }
    );
  }
}

// POST a new story (protected)
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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

    const newStory = await prisma.story.create({
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
      }
    });

    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    console.error('CREATE STORY ERROR:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the story.' },
      { status: 500 }
    );
  }
}
