import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

// GET all users (protected)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true }, // Exclude password hash
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('GET USERS ERROR:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching users.' },
      { status: 500 }
    );
  }
}

// POST a new user (protected)
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input.', errors: validation.error.errors },
        { status: 400 }
      );
    }
    
    const { name, email, password } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ message: 'User with this email already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    console.error('CREATE USER ERROR:', error);
    return NextResponse.json(
      { message: 'An error occurred while creating the user.' },
      { status: 500 }
    );
  }
}
