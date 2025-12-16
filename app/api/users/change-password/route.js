import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
});

export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validation = changePasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input.', errors: validation.error.errors },
        { status: 400 }
      );
    }
    
    const { currentPassword, newPassword } = validation.data;

    const user = await prisma.user.findUnique({
        where: { id: session.user.id }
    });

    if (!user) {
        return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid current password.' }, { status: 403 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: session.user.id },
        data: { password: hashedNewPassword }
    });

    return NextResponse.json({ message: 'Password updated successfully.' });

  } catch (error) {
    console.error('CHANGE PASSWORD ERROR:', error);
    return NextResponse.json(
      { message: 'An error occurred while changing the password.' },
      { status: 500 }
    );
  }
}
